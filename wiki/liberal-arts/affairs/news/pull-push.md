AIにニュースを取って来させたいんだけどスラッシュコマンドを追加してcronか何かで自動実行するようにするか、それ以外の方法とかあるのかな？

あるよ〜。むしろ「どういう体験にしたいか」でかなり設計変わる。

ざっくり分けるとこんな感じ。

---

## 1. Slash Command + Cron（王道）

たとえば `/news ai` みたいなコマンドを作って、
cronで定期実行してSlackやDiscordに投げる方式。

### 構成イメージ

```txt
cron
 ↓
script
 ↓
LLM + News API
 ↓
Slack / Discord / Notion
```

### 良いところ

* シンプル
* 安い
* 制御しやすい
* 「毎朝7時」みたいなの得意

### ありがちな構成

* NewsAPI
* RSS
* Hacker News
* Reddit
* X/Twitter監視
* Gemini/OpenAIで要約

### 例

```bash
0 7 * * * bun run news.ts
```

で毎朝実行。

---

## 2. “AIエージェント” 化する（最近多い）

cronじゃなくて、
「常に世界を見てるAI」にする感じ。

### イメージ

```txt
RSS / X / Reddit
      ↓
イベント検知
      ↓
重要そうならAIが判断
      ↓
通知
```

これだと、

* 「今日はニュース少ないから送らない」
* 「これはお前好きそうだから送る」
* 「昨日の流れと繋がってる」

みたいなのができる。

cronは“定時実行”だけど、
これは“変化検知”。

---

## 3. RSSだけでかなり強い

実はニュース系はRSSめちゃ強い。

### 例えば

* Hacker News
* Reddit
* TechCrunch
* GitHub Releases
* arXiv
* Zenn
* Qiita
* YouTube

全部RSSあること多い。

### 構成

```txt
RSS取得
 ↓
重複除去
 ↓
AI要約
 ↓
配信
```

これだけでかなり賢い。

---

## 4. “Push型” にする

定期実行じゃなくてWebhook。

### 例

* GitHub Release
* YouTube新着
* RSS更新検知
* Reddit投稿検知

何か起きたら飛んでくる。

これリアルタイム性高い。

---

## 5. MCP使う方法もある

最近だとMCPで

* Slack
* Gmail
* Calendar
* Notion

と繋いで、
AIが直接操作する構成も増えてる。

例えば：

> 「今日のAIニュースをSlackに投げて」

を毎朝AI自身がやる。

ただ、ニュース取得自体は結局RSS/APIが多い。

---

## 個人的におすすめ構成

最初はこれがかなりバランス良い。

```txt
RSS複数
 ↓
bun script
 ↓
OpenAI/Geminiで要約
 ↓
Discord webhook
 ↓
Notion保存
```

理由：

* 安い
* 作るの早い
* 拡張しやすい
* AI感が出る

---

## さらに面白くするアイデア

### 「人格」を持たせる

ただ要約するだけじゃ弱い。

例えば：

* cynical AIニュースキャスター
* ギャル解説
* VC視点
* 技術オタク視点
* 世界終末論者視点

とか。

ニュースって“解釈”の方が価値ある。

---

## もし作るなら

こんな感じの設計が綺麗。

```txt
sources/
  rss.ts
  reddit.ts
  hn.ts

agents/
  summarize.ts
  rank.ts
  comment.ts

outputs/
  discord.ts
  slack.ts
  notion.ts
```

かなり育てやすい。

---

あと地味に重要なのが、

## 「ニュース取得」より「選別」が本体

情報は無限に取れる。

でも実際価値あるのは：

* 何を捨てるか
* 何を重要と見るか
* 誰向けか

なんだよね。

だから後半は、
「AIニュースフィルター」
みたいな方向に進化しやすい。


かなり良い分け方。
実際、強いニュースシステムってだいたい

* Pull = 知識ベース構築
* Push = アラートシステム

の二層になってる。

しかもこの分離、AIと相性いい。

---

# 全体アーキテクチャ

```txt id="1y1fow"
           ┌─────────────┐
           │ Push System │
           │ 速報/通知    │
           └─────┬───────┘
                 │
                 ▼

User ← Discord / Slack / App

                 ▲
                 │
           ┌─────┴───────┐
           │ Pull System │
           │ 知識蓄積     │
           └─────────────┘
```

Pushは「今知るべき」。
Pullは「後から理解する」。

---

# まず業界のベストプラクティス

大体みんなこうなる。

---

# Push型のベストプラクティス

## “イベント駆動”

cronじゃ遅い。

だから：

* Webhook
* Streaming
* RSS diff
* Queue

を使う。

