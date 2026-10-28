# attachって何？ sceneって何？ nodeって何？

OK、ここ超重要だから、かなり整理して説明するね。
これ理解するとGodotの見え方かなり変わる。

## まず全体像

Godotは極端に言うと：

```txt
Scene
└── Node
    └── Script(Attach)
```

でできてる。

## Node とは？

「部品」これ。

例えば：

```txt
Button
Label
Camera
Sprite
Audio
```

全部Node。

### Webで例えると

| Godot       | Web      |
| ----------- | -------- |
| Node        | HTML要素   |
| Button Node | <button> |
| Label Node  | <p>      |

かなり近い。

### 例えば

```txt
Button
```

Nodeを置くとボタンが表示できる。

### Nodeは親子関係を持つ

例えば：

```txt
Control
├── Label
└── Button
```

これは：

* Control が親
* Label が子
* Button が子

### Webで言うと

```html
<div>
  <p></p>
  <button></button>
</div>
```

みたいな感じ。

## Scene とは？

「Nodeのセット」

例えば：

```txt
TitleScene
├── Background
├── Title
├── StartButton
└── ExitButton
```

これ全部まとめて「1 Scene」

> Scene = 画面

と思ってOK。

### Webで例えると

| Godot     | Web      |
| --------- | -------- |
| Scene     | 1ページ     |
| Node Tree | DOM Tree |

### 実際のSceneファイル

`main.tscn` とか。

# 中身イメージ

```txt
main.tscn
└── Control
    ├── Label
    └── Button
```

## Attach とは？

「NodeにScriptを付ける」こと。

## Scriptって何？

Nodeの「動き」

例えば `Button` だけだとただの見た目。

## ScriptをAttachすると

```gdscript
押されたらゲーム開始
```

できる。

## 図で見ると

### Attach前

```txt
Button
(何もしない)
```

### Attach後

```txt
Button
└── start_button.gd
```

### つまり

Attach = 「このNodeをこのコードで動かす」こと。

## 全部まとめると

例えばタイトル画面。

### Scene

`main.tscn`

### 中のNode

```txt
Control
├── Label
├── StartButton
└── ExitButton
```

### Script Attach

```txt
Control       ← main.gd
StartButton   ← start_button.gd
```

## 実際の関係

```txt
main.tscn
└── Control  ← main.gd
    ├── Label
    ├── StartButton
    └── ExitButton
```

## 君が今やってること

実は「Node Tree を組み立ててる」

### add_child の意味

例えば：

```gdscript
add_child(button)
```

は：

```txt
Control
└── Button
```

を作ってる。

### Reactっぽく言うと

かなり：

```tsx
return (
  <Button />
)
```

に近い。

### instantiate とは？

これは「Sceneから実物を生成」
例えば `Enemy.tscn` が設計図。
instantiateすると `本物のEnemy`が出る。

### 図

```txt
Enemy.tscn
   ↓ instantiate()
Enemy Instance
```

### Reactで言うと

かなり：

```tsx
<Enemy />
```

に近い。

### 一番重要な理解

Godotは「Nodeの木」を作るゲームエンジン。

### 例えば最終的には

```txt
GameScene
├── Player
├── Enemy
├── UI
│   ├── HPBar
│   └── Timer
└── AudioManager
```

こんなのになる。

## 君向けに超ざっくり言うと

| Godot       | Web感覚        |
| ----------- | ------------ |
| Node        | HTML要素       |
| Scene       | 画面/Component |
| Attach      | JS紐付け        |
| Tree        | DOM Tree     |
| add_child   | appendChild  |
| instantiate | Component生成  |

こんな感じ。
