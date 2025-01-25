# Farben.txt

In dieser Datei hast du die Möglichkeit, die Standardfarben anzupassen und neue Farben hinzuzufügen.

---

## Beispiel 1:

Am Ende des Reiters "Farben" fügen wir folgende Zeile hinzu:

```
[Farben]
Schwarz #000000
...
...
Blau #3498db
Lila #9b59b6
Pink #cc39bd <- Neue Farbe
```

Sie setzt sich folgendermaßen zusammen:

**[ Name ][ Leerzeichen ][ HEX ]**

- **Name:**
  Der Name, den du zukünftig innerhalb von "TalkTree.xlsx" verwenden kannst.

- **Leerzeichen:**
  ähm ja, ein Leerzeichen :D

- **Hex:**
  Die Farbe als HEX-Code. Um einen Hex-Code zu finden, verwende ich [Google Farbwähler](https://g.co/kgs/QjsPT6Y).

---

## Beispiel 2:

Wir verändern die Standardfarbe der Knöpfe zu Pink:

```
[Standardfarben]
Hintergrund #2c3e50
Knopf #cc39bd <- Neue Standardfarbe
Text #FFFFFF

[Farben]
Schwarz #000000
Weiß #ffffff
...
...
...
```

---

## Schlussbemerkung

Ich bin noch nicht zufrieden mit dieser Lösung und im laufe der Entwicklung wird sich hier gewiss noch etwas verändern.
