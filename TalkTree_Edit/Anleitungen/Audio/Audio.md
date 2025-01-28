# Audio

Das Standardverhalten der App ist, den Text in der Zeile "Aussprache" (bzw. "Symbol", wenn die Aussprache leer gelassen wird) mit der im Betriebssystem integrierten Stimme vorzulesen. Diese ist leider von überschaubarer Qualität, aber es gibt Alternativen. :)

1. **Speechgen.io**:  
   Hier handelt es sich um einen Anbieter, bei dem man Text in Sprache umwandeln lassen kann (TTS). Ich habe diese Seite gewählt, da sie einige, in meinen Augen, sehr gute Stimmen anbietet und die Preise in Ordnung sind. Man braucht kein Abo, sondern kann – wie bei einem Prepaid-Handy – Guthaben aufladen und dieses dann verwenden. Mehr zur Integration findest du [hier](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Einstellungen/Speechgen.md).

2. **Alternative Anbieter**:  
   Es gibt unzählige alternative TTS-Anbieter, und es ist möglich, jede beliebige Audio-Datei in den Audio-Ordner zu legen und diese im Programm zu verwenden. Als Beispiel habe ich ein Open-Source-Sample von ein paar Instrumenten beigelegt. Akzeptiert werden aktuell alle Dateien im **.mp3**-Format.

   Eine Auflistung der neuen Wörter findest du in der Datei [Neu.txt](https://github.com/c-smo/TalkTree-Edit/blob/main/TalkTree_Edit/Anleitungen/Audio/Neu.md). Diese befindet sich im Audio-Ordner und wird bei jedem Start neu generiert.

Um eine Audio-Datei mit der App zu verknüpfen, muss diese bloß denselben Namen haben wie die Zeile "Aussprache". Alternativ wie die Zeile "Symbol", wenn man die "Aussprache" leer lässt.

---

**Beispiel 1:**

```
Symbol:           🥁
Aussprache:    M-snare-1
Untertitel:
Farbe:
Link:          Soundboard
```

Dieser Knopf sucht nach der Datei **"M-snare-1.mp3"** und spielt diese ab, da sie sich als Beispiel bereits im Audio-Ordner befindet.

---

**Beispiel 2:**

```
Symbol:        Du
Aussprache:
Untertitel:
Farbe:
Link:
```

Dieser Knopf würde nach der Datei **"Du.mp3"** im Audio-Ordner suchen und, da diese nicht vorhanden ist, den Text mit der im Betriebssystem integrierten Stimme vorlesen.

---

**Beispiel 3:**

```
Symbol:        🌈
Aussprache:    -
Untertitel:
Farbe:
Link:        Farben
```

Dieser Knopf sucht nach **keiner** Datei, da die Aussprache abgestellt ist.