---

## よくある構成

```txt id="5mx3dr"
Source
 ↓
Event Queue
 ↓
Filtering
 ↓
LLM Scoring
 ↓
Notification
```

これ超重要。

---

## なぜQueueを挟む？

AI呼び出しは重いから。

だから：

```txt id="qqc7wq"
Incoming Event
 ↓
Redis / SQS / Kafka
 ↓
Worker
 ↓
AI
```

にする。

---

# Pull型のベストプラクティス

## “ETL + Indexing”

ニュースを“読む”より、
“知識化”する。

つまり：

```txt id="23m4ys"
Collect
 ↓
Normalize
 ↓
Deduplicate
 ↓
Summarize
 ↓
Embed
 ↓
Store
```

これ。

---

## 実際みんな何使う？

### ソース

* RSS
* Reddit
* HN
* arXiv
* GitHub
* X
* YouTube字幕

### 保存

* Postgres
* pgvector
* Elasticsearch
* Meilisearch

### Queue

* Redis/BullMQ
* Kafka
* SQS

### 実行

* cron
* Temporal
* Trigger.dev
* GitHub Actions
* Cloudflare Workers

---

# 君向けのおすすめ

君の感じだと、

* 軽い
* AI前提
* Bun好き
* 後で拡張

だからこれ。

---

# Pull型 実装案

## 目的

「あとから深く理解する」

---

# 構成

```txt id="k9lsj8"
cron
 ↓
collector
 ↓
normalizer
 ↓
dedupe
 ↓
LLM summarize
 ↓
embedding
 ↓
DB
 ↓
search/chat
```

---

# 技術

## Runtime

* Bun

## DB

* Postgres + pgvector

## Queue

最初不要

## Scheduler

* cron
* Trigger.dev
* GitHub Actions

---

# ディレクトリ

```txt id="zdc07n"
apps/pull-news/

sources/
  rss.ts
  reddit.ts
  github.ts

pipeline/
  normalize.ts
  dedupe.ts
  summarize.ts
  embed.ts

storage/
  postgres.ts

jobs/
  daily.ts
```

---

# Pull型 実装例

## RSS取得

```ts id="7f8g5w"
import Parser from "rss-parser";

const parser = new Parser();

const feed = await parser.parseURL(
  "https://hnrss.org/frontpage"
);

for (const item of feed.items) {
  console.log(item.title);
}
```

---

## 要約

```ts id="6h87n5"
const summary = await openai.responses.create({
  model: "gpt-5-mini",
  input: `
以下を3行で要約して。

${article}
`
});
```

---

## embedding

```ts id="1wdd4n"
const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: article
});
```

---

# Push型 実装案

## 目的

「今すぐ知るべき」

---

# 構成

```txt id="xj2i2s"
Webhook/RSS Diff
 ↓
Queue
 ↓
AI importance scoring
 ↓
Immediate notify
```

---

# Push型はここが超重要

## “importance scoring”

全部通知すると死ぬ。

だからAIに：

* 緊急性
* 影響度
* novelty
* 自分向けか

を判定させる。

---

# Push型 技術

## Runtime

* Bun

## Queue

* Redis + BullMQ

## Real-time

* Cloudflare Workers
* Supabase Realtime
* Pusher

## Notification

* Discord webhook
* Slack bot

---

# Push型 ディレクトリ

```txt id="hh2s8x"
apps/push-news/

ingest/
  rss-watch.ts
  reddit-stream.ts

queue/
  worker.ts

agents/
  score.ts
  classify.ts

notify/
  discord.ts
```

---

# Push型 実装例

## RSS diff

```ts id="dkh6n6"
const oldIds = await loadIds();

const current = await fetchFeed();

const newItems = current.filter(
  x => !oldIds.includes(x.id)
);
```

---

## AI importance

```ts id="fqsz87"
const result = await openai.responses.create({
  model: "gpt-5-mini",
  input: `
ニュースの重要度を0-100で評価。

観点:
- 技術的インパクト
- 市場影響
- 新規性

${news}
`
});
```

---

# “みんな最終的にどうなるか”

これ面白いんだけど、
ニュースシステム作る人って最終的に：

## “検索” に行く

つまり：

```txt id="wjlwmz"
ニュース収集
 ↓
知識DB
 ↓
RAG
 ↓
対話
```

になる。

---

# さらに強い構成

## Pull → Push を接続する

Pushは速報だけど、
Pull側に蓄積される。

すると：

> 「このニュース、先週のOpenAI発表と関係ある？」

をAIが言える。

ここから一気に“知識エージェント”になる。

---

# 個人的にかなりおすすめな構成

## MVP

