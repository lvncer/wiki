# B-tree Index 再構成

B-treeインデックスの更新によって性能が劣化するのを防ぐため、DBMSごとにインデックスを再編成する具体的な方法は以下の通りです。

## PostgreSQL

PostgreSQLでは、REINDEXコマンドを使用してインデックスを再編成します。特定のインデックス、テーブル、またはデータベース全体に対して実行できます。

特定のインデックスを再編成

```SQL
REINDEX INDEX a_index;
```

テーブルの全てのインデックスを再編成

```SQL
REINDEX TABLE a_table;
```

データベースの全てのインデックスを再編成

```SQL
REINDEX DATABASE a_database;
```

書き込みをブロックせずに再編成するには、CONCURRENTLYオプションを使用します。

```SQL
REINDEX INDEX a_index CONCURRENTLY;
```

## MySQL

MySQLでは、OPTIMIZE TABLEステートメントを使用してテーブルとインデックスを再編成し、最適化します。

```SQL
OPTIMIZE TABLE a_table;
```

また、ALTER TABLEを使用してインデックスを再構築することも可能です。これは一度インデックスを削除し、再作成するのと同じ効果があります。

```SQL
ALTER TABLE a_table ENGINE=InnoDB;
```

## Oracle Database

Oracle Databaseでは、ALTER INDEX REBUILDコマンドを使用してインデックスを再構築します。

```SQL
ALTER INDEX a_index REBUILD;
```

オンラインで再構築するには、ONLINEオプションを追加します。これにより、再構築中もテーブルへのDML操作（INSERT, UPDATE, DELETE）が可能になります。

```SQL
ALTER INDEX a_index REBUILD ONLINE;
```

## SQL Server

SQL Serverでは、ALTER INDEXステートメントにREBUILDまたはREORGANIZEオプションを付けて使用します。

REBUILD: インデックスを再構築します。断片化を完全に解消し、新しいインデックスを作成します。

```SQL
ALTER INDEX a_index ON a_table REBUILD;
```

オンラインで実行するにはWITH (ONLINE = ON)オプションを追加します。

REORGANIZE: インデックスのリーフページの物理的な順序を論理的な順序に合わせることで、断片化を解消します。REBUILDよりもリソースの消費が少ないですが、断片化の解消度は低くなる場合があります。

```SQL
ALTER INDEX a_index ON a_table REORGANIZE;
```
