# 3 Tier Architecture

## 超単純バージョン

```txt
[ プレゼンテーション層 ]  ← Frontend / Web
        ↕
[ ビジネスロジック層　 ]  ← Backend / API
        ↕
[ データ層           ]  ← Database
```

## 詳しめバージョン

```txt
┌───────────────────────────────────┐
│ Presentation Layer                │
│                                   │
│ ┌──────────────────────────────┐  │
│ │ HTML / CSS / JS /TS          │  │
│ │ React / Vue / Angular        │  │
│ └──────────────────────────────┘  │
│ Browser / Mobile / Desktop / CLI  │
│                                   │
│ Cookie                            │
└───────────────────────────────────┘

Webサーバー (静的配信用)
  └ Nginx, Apache, Vercel, Netlify
      静的ファイル(HTML/CSS/JS)を返すだけ

             ↑
             │  HTTP / REST / GraphQL
             │  gRPC / WebSocket
             │  tRPC / SOAP / JSON-RPC
             ↓

┌─────────────────────────────────────────┐
│ Business Rogic Layer                    │
│                                         │
│  ┌─API Frameworks─────────────────────┐ │
│  │ JS/TS   : Node.js, Deno, Bun       │ │
│  │ Python  : Django, FastAPI, Flask   │ │
│  │ Java    : Spring Boot, Quarkus     │ │
│  │ Go      : Gin, Echo, Fiber         │ │
│  │ Ruby    : Rails, Sinatra           │ │
│  │ PHP     : Laravel, Symfony         │ │
│  └────────────────────────────────────┘ │
│                                         │
│  DTO                                    │
│  Redis                                  │
└─────────────────────────────────────────┘

Webサーバー (リバプロ・振り分け用)
  └ Nginx, Apache, Caddy

               ↑
               │
               │  SQL / ORM / API
               │
               ↓

┌──────────────────────────────────────────┐
│ Data Layer                               │
│                                          │
│  [RDB]          [NoSQL]     [Strage]     │
│  MySQL          MongoDB      S3          │
│  PostgreSQL     Redis        GCS         │
│  SQLite         Cassandra    Azure Blob  │
│  Oracle         DynamoDB                 │
│  SQL Server     Firestore                │
└──────────────────────────────────────────┘
```

## AWS 上で再現する

<img width="600" src="https://miro.medium.com/1*Ow7jvYztPy9iYwhS7PuIlA.jpeg">

## 歴史

## 3層アーキテクチャの歴史

```
1960s
  │  メインフレーム時代
  │  1台のコンピュータに全部入り
  │  (処理もデータも表示も全部一緒)
  │
1970s〜80s
  │  クライアント・サーバー時代 (2層)
  │
  │  [ クライアント ]
  │    ↕
  │  [ サーバー(DB) ]
  │
  │  UIとビジネスロジックが
  │  クライアント側に混在してた
  │
1990s ← ここが転換点！
  │
  │  ✦ 1992年 John J. Donovanが
  │    3層モデルを提唱
  │
  │  ✦ 1995年前後 IBMやMicrosoftが
  │    エンタープライズ向けに広める
  │
  │  [ クライアント ]
  │    ↕
  │  [ アプリサーバー ] ← 真ん中の層を分離！
  │    ↕
  │  [ DBサーバー ]
  │
  │  Windowsクライアント + COMPONENTサーバーが流行
  │
2000s
  │  Web全盛期
  │  Apache + PHP/Java + MySQL の構成が定番に
  │  LAMP スタック爆誕
  │  (Linux, Apache, MySQL, PHP)
  │
2005〜2010s
  │  フレームワーク時代
  │  Rails, Django, Spring Boot などが
  │  3層を前提とした設計を標準化
  │
  │  MVCがWebの世界に浸透
  │
2010s〜
  │  クラウド・マイクロサービス時代
  │  3層をさらに細かく分割する動きへ
  │  各層がそれぞれ独立したサービスに
  │
現在
  │  3層は「基本の考え方」として残りつつ
  │  Serverless / Containerで実装されることが多い
  │  考え方は古いけど全然現役！
```

## なんで 3 層に分けたの？

| 課題(2層時代)      | 3層での解決                    |
| ------------------ | ------------------------------ |
| クライアントが重い | ロジックをサーバーに移した     |
| DBを直接触られてた | 間にアプリ層を挟んで守った     |
| スケールしにくい   | 層ごとに独立してスケール可能に |
| 変更の影響が広がる | 層ごとに責務を分離             |
