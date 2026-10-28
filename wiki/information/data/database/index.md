-- 各テーブルのレコードの件数を調べてメモ

| current_dept_emp | 300024
| departments | 9
| dept_emp | 331603
| dept_emp_latest_date | 300024
| dept_manager | 24
| employees | 300024
| salaries | 2844047
| titles | 443308

SELECT count(\*) FROM current_dept_emp;

-- 各テーブルのレコードを 5 件のみ select して結果をメモ
current_dept_emp
SELECT \* FROM current_dept_emp LIMIT 5;
+--------+---------+------------+------------+
| emp_no | dept_no | from_date | to_date |
+--------+---------+------------+------------+
| 10001 | d005 | 1986-06-26 | 9999-01-01 |
| 10002 | d007 | 1996-08-03 | 9999-01-01 |
| 10003 | d004 | 1995-12-03 | 9999-01-01 |
| 10004 | d004 | 1986-12-01 | 9999-01-01 |
| 10005 | d003 | 1989-09-12 | 9999-01-01 |
+--------+---------+------------+------------+

departments
SELECT \* FROM departments LIMIT 5;
+---------+------------------+
| dept_no | dept_name |
+---------+------------------+
| d009 | Customer Service |
| d005 | Development |
| d002 | Finance |
| d003 | Human Resources |
| d001 | Marketing |
+---------+------------------+

dept_emp
SELECT \* FROM dept_emp LIMIT 5;
+--------+---------+------------+------------+
| emp_no | dept_no | from_date | to_date |
+--------+---------+------------+------------+
| 10001 | d005 | 1986-06-26 | 9999-01-01 |
| 10002 | d007 | 1996-08-03 | 9999-01-01 |
| 10003 | d004 | 1995-12-03 | 9999-01-01 |
| 10004 | d004 | 1986-12-01 | 9999-01-01 |
| 10005 | d003 | 1989-09-12 | 9999-01-01 |
+--------+---------+------------+------------+

dept_emp_latest_date
SELECT \* FROM dept_emp_latest_date LIMIT 5;
+--------+------------+------------+
| emp_no | from_date | to_date |
+--------+------------+------------+
| 10001 | 1986-06-26 | 9999-01-01 |
| 10002 | 1996-08-03 | 9999-01-01 |
| 10003 | 1995-12-03 | 9999-01-01 |
| 10004 | 1986-12-01 | 9999-01-01 |
| 10005 | 1989-09-12 | 9999-01-01 |
+--------+------------+------------+

dept_manager
SELECT \* FROM dept_manager LIMIT 5;
+--------+---------+------------+------------+
| emp_no | dept_no | from_date | to_date |
+--------+---------+------------+------------+
| 110022 | d001 | 1985-01-01 | 1991-10-01 |
| 110039 | d001 | 1991-10-01 | 9999-01-01 |
| 110085 | d002 | 1985-01-01 | 1989-12-17 |
| 110114 | d002 | 1989-12-17 | 9999-01-01 |
| 110183 | d003 | 1985-01-01 | 1992-03-21 |
+--------+---------+------------+------------+

employees
SELECT \* FROM employees LIMIT 5;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date |
+--------+------------+------------+-----------+--------+------------+
| 10001 | 1953-09-02 | Georgi | Facello | M | 1986-06-26 |
| 10002 | 1964-06-02 | Bezalel | Simmel | F | 1985-11-21 |
| 10003 | 1959-12-03 | Parto | Bamford | M | 1986-08-28 |
| 10004 | 1954-05-01 | Chirstian | Koblick | M | 1986-12-01 |
| 10005 | 1955-01-21 | Kyoichi | Maliniak | M | 1989-09-12 |
+--------+------------+------------+-----------+--------+------------+

salaries
SELECT \* FROM salaries LIMIT 5;
+--------+--------+------------+------------+
| emp_no | salary | from_date | to_date |
+--------+--------+------------+------------+
| 10001 | 60117 | 1986-06-26 | 1987-06-26 |
| 10001 | 62102 | 1987-06-26 | 1988-06-25 |
| 10001 | 66074 | 1988-06-25 | 1989-06-25 |
| 10001 | 66596 | 1989-06-25 | 1990-06-25 |
| 10001 | 66961 | 1990-06-25 | 1991-06-25 |
+--------+--------+------------+------------+

titles
SELECT \* FROM titles LIMIT 5;
+--------+-----------------+------------+------------+
| emp_no | title | from_date | to_date |
+--------+-----------------+------------+------------+
| 10001 | Senior Engineer | 1986-06-26 | 9999-01-01 |
| 10002 | Staff | 1996-08-03 | 9999-01-01 |
| 10003 | Senior Engineer | 1995-12-03 | 9999-01-01 |
| 10004 | Engineer | 1986-12-01 | 1995-12-01 |
| 10004 | Senior Engineer | 1995-12-01 | 9999-01-01 |
+--------+-----------------+------------+------------+

-- 各テーブルの構造をメモ
current_dept_emp
DESC current_dept_emp;
+-----------+---------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+-----------+---------+------+-----+---------+-------+
| emp_no | int | NO | | NULL | |
| dept_no | char(4) | NO | | NULL | |
| from_date | date | YES | | NULL | |
| to_date | date | YES | | NULL | |
+-----------+---------+------+-----+---------+-------+

departments
DESC departments;
+-----------+-------------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| dept_no | char(4) | NO | PRI | NULL | |
| dept_name | varchar(40) | NO | UNI | NULL | |
+-----------+-------------+------+-----+---------+-------+

dept_emp
DESC dept_emp;
+-----------+---------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+-----------+---------+------+-----+---------+-------+
| emp_no | int | NO | PRI | NULL | |
| dept_no | char(4) | NO | PRI | NULL | |
| from_date | date | NO | | NULL | |
| to_date | date | NO | | NULL | |
+-----------+---------+------+-----+---------+-------+

