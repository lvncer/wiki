# 超基本単語

## Scene（シーン）

Godotの中心概念。
「ゲームの部品」みたいなもの。
プレイヤー1体だけでもSceneにできるし、タイトル画面全体でもSceneにできる。

例えば：

* Player.scene
* Enemy.scene
* MainMenu.scene
* Stage1.scene

みたいに全部Scene化できる。
Godotは「Sceneを組み合わせてゲームを作る」思想がかなり強い。

## Node（ノード）

Sceneの中に入ってる部品。

例えばプレイヤーSceneなら：

```text
Player
├ Sprite2D
├ CollisionShape2D
├ Camera2D
└ AudioStreamPlayer
```

みたいにNodeが木構造で並ぶ。

## Tree（ツリー）

Nodeの親子構造。
Godotは全部Treeで管理される。

```text
Root
└ Main
  └ Player
    └ Camera2D
```

みたいな感じ。
「親Nodeが消えると子も消える」とか重要。

# よく使うNode

## Node2D

2D用の基本Node。
位置・回転・拡大縮小を持つ。
2Dゲームの土台。

## CharacterBody2D

2Dキャラ移動用Node。
プレイヤーとか敵に使う。

```gdscript
velocity.x = 100
move_and_slide()
```

みたいな。

## Sprite2D

画像表示。
キャラ画像とか。

## AnimatedSprite2D

パラパラアニメ。
歩きモーションとか。

## CollisionShape2D

当たり判定の形。
四角とか丸とか。
これ単体では動かないので、PhysicsBody系Nodeと組み合わせる。

## Area2D

「触れたことを検知するエリア」。

* アイテム取得
* 異常発生エリア
* 視界判定

とか超便利。
監視ゲームとも相性いい。

## Camera2D

カメラ。
プレイヤー追従とか。

## TileMapLayer / TileMap

タイル配置。
マップ作るやつ。
最近のGodot 4系では内部構造かなり変わった。
君がやろうとしてる「異常でマップ変化」とかなり相性いい。

# スクリプト関連

## GDScript

Godot標準言語。
Pythonっぽい。

```gdscript
func _ready():
    print("hello")
```

かなり書きやすい。

## _ready()

初期化時に1回呼ばれる。
Unityの Start() に近い。

## _process(delta)

毎フレーム呼ばれる。

```gdscript
func _process(delta):
    position.x += 100 * delta
```

## _physics_process(delta)

物理更新。
移動系はこっちが多い。

# シグナル（超重要）

## Signal

Godot最大の特徴の一つ。
イベント通信システム。

```text
ボタン押された
↓
別Nodeに通知
```

みたいな。

例：

```gdscript
button.pressed.connect(_on_pressed)
```

監視ゲームの：

* 異常発生
* カメラ切替
* アラート
* ドア開閉

全部Signalで作りやすい。

# リソース系

## Resource

データだけを持つオブジェクト。

例えば：

* アイテム定義
* 異常定義
* 敵ステータス

とか。

君のゲームなら：

```text
AnomalyResource
- 発生場所
- 条件
- 画像
- 音
- rarity
```

みたいにするとかなり綺麗。

## PackedScene

Sceneを保存したもの。
生成に使う。

```gdscript
var enemy = preload("res://Enemy.tscn").instantiate()
```

# インスタンス化

## instantiate()

Sceneを生成すること。
UnityのInstantiateとほぼ同じ。

# ファイル関連

## res://

プロジェクトフォルダ。

```text
res://player/player.png
```

## user://

セーブデータ保存先。

# 入力

## Input

キー入力。

```gdscript
Input.is_action_pressed("move_left")
```

## Input Map

キー設定画面。

```text
move_left → Aキー
```

みたいに名前で管理する。
かなり大事。

# 物理

## RigidBody2D

物理演算で動く。

## StaticBody2D

動かない壁。

## Collision Layer / Mask

「誰と当たるか」。
最初かなり混乱するやつ。

例えば：

```text
Player layer = 1
Wall layer = 2
Enemy sees layer 1
```

みたいな。

# UI

## Control

UIの基本Node。

## CanvasLayer

UIを画面固定にする。

# 実践で超重要な概念

## Autoload

グローバル管理。

* GameManager
* AudioManager
* SaveManager

とか。

## Singleton

実質Autoload。
どこからでもアクセスできる。

# Godot初心者が最初に理解すると急に楽になる概念

特に大事なのは：

1. Scene = 部品
2. Node Tree = 親子構造
3. Signal = 通信
4. Resource = データ定義
5. PackedScene = 生成用テンプレ

この5つ。
ここ理解すると、「Godotってこういう思想なんだ」って急に見えてくる。

特に君の監視ゲームだと：

* 異常定義 → Resource
* 異常発生 → Signal
* カメラ → Scene
* 部屋 → TileMap
* 異常生成 → instantiate()

みたいにかなり綺麗にハマる。

