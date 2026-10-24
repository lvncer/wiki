# Resend

はい、「Resend」はメール送信を簡単にするためのAPIベースのメール配信サービスです。
開発者がアプリケーションからトランザクションメール（例：確認メール、通知メールなど）を簡単に送信できるように設計されています。
特にNext.jsなどのモダンなフレームワークと組み合わせて使われることが多いです。

## Resendの主な特徴

- REST APIおよびSDK対応（Node.js公式SDKあり）
- ドメイン認証機能あり（SPF、DKIM）
- シンプルなUIとログ機能
- 無料プランあり

## 使い方（Node.js + Next.jsの例）

### 1. アカウント作成とAPIキーの取得

[https://resend.com](https://resend.com/) にアクセスしてアカウント作成

ダッシュボードからAPIキーを取得

### 2. パッケージのインストール

```sh
npm install resend
```

### 3. メール送信のコード例 （ `pages/api/send-email.ts` ）

```tsx
// resendパッケージをインポート
import { Resend } from 'resend';

// Resendのインスタンスを作成（APIキーを設定）
const resend = new Resend(process.env.RESEND_API_KEY);

// Next.jsのAPI Routeでメールを送信
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { to, subject, html } = req.body;

      // メール送信
      const data = await resend.emails.send({
        from: 'Your Name <noreply@yourdomain.com>', // 認証済みドメインのアドレス
        to,
        subject,
        html,
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'メールの送信に失敗しました。' });
    }
  } else {
    res.status(405).json({ error: 'POSTメソッドのみ使用可能です。' });
  }
}
```

### 4. `.env.local` にAPIキーを設定

```
RESEND_API_KEY=
```

### 5. ドメインの認証（推奨）

ダッシュボードから「Domains」→ 自分のドメインを追加

指定されたDNSレコード（SPF, DKIM）を設定

## 注意点
Gmailなどのメールアドレスでも送信可能ですが、独自ドメインを設定する方が信頼性が高いです。

大量配信やスパム検知回避のためには、送信レートの調整や認証が重要です。

使いたいシチュエーション（例：ユーザー登録後の確認メール送信など）があれば、それに応じたテンプレートも紹介できます。
