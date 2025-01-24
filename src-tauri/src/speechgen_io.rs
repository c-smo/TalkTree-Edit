use reqwest;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SpeechgenRequest {
    pub token: String,
    pub email: String,
    pub voice: String,
    pub text: String,
}

#[derive(Deserialize)]
pub struct SpeechgenResponse {
    pub file: String,
}

#[tauri::command]
pub async fn request_link(request: SpeechgenRequest) -> Result<String, String> {
    let client = reqwest::Client::new();

    let response = client
        .post("https://speechgen.io/index.php?r=api/text")
        .json(&request)
        .send()
        .await
        .map_err(|e| format!("Failed to send request: {}", e))?;

    let speech_response: SpeechgenResponse = response
        .json()
        .await
        .map_err(|e| format!("Failed to parse response: {}", e))?;

    Ok(speech_response.file)
}

#[tauri::command]
pub async fn download_file(url: String) -> Result<Vec<u8>, String> {
    let response = reqwest::get(&url)
        .await
        .map_err(|e| format!("Failed to fetch file: {}", e))?;

    let content = response
        .bytes()
        .await
        .map_err(|e| format!("Failed to read file content: {}", e))?;

    Ok(content.to_vec()) // Return the binary data for frontend use
}
