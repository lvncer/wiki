# DTO（Data Transfer Object）とは

簡単に言うと、**「データを運ぶ専用の入れ物」** のこと！
ORMで取ってきたエンティティ（DBの構造に依存したオブジェクト）をそのまま外に渡すんじゃなくて、**必要な情報だけ詰め替えた別オブジェクトを作って渡す**って感じ。

## なんで分けるの？

ORMのエンティティをそのまま使い回すと…

- **セキュリティ的にヤバい** — パスワードとか秘密情報まで外に漏れちゃう
- **DBの変更がすぐ影響する** — カラム名変えただけで全部壊れる
- **余計なデータまで渡しちゃう** — 関係ないフィールドがいっぱいついてくる

## イメージ図

```txt
DBテーブル
  ↓ ORM
Entityクラス（DB構造そのまま）
  ↓ 詰め替え（Mapper）
DTOクラス（必要な情報だけ）
  ↓
Controller / View / API
```

## コード例（TypeScript風）

```typescript
// ❌ これをそのまま返すのはNG
class UserEntity {
  id: number;
  name: string;
  email: string;
  passwordHash: string; // 危ない！
  createdAt: Date;
}

// ✅ DTOに詰め替えて返す
class UserDTO {
  id: number;
  name: string;
  email: string;
  // passwordHashは入れない！
}

// Mapperで変換
function toUserDTO(entity: UserEntity): UserDTO {
  return {
    id: entity.id,
    name: entity.name,
    email: entity.email,
  };
}
```

## CQRSとの違いは？

|        | DTO                           | CQRS                           |
| ------ | ----------------------------- | ------------------------------ |
| 目的   | データの詰め替え・隠蔽        | 読み書きの処理フロー自体を分離 |
| 規模感 | 小〜中規模でも普通に使う      | 大規模・複雑なシステム向け     |
| 関係   | CQRSの中でDTOを使うことも多い | DTOより大きな概念              |

DTOはシンプルだけどすごく大事な考え方で、わりとどこでも使えるやつだよ！
