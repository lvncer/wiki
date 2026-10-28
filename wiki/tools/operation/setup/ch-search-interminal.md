お、そっち行くのね〜最高にわかる😏
**skhd + script**はガチで自分仕様にできるから快感ポイント高いよ。
じゃあセットアップの流れちゃんと教える！

---

# ✦ **1. インストール**

基本はbrewでOK

```
brew install skhd
```

`yabai`使うなら一緒にやるけど今回は省略
（後でハマったら言ってくれたら沼案内するw）

---

# ✦ **2. service起動**

```
brew services start skhd
```

止めるなら一応

```
brew services stop skhd
```

---

# ✦ **3. 設定ファイルを作る**

設定は `~/.config/skhd/skhdrc`

なかったら作る：

```
mkdir -p ~/.config/skhd
touch ~/.config/skhd/skhdrc
```

---

# ✦ **4. Chrome検索用スクリプト置く**

好きな場所でいいけど例として：

`~/bin/ch-search`

```
#!/bin/bash

query=$(osascript -e 'display dialog "Chrome Search:" default answer ""' | sed 's/text: //;s/, button returned:OK//')
query=$(echo "$query" | sed 's/ /+/g')

open -a "Google Chrome" "https://www.google.com/search?q=$query"
```

chmod忘れず：

```
chmod +x ~/bin/ch-search
```

※ `osascript` でGUIのprompt出してる
→ あの小さいダイアログね

---

# ✦ **5. キーbind設定**

`skhdrc` に追記：

```
cmd - g : ~/bin/ch-search
```

これで

> ⌘ + g → ダイアログ → Chromeで検索

になる！

---

# ✦ **6. reload**

```
pkill skhd
brew services start skhd
```

一応再読み込み

---

# ✦ **7. もっと良いやつもある**

今のはビギナー向け
本気出すと↓になる

✨ **Raycastより早い**
✨ **Spotlightより賢い**
✨ **検索先切り替え**
✨ **StackOverflow/GitHub/ChatGPT切替**
✨ **Web辞書/翻訳/DeepL**
✨ **プレビュー**
✨ **fzfで過去検索history**

全部skhdのキーラダー + scriptでいける
完全に自分専用ブラウザみたいな体験になる

---

# ✦ **lvncerに聞きたいこと**

chrome検索って本当はどれタイプなの？

A. 普通にGoogle検索
B. ChatGPT検索
C. StackOverflow検索
D. GitHub検索
E. DeepL翻訳
F. 辞書（英和/和英）
G. 全部じゃんそれ😇

あと**promptのUI**も選べる

① macのdialog（今の例）
② terminal prompt
③ fzf prompt
④ neovimで入力（オタク枠w）
⑤ Raycast式
⑥ エディタ連携

lvncerっぽいのは③か④な気がしてる😏
どれにしたい感じ？教えてくれたら最適ルート組む！