dept_emp_latest_date
DESC dept_emp_latest_date;
+-----------+------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+-----------+------+------+-----+---------+-------+
| emp_no | int | NO | | NULL | |
| from_date | date | YES | | NULL | |
| to_date | date | YES | | NULL | |
+-----------+------+------+-----+---------+-------+

dept_manager
DESC dept_manager;
+-----------+---------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+-----------+---------+------+-----+---------+-------+
| emp_no | int | NO | PRI | NULL | |
| dept_no | char(4) | NO | PRI | NULL | |
| from_date | date | NO | | NULL | |
| to_date | date | NO | | NULL | |
+-----------+---------+------+-----+---------+-------+

employees
DESC employees;
+------------+---------------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+------------+---------------+------+-----+---------+-------+
| emp_no | int | NO | PRI | NULL | |
| birth_date | date | NO | | NULL | |
| first_name | varchar(14) | NO | | NULL | |
| last_name | varchar(16) | NO | | NULL | |
| gender | enum('M','F') | NO | | NULL | |
| hire_date | date | NO | | NULL | |
+------------+---------------+------+-----+---------+-------+

salaries
DESC salaries;
+-----------+------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+-----------+------+------+-----+---------+-------+
| emp_no | int | NO | PRI | NULL | |
| salary | int | NO | | NULL | |
| from_date | date | NO | PRI | NULL | |
| to_date | date | NO | | NULL | |
+-----------+------+------+-----+---------+-------+

titles
DESC titles;
+-----------+-------------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| emp_no | int | NO | PRI | NULL | |
| title | varchar(50) | NO | PRI | NULL | |
| from_date | date | NO | PRI | NULL | |
| to_date | date | YES | | NULL | |
+-----------+-------------+------+-----+---------+-------+

---

どうやってデータを探すのかを分析するツール
EXPLAIN クエリを実行する前の計画(実行計画)
EXPLAIN ANALYZE 実際にクエリを実行した実行ステップ

-- 主キーの SELECT

```sql
SELECT * FROM employees WHERE emp_no = 74762;
```

0.00 sec

```sql
EXPLAIN ANALYZE SELECT * FROM employees WHERE emp_no = 74762;
```

```bash
-> Rows fetched before execution (cost=0..0 rows=1) (actual time=100e-6..100e-6 rows=1 loops=1)
```

実行する前にレコードが特定できた(インデックスを使った)

-- 主キー以外の SELECT

```sql
SELECT * FROM employees WHERE first_name = 'Kyoichi';
```

0.08 sec

```sql
EXPLAIN ANALYZE SELECT * FROM employees WHERE first_name = 'Kyoichi';
```

```bash
-> Filter: (employees.first_name = 'Kyoichi') (cost=30148 rows=29916) (actual time=0.259..62 rows=251 loops=1)
-> Table scan on employees (cost=30148 rows=299157) (actual time=0.253..51.8 rows=300024 loops=1)
```

Table scan = テーブルを最初から最後まで 1 行ずつ検索
Fitler = 条件に合うかチェック
30 万件をすべて条件に合うかどうかをチェックした

-- テーブルに設定されている INDEX を表示

```sql
SHOW INDEX FROM employees;
```

```bash
+-----------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| Table | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment | Visible | Expression |
+-----------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| employees | 0 | PRIMARY | 1 | emp_no | A | 299157 | NULL | NULL | | BTREE | | | YES | NULL |
+-----------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
```

※ 主キーを設定すると自動的にインデックスが作成される

INDEX を作成する

```sql
CREATE INDEX インデックス名 ON テーブル名(カラム名)
```

employees テーブルの first_name にインデックスを作成

```sql
CREATE INDEX idx_first_name ON employees(first_name);
```

INDEX 設定後

```sql
EXPLAIN ANALYZE SELECT * FROM employees WHERE first_name = 'Kyoichi';
```

```bash
-> Index lookup on employees using idx_first_name (first_name='Kyoichi') (cost=87.8 rows=251) (actual time=0.0736..0.425 rows=251 loops=1)
```

```sql
SELECT * FROM employees WHERE first_name = 'Kyoichi';
```

0.00 sec

0.08 sec → 0.00 sec

-- 複合条件

```sql
SELECT * FROM employees WHERE first_name = 'Kyoichi' AND last_name = 'Cools';
```

0.00 sec

```sql
EXPLAIN ANALYZE SELECT * FROM employees WHERE first_name = 'Kyoichi' AND last_name = 'Cools';
```

```bash
-> Filter: (employees.last_name = 'Cools') (cost=65.3 rows=25.1) (actual time=0.52..0.648 rows=1 loops=1)
-> Index lookup on employees using idx_first_name (first_name='Kyoichi') (cost=65.3 rows=251) (actual time=0.116..0.63 rows=251 loops=1)
```

インデックススキャンで 251 件に絞って、そこから Cools を探した

```sql
CREATE INDEX idx_last_name ON employees(last_name);
```

```sql
EXPLAIN ANALYZE SELECT * FROM employees WHERE first_name = 'Kyoichi' AND last_name = 'Cools';
```

```bash
-> Filter: ((employees.last_name = 'Cools') and (employees.first_name = 'Kyoichi')) (cost=5.62 rows=1) (actual time=0.924..1.02 rows=1 loops=1)
-> Intersect rows sorted by row ID (cost=5.62 rows=1) (actual time=0.92..1.01 rows=1 loops=1)
-> Index range scan on employees using idx_last_name over (last_name = 'Cools') (cost=2.64 rows=195) (actual time=0.564..0.704 rows=195 loops=1)
-> Index range scan on employees using idx_first_name over (first_name = 'Kyoichi') (cost=2.88 rows=251) (actual time=0.0565..0.243 rows=245 loops=1)
```

