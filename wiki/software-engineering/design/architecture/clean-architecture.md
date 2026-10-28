# クリーンアーキテクチャとは

Robert C. Martin（通称Uncle Bob）が提唱した、**ソフトウェアの関心事を層に分離する設計思想**。

核心的な目的はこれ：

- ビジネスロジックをフレームワーク・DB・UIから**独立**させる
- テストしやすくする
- 変更に強くする

---

## 有名な「同心円図」

```
          ┌─────────────────────────────────┐
          │         Frameworks & Drivers     │  ← Web, DB, UI, External
          │   ┌─────────────────────────┐   │
          │   │      Interface Adapters  │   │  ← Controllers, Presenters, Gateways
          │   │   ┌─────────────────┐   │   │
          │   │   │  Application    │   │   │  ← Use Cases
          │   │   │  Business Rules │   │   │
          │   │   │  ┌───────────┐  │   │   │
          │   │   │  │  Domain   │  │   │   │  ← Entities
          │   │   │  │  Entities │  │   │   │
          │   │   │  └───────────┘  │   │   │
          │   │   └─────────────────┘   │   │
          │   └─────────────────────────┘   │
          └─────────────────────────────────┘

          依存の方向：外側 → 内側（内側は外側を知らない）
```

---

## 各層の責務

| 層 | 別名 | 役割 | 具体例 |
|---|---|---|---|
| Entities | Domain層 | ビジネスの核心ルール | User, Order, Moneyオブジェクト |
| Use Cases | Application層 | アプリ固有のビジネスロジック | CreateUserUseCase, PlaceOrderUseCase |
| Interface Adapters | Adapter層 | 内外のデータ変換 | Controller, Repository実装, Presenter |
| Frameworks & Drivers | Infrastructure層 | 技術的な詳細 | Express, MySQL, React, S3 |

---

## 超重要：依存性逆転の原則（DIP）

これがクリーンアーキテクチャの**一番の肝**。

普通に書くと Use Case が DB に依存してしまう：

```
❌ 普通の依存関係

UseCase ──depends on──▶ MySQLRepository（具体クラス）
```

クリーンアーキテクチャでは**インターフェースを挟む**：

```
✅ 依存を逆転させる

UseCase ──depends on──▶ IUserRepository（interface）
                               ▲
                               │ implements
                        MySQLRepository（具体クラス）
```

こうすると UseCase は MySQL の存在を知らなくて済む。
PostgreSQL に変えても、Use Case は一切触らなくていい！

---

## データフローの全体像

```
HTTP Request
    │
    ▼
[Controller]          ← Input変換
    │ InputDTO
    ▼
[UseCase]             ← ビジネスロジック実行
    │  │
    │  └──▶ [IRepository] ──▶ [Repository実装] ──▶ DB
    │            (interface)      (Adapter層)
    │ OutputDTO
    ▼
[Presenter]           ← Output変換
    │
    ▼
HTTP Response
```

---

## DTO（データ転送オブジェクト）の役割

層をまたぐときは**生のEntityをそのまま渡さない**。DTOに変換する。

```
外側の層のデータ形式
    └▶ InputDTO ──▶ UseCase ──▶ OutputDTO ──▶ 外側の層のデータ形式
                       │
                   Entityに変換して処理
```

なぜ？→ Entity の変更が外側に波及しないようにするため

---

## コード例（TypeScript風）

```typescript
// ① Entity（最内層 - 純粋なビジネスルール）
class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
  ) {}

  isValidEmail(): boolean {
    return this.email.includes('@');
  }
}

// ② Repository Interface（Use Case層が定義）
interface IUserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// ③ Use Case
class GetUserUseCase {
  constructor(private userRepo: IUserRepository) {} // ← interfaceに依存

  async execute(id: string): Promise<UserOutputDTO> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error('User not found');
    return { id: user.id, name: user.name }; // OutputDTOに変換
  }
}

// ④ Repository実装（Adapter層）
class MySQLUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    // MySQLの詳細はここだけ
    const row = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return row ? new User(row.id, row.email, row.name) : null;
  }
  async save(user: User): Promise<void> { /* ... */ }
}

// ⑤ Controller（Adapter層）
class UserController {
  constructor(private useCase: GetUserUseCase) {}

  async getUser(req: Request, res: Response) {
    const result = await this.useCase.execute(req.params.id);
    res.json(result);
  }
}
```

---

## よく混同される他のアーキテクチャとの比較

| | レイヤード | ヘキサゴナル | クリーン |
|---|---|---|---|
| 依存方向 | 上から下 | 外から内 | 外から内 |
| DIP活用 | 弱い | 強い | 強い |
| UseCase明示 | なし | なし | **あり** |
| テスト容易性 | 低〜中 | 高 | 高 |

ヘキサゴナルアーキテクチャ（ポート&アダプター）とはかなり近い思想。クリーンは**UseCaseをより明示的に分離**してる点が特徴。

---

## クリーンアーキテクチャのメリット・デメリット

