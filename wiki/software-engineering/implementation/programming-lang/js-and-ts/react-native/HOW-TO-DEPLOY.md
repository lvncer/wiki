# How to Deploy Application with React Native

React Nativeアプリのデプロイ方法について説明しますね！主に2つのアプローチがあります。

## 1. Expo を使った方法（推奨・簡単）

### Expoは最も簡単な方法です

開発からデプロイまで：

```sh
# Expo CLIをインストール
npm install -g @expo/cli

# 新しいプロジェクト作成
npx create-expo-app MyApp
cd MyApp

# 開発サーバー起動
npx expo start
```

本番デプロイ：

```sh
# アプリをビルド（iOS）
npx expo build:ios

# アプリをビルド（Android）
npx expo build:android

# または新しいEAS Buildを使用
npm install -g eas-cli
eas build --platform all
```

ストア公開：

```sh
# App Store Connect（iOS）向け
eas submit --platform ios

# Google Play Console（Android）向け
eas submit --platform android
```

## 2. React Native CLI を使った方法

### より細かい制御が可能ですが、設定が複雑：

iOS デプロイ：

```sh
# iOSフォルダでビルド
cd ios
xcodebuild -workspace MyApp.xcworkspace -scheme MyApp archive
```

Android デプロイ：

```sh
# リリース用APK生成
cd android
./gradlew assembleRelease

# AABファイル生成（Play Store推奨）
./gradlew bundleRelease
```

## 主な違い

| 方法 | メリット | デメリット |
| - | - | - |
| Expo | 設定が簡単、CI/CD統合済み | ネイティブモジュールに制限 |
| React Native CLI | 完全な制御、全機能利用可能 | 設定が複雑、ビルド環境構築必要 |

## 必要なアカウント

- iOS: Apple Developer Account（年額$99）
- Android: Google Play Console（一回$25）

初心者ならExpoから始めることを強くお勧めします。ほとんどのアプリはExpoで十分対応できますし、後からejectして通常のReact Nativeに移行することも可能です。