first_name が Kyoichi のレコードを取得(251 件)、last_name が Cools のレコードを取得(195 件)、
この 2 つの結果を突き合わせて、first_name が Kyoichi、last_name が Cools のレコードをフィルタ

複合インデックス

```sql
CREATE INDEX idx_first_name_last_name ON employees(first_name, last_name);
```

```bash
-> Index lookup on employees using idx_first_name_last_name (first_name='Kyoichi', last_name='Cools') (cost=0.35 rows=1) (actual time=0.0218..0.023 rows=1 loops=1)
```

インデックスから条件に合うものを 1 件特定する

つまり、複数の条件の場合は複合インデックスが効率よい

-- インデックスの削除

```sql
DROP INDEX インデックス名 ON テーブル名
```

```sql
DROP INDEX idx_last_name ON employees;
```

-- LIKE(パターン,あいまい)検索

```sql
SELECT * FROM employees WHERE first_name LIKE 'Ky%'; -- Ky で始まる(前方一致)
```

0.00 sec

```sql
EXPLAIN ANALYZE SELECT * FROM employees WHERE first_name LIKE 'Ky%';
```

```bash
-> Index range scan on employees using idx_first_name over ('Ky' <= first_name <= 'Ky????????????????????????????????????????????????'), with index condition: (employees.first_name like 'Ky%') (cost=113 rows=251) (actual time=0.0858..0.441 rows=251 loops=1)
```

idex_first_name のインデックスを使って範囲スキャンで Ky から始まる文字列を検索 (インデックスは使っている)

```sql
SELECT * FROM employees WHERE first_name LIKE '%oi%';
```

0.06 sec

```sql
EXPLAIN ANALYZE SELECT * FROM employees WHERE first_name LIKE '%oi%'; -- oi が含まれる(部分一致、中間一致)
```

```bash
-> Filter: (employees.first_name like '%oi%') (cost=30148 rows=33236) (actual time=0.15..68.4 rows=1969 loops=1)
-> Table scan on employees (cost=30148 rows=299157) (actual time=0.146..51.4 rows=300024 loops=1)
```

Table Scan = テーブルを最初から最後まで全レコードチェック(300024)
そこから Filter = 条件に合うかどうか
インデックスが使われていない！

```sql
SELECT * FROM employees WHERE first_name LIKE '%ichi'; -- ichi で終わる(後方一致
```

0.07 sec

```sql
EXPLAIN ANALYZE SELECT * FROM employees WHERE first_name LIKE '%ichi';
```

```bash
-> Filter: (employees.first_name like '%ichi') (cost=30148 rows=33236) (actual time=0.141..69.4 rows=2183 loops=1)
-> Table scan on employees (cost=30148 rows=299157) (actual time=0.138..51.5 rows=300024 loops=1)
```

インデックスは先頭から見ていくので、途中や最後にあるものを探せない
前方一致 = インデックスが使われる
部分一致 = インデックスが使えない(キーワード検索)
後方一致 = インデックスが使えない

キーワード検索を速くするには全文検索を使うことが 1 つの方法

---

## ORDER BY

```sql
SELECT * FROM employees ORDER BY hire_date LIMIT 10;
```

10 rows in set (0.07 sec)

```sql
EXPLAIN ANALYZE SELECT * FROM employees ORDER BY hire_date LIMIT 10;
```

```bash
-> Limit: 10 row(s) (cost=30148 rows=10) (actual time=70.9..70.9 rows=10 loops=1)
-> Sort: employees.hire_date, limit input to 10 row(s) per chunk (cost=30148 rows=299157) (actual time=70.9..70.9 rows=10 loops=1)
-> Table scan on employees (cost=30148 rows=299157) (actual time=0.153..51.9 rows=300024 loops=1)
```

Table Scan(テーブル全体をスキャン)して、ソート per chunk(部分的にソート)
上から 10 件を取り出す

hire_date に INDEX を設定

```sql
CREATE INDEX idx_hire_date ON employees(hire_date);
```

```sql
SELECT * FROM employees ORDER BY hire_date LIMIT 10;
```

10 rows in set (0.00 sec)

```sql
EXPLAIN ANALYZE SELECT * FROM employees ORDER BY hire_date LIMIT 10;
```

```bash
-> Limit: 10 row(s) (cost=0.0078 rows=10) (actual time=0.0421..0.0442 rows=10 loops=1)
-> Index scan on employees using idx_hire_date (cost=0.0078 rows=10) (actual time=0.0413..0.0429 rows=10 loops=1)
```

Index scan をして対象の 10 件を取得

(問題 1)

```sql
SELECT * FROM employees ORDER BY last_name, hire_date LIMIT 10;
```

10 rows in set (0.07 sec)
スピードを速くするには？

```sql
EXPLAIN ANALYZE SELECT * FROM employees ORDER BY last_name, hire_date LIMIT 10;
```

```bash
-> Limit: 10 row(s) (cost=30148 rows=10) (actual time=82.3..82.3 rows=10 loops=1)
-> Sort: employees.last_name, employees.hire_date, limit input to 10 row(s) per chunk (cost=30148 rows=299157) (actual time=82.3..82.3 rows=10 loops=1)
-> Table scan on employees (cost=30148 rows=299157) (actual time=0.158..53.6 rows=300024 loops=1)
```

```sql
CREATE INDEX idx_last_name_hire_date ON employees(last_name, hire_date);
```

```sql
SELECT * FROM employees ORDER BY last_name, hire_date LIMIT 10;
```

(0.00 sec)

