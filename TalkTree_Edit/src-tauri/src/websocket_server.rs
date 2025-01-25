use futures::{SinkExt, StreamExt};
use local_ip_address::local_ip;
use once_cell::sync::Lazy;
use std::net::SocketAddr;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use tokio::net::TcpListener;
use tokio::sync::broadcast;
use tokio::sync::Mutex;
use tokio_tungstenite::accept_async;
use tokio_tungstenite::tungstenite::protocol::Message;

// Track server state
static SERVER_RUNNING: AtomicBool = AtomicBool::new(false);

// Broadcast channel for relaying messages between clients
static BROADCAST_CHANNEL: Lazy<(
    broadcast::Sender<String>,
    Arc<Mutex<broadcast::Sender<String>>>,
)> = Lazy::new(|| {
    // Increased channel capacity to handle more concurrent messages
    let (tx, _) = broadcast::channel(100);
    (tx.clone(), Arc::new(Mutex::new(tx)))
});

// Global string that serves as our welcome message
pub static GLOBAL_STRING: Lazy<Mutex<String>> =
    Lazy::new(|| Mutex::new(String::from("greet|Hello :)")));

#[tauri::command]
pub async fn set_global_string(new_global_string: String) {
    println!("Updating welcome message to: {}", new_global_string);

    let mut string = GLOBAL_STRING.lock().await;
    *string = new_global_string.clone();

    // We now broadcast the new welcome message to all connected clients
    if let Err(e) = BROADCAST_CHANNEL.0.send(new_global_string) {
        println!("Failed to broadcast welcome message update: {}", e);
    }
}

// Server control commands remain the same
#[tauri::command]
pub async fn start_server() -> Result<String, String> {
    if SERVER_RUNNING.load(Ordering::SeqCst) {
        return Err("Server is already running".to_string());
    }

    tokio::spawn(async {
        start_websocket_server("0.0.0.0:8080").await;
    });

    SERVER_RUNNING.store(true, Ordering::SeqCst);
    Ok("Server started successfully".to_string())
}

#[tauri::command]
pub fn stop_server() -> Result<String, String> {
    if !SERVER_RUNNING.load(Ordering::SeqCst) {
        return Err("Server is not running".to_string());
    }

    SERVER_RUNNING.store(false, Ordering::SeqCst);
    Ok("Server stopped successfully".to_string())
}

#[tauri::command]
pub fn get_device_ip() -> Option<String> {
    match local_ip() {
        Ok(ip) => Some(ip.to_string()),
        Err(_) => None,
    }
}

pub async fn start_websocket_server(addr: &str) {
    let addr: SocketAddr = addr.parse().expect("Invalid address");
    let listener = TcpListener::bind(&addr).await.expect("Failed to bind");

    println!("WebSocket server listening on: {}", addr);

    while let Ok((stream, addr)) = listener.accept().await {
        if !SERVER_RUNNING.load(Ordering::SeqCst) {
            println!("Server shutdown requested");
            break;
        }
        println!("New connection from: {}", addr);
        tokio::spawn(handle_connection(stream));
    }

    SERVER_RUNNING.store(false, Ordering::SeqCst);
    println!("WebSocket server stopped");
}

async fn handle_connection(stream: tokio::net::TcpStream) {
    match accept_async(stream).await {
        Ok(ws_stream) => {
            println!("WebSocket connection established");
            let (mut write, mut read) = ws_stream.split();

            // Subscribe to broadcast channel for this connection
            let mut broadcast_rx = BROADCAST_CHANNEL.0.subscribe();

            // Send welcome message (GLOBAL_STRING) to the newly connected client
            let welcome_message = GLOBAL_STRING.lock().await;
            if let Err(e) = write
                .send(tokio_tungstenite::tungstenite::protocol::Message::Text(
                    welcome_message.to_string(),
                ))
                .await
            {
                println!("Failed to send welcome message: {}", e);
                return;
            }
            drop(welcome_message); // Release the lock

            // Handle messages in a loop
            loop {
                tokio::select! {
                                    // Handle incoming messages from this client
                                    Some(message) = read.next() => {
                                        match message {
                                            Ok(msg) => {
                match msg {
                    tokio_tungstenite::tungstenite::protocol::Message::Text(text) => {
                        // Handle text message
                        if let Err(e) = BROADCAST_CHANNEL.0.send(text) {
                            println!("Failed to broadcast text message: {}", e);
                            break;
                        }
                    }
                    tokio_tungstenite::tungstenite::protocol::Message::Binary(bytes) => {
                        // You might want different handling for binary data
                        println!("Received binary message of {} bytes", bytes.len());
                        // Could implement binary broadcast if needed
                    }
                    tokio_tungstenite::tungstenite::protocol::Message::Ping(data) => {
                        // Automatically respond with a pong
                        if let Err(e) = write
                            .send(Message::Pong(data))
                            .await
                        {
                            println!("Failed to send pong: {}", e);
                            break;
                        }
                    }
                    tokio_tungstenite::tungstenite::protocol::Message::Close(_) => {
                        println!("Client initiated close");
                        break;
                    }
                    _ => {
                        // Handle other message types if needed
                    }
                }
                                            }
                                            Err(e) => {
                                                println!("Error receiving message: {}", e);
                                                break;
                                            }
                                        }
                                    }
                                    // Handle broadcast messages
                                    Ok(message) = broadcast_rx.recv() => {
                                        if let Err(e) = write
                                            .send(tokio_tungstenite::tungstenite::protocol::Message::Text(
                                                message,
                                            ))
                                            .await
                                        {
                                            println!("Failed to send broadcast message: {}", e);
                                            break;
                                        }
                                    }
                                    else => break,
                                }
            }
            println!("WebSocket connection closed");
        }
        Err(e) => {
            println!("Error during the WebSocket handshake: {}", e);
        }
    }
}
