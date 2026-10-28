ここ理解するとかなり「ゲーム開発の設計」っぽくなる。
しかも君Webエンジニアだから、たぶんこの辺かなりハマる。

## まず大前提

Godot は Scene を組み合わせて作るエンジン。

## つまり

Scene = 再利用可能な部品

でもある。

## 小さい例

例えば `Enemy.tscn` 作る。

中身：

```txt
Enemy
├── Sprite
├── Collision
└── HPBar
```

## instantiateすると

```txt
Enemy A
Enemy B
Enemy C
```

が作れる。
つまり

> Scene = 設計図

> Instance = 実体

## Reactで例えると

Scene

```tsx
function Enemy() {}
```

Instance

```tsx
<Enemy />
<Enemy />
<Enemy />
```

## 図で見る

```txt
Enemy.tscn
    ↓ instantiate()
----------------------
Enemy Instance #1
Enemy Instance #2
Enemy Instance #3
```

## Godotで超重要

「全部Scene化する」くらいでちょうどいい。

### 例えば監視ゲーム

```txt
MonitorPanel.tscn
CameraButton.tscn
WarningPopup.tscn
ReportWindow.tscn
```

全部Scene。
それを組み合わせる

```txt
MainGame.tscn
├── MonitorPanel
├── WarningPopup
└── ReportWindow
```

かなりComponent設計っぽい

## 大きめプロジェクトの構造

かなりよくあるのはこんな感じ。

```sh
game/
├── scenes/
│   ├── title/
│   │   ├── title.tscn
│   │   └── title.gd
│   │
│   ├── game/
│   │   ├── game.tscn
│   │   └── game.gd
│   │
│   ├── ui/
│   │   ├── monitor_panel.tscn
│   │   ├── monitor_panel.gd
│   │   ├── warning_popup.tscn
│   │   └── warning_popup.gd
│   │
│   ├── entities/
│   │   ├── enemy.tscn
│   │   ├── enemy.gd
│   │   ├── npc.tscn
│   │   └── npc.gd
│   │
│   └── effects/
│
├── scripts/
│   ├── managers/
│   │   ├── game_manager.gd
│   │   ├── save_manager.gd
│   │   └── audio_manager.gd
│   │
│   ├── utils/
│   │   └── helpers.gd
│   │
│   └── data/
│
├── assets/
│   ├── images/
│   ├── audio/
│   └── fonts/
│
├── data/
│   ├── anomalies.json
│   └── levels.json
│
└── addons/
```

### ポイント

`scenes/` ＝ 「見えるもの」

`scripts/` ＝ 共通ロジック

`assets/` ＝ 素材

`data/` ＝ JSONとか

## 君向けにかなり重要

Godotは 「Scene主導」で作ると強い。

## 例えば悪い例

`巨大なmain.gd`
全部書く。

## 良い例

```txt
CameraPanel Scene
WarningPopup Scene
Clock Scene
```

分割。

## Sceneを分けるメリット

- 再利用できる
-  テストしやすい
- instantiateで量産できる

## 例えば

```gdscript
var popup = preload(
    "res://scenes/ui/warning_popup.tscn"
).instantiate()

add_child(popup)
```

## これ何してる？

```txt
warning_popup.tscn
↓
実体化
↓
現在Sceneに追加
```

してる。

## Node / Scene / Instance の関係

ここ超大事。

## 例えば

```txt
Enemy.tscn
└── Enemy(Node)
    ├── Sprite
    └── HPBar
```

## instantiateすると

```txt
GameScene
├── Enemy Instance
├── Enemy Instance
└── Enemy Instance
```

## Scene自体もNode

ここGodot独特。
つまり：

```txt
Scene
↓ instantiate
Nodeになる
↓
他Sceneに入る
```

だから Godo tは「Sceneをネストする」設計になる。

## Webっぽく言うと

かなり `Component tree`。

## 君かなり向いてると思うのが

今もう：

* component分割
* tree構造
* attach
* instantiate

を自然に理解し始めてる。
これGodotの本体にかなり近い。