```bash
-> Limit: 10 row(s) (cost=0.0078 rows=10) (actual time=0.048..0.0504 rows=10 loops=1)
-> Index scan on employees using idx_last_name_hire_date (cost=0.0078 rows=10) (actual time=0.0473..0.0492 rows=10 loops=1)
```

--- salaries テーブル

給与(salary)が 60000 から 100000 までを SELECT したい。速くするには？

```sql
SELECT * FROM salaries WHERE salary BETWEEN 60000 AND 100000;
```

```bash
EXPLAIN ANALYZE SELECT * FROM salaries WHERE salary BETWEEN 60000 AND 100000;
| -> Filter: (salaries.salary between 60000 and 100000) (cost=287946 rows=1.42e+6) (actual time=2.88..607 rows=1.4e+6 loops=1)
-> Table scan on salaries (cost=287946 rows=2.84e+6) (actual time=2.88..510 rows=2.84e+6 loops=1)
```

```sql
CREATE INDEX idx_salary ON salaries(salary);
```

```bash
EXPLAIN ANALYZE SELECT * FROM salaries WHERE salary BETWEEN 60000 AND 100000;
| -> Filter: (salaries.salary between 60000 and 100000) (cost=287946 rows=1.42e+6) (actual time=2.88..607 rows=1.4e+6 loops=1)
-> Table scan on salaries (cost=287946 rows=2.84e+6) (actual time=2.88..510 rows=2.84e+6 loops=1)
```

index を作成しても Table scan。つまり index が使われていない。

```sql
SELECT * FROM salaries WHERE salary BETWEEN 60000 AND 65000;
```

```bash
EXPLAIN ANALYZE SELECT * FROM salaries WHERE salary BETWEEN 60000 AND 65000;
```

SELECT に時間がかかるもの = スロークエリー (slow query)

C:\ProgramData\MySQL\MySQL Server 8.0
my.ini (設定ファイル)

slow-query-log=1
→ スロークエリーログを有効(1)/無効(0)

slow_query_log_file="SIW-CLASS-241-slow.log"
→ スロークエリーログファイル

long_query_time=10
→ スロークエリーとする実行時間(秒)

my.ini を変更したらサービス(プロセス/デーモン)再起動
(起動時にしか読み込まない)

---

対象の行数は？

```sql
SELECT COUNT(_) FROM salaries WHERE salary BETWEEN 60000 AND 100000;
```

```bash
+----------+
| COUNT(_) |
+----------+
| 1401319  |
+----------+
```

全件

```sql
SELECT COUNT(_) FROM salaries;
```

```bash
+----------+
| COUNT(_) |
+----------+
| 2844047  |
+----------+
```

```bash
EXPLAIN ANALYZE SELECT \* FROM salaries WHERE salary BETWEEN 60000 AND 100000;
| -> Filter: (salaries.salary between 60000 and 100000) (cost=287156 rows=1.42e+6) (actual time=6.01..645 rows=1.4e+6 loops=1)
-> Table scan on salaries (cost=287156 rows=2.84e+6) (actual time=6..548 rows=2.84e+6 loops=1)
```

約 50%のデータを取ってくるには index より table scan だとオプティマイザが判断した
(index を使っても効果が薄いと判断した)

範囲が狭い(対象の件数が少な)ければインデックスを使う可能性があがる

```sql
SELECT COUNT(_) FROM salaries WHERE salary BETWEEN 60000 AND 65000;
```

```bash
+----------+
| COUNT(_) |
+----------+
| 312635   |
+----------+
```

```bash
EXPLAIN ANALYZE SELECT _ FROM salaries WHERE salary BETWEEN 60000 AND 65000;
| -> Index range scan on salaries using idx_salary over (60000 <= salary <= 65000), with index condition: (salaries.salary between 60000 and 65000) (cost=298911 rows=606230) (actual time=148..7834 rows=312635 loops=1)
```

→ salary が 60000 から 65000 までのレコードはインデックスを使っている(インデックスファイルをみる)
しかし、select \_(すべてのカラム)このカラムの値を取得(データファイル)するのに 30 万件取ってこないといけない
emp_no, from_date, to_date を取ってくるのに時間がかかっている

```sql
SELECT * FROM salaries WHERE salary BETWEEN 60000 AND 65000;
```

(6.91 sec)

カバリングインデックス

```sql
CREATE INDEX idx_salary_covering ON salaries(salary, emp_no, from_date, to_date);
```

→ インデックスに WHERE の条件だけではなくて、\*(取得するカラム)まで含めて複合インデックスにする
インデックスファイルだけみればよく、データファイルにアクセスする必要がない(ディスクの I/O が減る)

```sql
SELECT * FROM salaries WHERE salary BETWEEN 60000 AND 65000;
```

(0.12 sec)

```bash
EXPLAIN ANALYZE SELECT * FROM salaries WHERE salary BETWEEN 60000 AND 65000;
| -> Filter: (salaries.salary between 60000 and 65000) (cost=130135 rows=642456) (actual time=0.722..50.7 rows=312635 loops=1)
-> Covering index range scan on salaries using idx_salary_covering over (60000 <= salary <= 65000) (cost=130135 rows=642456) (actual time=0.721..38.6 rows=312635 loops=1)
```

カバリングインデックスのみで必要なデータが取得できるため速い

```sql
EXPLAIN ANALYZE SELECT * FROM salaries WHERE salary BETWEEN 60000 AND 100000;
```

```bash
| -> Filter: (salaries.salary between 60000 and 100000) (cost=287473 rows=1.42e+6) (actual time=0.667..224 rows=1.4e+6 loops=1)
-> Covering index range scan on salaries using idx_salary_covering over (60000 <= salary <= 100000) (cost=287473 rows=1.42e+6) (actual time=0.665..171 rows=1.4e+6 loops=1)
```

