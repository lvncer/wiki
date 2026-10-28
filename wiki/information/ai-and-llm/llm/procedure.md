# LLM 学習手順

## 0. （ちょい前段）語彙（Vocabulary）

トークナイズの前提としてこれがあるよ〜。

* 「このモデルは **どの token ID を知ってるか**」
* BPE / SentencePiece とかで作られるやつ

ここで
「なんでこの文字列がこの token になるの？」
って疑問が全部説明される👍

## 1. トークナイズ

文字 → 数字（token）

例: こんにちは → [1234, 5678, ...]

実際は

* 文字
* サブワード
* 単語の一部

だったりするけど、
**「IDにする」**って理解で全然OK👌

## 2. Embedding

token → ベクトル 「意味を持った数値」に変換する感じ

### Token Embedding

* token ID → ベクトル

### Positional Encoding（←これ大事）

self-attentionって
**順番がわからない**から、

> 「これは何番目の token だよ」

って情報を**足す or 混ぜる**

📌
LLMは
**意味（Embedding）＋順番（Position）**
で初めて文章として理解できる！

ここ知らないと
「attentionって語順どうしてるの？」
って一生モヤるから、今知れて偉い😌

## 3. Transformer

ここが脳みそ 🧠 

中身は主に： 

- Self-Attention
- Feed Forward Network
- 残差接続 + LayerNorm

ここも構成の理解バッチリ。

中身をちょい整理すると👇

### 🔹 Self-Attention

* 「この token、他のどれを見る？」
* Q, K, V
* 重み付き和

### 🔹 Feed Forward Network

* 各 token を**個別に**非線形変換
* 「考えた結果を整理する係」みたいな感じ

### 🔹 残差接続 + LayerNorm

* 勾配消失を防ぐ
* 学習安定装置🧯

あと実際はこれが
**何層もスタック**されてる（12層とか96層とか）

## 3.5 （地味だけど重要）Attention Mask

特にGPT系ね👇

* **未来の token を見ないようにする**
* causal mask

これないと
「答えカンニングして学習」しちゃう😇

## 4. Linear + Softmax

次に来そうなtokenの確率を出す

* hidden state → logits
* Softmax → 確率分布

ここで初めて
「次はこの token 来そう！」
ってなる。

ちなみに
**logits = まだ確率じゃない生の点数**
って知ってると論文読むとき楽💡

## 5. 損失関数（Loss）

Cross Entropy Loss、正解👏

「予測どれくらい外れた？」を数値化

やってることは超シンプルで、

> 正解 token の確率
> 高かった？低かった？

を怒られるフェーズ😇

## 6. 最適化（Optimizer）

Adam / AdamWでOK！

重みをちょっとずつ修正する役

* 勾配を使って
* 重みをちょっとずつ更新

ここで
**Backpropagation（誤差逆伝播）**
が裏で動いてるけど、

今は
「損失を減らす方向に戻してる」
って理解で十分◎

## 全体を一文で言うと

> 「文章を token にして、意味と順番をベクトルにして、
> attentionで関係を考えて、
> 次に来る token を当て続ける機械」

って感じ！

## 次に理解すると気持ちいい概念リスト✨

今のレベルならこの順がおすすめ👇

1. **Positional Encoding（もう一段深く）**
2. **Multi-Head Attention**
3. **なぜ FFN が必要か**
4. **Pre-training と Fine-tuning の違い**
5. **Inference 時に Loss は使われない理由**
