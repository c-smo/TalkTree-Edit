# TalkTree – UK Framework

   <img src="./preview_main.png" alt="preview_main" width="362" height="696">

TalkTree soll eine offene und zugängliche Plattform bieten, die Menschen mit Kommunikationsbarrieren dabei unterstützt, die eigene Stimme zu finden. Durch eine Vielzahl von Anpassungsmöglichkeiten lässt sich die App ganz individuell auf den Bedarf der Nutzer:innen abstimmen.

Ein weiterer wichtiger Aspekt bei der Entwicklung war, die Bearbeitung so einfach wie möglich zu gestalten, um sowohl Angehörigen als auch Betreuer:innen zu ermöglichen, ohne große Hindernisse auf die Bedürfnisse der Nutzer:innen eingehen zu können.

Dieses Programm ist unter der [MIT](https://github.com/c-smo/TalkTree-Edit/blob/main/LICENSE.md) Lizenz veröffentlicht und daher kostenfrei erhältlich. Mein Ziel ist es jedem Menschen die Möglichkeit zu schaffen, ein ganz persönliches Bäumchen zu pflanzen 🌱

Wenn du es kaum erwarten kannst loszulegen, lese am besten direkt [hier](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Erste_Schritte.md) weiter.

---

## Datenschutz

Da sich mehr Leute für das Projekt interessieren als erwartet (vielen herzlichen Dank dafür 🤭) möchte ich kurz auf das Thema Datenschutz eingehen.

### Externe Kommunikation
Das Programm kann **kein** personenbezogene Daten erfassen, speichern oder an Dritte übertragen. Die einzige externe Kommunikation außerhalb deines lokalen Netzwerks erfolgt – sofern von dir aktiviert – zur API von **speechgen.io**. Dabei werden ausschließlich die Daten übermittelt, die für die Generierung der Audio-Datei erforderlich sind (z.B. Textinhalt und Sprachmodell-Einstellungen).  

### Update-Prozess  
Wenn du den Server zur Aktualisierung des Endgeräts aktivierst, werden lediglich die dafür notwendigen Daten (alle im TalkTree-Editor sicht- und hörbaren Inhalte) **lokal in deinem Netzwerk** bereitgestellt. Der Server schaltet sich automatisch ab, sobald ein Update erfolgreich abgeschlossen wurde.  

### [Dateizugriff](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/src-tauri/capabilities/default.json)  
Das Programm kann ausschließlich auf folgende Verzeichnisse zugreifen: 
- Deinen Desktop um den **TalkTree** Ordner zu erstellen.
- Den erstellten Ordner **TalkTree** auf deinem Desktop (inkl. Unterdateien)  
- Die vom Betriebssystem vorgegebenen **Applikationsverzeichnisse** (für programminterne Einstellungen und Caches)  

Transparenz ist mir ein Anliegen: Sollten Fragen offen bleiben, meldet euch gern!

---

## Neuigkeiten

### 02.02 - iOS Integration

Ich habe mich über die Möglichkeiten einer iOS-Integration informiert. Obwohl die EU 2024 ein Gesetz beschlossen hat, das Apple dazu motivieren soll, Geräte endlich für Drittanbieter zu öffnen, ist dies bis dato immer noch nur bedingt möglich. Außerhalb der EU ist es schlicht unmöglich. 

Ich gebe noch nicht auf, aber aktuell sieht es nicht gut aus :(

P.S.: Um diese Neuigkeit aber auf einer positiven Note abzuschließen: Bevor es gar keine Alternative für iPads gibt (eigentlich ist iOS nur wegen iPads interessant, weil diese bereits in den meisten Einrichtungen verfügbar sind), werde ich das Geld lieber investieren um eine Website zu hosten, auf die man mit dem iPad zugreifen kann, um das Programm von dort zu starten. Ich habe auch noch 1-2 Ideen wie ich Apple vielleicht doch überreden kann. Des wird scho ois! :)

P.P.S.: Im Worst Case lege ich mir zähneknirschend doch noch einen Developer-Account zu.

### 01.02 – Die nächsten Schritte  
Die Version v0.3 scheint aktuell stabil zu sein – mir sind keine Fehler bekannt. Falls euch etwas auffällt, gebt mir bitte Bescheid, damit ich es beheben kann.  

Als Nächstes starte ich mit der iOS-Implementierung. Drückt mir die Daumen – Apple und ich sind momentan nicht die besten Freunde.  

### 31.01 - Neue Kontakt E-Mail
Ich dachte, die “c-smo@users.noreply.github.com”-Adresse leitet Nachrichten direkt an mich weiter, aber da habe ich mich getäuscht. Tut mir leid, falls jemand vergeblich auf eine Antwort gewartet hat. Ich habe die E-Mail Adresse jetzt ausgetauscht.

---

## Download & Installation

**Wichtig:** Bitte stelle sicher, dass sowohl die [App](https://github.com/c-smo/TalkTree-App) als auch der **Editor** auf einer kompatiblen Version sind. Hier zählt die erste Zahl in der Versions-Nummer, die keine 0 ist.

**Aktuelle Version: v0.3.1 - stable** 

- Editor und App sind jetzt auf dem gleichen Stand. Ein Kompatibilitäts-Update war leider erforderlich. 
- Ich habe Beispiel Audio-Dateien von Speechgen.io (Stimme: Ryan DE) für die bereits vorhandenen Knöpfe beigefügt, damit man einen Anhaltspunkt hat, was möglich ist.


#### TalkTree | **[Editor](https://github.com/c-smo/TalkTree-Edit)**

- [Windows](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Installation/windows.md)

- [MacOS](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Installation/macos.md)


#### TalkTree | **[App](https://github.com/c-smo/TalkTree-App)**

- [Android](https://github.com/c-smo/TalkTree-App/releases/download/v0.3.0/TalkTree-App_v0.3.0_android.apk)

- ~~[iOS](URL)~~ _to-do_

---

## Anleitungen

- [Erste Schritte](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Erste_Schritte.md)

---

- [/Audio](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Audio/Audio.md)
- [/Bilder](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Bilder/Bilder.md)
- /Einstellungen

  - [Einstellungen.txt](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Einstellungen.md)
  - [Farben.txt](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Farben.md)
  - [Server.txt](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Server.md)
  - [Speechgen.txt](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Speechgen.md)

---

## Kontakt

- Christopher Smolic
- c-smolic@proton.me