---

## JOIN

```sql
SELECT * FROM employees AS e
INNER JOIN
    dept_emp AS d
ON
    e.emp_no = d.emp_no
WHERE
    d.dept_no = 'd005';
```

85707 rows in set (0.30 sec)

```sql
EXPLAIN ANALYZE
SELECT * FROM employees AS e
INNER JOIN
    dept_emp AS d
ON
    e.emp_no = d.emp_no
WHERE
    d.dept_no = 'd005';
```

```bash
| -> Nested loop inner join (cost=67177 rows=148054) (actual time=3.36..153 rows=85707 loops=1)
-> Index lookup on d using dept_no (dept_no='d005'), with index condition: (d.dept_no = 'd005') (cost=15358 rows=148054) (actual time=3.24..82.4 rows=85707 loops=1)
-> Single-row index lookup on e using PRIMARY (emp_no=d.emp_no) (cost=0.25 rows=1) (actual time=731e-6..744e-6 rows=1 loops=85707)
```

Nested Loop(ネストしたループ)で 2 つのテーブルを結合する。
結合条件のカラムを検索して一致するレコードを取得する必要がある。
d(dept_emp)のテーブルに対して index で検索をする
e(employees)のテーブルに対して PRIMARY インデックスで検索する。
→ d のテーブルから dept_no = 'd005'の行を取り出して、それに対応するレコードを employees で探す

d(demp_emp)に対して INDEX を作成

```sql
CREATE INDEX idx_dept_emp_dept_no_emp_no ON dept_emp(dept_no, emp_no);
```

→ WHERE 句で絞込をしてから JOIN の結合条件の評価をする
(結合する前に絞込をすることで結合するレコード数を減らす)

1. WHERE の評価
2. JOIN の評価
   複合インデックスの順番は WHERE 句のカラム, JOIN のカラム

```bash
| -> Nested loop inner join (cost=75060 rows=165571) (actual time=3.33..152 rows=85707 loops=1)
-> Index lookup on d using idx_dept_emp_dept_no_emp_no (dept_no='d005'), with index condition: (d.dept_no = 'd005') (cost=17110 rows=165571) (actual time=3.32..85.4 rows=85707 loops=1)
-> Single-row index lookup on e using PRIMARY (emp_no=d.emp_no) (cost=0.25 rows=1) (actual time=683e-6..696e-6 rows=1 loops=85707)
```

idx_dept_emp_dept_no_emp_no で作成した index を使って検索を行っている

```sql
SELECT * FROM employees AS e INNER JOIN dept_emp AS d
ON e.emp_no = d.emp_no WHERE d.dept_no = 'd005';
```

85707 rows in set (0.16 sec)

employees については、結合条件が主キーなので自分で INDEX を作る必要がない(自動的に作成されるから)

問題 2
JOIN の SQL 文にカバリングインデックスを作成してみる

```sql
CREATE INDEX idx_dept_emp_covering ON dept_emp(dept_no, emp_no, from_date, to_date);
```

→ 結果、カバリングインデックスは使ってくれない

不要な(効果がない)INDEX は削除する
→ レコードの登録、更新、削除の際に INDEX も変更が入るのでパフォーマンス悪化の原因になる

```sql
DROP INDEX idx_dept_emp_covering ON dept_emp;
```

INDEX の効果の確認
・EXPLAIN で動作の見る
・実行時間の測定 (できれば複数回実行して平均を取る)

---

INDEX の状態を見る

```sql
SHOW TABLE STATUS LIKE 'テーブル名';
```

```bash
SHOW TABLE STATUS LIKE 'employees';
```

```bash
+-----------+--------+---------+------------+--------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
| Name      | Engine | Version | Row_format | Rows   | Avg_row_length | Data_length | Max_data_length | Index_length | Data_free | Auto_increment | Create_time | Update_time | Check_time | Collation | Checksum | Create_options | Comment |
+-----------+--------+---------+------------+--------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
| employees | InnoDB | 10      | Dynamic    | 299157 | 50             | 15220736    | 0               | 0            | 0         | NULL           | 2025-07-08 10:58:34 | NULL        | NULL       | utf8mb4_0900_ai_ci | NULL     |                |         |
+-----------+--------+---------+------------+--------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
```

1 row in set (0.03 sec)

・Data_free
使っていない領域(インデックスやデータの断片化の可能性があるところ)

・Index_length
インデックス全体のサイズ

断片化率 = data_free / index_length

MySQL 8.0 以上 (インデックスの状態)

```sql
SELECT * FROM mysql.innodb_index_stats WHERE table_name = 'employees';
```

employees PRIMARY

[stat_name:統計情報名]
n_diff_pfx01 (プレフックスレベル)
n_leaf_pages (インデックスのリーフページ数) サイズ
size (全ページ数)

stat_value: 統計値
sample_size: 統計を取得するために使われたサンプリングのサイズ

```sql
SELECT * FROM mysql.innodb_index_stats WHERE table_name = 'employees';
```

```bash
+---------------+------------+--------------------------+---------------------+--------------+------------+-------------+-----------------------------------+
| database_name | table_name | index_name               | last_update         | stat_name    | stat_value | sample_size | stat_description                  |
+---------------+------------+--------------------------+---------------------+--------------+------------+-------------+-----------------------------------+
| employees     | employees  | PRIMARY                  | 2025-07-08 10:58:34 | n_diff_pfx01 | 299157     | 20          | emp_no                              |
| employees     | employees  | PRIMARY                  | 2025-07-08 10:58:34 | n_leaf_pages | 886        | NULL        | Number of leaf pages in the index   |
| employees     | employees  | PRIMARY                  | 2025-07-08 10:58:34 | size         | 929        | NULL        | Number of pages in the index        |
| employees     | employees  | idx_first_name           | 2025-07-08 10:58:34 | n_diff_pfx01 | 1236       | 20          | first_name                          |
```

