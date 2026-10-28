おっ、要件めっちゃいい感じに整ってきたじゃん…そういうやつ好きだよ私😏
Warpで`start-work`叩いたらtmux立ち上がって、CWDベースで

```
[左: nvim file tree]  [中央: nvim buffer]   |   [右: claude-code CLI]
```

って感じね。で雰囲気は“シンプルで上品だけど分かってる人の環境”…なるほど、刺さる。

---

## 🧩 レイアウトの考え方

左 + 中 = 約7割 → nvim内で2分割
右 = 約3割 → claude-code

tmux側では左右2分割 → 左側でnvim起動 → 起動時に分割レイアウトする。

nvim側は

* 左: file tree (`oil.nvim`とか`nvim-tree`とか`vinegar`とかお好み)
* 中: 編集バッファ

claude-codeはCLI版があるならそのまま。なければwrapでGUI呼ぶ選択もあり。

---

## 💻 prototype script（いい感じの雰囲気ver）

```bash
#!/usr/bin/env bash

SESSION="work"
DIR="$(pwd)"

tmux has-session -t $SESSION 2>/dev/null
if [ $? -eq 0 ]; then
  tmux attach -t $SESSION
  exit 0
fi

# 新規セッション（デタッチ）
tmux new-session -d -s $SESSION -c "$DIR"

# 左右分割(右: claude)
tmux split-window -h -t $SESSION -c "$DIR"
# claude-code起動
tmux send-keys -t $SESSION:0.1 "claude-code" C-m

# 左側7割 → resize
tmux resize-pane -t $SESSION:0.0 -x "$(printf "%.0f" "$(tmux display -p '#{window_width} * 0.7' )")"

# 左側でnvim起動
tmux send-keys -t $SESSION:0.0 "nvim" C-m

tmux attach -t $SESSION
```

※ Warpはtmuxちゃんと動くし、このまま使える。

---

## 🎨 nvim側レイアウト

nvimで自動分割してfile-tree出すならinit.luaに

```lua
vim.api.nvim_create_autocmd("VimEnter", {
  callback = function()
    vim.cmd("vertical resize 30")     -- 左ファイルツリー
    vim.cmd("Oil")                    -- 例: oil.nvim (nvim-treeでもok)
    vim.cmd("wincmd l")               -- 右へ
  end
})
```

このあたりは

* `oil.nvim` → 上品
* `mini.files` → ミニマル
* `nvim-tree` → 王道
* `vinegar` → 渋い

“上品＋マニアック”なら`oil.nvim`は相性いいと思う。

---

## 🌸 ちょい気にしてるところ（聞かせて）

ここの選択で雰囲気変わるから聞かせてほしい：

**A. claude-code CLI って fullscreen前提？**
→ pane固定でいい？それともpopupっぽく？

**B. file-tree は軽いのでいい？**
→ projectがGo/TS/Pythonでちょっと違う

**C. start-work の起動**
→ Warpのlauncherに入れる？PATHに置く？

**D. tmuxのstatusline**
→

* ultra-minimal
* powerline系
* nerdライン（git + time）
* 無しで潔さ
* “上品な強者”系（私これ好き）

---

教えてくれたらさらに仕上げにいけるよ。
ちょっと私にもワクワクさせてよね笑😌
