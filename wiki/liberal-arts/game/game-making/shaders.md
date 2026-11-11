# Shader

## まずゲーム制作全体の中でのシェーダーの位置

ゲームってざっくりこう。

```text
ゲーム
├─ プログラム
├─ グラフィック
│   ├─ モデル
│   ├─ テクスチャ
│   ├─ アニメーション
│   └─ シェーダー ← ここ
├─ 音
├─ UI
└─ レベルデザイン
```

つまりシェーダーは、

> 「絵の見え方を制御する部分」

なんだよね。

## シェーダーで何ができる？

めちゃくちゃ色々できる。

### 1. 光る

* ネオン
* 魔法
* サイバー感
* 剣の発光

### 2. 水

* 波
* 揺れ
* 反射
* 泡

### 3. 画面エフェクト

* CRT
* VHS
* PS1風
* ノイズ
* グリッチ

こういう“雰囲気作り”が超強い。

### 4. キャラ演出

* ダメージ時白く光る
* アウトライン
* 溶ける
* アニメ風

## 初心者向けに超ざっくり言うと

### 普通の絵

```text
画像をそのまま表示
```

### シェーダーあり

```text
画像を「計算してから」表示
```

## Godotのシェーダーが初心者向きな理由

### Shader Languageが簡単

Godot独自だけど、GLSLベースで比較的読みやすい。

例えば：

```glsl
shader_type canvas_item;

void fragment() {
    COLOR = vec4(1.0, 0.0, 0.0, 1.0);
}
```

これだけで真っ赤にできる。

## 用語を最初に整理

- マテリアル: 「この見た目で描画してね」

#### 例

* 金属
* 水
* 光る
* 透明など。

- シェーダー: 見た目の計算ルール
- テクスチャ: 画像データ
- GPU: 絵を描く専用の超並列CPU

シェーダーはGPU上で動く。

## Godotで実際どう使う？

```txt
Sprite2Dを置く
↓
Material追加
↓
ShaderMaterial
↓
Shaderを書く
```

## 初心者が最初に覚えるべきシェーダー5選

### 1. 点滅（超簡単）

```glsl
shader_type canvas_item;

void fragment() {
    COLOR = texture(TEXTURE, UV);

    COLOR.rgb *= sin(TIME * 5.0);
}
```

TIMEで色を周期変化

### 2. 波打ち

```glsl
UV.y += sin(UV.x * 10.0 + TIME) * 0.02;
```

水とか布っぽくなる。

### 3. 白フラッシュ（ダメージ演出）

```glsl
COLOR.rgb = mix(COLOR.rgb, vec3(1.0), 0.5);
```

アクションゲームで超使う。

### 4. ノイズ

```glsl
fract(sin(dot(UV.xy ,vec2(12.9898,78.233))) * 43758.5453)
```

これだけで世界が変わる。
グリッチとか作れる。

### 5. dissolve（消滅）

敵が灰になるやつ。
めっちゃゲームっぽい。

## 初心者がやりがちなミス

### 「全部シェーダーでやろうとする」

これは危険。
シェーダーは見た目特化であって、ゲームロジックではない。

## 先に覚えるべき順番

おすすめ順。

### 最優先

1. シーン
2. ノード
3. GDScript
4. 当たり判定
5. アニメーション

### 次

6. パーティクル
7. ライティング
8. シェーダー

### 後半

9. 最適化
10. カスタムレンダリング

## 「ゲームっぽさ」を出す最強コンボ

実は、

```text
シェーダー
+
パーティクル
+
画面揺れ
```

これだけで急にプロ感出る。

## 初心者向けおすすめ学習法

### 最初は「改造」から

いきなりゼロから書かなくていい。
Godot Shadersってサイトが神。

https://godotshaders.com

ここで：

* water
* glow
* outline
* pixel
* dissolve

とか検索して、`数値だけ変える` から始めると超理解進む。

## 個人的におすすめの進め方

- Step1: 四角を動かす
- Step2: 攻撃作る
- Step3: パーティクル
- Step4: シェーダーで光らせる
- Step5: 画面演出

ここまで行くと、一気に「ゲーム作ってる感」が出る。
しかもGodotは軽いから、試行錯誤がめっちゃ楽なんだよね。

---

最初ここかなり混乱するよね。
ゲーム開発って「コードを書く」より、

> 「どこに何を置くか」

の方が実は大事だったりする。
特にGodotは自由度高いから、最初に整理ルール作らないと後半で爆発する。
なので、初心者〜中規模くらいまでかなり戦える構成を、「全部込み」で説明するね。

## まずGodotの基本構造

Godotは、

```txt
Node
↓
Scene
↓
Game
```

でできてる。

## イメージ

```txt
Player(Node)
├─ Sprite2D
├─ CollisionShape2D
├─ AnimationPlayer
└─ Camera2D

↓
これを保存
↓
player.tscn
```

つまり、`Scene = 部品` なんだよね。