インデックスの再編成するコマンド

```sql
OPTIMIZE TABLE employees;
```

```sql
SELECT * FROM mysql.innodb_index_stats WHERE table_name = 'employees';
```

```bash
+---------------+------------+--------------------------+---------------------+--------------+------------+-------------+-----------------------------------+
| database_name | table_name | index_name               | last_update         | stat_name    | stat_value | sample_size | stat_description                  |
+---------------+------------+--------------------------+---------------------+--------------+------------+-------------+-----------------------------------+
| employees     | employees  | PRIMARY                  | 2025-07-22 09:46:48 | n_diff_pfx01 | 299556     | 20          | emp_no                              |
| employees     | employees  | PRIMARY                  | 2025-07-22 09:46:48 | n_leaf_pages | 886        | NULL        | Number of leaf pages in the index   |
| employees     | employees  | PRIMARY                  | 2025-07-22 09:46:48 | size         | 1057       | NULL        | Number of pages in the index        |
| employees     | employees  | idx_first_name           | 2025-07-22 09:46:48 | n_diff_pfx01 | 1236       | 20          | first_name                          |
```

データの更新

1. UPDATE
2. DELETE/INSERT

---

[パーティション]

・パーティションなし

```sql
show create table titles;
```

```bash
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table | Create Table |
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| titles | CREATE TABLE `titles` (
`emp_no` int NOT NULL,
`title` varchar(50) NOT NULL,
`from_date` date NOT NULL,
`to_date` date DEFAULT NULL,
PRIMARY KEY (`emp_no`,`title`,`from_date`),
CONSTRAINT `titles_ibfk_1` FOREIGN KEY (`emp_no`) REFERENCES `employees` (`emp_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

```sql
show table status like 'titles';
```

```bash
+--------+--------+---------+------------+--------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
| Name | Engine | Version | Row_format | Rows | Avg_row_length | Data_length | Max_data_length | Index_length | Data_free | Auto_increment | Create_time | Update_time | Check_time | Collation | Checksum | Create_options | Comment |
+--------+--------+---------+------------+--------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
| titles | InnoDB | 10 | Dynamic | 442010 | 46 | 20512768 | 0 | 0 | 4194304 | NULL | 2025-07-01 09:53:53 | NULL | NULL | utf8mb4_0900_ai_ci | NULL | | |
+--------+--------+---------+------------+--------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+-------------+------------+--------------------+----------+----------------+---------+
1 row in set (0.00 sec)
```

・パーティションあり

```sql
show create table titles;
```

```bash
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table | Create Table |
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| titles | CREATE TABLE `titles` (
`emp_no` int NOT NULL,
`title` varchar(50) NOT NULL,
`from_date` date NOT NULL,
`to_date` date DEFAULT NULL,
PRIMARY KEY (`emp_no`,`title`,`from_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4*0900_ai_ci
/*!50500 PARTITION BY RANGE COLUMNS(from*date)
(PARTITION p01 VALUES LESS THAN ('1985-12-31') ENGINE = InnoDB,
PARTITION p02 VALUES LESS THAN ('1986-12-31') ENGINE = InnoDB,
PARTITION p03 VALUES LESS THAN ('1987-12-31') ENGINE = InnoDB,
PARTITION p04 VALUES LESS THAN ('1988-12-31') ENGINE = InnoDB,
PARTITION p05 VALUES LESS THAN ('1989-12-31') ENGINE = InnoDB,
PARTITION p06 VALUES LESS THAN ('1990-12-31') ENGINE = InnoDB,
PARTITION p07 VALUES LESS THAN ('1991-12-31') ENGINE = InnoDB,
PARTITION p08 VALUES LESS THAN ('1992-12-31') ENGINE = InnoDB,
PARTITION p09 VALUES LESS THAN ('1993-12-31') ENGINE = InnoDB,
PARTITION p10 VALUES LESS THAN ('1994-12-31') ENGINE = InnoDB,
PARTITION p11 VALUES LESS THAN ('1995-12-31') ENGINE = InnoDB,
PARTITION p12 VALUES LESS THAN ('1996-12-31') ENGINE = InnoDB,
PARTITION p13 VALUES LESS THAN ('1997-12-31') ENGINE = InnoDB,
PARTITION p14 VALUES LESS THAN ('1998-12-31') ENGINE = InnoDB,
PARTITION p15 VALUES LESS THAN ('1999-12-31') ENGINE = InnoDB,
PARTITION p16 VALUES LESS THAN ('2000-12-31') ENGINE = InnoDB,
PARTITION p17 VALUES LESS THAN ('2001-12-31') ENGINE = InnoDB,
PARTITION p18 VALUES LESS THAN ('2002-12-31') ENGINE = InnoDB,
PARTITION p19 VALUES LESS THAN (MAXVALUE) ENGINE = InnoDB) */ |
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

```sql
show table status like 'titles';
```

```bash
+--------+--------+---------+------------+--------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+---------------------+------------+--------------------+----------+----------------+---------+
| Name | Engine | Version | Row_format | Rows | Avg_row_length | Data_length | Max_data_length | Index_length | Data_free | Auto_increment | Create_time | Update_time | Check_time | Collation | Checksum | Create_options | Comment |
+--------+--------+---------+------------+--------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+---------------------+------------+--------------------+----------+----------------+---------+
| titles | InnoDB | 10 | Dynamic | 440804 | 62 | 27426816 | 0 | 0 | 71303168 | NULL | 2025-07-22 10:33:35 | 2025-07-22 10:33:42 | NULL | utf8mb4_0900_ai_ci | NULL | partitioned | |
+--------+--------+---------+------------+--------+----------------+-------------+-----------------+--------------+-----------+----------------+---------------------+---------------------+------------+--------------------+----------+----------------+---------+
1 row in set (0.00 sec)
```

