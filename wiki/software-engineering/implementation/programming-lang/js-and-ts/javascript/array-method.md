# 配列メソッド

## 参考

- [https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 全部で何個？

ECMAScript標準だと **約40個前後**（静的メソッド含む）。
バージョンごとに増え続けてるから「ちょうど何個」は言いにくい。

## カテゴリ別まとめ

| カテゴリ | メソッド例 | 個数目安 |
|---------|-----------|---------|
| 変換・生成 | map, flatMap, flat | ~4 |
| 絞り込み・検索 | filter, find, findIndex, findLast | ~6 |
| 集約・判定 | reduce, reduceRight, every, some, includes | ~5 |
| 破壊的操作 | push, pop, shift, unshift, splice, sort, reverse, fill | ~8 |
| 非破壊的操作 | toSorted, toReversed, toSpliced, with | ~4 ← ES2023新顔 |
| 反復 | forEach, entries, keys, values | ~4 |
| 結合・変換 | join, concat, slice, flat | ~4 |
| 静的メソッド | Array.from, Array.of, Array.isArray | ~3 |

## よく使うやつ TOP10（個人的感覚）

```
頻度高 ████████████
map        ★★★★★  配列を別の配列に変換
filter     ★★★★★  条件で絞り込み
forEach    ★★★★☆  ループ（返値不要な時）
find       ★★★★☆  最初にマッチした要素1つ
some       ★★★☆☆  1つでも条件満たすか
reduce     ★★★☆☆  集約・合計・変換
includes   ★★★☆☆  含まれるか bool
flat/flatMap ★★☆☆☆ ネスト解消
slice      ★★★☆☆  部分コピー（非破壊）
sort       ★★☆☆☆  並び替え（比較関数必須）
頻度低 ████
```

TOP10全部コード例つきで出すね！

## 1. `map` — 変換

```js
const prices = [100, 200, 300];

// 全部1.1倍にしたい
prices.map(p => p * 1.1);
// [110, 220, 330]

// オブジェクトの特定キーだけ取り出す
const users = [{name: "Alice", age: 20}, {name: "Bob", age: 25}];
users.map(u => u.name);
// ["Alice", "Bob"]
```

## 2. `filter` — 絞り込み

```js
const nums = [1, 2, 3, 4, 5];

nums.filter(n => n % 2 === 0);
// [2, 4]  偶数だけ

const users = [{name: "Alice", active: true}, {name: "Bob", active: false}];
users.filter(u => u.active);
// [{name: "Alice", active: true}]
```

## 3. `forEach` — ループ（返値なし）

```js
const fruits = ["apple", "banana", "cherry"];

// mapと違って返値を使わない時
fruits.forEach(f => console.log(f));
// apple
// banana
// cherry

// ❌ forEachの返値はundefined
const result = fruits.forEach(f => f.toUpperCase());
// result → undefined  ← mapと間違えがち！
```

## 4. `find` — 最初の1個だけ取り出す

```js
const users = [
  {id: 1, name: "Alice"},
  {id: 2, name: "Bob"},
  {id: 3, name: "Carol"},
];

users.find(u => u.id === 2);
// {id: 2, name: "Bob"}

// 見つからない場合
users.find(u => u.id === 99);
// undefined  ← nullじゃなくてundefinedなので注意
```

## 5. `some` — 1つでも条件を満たすか

```js
const nums = [1, 3, 5, 8, 9];

nums.some(n => n % 2 === 0);
// true  ← 8が偶数だから

nums.some(n => n > 100);
// false

// 使いどころ：バリデーションチェックとか
const cart = [{name: "靴", soldOut: false}, {name: "帽子", soldOut: true}];
cart.some(item => item.soldOut);
// true  → 「売り切れ商品があります」表示に使える
```

## 6. `reduce` — 集約

```js
const nums = [1, 2, 3, 4, 5];

// 合計
nums.reduce((acc, cur) => acc + cur, 0);
// 15
//  acc=0→1→3→6→10→15  と積み上がるイメージ

// オブジェクトに変換（これが地味に便利）
const users = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];
users.reduce((acc, u) => {
  acc[u.id] = u.name;
  return acc;
}, {});
// {1: "Alice", 2: "Bob"}  ← IDで引けるMapに変換
```

```
reduce のイメージ:
[1, 2, 3, 4, 5]
 └acc=0
    └+1=1
       └+2=3
          └+3=6
             └+4=10
                └+5=15 ← 最終結果
```

## 7. `includes` — 含まれるか

```js
const fruits = ["apple", "banana", "cherry"];

fruits.includes("banana");
// true

fruits.includes("grape");
// false

// よく使うパターン：許可リストチェック
const allowedRoles = ["admin", "editor"];
const userRole = "viewer";

allowedRoles.includes(userRole);
// false → アクセス拒否、みたいな
```

## 8. `flat` / `flatMap` — ネスト解消

```js
// flat: ネストをつぶす
const nested = [1, [2, 3], [4, [5, 6]]];

nested.flat();
// [1, 2, 3, 4, [5, 6]]  ← 1段だけ

nested.flat(2);
// [1, 2, 3, 4, 5, 6]  ← 2段つぶす

// flatMap: map → flat を1発で
const sentences = ["hello world", "foo bar"];
sentences.flatMap(s => s.split(" "));
// ["hello", "world", "foo", "bar"]
// map だと [["hello","world"],["foo","bar"]] になっちゃう
```

## 9. `slice` — 部分コピー（非破壊）

```js
const arr = [0, 1, 2, 3, 4];
//            0  1  2  3  4  ← インデックス

arr.slice(1, 3);
// [1, 2]  ← 終端は含まない

arr.slice(2);
// [2, 3, 4]  ← 最後まで

arr.slice(-2);
// [3, 4]  ← 後ろから2個

// 元配列は変わらない（非破壊）
console.log(arr);
// [0, 1, 2, 3, 4]  ← そのまま
```

## 10. `sort` — 並び替え

```js
// ⚠️ デフォルトは文字列比較なので数値は要注意！
[10, 9, 2, 1, 100].sort();
// [1, 10, 100, 2, 9]  ← 辞書順になる（罠）

// 数値は比較関数必須
[10, 9, 2, 1, 100].sort((a, b) => a - b);
// [1, 2, 9, 10, 100]  ← 昇順

[10, 9, 2, 1, 100].sort((a, b) => b - a);
// [100, 10, 9, 2, 1]  ← 降順

// オブジェクトの並び替え
const users = [{name: "Carol"}, {name: "Alice"}, {name: "Bob"}];
users.sort((a, b) => a.name.localeCompare(b.name));
// [{name:"Alice"}, {name:"Bob"}, {name:"Carol"}]
```
