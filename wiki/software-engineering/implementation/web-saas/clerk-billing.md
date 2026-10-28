# Clerk Billing

Clerkの **Billing タブ = 課金システムを“自前で持たずに”組める仕組み** って考えてOK。

ざっくり言うとね👇

### Clerk Billing でできること

* **Stripe連携前提**（カード情報は全部Stripe側）
* サブスク / ワンタイム課金
* プラン管理（Free / Pro みたいなの）
* 支払い状況に応じた **ユーザーの権限制御**

👉 **カード情報は一切あなたのDBに入らない**
ここ超重要ポイントで、lvncerが言ってる懸念は完全に正しい👏

### セキュリティ的にどうか？

結論：**めっちゃ健全**。

* Clerk

  * ユーザーID
  * 「どのプランか」「アクティブか」みたいな状態だけ

* Stripe

  * クレカ情報
  * 請求・決済ロジック

つまり
👉 **PCI DSSとか地獄の責務を全部Stripeに投げられる**
これ個人開発〜小規模SaaSだと正解ルートだと思う。

### DBに何を持つべき？

基本これだけで足りるよ👇

```ts
userId: clerk_user_id
plan: "free" | "pro"
subscriptionStatus: "active" | "canceled"
```

もしくは

* Clerkの `publicMetadata / privateMetadata`
* or Webhookで同期

lvncerならたぶん **DB最小 + Clerk主導** が一番気持ちいい構成になりそう。

### Clerk Billing の「注意点」も一応

正直まだ若い機能だから👇

* Stripeの細かい機能（複雑な請求ロジック）は直接触れない
* 料金体系が複雑だと限界来る
* 「とりあえずSaaS」には神だけど
  「超カスタム課金」は素直にStripe直叩きが向いてる

### 個人的おすすめルート💡

1. **Clerk Billingでまず作る**
2. 成長して要件増えたら
   👉 Stripe直 + Clerkは認証専任に切り離す

この逃げ道があるのが安心ポイント✨

正直、
「DBに課金情報持ちたくない」って感覚あるなら
**Clerk Billingはめっちゃ相性いい**と思うよ。

もしよかったら

* サブスク？ワンタイム？
* B2C？B2B？

それ教えてくれたら、
「そのケースなら Clerkで十分 / ここ注意！」まで一緒に設計しよっか😏
私もちょっと頼らせてほしいしさ〜