```txt id="9u5r9s"
Bun
+ RSS
+ Postgres
+ pgvector
+ Discord
+ OpenAI
```

だけ。

これでかなり強い。

---

# その後の進化

## Phase 2

* Redis Queue
* importance scoring
* personalization

## Phase 3

* Memory
* Trend detection
* Cross-news reasoning
* Timeline generation

## Phase 4

* “AI editor”
* AI podcast
* AI radio host
* 自動深掘り

---

で、実は一番価値出るの、

## 「ニュースを要約する」じゃなくて

### 「世界の変化を説明する」

なんだよね。

強いAIニュースシステムって、
最終的にここへ行く。


かなり良い方向。
これ「ニュース収集ツール」じゃなくて、

## “AI編集部”

の設計になってきてる。

しかも君の方向性、
ちゃんと現実的なのがいい。

「完全自動化しない」
これ実は超重要。

---

# まず結論

君の構成なら、

## Pull型 = “編集”

## Push型 = “センサー”

として分離するのが強い。

---

# Pull型の思想

Pull型は速報じゃない。

## 「世界で何が起きたかを理解する」

ためのもの。

だから重要なのは：

* 網羅性
* 重複除去
* 文脈化
* 長期変化
* 良い要約

になる。

---

# Pull型 アーキテクチャ（改良版）

```txt id="2x6gde"
Scheduler
 ↓
Collect
 ↓
Normalize
 ↓
Cluster
 ↓
Human/AI Review(optional)
 ↓
Deep Summarize
 ↓
Markdown Generate
 ↓
GitHub Save
 ↓
Slack Notify
```

ここかなり大事。

---

# “dedupe” より “cluster”

これは重要。

ニュースって：

* TechCrunch
* Reddit
* Hacker News
* Zenn

全部同じ話する。

だから：

## 「重複削除」ではなく

## 「同じ事件をまとめる」

が本体。

---

# 例

```txt id="6lzvxk"
OpenAI releases GPT-X
↓
20記事存在
↓
1つの topic cluster に統合
```

これ。

---

# Pull型の実行タイミング

君の案かなり良い。

---

## Daily

### 目的

「昨日何が起きた？」

### 特徴

* 軽い
* 即読性
* 5分で読める

---

## Weekly

### 目的

「今週の流れ」

ここから“分析”が入る。

AIに：

* なぜ重要か
* 業界への影響
* トレンド

を考えさせる。

---

## Monthly

### 目的

「世界はどう変化した？」

ここで初めて：

* 時系列比較
* 勝者/敗者
* 長期予測

が出てくる。

これはもうレポート。

---

# 要約品質について

ここ、完全に同意。

## 要約がプロダクト

になる。

ニュース取得なんて誰でもできる。

---

# ベストプラクティス

実際強いチームは：

## “2段階要約”

してる。

---

# Stage 1: Source Summary

各記事を短く要約。

```txt id="5if7p8"
article
 ↓
bullet summary
```

ここは安いモデルでいい。

---

# Stage 2: Editorial Synthesis

複数記事を統合して、

## “編集者視点”

でまとめる。

```txt id="q9w9to"
20 summaries
 ↓
deep synthesis
```

ここだけ高級モデル。

これでコストかなり減る。

---

# モデル戦略

君の考え方かなり正しい。

---

# Option A — API型

## 良い点

* 品質高い
* 安定
* 実装簡単

## 悪い点

* 高い
* ベンダー依存

---

# Option B — Local/Agent型

## 良い点

* 安い
* 長文強い
* カスタム可能

## 悪い点

* 運用重い
* 遅い

---

# かなりおすすめの構成

## 普段

APIで回す。

## Weekly/Monthlyだけ

Cursor Agent / Claude Code / ローカルLLMで

“編集作業”

をする。

これ超現実的。

---

# 実はここが重要

## “完全自動要約” は弱い

強いニュースレターって：

* 編集者の思想
* 解釈
* 優先順位

がある。

だから：

## AI下書き + 人間編集

がかなり強い。

---

# GitHub保存、めちゃ良い

実は超相性いい。

---

# なぜGitHubが強い？

## 1. Markdownがそのまま資産

```txt id="04yyea"
2026-05-16.md
```

だけで成立する。

---

## 2. 差分が見える

「世界の変化」がgit diffになる。

これかなり面白い。

---

## 3. AIが扱いやすい

LLMはmarkdown大好き。

---

# 推奨構成

```txt id="5h4p7l"
news/
  daily/
  weekly/
  monthly/

raw/
  rss/
  reddit/

topics/
  ai/
  programming/
```

---

# Markdown構造おすすめ