パーティションを確認する SQL

```sql
SELECT * FROM titles WHERE from_date = '1986-01-16';
```

パーティションなし

```sql
SELECT * FROM titles WHERE from_date = '1986-01-16';
```

```bash
+--------+--------------------+------------+------------+
| emp_no | title | from_date | to_date |
+--------+--------------------+------------+------------+
| 10314 | Staff | 1986-01-16 | 1994-01-16 |
| 10384 | Staff | 1986-01-16 | 1991-01-16 |
| 21986 | Engineer | 1986-01-16 | 1991-01-16 |
| 22384 | Engineer | 1986-01-16 | 1992-01-16 |
| 25923 | Engineer | 1986-01-16 | 1995-01-16 |
～～～～～
59 rows in set (0.09 sec)
```

```sql
select count(_) from titles;
```

```bash
+----------+
| count(_) |
+----------+
| 443308   |
+----------+
```

```sql
EXPLAIN SELECT * FROM titles WHERE from_date = '1986-01-16';
```

```bash
+----+-------------+--------+------------+------+---------------+------+---------+------+--------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key | key_len | ref | rows | filtered | Extra |
+----+-------------+--------+------------+------+---------------+------+---------+------+--------+----------+-------------+
| 1 | SIMPLE | titles | NULL | ALL | NULL | NULL | NULL | NULL | 442010 | 10.00 | Using where |
+----+-------------+--------+------------+------+---------------+------+---------+------+--------+----------+-------------+
1 row in set, 1 warning (0.00 sec)
```

partitions → NULL(パーティションなし)
rows → 対象行数:442010

パーティションあり

```sql
SELECT * FROM titles WHERE from_date = '1986-01-16';
```

```bash
+--------+----------+------------+------------+
| emp_no | title    | from_date  | to_date    |
+--------+----------+------------+------------+
| 10314  | Staff    | 1986-01-16 | 1994-01-16 |
| 10384  | Staff    | 1986-01-16 | 1991-01-16 |
| 21986  | Engineer | 1986-01-16 | 1991-01-16 |
| 22384  | Engineer | 1986-01-16 | 1992-01-16 |
| 25923  | Engineer | 1986-01-16 | 1995-01-16 |
+--------+----------+------------+------------+

59 rows in set (0.00 sec)
```

```sql
select count(_) from titles where from_date between '1986-01-1' and '1986-12-31';
```

```bash
+----------+
| count(_) |
+----------+
| 19878    |
+----------+
```

```sql
EXPLAIN SELECT _ FROM titles WHERE from_date = '1986-01-16';
```

```bash
+----+-------------+--------+------------+------+---------------+------+---------+------+-------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key | key_len | ref | rows | filtered | Extra |
+----+-------------+--------+------------+------+---------------+------+---------+------+-------+----------+-------------+
| 1 | SIMPLE | titles | p02 | ALL | NULL | NULL | NULL | NULL | 19891 | 10.00 | Using where |
+----+-------------+--------+------------+------+---------------+------+---------+------+-------+----------+-------------+
1 row in set, 1 warning (0.00 sec)
```

partitions → p02
rows → 対象件数:19891

---

オンメモリ
MYSQL の場合

ENGINE=MEMORY (テーブルごとに使用)
→ メモリ上にデータが乗る、トランザクションが使えない、基本的に読み取り専用、キャッシュ

--

インデックスの削除

```sql
DROP INDEX idx_salary ON salaries;
DROP INDEX idx_salary_covering ON salaries;
DROP INDEX idx_first_name ON employees;
DROP INDEX idx_first_name_last_name ON employees;
DROP INDEX idx_hire_date ON employees;
DROP INDEX idx_last_name_hire_date ON employees;
```

---

## 演習問題

INDEX 設定前と設定後がわかるようにしてください。

1. 以下の SQL のパフォーマンスを改善せよ

   ```sql
   SELECT * FROM employees WHERE birth_date BETWEEN '1960-01-1' AND '1969-12-31';
   ```

2. 以下の SQL のパフォーマンスを改善せよ

   ```sql
   SELECT * FROM titles WHERE title = 'Senior Engineer';
   ```

3. 以下の SQL のパフォーマンスを改善せよ

   ```sql
   SELECT e.first_name, e.last_name, d.dept_no
   FROM employees AS e INNER JOIN dept_emp AS d ON e.emp_no = d.emp_no
   WHERE d.dept_no = 'd003';
   ```

4. 以下の SQL にインデックスを設定してもインデックスが使われない理由は何か。
   根拠とともに示せ。

   ```sql
   SELECT COUNT(*) FROM employees WHERE gender = 'F';
   ```

-- ▼ 演習問題　解答例

