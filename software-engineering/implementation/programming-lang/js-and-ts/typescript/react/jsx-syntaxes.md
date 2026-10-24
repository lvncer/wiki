# 知っておくべき文法・パターン

## 1. `&&` 演算子（条件付きレンダリング）

```jsx
{hasError && <p>エラーです</p>}
// hasErrorがtrueの時だけ<p>を表示
```

## 2. 三項演算子

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
// 条件 ? trueの時 : falseの時
```

## 3. map（リストのレンダリング）

```jsx
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}
// 配列を<li>に変換して表示
```

`key`は必須！

## 4. スプレッド構文

```jsx
const props = { name: "太郎", age: 20 };
<User {...props} />
// = <User name="太郎" age={20} />
```

## 5. 分割代入 （props 受け取り）

```jsx
const MyComponent = (props) => {
  const { title, onClick } = props;
  return <button onClick={onClick}>{title}</button>;
};
```

## 6. テンプレートリテラル

```jsx
<div className={`btn ${isActive ? "active" : ""}`}>
  {`こんにちは、${name}さん`}
</div>
```

## 7. オプショナルチェーン

```jsx
{user?.profile?.avatar && <img src={user.profile.avatar} />}
// userがundefinedでもエラーにならない！
```
