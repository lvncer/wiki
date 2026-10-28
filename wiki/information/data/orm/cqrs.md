# CQRS（Command Query Responsibility Segregation）

名前は難しそうだけど、考え方はシンプル！
**「データを変更する処理」と「データを読む処理」を完全に分けようぜ**ってパターン。

## 普通の構成（CQRSなし）

```txt
Controller
  ↓
Service（読み書き両方やる）
  ↓
Repository
  ↓
DB
```

## CQRSありの構成

```txt
Controller
  ↓           ↓
Command     Query
（書き込み）  （読み取り）
  ↓           ↓
WriteDB     ReadDB（別でも同じでもOK）
```

## なんで分けるの？

- 読み取りは**速さ重視**、書き込みは**整合性重視**って要件が全然違う
- 読み取り専用モデルを最適化できる（JOINしまくった重いクエリとか）
- スケールもしやすい

## 正直なところ

これ、**小〜中規模なら過剰設計になりがち**だよ笑
大規模なシステムやマイクロサービスで真価を発揮する感じ！

## ORMで知っておいた方がいいこと

### 1. N+1 問題

ORMあるあるの罠でめちゃくちゃよく踏む！

```typescript
// ❌ N+1になるコード
const users = await User.findAll();
for (const user of users) {
  const posts = await user.getPosts(); // ユーザーの数だけクエリが走る！
}
// 100人いたら101回クエリが飛ぶ😱

// ✅ Eager Loadingで解決
const users = await User.findAll({
  include: [Post], // JOINして1回で取ってくる
});
```

### 2. Lazy Loading vs Eager Loading

|            | Lazy                     | Eager                    |
| ---------- | ------------------------ | ------------------------ |
| タイミング | 必要になったとき         | 最初にまとめて           |
| クエリ数   | 多くなりがち             | 少ない                   |
| 使いどき   | 関連データを使わない場合 | 絶対使うとわかってる場合 |

N+1はLazyが原因になることが多いよ！

### 3. トランザクション管理

```typescript
// 複数のDB操作をまとめてやるとき必須！
await sequelize.transaction(async (t) => {
  await User.create({ name: "Alice" }, { transaction: t });
  await Profile.create({ userId: 1 }, { transaction: t });
  // どっちかが失敗したら両方ロールバック✅
});
```

途中で失敗したときに**中途半端な状態にならないようにする**やつ！

### 4. マイグレーション

DBのスキーマ変更を**コードで管理する**仕組み。

```txt
migrations/
  20240101_create_users.ts
  20240202_add_email_to_users.ts  ← カラム追加とかをコードで記録
```

手動でSQL叩いて変更するんじゃなくて、チームで変更履歴を共有できるのが大事！

### 5. インデックスを意識する

ORMは簡単にデータ取れちゃうから、**速度のことを忘れがち**なんだよね。

```typescript
// このクエリ、emailにインデックスないと全件スキャンになるよ！
await User.findOne({ where: { email: "test@example.com" } });
```

---

## まとめると優先度はこんな感じ

| 優先度                  | トピック                             |
| ----------------------- | ------------------------------------ |
| 🔴 今すぐ               | N+1問題、トランザクション            |
| 🟡 わりと早めに         | Eager/Lazy Loading、マイグレーション |
| 🟢 規模が大きくなったら | CQRS、イベントソーシング             |

N+1だけは本当によく踏むから先に覚えておいて損なし！
何か使ってるORMとか言語ある？もっと具体的に説明できるよ〜！