```md id="d6vjfx"
# Daily AI News - 2026-05-16

## Major Topics

### OpenAI releases ...
- impact:
- why important:
- related trend:

Sources:
- ...
```

---

# embedding不要論、結構わかる

実際、

## “良いmarkdown”

の方が重要なケース多い。

特に最初は。

---

# Push型の思想

Push型は：

## 「今知るべき異常」

を流す。

つまり：

* 新規性
* 速度
* 重要性

だけ。

保存は不要。

---

# Push型アーキテクチャ

かなりシンプルでいい。

```txt id="m5w9zy"
Source Watcher
 ↓
Filter
 ↓
Slack/Discord
```

以上。

---

# AIすら不要なケース

例えば：

* OpenAI blog更新
* GitHub release
* arXiv特定カテゴリ
* HN top入り

はルールベースで十分。

---

# Push型でAIを使う瞬間

## “これは騒ぐべき？”

判定。

```txt id="jlwmzb"
if score > threshold:
  notify()
```

だけ。

---

# Push型でおすすめな通知

## “短い”

絶対。

---

# 悪い例

```txt id="m9km6v"
長文要約...
```

誰も読まない。

---

# 良い例

```txt id="t1k58h"
OpenAIが新モデル発表。

- 128k context
- coding性能大幅向上
- API価格半額

詳細:
(link)
```

3秒で読める。

---

# かなり強い実装案

## Pull型

### 実行

* cron
* GitHub Actions

### 保存

* GitHub repo

### 通知

* Slack webhook

### 要約

* 高級LLM

---

## Push型

### 実行

* Cloudflare Worker
* Bun server

### 監視

* RSS diff
* GitHub release webhook

### 通知

* Slack
* Discord

---

# で、最終的に一番面白いの

## Pullが「知識」

## Pushが「神経」

になること。

---

すると：

Push:

> 「OpenAIが新モデル発表」

Pull:

> 「ここ3ヶ月の流れを見ると、OpenAIは推論特化に移行している」

になる。

この瞬間、
ただのニュース収集を超える。


じゃあまず、
PULL型を「実際に動く構成」に落とそう。

今回は：

* Option A = API中心
* Option B = Local/Agent中心

で分ける。

どっちも、

```txt
collect
↓
cluster
↓
summarize
↓
markdown
↓
github save
↓
slack notify
```

は共通。

違うのは、

## summarize層

だけ。

---

# Option A — API中心構成

## 特徴

* 実装簡単
* 安定
* 品質高い
* 毎日回す向け

---

# アーキテクチャ

```txt id="8pkys3"
GitHub Actions(cron)
        ↓
 Bun Runner
        ↓
 RSS / Reddit / HN
        ↓
 normalize
        ↓
 cluster
        ↓
 OpenAI / Gemini API
        ↓
 markdown generate
        ↓
 git commit
        ↓
 Slack webhook
```

---

# ディレクトリ

```txt id="fqc4j7"
apps/pull-news/

src/
  collect/
    rss.ts
    reddit.ts
    hn.ts

  pipeline/
    normalize.ts
    cluster.ts
    summarize.ts
    markdown.ts

  output/
    github.ts
    slack.ts

  jobs/
    daily.ts
    weekly.ts
    monthly.ts
```

---

# package.json

```json id="36lwlh"
{
  "scripts": {
    "daily": "bun run src/jobs/daily.ts",
    "weekly": "bun run src/jobs/weekly.ts",
    "monthly": "bun run src/jobs/monthly.ts"
  }
}
```

---

# RSS収集

## src/collect/rss.ts

```ts id="h7c1h2"
import Parser from "rss-parser";

const parser = new Parser();

const FEEDS = [
  "https://hnrss.org/frontpage",
  "https://feeds.feedburner.com/TechCrunch/"
];

export async function collectRSS() {
  const results = [];

  for (const url of FEEDS) {
    const feed = await parser.parseURL(url);

    for (const item of feed.items) {
      results.push({
        title: item.title,
        link: item.link,
        content: item.contentSnippet,
        pubDate: item.pubDate
      });
    }
  }

  return results;
}
```

---

# normalize

## src/pipeline/normalize.ts

```ts id="5sx4gn"
export function normalize(items: any[]) {
  return items.map((x) => ({
    title: x.title?.trim(),
    content: x.content?.trim(),
    url: x.link,
    date: x.pubDate
  }));
}
```

---

# cluster（簡易版）

最初は雑でいい。

## src/pipeline/cluster.ts

```ts id="4r7hyh"
export function cluster(items: any[]) {
  const map = new Map();

  for (const item of items) {
    const key = item.title
      .toLowerCase()
      .split(" ")
      .slice(0, 5)
      .join(" ");

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(item);
  }

  return [...map.values()];
}
```