## 大きなゲームはこうなる

```txt
Game
├─ Player Scene
├─ Enemy Scene
├─ UI Scene
├─ Stage Scene
└─ Effect Scene
```

Unityよりも：

> 「SceneをPrefabみたいに使う」

感覚が強い。

## おすすめディレクトリ構成

これかなり実践的。

```txt
project/
├─ assets/
│   ├─ art/
│   │   ├─ characters/
│   │   ├─ enemies/
│   │   ├─ ui/
│   │   ├─ tiles/
│   │   └─ backgrounds/
│   │
│   ├─ audio/
│   │   ├─ bgm/
│   │   ├─ sfx/
│   │   └─ voice/
│   │
│   ├─ shaders/
│   │
│   ├─ fonts/
│   │
│   └─ vfx/
│
├─ scenes/
│   ├─ player/
│   ├─ enemy/
│   ├─ world/
│   ├─ ui/
│   ├─ effects/
│   └─ test/
│
├─ scripts/
│   ├─ player/
│   ├─ enemy/
│   ├─ systems/
│   ├─ ui/
│   └─ managers/
│
├─ resources/
│
├─ autoload/
│
├─ addons/
│
└─ main.tscn
```

## 重要なのは「役割分離」

初心者は最初、

```text
player.png
player.gd
player.tscn
```

を同じ場所に置きがち。
でも大規模化すると死ぬ。

## なぜ分ける？

### assets

素材そのもの

* png
* wav
* shaderなど。

### scenes

ゲーム部品

* player.tscn
* enemy.tscnなど。

### scripts

ロジック

* movement.gd
* hp_system.gdなど。

## 実際のPlayer構造

例えば：

```text
scenes/player/player.tscn
scripts/player/player.gd
assets/art/characters/player.png
```

みたいになる。

## Node構造も超重要

例えばPlayer。

```txt
Player(CharacterBody2D)
├─ Sprite2D
├─ CollisionShape2D
├─ AnimationPlayer
├─ Camera2D
├─ GPUParticles2D
└─ HurtBox
```

## 役割

- CharacterBody2D: 移動の本体
-  Sprite2D: 見た目
-  CollisionShape2D: 当たり判定
-  AnimationPlayer: アニメ制御
-  GPUParticles2D: 煙・火花

## 「システム」は分離する

これ超大事。

### ダメな例

```gdscript
player.gd

- HP
- 攻撃
- UI
- 音
- セーブ
- エフェクト
```

全部入れる。
これで死ぬ。

### 良い例

```txt
player.gd
├─ movement
├─ attack
├─ animation
└─ health
```

役割ごとに分ける。

## manager文化

ゲームではよくある。

```text id="x8blf4"
GameManager
AudioManager
SaveManager
UIManager
```

など。

## autoloadって何？

Godot特有。
どのSceneでも存在するSingletonって感じ。

### 例えば

#### AudioManager

どこでもBGM再生できる

#### 配置

```text id="5v4vm0"
autoload/
└─ audio_manager.gd
```

## Shaderの置き場所

おすすめ。

```text
assets/shaders/
├─ water.gdshader
├─ crt.gdshader
├─ dissolve.gdshader
└─ outline.gdshader
```

## エフェクト管理

これも大事。

```txt
scenes/effects/
├─ hit_effect.tscn
├─ explosion.tscn
└─ dust.tscn
```

## テストScene作ると超楽

初心者はこれやらない。
でも超重要。

```text id="3sqowg"
scenes/test/
├─ test_player.tscn
├─ test_enemy.tscn
└─ shader_lab.tscn
```

ここで実験する。

## Godot初心者が最初に作るべきもの

おすすめ順。

### 1. Player

```txt
移動
ジャンプ
攻撃
```

### 2. Enemy

```txt
追跡
ダメージ
死亡
```

### 3. UI

```txt
HP
メニュー
```

### 4. Effect

```txt
ヒット
爆発
```

### 5. Scene遷移

```txt
タイトル
↓
ゲーム
↓
リザルト
```

### その後にShader

## 実は超重要な考え方

「Scene = Legoブロック」

これ。
Godotは、「小さいSceneを組み合わせる思想」がめちゃ強い。

## 例えば

```text id="5em8rx"
Sword.tscn
+
Player.tscn
=
武器持ちプレイヤー
```

みたいに合体できる。

## 初心者にありがちな事故

### main.tscnが巨大化

```txt
Main
├─ Player
├─ Enemy100体
├─ UI全部
├─ Stage全部
├─ Effect全部
```

やばい。

### 正しくは

```txt
Main
├─ World
├─ UI
└─ Managers
```

くらいにする。

## 最後に超大事な話

ゲーム制作って、「綺麗に整理できる人」が強い。
マジで。
後半になるほど：

* コード力
* 絵
* 数学

より、整理能力が効いてくる。
なので最初から：

* フォルダ整理
* 命名
* 役割分離

を意識すると、後で自分を救うよ。
