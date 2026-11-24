結論から言うと、#9 が分かりにくいのは、Manager が「みんなをつなぐ係」で、一度に覚えることが多いからだよ。だから Manager を丸ごと完成形で書いたよ。Bot、DisplayBoard、StartPanel も、Manager とつながる所まで全部書くね。長いけど、上から順に作れば完成するようにしたよ。

## 0. 全体の地図

| クラス | 持つ変数 | 関数・イベント |
| - | - | - |
| BP_Bot | `LifeTime`(float, 3.0)、`bFinished`(bool) | Dispatcher `OnBotFinished(bKilled)`、関数 `FinishBot`、イベント `OnTimeUp` |
| BP_BotSpawnArea | `SpawnBox` | 関数 `GetRandomLocation`（#8 で完成済み） |
| BP_DisplayBoard | `BoardText`(Text Render) | 関数 `UpdateDisplay(Score, Remaining)`、関数 `ShowFinalScore(Score)` |
| BP_StartPanel | `Manager`(参照) | `Event AnyDamage` |
| BP_ShootingTestGameManager | `SpawnArea`、`DisplayBoard`、`Score`、`Remaining`、`TotalSpawns`、`bIsPlaying` | `StartTest`、`SpawnNextBot`、`OnBotFinishedHandler`、`EndTest`、関数 `RefreshBoard` |

作る順番はこうだよ。

1. BP_Bot を完成させる
2. Manager の中心部（#9、12〜14）を作って、仮のテストをする
3. DisplayBoard（#17、18）を作って Manager につなぐ
4. StartPanel（#3、4、5、19）を作って、最後に通しでテストする

## 1. BP_Bot の完成形（#6、7、10、11）

**変数**

| 名前 | 型 | 初期値 | 補足 |
| - | - | - | - |
| LifeTime | Float | 3.0 | 目のアイコンを押して Instance Editable にする |
| bFinished | Boolean | false | |

**Event Dispatcher**：My Blueprint の Event Dispatchers の **+** で `OnBotFinished` を作る。Details の Inputs に `bKilled`（Boolean）を足してね。

**関数 FinishBot**（入力：`bKilled` Boolean）

```
Branch( bFinished )
  True  : (nothing)
  False : Set bFinished = true
          -> Call OnBotFinished( bKilled )
          -> Destroy Actor
```

**Event Graph**

```
Event BeginPlay
  -> Set Timer by Event ( Time = LifeTime, Looping = false, Event = OnTimeUp )

Custom Event OnTimeUp
  -> FinishBot( bKilled = false )

Event AnyDamage
  -> FinishBot( bKilled = true )
```

`OnTimeUp` は、`Set Timer by Event` の赤い **Event** ピンから線を引っ張って「Add Custom Event」を選ぶと作れるよ。

## 2. BP_ShootingTestGameManager（#5、9、12〜16、19）

### 2-1. 作る

Content Browser で右クリック → Blueprint Class → Actor。名前は `BP_ShootingTestGameManager`にしてね。

**変数**

| 名前 | 型 | 初期値 | Instance Editable |
| - | - | - | - |
| SpawnArea | BP_BotSpawnArea の Object Reference | なし | **する** |
| DisplayBoard | BP_DisplayBoard の Object Reference | なし | **する** |
| TotalSpawns | Integer | 30 | する |
| Score | Integer | 0 | しない |
| Remaining | Integer | 0 | しない |
| bIsPlaying | Boolean | false | しない |

`BP_DisplayBoard` はまだ無いから、先に空の Actor BP を作っておいてね。中身は後で作るよ。

Instance Editable にするのは、レベルに置いたあと Details から相手を選べるようにするためだよ。

### 2-2. 関数 RefreshBoard（引数なし）

```
Is Valid ( DisplayBoard )
  Valid -> DisplayBoard.UpdateDisplay( Score, Remaining )
```

`Is Valid` を挟むのは、DisplayBoard を選び忘れたときに `Accessed None` を出さないためだよ。