---

# summarize

## src/pipeline/summarize.ts

```ts id="20fws1"
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function summarize(cluster: any[]) {
  const input = cluster
    .map((x) => `${x.title}\n${x.content}`)
    .join("\n\n");

  const res = await client.responses.create({
    model: "gpt-5",
    input: `
以下のニュース群を統合して、
重要点と背景を整理して要約して。

${input}
`
  });

  return res.output_text;
}
```

---

# markdown生成

## src/pipeline/markdown.ts

```ts id="1czg8u"
export function generateMarkdown(
  summaries: string[]
) {
  return `
# Daily News

${summaries
  .map((x) => `## Topic\n\n${x}`)
  .join("\n\n")}
`;
}
```

---

# GitHub保存

## src/output/github.ts

```ts id="7pr7vn"
import { writeFileSync } from "fs";

export function saveMarkdown(md: string) {
  const date = new Date()
    .toISOString()
    .slice(0, 10);

  writeFileSync(
    `news/daily/${date}.md`,
    md
  );
}
```

---

# Slack通知

## src/output/slack.ts

```ts id="z7l25n"
export async function notifySlack() {
  await fetch(process.env.SLACK_WEBHOOK!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: "Daily news generated."
    })
  });
}
```

---

# daily job

## src/jobs/daily.ts

```ts id="6o3vxa"
import { collectRSS } from "../collect/rss";
import { normalize } from "../pipeline/normalize";
import { cluster } from "../pipeline/cluster";
import { summarize } from "../pipeline/summarize";
import { generateMarkdown } from "../pipeline/markdown";
import { saveMarkdown } from "../output/github";
import { notifySlack } from "../output/slack";

const raw = await collectRSS();

const normalized = normalize(raw);

const clusters = cluster(normalized);

const summaries = [];

for (const c of clusters) {
  summaries.push(await summarize(c));
}

const md = generateMarkdown(summaries);

saveMarkdown(md);

await notifySlack();
```

---

# GitHub Actions

## .github/workflows/daily.yml

```yaml id="f7m7j9"
name: Daily News

on:
  schedule:
    - cron: "0 22 * * *"

jobs:
  run:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v2

      - run: bun install

      - run: bun run daily
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}

      - run: |
          git config user.name bot
          git config user.email bot@example.com
          git add .
          git commit -m "daily news"
          git push
```

---

# Option B — Local/Agent中心

こっち超面白い。

---

# 思想

AI APIを“実行エンジン”にしない。

## AIを編集者として使う

---

# アーキテクチャ

```txt id="8dkr3m"
cron
 ↓
collect
 ↓
cluster
 ↓
巨大 markdown/context 作成
 ↓
Cursor Agent / Claude Code
 ↓
編集済み markdown 出力
 ↓
github save
 ↓
slack notify
```

---

# 超重要ポイント

## 「素材生成」と「編集」を分ける

コード側：

```txt id="phlf4k"
ニュース収集
クラスタリング
素材化
```

AI側：

```txt id="dptwy0"
編集
分析
要約
文脈化
```

---

# 実際かなり強い構成

## generate-context.ts

```ts id="7ck8pf"
export function buildContext(
  clusters: any[]
) {
  return `
# ROLE

You are an elite technology editor.

# TASK

Create a weekly report.

# NEWS

${JSON.stringify(clusters, null, 2)}
`;
}
```

---

# context保存

```ts id="b4sktn"
writeFileSync(
  "context/weekly.md",
  context
);
```

---

# Cursor Agentで実行

```bash id="t1q4tp"
cursor-agent \
  --prompt-file context/weekly.md \
  --output reports/weekly.md
```

---

# Claude Code型

```bash id="2vn2ml"
claude-code \
  < context/weekly.md \
  > reports/weekly.md
```

---

# Local LLM型

```bash id="89znh8"
ollama run qwen3:30b < context.md
```

---

# この構成の良いところ

## “編集感” が出る

API直接要約って、
どうしても：

* 均一
* 薄い
* AI臭い

になりがち。

---

# でもAgent型は

## “長い思考”

できる。

つまり：

* 比較
* 推論
* 歴史
* 流れ
* 仮説

が出る。

Weekly/Monthly超強い。

---

# 個人的おすすめ

## Daily

API型。

---

## Weekly

Agent型。

---

## Monthly

人間レビュー込み。

これかなり強い。

---

# 最後に

このシステム、
実はニュースじゃなくて：

## “世界モデル生成”

になっていく。

ここめちゃ面白い。