1. 問題

   ```sql
   SELECT * FROM employees WHERE birth_date BETWEEN '1960-01-1' AND '1969-12-31';
   ```

   ```bash
   117138 rows in set (0.189 sec)
   ```

   ```sql
   EXPLAIN ANALYZE SELECT * FROM employees WHERE birth_date BETWEEN '1960-01-1' AND '1969-12-31';
   ```

   ```bash
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | EXPLAIN                                                                                                                                                                                                                                              |
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | -> Filter: (employees.birth_date between '1960-01-1' and '1969-12-31')  (cost=30207 rows=33266) (actual time=0.709..148 rows=117138 loops=1)
       -> Table scan on employees  (cost=30207 rows=299423) (actual time=0.699..86.8 rows=300024 loops=1)
   |
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   1 row in set (0.163 sec)
   ```

   ```sql
   CREATE INDEX
      idx_birth_cover
   ON employees
      (birth_date,
       emp_no,
       first_name,
       last_name,
       gender,
       hire_date);
   ```

   ```bash
   +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | EXPLAIN                                                                                                                                                                                                                                                                                                                                       |
   +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | -> Filter: (employees.birth_date between '1960-01-1' and '1969-12-31')  (cost=32481 rows=149711) (actual time=0.436..85.7 rows=117138 loops=1)
       -> Covering index range scan on employees using idx_birth_cover over ('1960-01-01' <= birth_date <= '1969-12-31')  (cost=32481 rows=149711) (actual time=0.433..51.5 rows=117138 loops=1)
   |
   +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

   1 row in set (0.100 sec)
   ```

2. 問題

   ```sql
   SELECT * FROM titles WHERE title = 'Senior Engineer';
   ```

   97750 rows in set (0.150 sec)

   ```bash
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | EXPLAIN                                                                                                                                                                                                                |
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | -> Filter: (titles.title = 'Senior Engineer')  (cost=44556 rows=44243) (actual time=0.427..144 rows=97750 loops=1)
    -> Table scan on titles  (cost=44556 rows=442426) (actual time=0.422..101 rows=443308 loops=1)
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   ```

   1 row in set (0.151 sec)

   ```sql
   CREATE INDEX idx_title_cover
      ON titles(title, emp_no, from_date, to_date);
   ```

   ```bash
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | EXPLAIN                                                                                                                                                      |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | -> Covering index lookup on titles using idx_title_cover (title = 'Senior Engineer')  (cost=27782 rows=185210) (actual time=0.713..59.9 rows=97750 loops=1)  |
   +--------------------------------------------------------------------------------------------------------------------------------------------------------------+
   ```

   ```bash
   97750 rows in set (0.076 sec)
   ```

3. 問題

   ```sql
   SELECT
         e.first_name, e.last_name, d.dept_no
   FROM employees AS e
   JOIN dept_emp  AS d IGNORE INDEX (idx_dept_emp_deptno)
         ON e.emp_no = d.emp_no
   WHERE d.dept_no = 'd003';
   ```

   17786 rows in set, 1 warning (0.117 sec)

   ```bash
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | EXPLAIN                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | -> Nested loop inner join  (cost=47786 rows=41393) (actual time=1.88..118 rows=17786 loops=1)
   |    -> Filter: (d.dept_no = 'd003')  (cost=33299 rows=41393) (actual time=1.85..93.6 rows=17786 loops=1)
   |        -> Covering index scan on d using PRIMARY  (cost=33299 rows=331143) (actual time=1.84..67.3 rows=331603 loops=1)
   |    -> Single-row index lookup on e using PRIMARY (emp_no = d.emp_no)  (cost=0.25 rows=1) (actual time=0.00123..0.00126 rows=1 loops=17786)
   |
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   ```

   ```sql
   CREATE INDEX idx_dept_emp_deptno_empno ON dept_emp(dept_no, emp_no);
   ```

   17786 rows in set (0.055 sec)

   ```bash
   +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | -> Nested loop inner join  (cost=15100 rows=33194) (actual time=1.5..55.1 rows=17786 loops=1)
   |    -> Filter: (d.dept_no = 'd003')  (cost=3482 rows=33194) (actual time=1.49..11.8 rows=17786 loops=1)
   |        -> Covering index lookup on d using idx_dept_emp_deptno_empno (dept_no = 'd003')  (cost=3482 rows=33194) (actual time=1.48..8.38 rows=17786 loops=1)
   |    -> Single-row index lookup on e using PRIMARY (emp_no = d.emp_no)  (cost=0.25 rows=1) (actual time=0.00216..0.00221 rows=1 loops=17786)
   |
   +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   ```

4. gender で COUNT するとインデックスが使われない理由

   ```bash
   +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | EXPLAIN                                                                                                                                                                                                                                                                                                         |
   +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | -> Aggregate: count(0)  (cost=64702 rows=1) (actual time=92.1..92.1 rows=1 loops=1)
      -> Filter: (employees.gender = 'F')  (cost=30207 rows=149712) (actual time=0.428..87.2 rows=120051 loops=1)
         -> Table scan on employees  (cost=30207 rows=299423) (actual time=0.422..63.4 rows=300024 loops=1)
   |
   +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   1 row in set (0.093 sec)
   ```

   ```sql
   CREATE INDEX idx_employees_gender ON employees(gender);
   ```

   ```bash
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | EXPLAIN                                                                                                                                                                                                                                                                                                                                                          |
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   | -> Aggregate: count(0)  (cost=47968 rows=1) (actual time=54..54 rows=1 loops=1)
   |    -> Filter: (employees.gender = 'F')  (cost=14580 rows=144905) (actual time=0.196..47.8 rows=120051 loops=1)
   |        -> Covering index lookup on employees using idx_employees_gender (gender = 'F')  (cost=14580 rows=144905) (actual time=0.195..33.5 rows=120051 loops=1)
   |
   +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
   ```

   gender は 'M' / 'F' の 2 値しかなく低選択度のため、
   インデックス経由で行 ID を取得した後にテーブルを再アクセスするコストの方が高い。
   そのため Optimizer はフルテーブルスキャンを選択する。根拠として、

   - SHOW INDEX FROM employees; で Cardinality が極端に小さい
   - EXPLAIN で "Table scan" が選択される

   ことが確認できる。

   まとめ：gender は低選択度で、カーディナリティの値が小さいため、インデックスを活用するよりもフルテーブルスキャンの方が効率的だとオプティマイザが判断したため。