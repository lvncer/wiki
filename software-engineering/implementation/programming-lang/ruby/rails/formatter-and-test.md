# フォーマッターとテストツール

Next.jsとか他のフレームワークを触ってるなら、考え方自体は似てるところも多いから、すんなり理解できると思うよ！
ここでは、Rails開発で「これだけは押さえておきたい！」っていう定番ツールと、それに関連する知識をまとめて紹介するね！

## コードフォーマッター (Linter & Formatter)

コードフォーマッターは、コードの見た目（インデントとか、スペースとか）を自動で統一してくれるツールのこと。
チーム開発でのコードの可読性を上げたり、無駄なスタイルレビューをなくすために、ほぼ必須のツールだよ！

### 代表的なツール: RuboCop

Ruby/Rails界隈では、RuboCop がデファクトスタンダード（事実上の標準）だよ。これは単なるフォーマッターじゃなくて、「Linter（リンター）」としての機能も持ってるんだ。

- Linter: 「こういう書き方はバグりやすいよ」とか「もっとRubyらしい書き方があるよ」みたいに、コードの品質をチェックしてくれる機能。
- Formatter: コードのスタイルを統一してくれる機能。

#### なんで使うの？

- コードの一貫性: 誰が書いても同じスタイルの綺麗なコードになる。
- レビューの効率化: スタイルに関する指摘が不要になるから、ロジックのレビューに集中できる。
- バグの早期発見: Linter機能が、潜在的なバグや非効率なコードを見つけてくれる。

#### 使い方

インストール: Gemfile に追加して bundle install する。

```ruby
# Gemfile
group :development, :test do
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false # Rails用のルールセットも追加
end
```

設定ファイルを作成: プロジェクトのルートに .rubocop.yml という設定ファイルを作る。
ここで、ルールをカスタマイズできるよ。

```yaml
# .rubocop.yml の簡単な例
require:
  - rubocop-rails # Rails用のルールを読み込む

AllCops:
  NewCops: enable # 新しいルールを有効にする
  Exclude: # チェック対象外のファイルを指定
    - 'db/schema.rb'
    - 'bin/*'
    - 'config/initializers/*'

Style/Documentation: # クラスやモジュールのコメントを必須にするか (最初はfalseでもOK)
  Enabled: false

Style/StringLiterals: # 文字列をシングルクォートにするかダブルクォートにするか
  EnforcedStyle: single_quotes
```

実行: コマンドラインで実行する。

```bash
# コードの問題点をチェックするだけ
bundle exec rubocop

# 自動で修正できる問題を全部修正してくれる！✨ (これが一番よく使う！)
bundle exec rubocop -A
```

### 関連知識：Gitフックとの連携

開発に慣れてきたら、git commit する前に自動でRuboCopを走らせる「Gitフック」を設定するのがおすすめ！
lefthook や overcommit っていうツールを使うと、コミット前に必ずコードが綺麗になるから、チーム開発がめっちゃスムーズになるよ！

## テストツール

テストは、書いたコードが期待通りに動くことを保証するためのもの。
Railsはテスト文化がすごく根付いてるから、ここはしっかり押さえておきたいところ！

### 代表的なテストフレームワーク

Railsには標準で Minitest が入ってるけど、コミュニティでは RSpec の方が人気が高いかな。
どっちも良いツールだよ！

| ツール | 特徴 |
| - | - |
| Minitest | Rails標準。シンプルで軽量。Ruby標準のライブラリだから学習コストが低い。 |
| RSpec | 非常に人気。英語の文章みたいに自然に書ける（BDD: ビヘイビア駆動開発）。柔軟で高機能。 |

#### Minitestの書き方

assert_equal expected, actual（期待値と実際の値が同じか）みたいな形式で書く。

```ruby
# test/models/post_test.rb
require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "the truth" do
    assert true # これは常に成功するテスト
  end

  test "should not save post without title" do
    post = Post.new
    assert_not post.save, "Saved the post without a title" # タイトルなしでは保存できないはず
  end
end
```

#### RSpecの書き方

expect(actual).to eq(expected)（実際の値が期待値と等しいことを期待する）みたいに、より自然な英語に近い形で書けるのが特徴。

```ruby
# spec/models/post_spec.rb
require 'rails_helper'

RSpec.describe Post, type: :model do
  it "is valid with a title" do
    post = Post.new(title: "My first post")
    expect(post).to be_valid # タイトルがあれば有効であること
  end

  it "is invalid without a title" do
    post = Post.new(title: nil)
    expect(post).to_not be_valid # タイトルがなければ無効であること
  end
end
```

### テストデータの作成: FactoryBot

テストを書くとき、毎回「テスト用のユーザー」とか「テスト用の投稿データ」を手で作るのはすごく面倒くさい。
そこで使うのが FactoryBot！
これは、テストデータを簡単に作るためのツール（「ファクトリ」と呼ばれるものを作る）。

#### なんで使うの？

- DRY (Don't Repeat Yourself): テストデータの作成ロジックを1箇所にまとめられる。
- 可読性: create(:user) みたいに、何を作ってるのか直感的にわかる。
- 保守性: モデルの仕様が変わっても、ファクトリの定義を1つ直すだけで済む。

#### 使い方

インストール: Gemfile に追加。

```ruby
# Gemfile
group :development, :test do
  gem 'factory_bot_rails'
end
```

ファクトリを定義: spec/factories ディレクトリに、モデルごとのファクトリを作る。

```ruby
# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    # name { "Taro Yamada" }
    sequence(:name) { |n| "User #{n}" } # sequenceを使うと連番でユニークなデータを作れる
    sequence(:email) { |n| "test#{n}@example.com" }
    password { "password" }
  end
end
```

テストで使う: create(:user) みたいに呼び出すだけ！

```ruby
# spec/models/post_spec.rb
it "is created by a user" do
  user = create(:user) # FactoryBotでユーザーを作成
  post = Post.create(title: "Test Post", user: user)
  expect(post.user).to eq(user)
end
```

関連知識：その他便利なテスト関連ツール

- Faker: リアルなダミーデータ（名前、住所、メールアドレスなど）を生成してくれるGem。FactoryBotと組み合わせて使うことが多いよ。
- SimpleCov: テストカバレッジ（コードのうち、どれくらいの割合がテストで実行されたか）を計測してくれるツール。テストが十分かどうかの一つの指標になる。
- Capybara: System Test（ブラウザでの操作をシミュレートするテスト）を書くときに使う。ユーザーが実際に画面を操作する流れをテストできる。

## まとめ

Rails開発を始めるときの、個人的なおすすめセットはこれかな！

- フォーマッター: RuboCop (ほぼ必須)
- テストフレームワーク: RSpec (Minitestでも良いけど、求人とか見るとRSpecの経験を求められることも多いかも)
- テストデータ: FactoryBot (Fixturesより柔軟でモダン)
