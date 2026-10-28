# 数値型

| 型               | 例                     | 用途      |
| --------------- | --------------------- | ------- |
| `TINYINT`       | `120`                 | 年齢、フラグ  |
| `SMALLINT`      | `32000`               | 小規模カウント |
| `MEDIUMINT`     | `5000000`             | 中規模ID   |
| `INT`           | `123456789`           | 一般的なID  |
| `BIGINT`        | `9223372036854775807` | 大規模ID   |
| `DECIMAL(10,2)` | `1999.99`             | 金額      |
| `FLOAT`         | `3.14`                | 誤差OKな小数 |
| `DOUBLE`        | `12345.6789`          | 精度高め小数  |
| `BOOLEAN`       | `true` / `false`      | ON/OFF  |

```sql
price DECIMAL(10,2)
age TINYINT
is_admin BOOLEAN
```

---

# 文字列型

| 型              | 例            | 用途     |
| -------------- | ------------ | ------ |
| `CHAR(5)`      | `"A1234"`    | 固定コード  |
| `VARCHAR(255)` | `"lvncer"`   | 名前、メール |
| `TEXT`         | `"今日は..."`   | 長文     |
| `LONGTEXT`     | 小説全文         | 超長文    |
| `ENUM`         | `"active"`   | 状態     |
| `SET`          | `"red,blue"` | 複数タグ   |
| `JSON`         | `{"hp":100}` | 設定データ  |

```sql
username VARCHAR(255)
bio TEXT
status ENUM('active', 'banned')
settings JSON
```

---

# 日付・時間型

| 型           | 例                     | 用途   |
| ----------- | --------------------- | ---- |
| `DATE`      | `2026-05-14`          | 誕生日  |
| `TIME`      | `13:45:00`            | 時刻   |
| `DATETIME`  | `2026-05-14 13:45:00` | 投稿日時 |
| `TIMESTAMP` | `2026-05-14 13:45:00` | 更新日時 |
| `YEAR`      | `2026`                | 年    |

```sql
birthday DATE
created_at DATETIME
updated_at TIMESTAMP
```

---

# バイナリ型

| 型          | 例     | 用途     |
| ---------- | ----- | ------ |
| `BLOB`     | 画像データ | バイナリ保存 |
| `LONGBLOB` | 動画    | 巨大データ  |

```sql
image BLOB
```

でも実務だと画像はDBじゃなくてS3とかに置いてURL保存が多い。

---

# GIS系

| 型         | 例              | 用途 |
| --------- | -------------- | -- |
| `POINT`   | `(139.7,35.6)` | 座標 |
| `POLYGON` | 地域範囲           | 地図 |

```sql
location POINT
```

---

# 実際のテーブル例

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  age TINYINT,
  bio TEXT,
  is_admin BOOLEAN DEFAULT false,
  settings JSON,
  created_at DATETIME
);
```

---

# 型選びの感覚

| 迷ったら       | 使う             |
| ---------- | -------------- |
| 整数         | `BIGINT`       |
| 文字列        | `VARCHAR(255)` |
| 長文         | `TEXT`         |
| 金額         | `DECIMAL`      |
| 日時         | `DATETIME`     |
| true/false | `BOOLEAN`      |
| 柔軟データ      | `JSON`         |

---

あと初心者あるあるとして、

```sql
username TEXT
```

にしがちだけど、検索やindex考えると普通は

```sql
username VARCHAR(255)
```

の方がいいこと多い。
TEXTは「本当に長文」のイメージ。