※ `UpdateDisplay` は DisplayBoard 側で作る関数だから、3章で作るまでは `RefreshBoard` の中身は空でいいよ。

### 2-3. StartTest（#5、19）

Event Graph で右クリック → `Add Custom Event` → `StartTest`。

```
Custom Event StartTest
  -> Branch( bIsPlaying )
       True  : (nothing)
       False : Set Score = 0
               Set Remaining = TotalSpawns
               Set bIsPlaying = true
               Call RefreshBoard
               Call SpawnNextBot
```

`True` 側を何もつながないのが、プレイ中に開始パネルを撃っても無視する仕組みだよ。

### 2-4. SpawnNextBot（#9）

ここが山場だよ。関数じゃなくて、**Event Graph の Custom Event** で作ってね。次のノードを順につなぐよ。

```
Custom Event SpawnNextBot
  -> SpawnArea . Get Random Location        (Return: Location)
  -> Spawn Actor from Class
       Class                       = BP_Bot
       Spawn Transform             = Make Transform ( Location <- Location above )
       Collision Handling Override = Always Spawn, Ignore Collisions
  -> Return Value --drag--> "Assign On Bot Finished"
```

ひとつずつ説明するね。

1. **Get Random Location を呼ぶ**：変数 `SpawnArea` をグラフにドラッグして Get を選ぶ。そのピンから引っ張って `Get Random Location` を検索する。白い実行ピンがあるノードで、`Location` が出てくるよ。
2. **Spawn Actor from Class を置く**：右クリックで検索する。`Class` のプルダウンから `BP_Bot` を選ぶと、Return Value が `BP_Bot` 型に変わるよ。
3. **Spawn Transform を作る**：`Spawn Transform` ピンから引っ張って `Make Transform` を選ぶ。その `Location` に、手順1の `Location` をつなぐ。Rotation と Scale はそのままでいいよ。
4. **Collision Handling Override を設定する**：`Always Spawn, Ignore Collisions` を選ぶ。
5. **Assign を付ける**：`Spawn Actor from Class` の **Return Value** から引っ張って、`Assign On Bot Finished` を検索する。すると `Bind Event to OnBotFinished` と、赤い Custom Event が自動で出てくるよ。
6. **イベントの名前を変える**：その赤い Custom Event の名前を `OnBotFinishedHandler` に変える。`bKilled` の出力ピンは最初からあるよ。
7. **実行線をつなぐ**：`Spawn Actor from Class` の実行出力を、`Bind Event` の実行入力につなぐ。

これで「Bot を出して、Bot が終わったら教えてもらう」ところまでできたよ。Assign は、Bot が出た直後に付けるのがポイントなの。`OnBotFinishedHandler` は、Bot が終わるたびにここへ呼ばれるよ。

### 2-5. OnBotFinishedHandler（#12、13、14、16）

赤い Custom Event の先を、こう書くよ。

```
Custom Event OnBotFinishedHandler ( bKilled )
  -> Branch( bKilled )
       True  : Set Score = Score + 1  --+
       False : -------------------------+
                                        |
  -> Set Remaining = Remaining - 1  <---+   (TrueとFalse両方をここへつなぐ)
  -> Call RefreshBoard
  -> Branch( Remaining <= 0 )
       True  : Call EndTest
       False : Call SpawnNextBot
```

Blueprint では、1つのノードの実行入力に何本でも線をつなげられるよ。`Set Score` の出力と `False` ピンの両方を、`Set Remaining` につないでね。

「30回分」を数えるのは、**出した数じゃなくて終わった数**だよ。Bot を出すたびに数えると、30体目が終わる前に終了しちゃうの。

### 2-6. EndTest（#15）

```
Custom Event EndTest
  -> Set bIsPlaying = false
  -> Is Valid ( DisplayBoard )
       Valid -> DisplayBoard.ShowFinalScore( Score )
```

### 2-7. レベルに置いて参照を選ぶ