### ✅ メリット
- DBやフレームワークを後から差し替えられる
- UseCase単体でユニットテストが書きやすい
- ビジネスロジックが明確に分離されてる

### ❌ デメリット・注意点
- ファイル数・クラス数が増える（over-engineeringになりがち）
- 小規模プロジェクトにはオーバースペック
- DTOの変換コードが冗長に見える

---

## 実際のディレクトリ構成例

```
src/
├── domain/              ← Entities
│   ├── user.ts
│   └── order.ts
├── application/         ← Use Cases + Repository interfaces
│   ├── usecases/
│   │   └── get-user.usecase.ts
│   └── repositories/
│       └── user.repository.interface.ts
├── infrastructure/      ← 実装（DB, 外部API）
│   └── repositories/
│       └── mysql-user.repository.ts
└── presentation/        ← Controllers, Presenters
    └── controllers/
        └── user.controller.ts
```

---

何か特定の部分（テスト戦略とか、Next.jsでの適用とか）もっと深掘りしたいとこある？

いい質問！「概念は分かったけど実感わかない」ってなりがちだよね。一番体感しやすいのは**「テストを書くとき」**と**「DBを差し替えるとき」**かな。具体的に見てこう！

---

## 一番リアルに感じる瞬間TOP3

### 🥇 1位：テストでDBが要らない

クリーンアーキテクチャ**なし**の場合：

```
GetUserUseCase のテストしたい
    │
    └▶ MySQLに直接依存してる
            │
            └▶ テスト実行するのにMySQLが必要！！
                    → CI環境でコケる
                    → テスト遅い
                    → データ汚染が怖い  😇
```

クリーンアーキテクチャ**あり**の場合：

```typescript
// IUserRepository を満たすだけのモックを作る
class InMemoryUserRepository implements IUserRepository {
  private store: User[] = [];
  async findById(id: string) {
    return this.store.find(u => u.id === id) ?? null;
  }
  async save(user: User) {
    this.store.push(user);
  }
}

// テスト本体（MySQLゼロ！）
const repo = new InMemoryUserRepository();
const useCase = new GetUserUseCase(repo);
const result = await useCase.execute('user-1');
```

DBなしで**純粋にビジネスロジックだけ**テストできる。これが一番体感でかい。

---

### 🥈 2位：フレームワーク移行が怖くない

例えば Express → Hono に乗り換えるとき：

```
変更が必要な層

┌─────────────────────────────────┐
│  Frameworks & Drivers           │  ← ✅ ここだけ変える
│   ┌─────────────────────────┐   │
│   │  Interface Adapters      │   │  ← Controller少し変える
│   │   ┌─────────────────┐   │   │
│   │   │  Use Cases       │   │   │  ← ✋ 触らない
│   │   │  ┌───────────┐  │   │   │
│   │   │  │  Entities  │  │   │   │  ← ✋ 触らない
│   │   │  └───────────┘  │   │   │
│   │   └─────────────────┘   │   │
│   └─────────────────────────┘   │
└─────────────────────────────────┘
```

ビジネスロジックは**一行も変えなくていい**。

---

### 🥉 3位：MySQL → PostgreSQL 乗り換えが1ファイルで済む

```
変更前                          変更後

IUserRepository (interface)     IUserRepository (interface)
      ▲                               ▲
      │ implements                    │ implements
MySQLUserRepository         PostgreSQLUserRepository  ← これだけ新しく作る
```

UseCase もテストも Entity も**ノータッチ**。

---

## 実際のプロジェクトでどう使われてる？

| プロジェクト規模 | どう使われてるか |
|---|---|
| 大規模サービス（Netflix, Uber級） | フルに全層適用。マイクロサービス間でも同思想 |
| 中規模SaaS | Use Case + Repository interface だけ採用（部分適用）が多い |
| 小規模 | 正直オーバーキルなので薄いMVCで十分なことも |

---

## 「部分適用」が現実では多い

厳密にやると複雑すぎるので、よく見る**現実的な落とし所**はこれ：

```
よく採用される最小セット

Controller
    │
    ▼
UseCase ◀── IRepository (interface)
                  ▲
                  │
           Repository実装（DB詳細）

Entity（Domainロジックはここに集約）
```

DTOを省略したり、Presenterを省いたりするのは全然アリ。

---

## Next.jsで使うとしたら？

```
src/
├── domain/
│   └── user.ts                   ← Entity
├── application/
│   ├── usecases/create-user.ts   ← UseCase
│   └── repositories/i-user.ts   ← Interface
├── infrastructure/
│   └── prisma-user.repository.ts ← Prisma実装
└── app/
    └── api/users/route.ts        ← ここはAdapter層扱い
```

`route.ts` は Controller 相当で、UseCase を呼ぶだけにする。
Prisma の詳細は `infrastructure/` に閉じ込める感じ。

---

一言でまとめると、**「変更やテストのコストが下がる」という恩恵を、プロジェクトが大きくなるほど実感する**アーキテクチャだよ。小さいうちは「なんでこんな複雑に…」ってなるやつ笑

もっと具体的に「このケースだったらどうする？」みたいな相談でも答えられるよ！
