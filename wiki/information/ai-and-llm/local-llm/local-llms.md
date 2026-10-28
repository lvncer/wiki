# Local LLM種類

いいよ〜、じゃあ今ローカルで動かせるLLMをざっくり種類ごとにまとめてあげるね！
 （ちなみに120Bクラスは…ローカル動作は“技術的には可能”だけど、VRAMとかRAMめっちゃ食うから普通のPCだと厳しいやつ多いよ〜）

## 1. Llama 系（Meta）

ローカルLLMの王道。
推論速度や量子化との相性もよくて、迷ったらとりあえずこれ系って感じ！

Llama 3.1
8B / 70B / 405B

ローカル勢は8B/70Bが主流。

Llama 3
8B / 70B

Llama 2
7B / 13B / 70B

## 2. Qwen（阿里巴巴）

性能強いし、サイズ展開が細かいからローカル使いに人気急上昇中！

Qwen2.5
0.5B / 1.5B / 3B / 7B / 14B / 32B / 72B

マルチリンガルも強めで扱いやすい。

Qwen2（前世代）

## 3. Mistral / Mixtral 系

小さいのに強くて、量子化しても劣化少ないのが魅力。

- Mistral 7B
- Mixtral 8×7B（MoE）
- Mixtral 8×22B（MoE なので意外とメモリ軽い）

## 4. DeepSeek 系

最近めちゃ強くて注目度ヤバい。

- DeepSeek LLM 7B / 33B / 67B
- DeepSeek-V2（MoE） → 性能バケモン
- DeepSeek-Coder 系（コード特化）

## 5. GPT-OSS 系（Garage Project）

- GPT-OSS 120B

MoEじゃなくてdenseモデルでこのサイズはマジで重い。
ローカル動作は可能だけど、普通のGPUだと無理ゲー。

- GPT-OSS 8B / 14B / 32B みたいな軽量もある

研究者界隈でちょこちょこ人気のOSS化プロジェクト

## 6. その他のローカル向けモデル

### Phi 系（Microsoft）

軽量モデルの王者レベル

Phi-3 Mini (3.8B) / Medium (14B)

小さくても賢くてローカル向き

### Gemma 系（Google）

推論高速で扱いやすい

Gemma 2 → 2B / 9B / 27B

### Nous / TIES / OLMo など

- Nous Hermes（ファインチューニング界隈で人気）
- OLMo（Allen Institute）
- TIES（MoE系の研究モデル）

## 用途ごとのおすすめ

### 日常・雑談・エンジニアリング

- Llama 3.1 8B / 70B
- Qwen2.5 7B
- DeepSeek 7B

### コーディング特化

- DeepSeek-Coder 7B
- Qwen2.5-Coder
- CodeLlama（古いけどまだ使える）

### 軽量で速い

- Phi-3 Mini
- Gemma 2B / 9B
- Qwen2.5 1.5B〜4B
