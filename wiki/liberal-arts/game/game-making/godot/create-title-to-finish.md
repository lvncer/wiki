そうそう、有名。
ゲーム開発の世界で、

> 「まずタイトル→開始→終了まで通す」

ってかなり基本。

理由は単純で、

* 起動できる
* 遷移できる
* “ゲームっぽい”
* 完成までの骨組みになる

から。

Webでいう：

```txt id="g5v8h1"
routing
layout
entrypoint
```

みたいな感じ。

---

しかも君の「コード主体でやりたい」とかなり相性いい。

じゃあ、

# 完全コード寄りで

# 最小のタイトル画面

作ろう。

---

# 最終構成

```txt id="ufz7mr"
game/
├── scenes/
│   ├── main.tscn
│   └── game.tscn
│
├── scripts/
│   ├── main_menu.gd
│   └── game.gd
│
└── project.godot
```

---

# まずGodotでやること

## 1. New Project

作る。

---

## 2. main.tscn 作成

### 手順

```txt id="twft9u"
Scene
↓
New Scene
↓
User Interface
```

これで：

```txt id="8swjcc"
Control
```

がrootになる。

---

## 3. 保存

```txt id="h1h0lf"
scenes/main.tscn
```

---

# 次にスクリプト

## scripts/main_menu.gd

作る。

```gdscript id="4w96tw"
extends Control

func _ready():
    # 背景
    var bg = ColorRect.new()
    bg.color = Color(0.05, 0.05, 0.05)
    bg.set_anchors_preset(Control.PRESET_FULL_RECT)
    add_child(bg)

    # タイトル
    var title = Label.new()
    title.text = "MONITOR SYSTEM"
    title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    title.position = Vector2(0, 120)
    title.size = Vector2(1280, 50)
    title.add_theme_font_size_override("font_size", 40)
    add_child(title)

    # STARTボタン
    var start_button = Button.new()
    start_button.text = "START"
    start_button.position = Vector2(540, 300)
    start_button.size = Vector2(200, 60)
    start_button.pressed.connect(_on_start_pressed)
    add_child(start_button)

    # EXITボタン
    var exit_button = Button.new()
    exit_button.text = "EXIT"
    exit_button.position = Vector2(540, 380)
    exit_button.size = Vector2(200, 60)
    exit_button.pressed.connect(_on_exit_pressed)
    add_child(exit_button)


func _on_start_pressed():
    get_tree().change_scene_to_file("res://scenes/game.tscn")


func _on_exit_pressed():
    get_tree().quit()
```

---

# これをどこに置く？

```txt id="c67ex5"
scripts/main_menu.gd
```

---

# 次にアタッチ

Godotで：

```txt id="5o3ib2"
main.tscn
↓
root(Control)選択
↓
Attach Script
↓
scripts/main_menu.gd
```

---

# 次にゲーム画面

## scenes/game.tscn

作る。

---

## 手順

```txt id="ffq2q7"
New Scene
↓
User Interface
↓
保存
```

---

# scripts/game.gd

```gdscript id="aw2af8"
extends Control

func _ready():
    var bg = ColorRect.new()
    bg.color = Color.BLACK
    bg.set_anchors_preset(Control.PRESET_FULL_RECT)
    add_child(bg)

    var label = Label.new()
    label.text = "GAME STARTED"
    label.position = Vector2(500, 300)
    label.add_theme_font_size_override("font_size", 32)
    add_child(label)
```

---

# アタッチ

```txt id="mllp1x"
game.tscn
↓
root選択
↓
Attach Script
```

---

# 最後

## Main Scene設定

```txt id="zq1jyz"
Project
↓
Project Settings
↓
Run
↓
Main Scene
```

ここで：

```txt id="9t6yag"
main.tscn
```

指定。

---

# 実行すると

```txt id="mvdj8f"
起動
↓
MONITOR SYSTEM
↓
START
↓
GAME STARTED
```

になる。

---

# この時点で超重要なのが

もう：

* 起動
* 画面遷移
* UI
* ボタン
* シーン管理

全部入ってる。

つまり：

> “ゲームの骨”

は完成してる。

---

# 次に何する？

君なら次おすすめは：

## 「監視カメラUI」

かな。

例えば：

```txt id="0o3x2i"
CAM 01
CAM 02
CAM 03
```

ボタン押したら画面切替。

これだけで一気にゲームっぽくなる。

---

あとこの構成、
かなりWebエンジニア向きなんだよね。

例えば：

| Godot    | Web          |
| -------- | ------------ |
| Scene    | Page         |
| Node     | DOM          |
| Signal   | Event        |
| Autoload | Global Store |
| Control  | UI Component |

みたいな感じ。
