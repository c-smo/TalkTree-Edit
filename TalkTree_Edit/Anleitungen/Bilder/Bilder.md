# Bilder

Das Standardverhalten der App ist es, nach einer Bild-Datei im Bilder-Ordner zu suchen. Wenn es eine Bild-Datei gibt, die den gleichen Namen wie die Spalte "Symbol" trägt, wird der angezeigte Text, von der Bild-Datei überschrieben.

Wenn keine Bild-Datei gefunden wird, wird das Symbol als regulärer Text angezeigt.

Aktuell akzeptierte Formate sind **.png**, **.jpg** und **.jpeg**.

Ich würde **.png** empfehlen, da hier ein transparenter Hintergrund möglich ist. Zur Bildbearbeitung verwende ich [photopea](https://www.photopea.com/), aber natürlich geht jede alternative Bildbearbeitungs-Software genauso gut :)

   <img src="./preview_images.png" alt="images" width="403" height="734">

## Bevorzugte Bildformate:

**Knopf ohne Untertitel:**  
Breite: 400  
Höhe: 400

**Knopf mit Untertitel:**  
Breite: 400  
Höhe: 300

Die Dimensionen sollten aber, abgesehen vom verwendeten Speicherplatz und der Qualität, ansonsten keinen Einfluss haben, da das Programm die Bilder auf die benötigte Größe skaliert.

---

**Beispiel 1:**

```
Symbol:         Oma
Aussprache:
Untertitel:     Oma
Farbe:
Link:
```

Dieser Knopf zeigt die Datei **Oma.png**, da diese im Bilder-Ordner als Beispiel bereits vorhanden ist.

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
Symbol:         Ich
Aussprache:
Untertitel:
Farbe:
Link:
```

Dieser Knopf würde den Text **"Ich"** darstellen. Die Größe der Schrift wird dynamisch angepasst.