1. `BP_ShootingTestGameManager` をレベルにドラッグして置く
2. 置いた Manager を選んで、Details の `SpawnArea` で、レベル上の `BP_BotSpawnArea` を選ぶ
3. `DisplayBoard` も、3章で置いたら選ぶ

### 2-8. 仮のテスト

Manager の Event Graph に、一時的にこれを足してね。

```
Event BeginPlay -> StartTest
```

Play すると、Bot が箱の中のランダムな場所に出るはずだよ。撃つと次の Bot が出て、3秒たっても次が出る。30体で止まれば成功！ 確認できたら、この BeginPlay は消してね。

## 3. BP_DisplayBoard（#17、18）

**コンポーネント**（Components パネルの **+ Add**）

| 名前 | 種類 | 設定 |
| - | - | - |
| BoardMesh | Static Mesh | Mesh=`Cube`、Scale=(3, 0.1, 1.5) |
| BoardText | Text Render | Location=(6, 0, 0)、Text=`READY`、World Size=40、Horizontal Alignment=Center |

文字を X=6 にするのは、板の厚みの半分（0.1×100÷2=5）より少し手前に出すためだよ。文字は +X 側から見ると読めるの。裏返って見えたら、レベル上で板を Yaw 180 回転してね。

**関数 UpdateDisplay**（入力：`Score` Integer、`Remaining` Integer）

```
Format Text ( Format = "Score: {S}   Remaining: {R}", S <- Score, R <- Remaining )
  -> Set Text ( Target = BoardText, Value = Format Text result )
```

`Format Text` は、`{S}` と `{R}` を書くと入力ピンが自動で出てくるよ。

**関数 ShowFinalScore**（入力：`Score` Integer）

```
Format Text ( Format = "FINISH!  Score: {S}", S <- Score )
  -> Set Text ( Target = BoardText, Value = Format Text result )
```

作ったら、Manager の `RefreshBoard` の中身（`UpdateDisplay` を呼ぶ所）をつなぐよ。レベルに置いて、Manager の `DisplayBoard` に選んでね。

## 4. BP_StartPanel（#3、4、5、19）

**コンポーネント**：DisplayBoard と同じ作りだよ。名前だけ変えて `PanelMesh` と `PanelText`（Text=`START`）にしてね。

**変数**：`Manager`（`BP_ShootingTestGameManager` の Object Reference、**Instance Editable**）

**Event Graph**

```
Event AnyDamage
  -> Is Valid ( Manager )
       Valid -> Manager.StartTest
```

レベルに置いたら、Details の `Manager` で、レベル上の Manager を選んでね。

これで、パネルを撃つ → `StartTest` → Bot が出る、という流れになるよ。終了後にもう一度撃てば、`StartTest` の先頭で `bIsPlaying` が false だから、新しいテストが始まる（#19）よ。

## 5. 通しのテストとハマりポイント

| 症状 | 原因 |
| - | - |
| Bot が出ない | Manager の `SpawnArea` を Details で選び忘れてる |
| `Accessed None` が出る | `SpawnArea`、`DisplayBoard`、`Manager` のどれかを選び忘れてる |
| 1体出て止まる | `Assign` をつなぎ忘れ、またはハンドラの `SpawnNextBot` を呼び忘れ |
| スコアが2点ずつ入る | BP_Bot の `FinishBot` の `bFinished` ガードがない |
| 30体より早く終わる | `Remaining` を、出した数で減らしてる |
| 文字が見えない・裏返る | 板を Yaw 180 で回す |

## 豆知識

「30体の Bot のどこで終わるか」を間違えるのは、プログラミングで有名な **off-by-one error（1ズレるバグ）**だよ。「柵杭問題」とも言って、30本の杭を立てると隙間は29個しかないでしょ？ 数える対象が杭か隙間かで、1ズレるの。今回は「終わった数」で数えるって決めたから大丈夫だよ。

いきなり全部は大変だから、まず2-8の仮テストまで進んでね。どこかで詰まったら、グラフのスクショを見せてほしいな。いっしょに直そう、頼りにしてるよ！
