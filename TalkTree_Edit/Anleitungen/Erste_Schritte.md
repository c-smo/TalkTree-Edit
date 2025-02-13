# Vorwort

Vielen Dank, dass du TalkTree ausprobierst und damit einen wichtigen Teil zur Entwicklung beiträgst! Das Projekt steckt noch in den Anfängen, deshalb kann es zu Fehlern kommen. Ich wollte aber früh die Möglichkeit bieten, Feedback zu sammeln. Änderungsvorschläge, Wünsche und Fragen sind daher jederzeit herzlich willkommen!

---

## Download & Installation:

- Wähle dein [Betriebssystem](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Installation/download.md)

---

## Bearbeitung

Nach der Installation solltest du eine Datei mit dem Namen **"TalkTree Editor"** in deinem gewählten Installationsverzeichnis finden.

Beim Start sucht/erstellt das Programm die Projektstruktur auf deinem Desktop in einem Ordner mit dem Namen **"TalkTree"**.

In diesem Ordner findest du Folgendes:

- [/Audio](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Audio/Audio.md)
- [/Bilder](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Bilder/Bilder.md)
- /Einstellungen

  - [Einstellungen.txt](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Einstellungen.md)
  - [Farben.txt](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Farben.md)
  - [Server.txt](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Server.md)
  - [Speechgen.txt](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Speechgen.md)

- **_TalkTree.xlsx_**

In dieser Anleitung fokussieren wir uns auf die Datei **"TalkTree.xlsx"**.

---

## TalkTree.xlsx

Diese Datei ist das Herzstück der App und wird verwendet, um diese zu bearbeiten. Öffne sie in einem Programm deiner Wahl. Ich verwende [LibreOffice](https://de.libreoffice.org/), aber jedes Programm, das Excel-Dateien bearbeiten kann, sollte funktionieren.

<img src="./preview_xlsx.png" alt="preview_xlsx" width="478" height="730">

Die Datei ist nur als Muster gedacht und kann beliebig bearbeitet werden. Alle Änderungen sollten nach dem Speichern der Excel-Datei sofort im "TalkTree Editor" sichtbar sein.

Die erste Seite, die man beim Start der App sieht, ist die Tabelle mit dem Namen **"home"**. Hier ist es **wichtig** zu beachten, dass die App nach einer Tabelle mit diesem namen sucht. Es werden Fehler auftreten wenn diese nicht vorhanden ist.

Auf dieser Seite solltest du ein 3 x 6-Raster sehen mit den folgenden Werten in der ersten Spalte: **Symbol, Aussprache, Untertitel, Farbe, Link.**

Du hast die Möglichkeit, diese folgendermaßen zu bearbeiten:

---

### Symbol:

1. **Einfach leer lassen:**  
   Der Knopf wird nicht erscheinen.

2. **Text/Emoji:**  
   Jede Art von Text ist möglich. Das Programm versucht, die Schriftgröße dynamisch anzupassen, damit diese in den Knopf passt. Dennoch würde ich abraten, allzu lange Worte zu verwenden "Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz" ist vielleicht nicht ideal. :D

3. **Bilddatei:**  
   Genauere Infos findest du [hier](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Bilder/Bilder.md).

---

### Aussprach:

1. **Einfach leer lassen:**  
   Das Programm wird den Text im Symbol mittels [Text-To-Speech](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Audio/Audio.md#Text-to-Speech) vorlesen.

2. **Ein anderer Text:**  
   Das Programm wird diesen Text vorlesen, anstatt das Symbol.

3. **-**  
   Die Audio-Wiedergabe ist deaktiviert.

4. **Audiodatei:**  
   Genauere Infos findest du [hier](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Audio/Audio.md).

---

### Untertitel:

1. **Einfach leer lassen:**  
   Kein Untertitel.

2. **Text:**  
   Dieser Text erscheint als Untertitel unter dem Knopf.

---

### Farbe:

1. **Einfach leer lassen:**

   Das Programm verwendet die [Standardfarbe](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Farben.md#Standardfarben), diese kann beliebig angepasst werden.

2. **Eine Farbe per Name wählen:**

   Siehe Tabelle mit dem Namen "Farben" für Beispiele.

3. **Es ist auch möglich, eigene [Farben](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Farben.md) zu verwenden.**

---

### Link:

1. **Einfach leer lassen:**  
   Der Knopf verlinkt automatisch auf die "home"-Tabelle.

2. **Anderer Tabellenname:**  
   Der Knopf verlinkt zu der Tabelle mit dem angegebenen Namen.

3. **Eigener Tabellenname:**  
   Der Knopf verlinkt zurück auf die eigene Tabelle.

---

## Beispiel

<img src="./preview_add_button.png" alt="preview_add_button" width="604" height="522">

```
Symbol:           🌳       <- Dargestellt wird 🌳
Aussprache:       -        <- Keine Audio-Wiedergabe
Untertitel:    TalkTree    <- Unter dem Symbol steht "TalkTree"
Farbe:           Gelb      <- Der Knopf ist gelb
Link:          Viel Spaß!  <- und verlinkt auf die Tabelle "Viel Spaß!"
```

---

## Schlusswort

Mit diesen einfachen Werkzeugen hast du erstaunlich viele Möglichkeiten. Bei der Entwicklung war ich ziemlich verblüfft, was man damit alles machen kann. Ich habe ein paar Beispiele in der Excel-Datei gelassen, um dich ein bisschen zu inspirieren, aber das Potenzial ist bei weitem nicht erschöpft. Ich bin wirklich gespannt, auf welche Ideen die Community so kommen wird :)

Ich wünsche viel Freude beim erschaffen!

Chris
