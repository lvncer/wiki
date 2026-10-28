# Tmux

## インストール

macOS（Homebrew使用）

```sh
# Homebrewでインストール
brew install tmux
```

## 基本的な使い方

### 1. tmuxセッションの開始

```sh
# 新しいセッションを開始
tmux

# 名前付きセッションを開始
tmux new-session -s work
```

### 2. ペイン（パネル）の分割

```sh
# 水平分割（上下に分割）
Ctrl+b → "

# 垂直分割（左右に分割）
Ctrl+b → %

# ペイン間の移動
Ctrl+b → 矢印キー
```

### 3. 4つのペインを作る簡単な方法

```sh
# tmuxセッション開始後、以下のコマンドを順番に実行

Ctrl+b → "  # 上下に分割
Ctrl+b → %  # 右側をさらに左右に分割
Ctrl+b → ↑  # 上のペインに移動
Ctrl+b → %  # 上側も左右に分割
```

便利な設定ファイル
~/.tmux.confを作成して設定をカスタマイズできます：

```sh
# マウス操作を有効にする
set -g mouse on

# プレフィックスキーをCtrl+aに変更（オプション）
# set -g prefix C-a
# unbind C-b

# ペイン分割のキーバインドを覚えやすく変更
bind | split-window -h    # | で垂直分割
bind - split-window -v    # - で水平分割

# ペイン移動をviライクに
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# セッション一覧表示
bind s list-sessions
```

ON/OFF切り替えの方法
セッションの管理

```
# セッションから一時的に離脱（バックグラウンドで実行継続）
Ctrl+b → d

# 既存セッションに再接続
tmux attach

# 特定のセッションに接続
tmux attach -t work

# セッション一覧を表示
tmux list-sessions

# セッションを終了
exit  # または Ctrl+d
```

便利なエイリアス設定
~/.bashrcや~/.zshrcに追加：

```
# tmux用のエイリアス
alias tm='tmux'
alias tma='tmux attach'
alias tml='tmux list-sessions'
alias tmk='tmux kill-session'

# 作業用セッションをすぐ開始
alias work='tmux new-session -s work'
```

### 推奨使用方法

tmuxセッションを開始
必要な数だけペインを分割
作業が終わったらCtrl+b → dで離脱
後でtmux attachで復帰

この方法で、1つのWarpタブ内で複数のターミナルを効率的に管理できます。セッションはバックグラウンドで保持されるので、Warpを再起動しても作業を継続できます。

## 割合を指定した分割

tmuxの水平（または垂直）分割って、デフォだと単純に「真っ二つ」なんだけど、実は割合も（正確にはピクセル/セル数で）指定できるよ！
たとえば、左7割・右3割にしたい場合は、新しいペインを作るときにサイズを指定すればOK。

例：右ペインを幅30%で作る

```sh
tmux split-window -h -p 30
```

- -h は水平分割（左右に分ける）
- -p 30 は「新しいペインを全体の30%の幅で作る」

つまりこの場合、「右が30%、左が70%」になる！

逆に左を30%、右を70%にしたいとき
最初に右を作ると左が30%になるから、こんな感じ：

```sh
tmux split-window -h -p 70
tmux select-pane -L
```

で右ペインを70%、左を30%のサイズにできる（必要ならselect-paneでフォーカス戻す）。
ちなみに垂直分割（上下）は -v に変えるだけ。

```sh
tmux split-window -v -p 40
```

↑ これで下が40%、上が60%。
割合って直接「7:3」みたいには書けないけど、
 -p オプションで十分柔軟にコントロールできるよ！
