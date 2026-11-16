# 好きなキーに「Chromeの音だけミュート」を割り当てる

## 一番簡単なやり方

### 1. SoundVolumeView をダウンロード

### 2. AutoHotkey v2 をインストール

### 3. 下のスクリプトを .ahk ファイルで保存してダブルクリック

`.ahk` は `SoundVolumeView.exe` と同じフォルダに置くこと

```
#Requires AutoHotkey v2.0

svv := '"' A_ScriptDir '\SoundVolumeView.exe"'

F9::Run(svv ' /Switch "chrome.exe"',, 'Hide')           ; ミュート切替
F10::Run(svv ' /SetVolume "chrome.exe" 0',, 'Hide')     ; 音量0
F11::Run(svv ' /SetVolume "chrome.exe" 100',, 'Hide')   ; 音量100
```
