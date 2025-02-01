# Bilder

Ein Knopf kann beliebige Bild-Dateien in den Formaten **png**, **jpg** und **jpeg** anzeigen. Dazu muss die Datei bloß denselben Namen wie die Zeile „Symbol“ tragen und im Bilder-Ordner abgelegt werden.

Ich empfehle **.png**, da hier ein transparenter Hintergrund möglich ist. Zur Bildbearbeitung verwende ich meistens [Photopea](https://www.photopea.com/).

Wird **keine** passende Datei im Bilder-Ordner gefunden, erscheint der Text aus der Spalte "Symbol" als reguläre Schrift auf dem Knopf.

   <img src="./preview_images.png" alt="preview_images" width="358" height="696">

## Format

Du kannst die Datei [Vorlage.png](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Bilder/Vorlage.md) im Bilder-Ordner als Referenz für das aktuelle Knopf-Format verwenden.

Die Dimensionen sollten aber – abgesehen vom Speicherplatz und der Qualität – keinen Einfluss haben, da das Programm die Bilder auf die benötigte Breite skaliert. Das Seitenverhältnis bleibt dabei unverändert.

Ragt die Höhe des Bildes über den Knopf hinaus, wird der überstehende Bereich maskiert. Ist die Höhe zu gering, wird die Standardfarbe der Knöpfe sichtbar.

---

## Beispiele

**Beispiel 1:**

```
Symbol:         Oma
Aussprache:
Untertitel:     Oma
Farbe:
Link:
```

Dieser Knopf zeigt das Bild **Oma.png**, da diese Datei im Bilder-Ordner als Beispiel bereits vorhanden ist.

---

**Beispiel 2:**

```
Symbol:           👋
Aussprache:     Hallo
Untertitel:
Farbe:
Link:           Hallo 1
```

Dieser Knopf zeigt 👋, da es keine Datei mit dem Namen **👋.png** im Bilder-Ordner gibt.

---

**Beispiel 3:**

```
Symbol:       Orte/Kino
Aussprache:   ins Kino
Untertitel:     Kino
Farbe:
Link:        Namen Freunde
```

Dieser Knopf würde nach einem Bild mit dem Namen **Kino.png** im Unterverzeichnis Bilder/Orte/ suchen.
