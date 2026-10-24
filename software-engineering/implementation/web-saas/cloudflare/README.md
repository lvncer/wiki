---
title: "Cloudflare" # gen_index
---

# Cloudflare

**結論：CloudflareはDNS/CDNから始まって今やセキュリティ・開発者プラットフォーム・ゼロトラストまでカバーするインターネットインフラ企業！**
カテゴリ別にまとめるね。

## 全体マップ

```
                     Cloudflare
                         │
     ┌───────────┬────────┴────────┬───────────┐
     │           │                 │           │
  Network    Security          Developer    Zero Trust
  & CDN      & WAF             Platform     (SASE)
```

## カテゴリ別サービス一覧

### ネットワーク / CDN

| サービス | 概要 |
|---|---|
| CDN | エッジキャッシュ。世界300+拠点 |
| DNS (1.1.1.1) | 高速パブリックDNS。プライバシー重視 |
| Load Balancing | ヘルスチェック付きLB |
| Argo Smart Routing | 最適経路を動的選択（有料） |
| Spectrum | TCP/UDP任意プロトコルをCloudflare経由に |
| Magic Transit | BGPベースのL3ネットワーク保護 |
| Magic WAN | SD-WANのCloudflare版 |

### セキュリティ

| サービス | 概要 |
|---|---|
| WAF | ルールベースのWebアプリ保護 |
| DDoS Protection | 自動緩和。無制限帯域 |
| Bot Management | ボットフィンガープリント+ML |
| Email Security (Area 1) | フィッシング防御（M&Aで獲得） |
| Page Shield | クライアントサイドJS攻撃検知 |
| API Shield | APIスキーマ検証・レート制限 |
| Magic Firewall | ネットワークレベルファイアウォール |

### Developer Platform（ここが近年アツい）

| サービス | 概要 | 類似サービス |
|---|---|---|
| Workers | V8ベースサーバーレス実行環境 | Lambda@Edge |
| Pages | 静的サイト+Workers統合ホスティング | Vercel / Netlify |
| R2 | オブジェクトストレージ。**egress無料** | S3 |
| D1 | SQLite互換DBをエッジで | PlanetScale |
| KV | グローバル分散KVストア | DynamoDB |
| Durable Objects | ステートフルなWorkers | - |
| Queues | メッセージキュー | SQS |
| Stream | 動画配信・エンコード | Mux / Cloudfront |
| Images | リサイズ・最適化CDN | Cloudinary |
| AI Gateway | LLMリクエストのキャッシュ・観測 | - |
| Vectorize | ベクトルDB | Pinecone |
| Workers AI | エッジでAI推論 | Replicate |

### Zero Trust / SASE

```
[ユーザー] → WARP → [Cloudflareエッジ]
                          │
              ┌───────────┼───────────┐
           Access       Gateway    Browser
         (認証・認可)  (DNSフィルタ) Isolation
              │
         [社内アプリ] ← Tunnel ← オンプレ
```

| サービス | 概要 |
|---|---|
| Access | IDPと連携したZTNA。VPN不要 |
| Gateway | DNSフィルタリング＋HTTPSプロキシ |
| WARP | デバイスエージェント（VPN代替クライアント） |
| Tunnel | オンプレ→Cloudflare安全接続。ポート開放不要 |
| Browser Isolation | リモートブラウザ分離 |
| CASB | SaaSアプリ設定監査 |
| DLP | データ漏洩防止 |

## どこから使うべきか（用途別早見表）

| 用途 | まず見るサービス |
|---|---|
| Webサイトを守りたい | CDN + WAF + DDoS |
| VPN廃止したい | Access + WARP + Tunnel |
| AWS S3のegress代替 | R2 |
| サーバーレスAPI作りたい | Workers |
| LLMコスト最適化 | AI Gateway |
| 社内ネットワーク全部Cloudflare | Magic WAN |

無料枠がかなり太いのもCloudflareの特徴で、Workers・R2・D1あたりは個人開発でも普通に使えるレベル。
あと最近はAI系がめちゃ力入ってる印象！
