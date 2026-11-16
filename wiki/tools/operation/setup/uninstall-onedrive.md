# OneDrive アンインストール方法

## まず存在チェック

管理者のコマンドプロンプト（スタートを右クリック → ターミナル（管理者））で：

```
winget list OneDrive
```

| 結果           | 意味                                                 | 次にやること               |
| -------------- | ---------------------------------------------------- | -------------------------- |
| 何か表示される | インストールされてる                                 | 下の「消し方」へ           |
| 何も出ない     | もうアンインストール済み。残ってるのはただのフォルダ | 「フォルダとサイドバー」へ |

## 消し方（上から順に試す）

1. OneDriveを止める
   ```
   taskkill /f /im OneDrive.exe
   ```
2. wingetでアンインストール（一番手軽）
   ```
   winget uninstall Microsoft.OneDrive
   ```
   Settingsからの削除と同じく、wingetのこのコマンドでも消せるよ。
3. wingetで失敗したら、OneDrive付属のアンインストーラーを直接実行
   ```
   %SystemRoot%\System32\OneDriveSetup.exe /uninstall
   ```
   64bit版Windowsでは `%SystemRoot%\SysWOW64\OneDriveSetup.exe /uninstall` を使うという記事もあるよ。System32とSysWOW64は環境で違うから、片方で「ファイルが見つからない」と出たらもう片方を試してね。

注意が2つあるよ。

- この方法で消えるのは今ログインしてるユーザー分だけ（OneDriveは各ユーザーのプロフィールにインストールされるため）。
- アンインストールしてもローカルのファイルは残るから、中身は自分で確認してね。

**デスクトップとピクチャの保存場所がOneDriveの中を指したまま**になってること。
OneDriveのフォルダを消したから、Windowsが「ないじゃん！」って怒ってピクチャを作り直したり、デスクトップのエラーを出したりしてるんだと思う。

## 直し方：保存場所を標準に戻す

PowerShell（普通のでOK）で、まず**何がOneDriveを指してるか**確認：

```powershell
(Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders').PSObject.Properties | Where-Object { $_.Value -like '*OneDrive*' } | Select-Object Name, Value
```

出てきた項目を標準の場所に戻す。デスクトップ・ピクチャ・ドキュメントの場合：

7個ぜんぶ標準の場所に戻すよ。名前ごとの戻し先はこう：

| 名前                                            | 戻す先                    |
| ----------------------------------------------- | ------------------------- |
| `Desktop`                                       | `%USERPROFILE%\Desktop`   |
| `My Pictures` / `{339719B5-…}` / `{0DDD015D-…}` | `%USERPROFILE%\Pictures`  |
| `Personal` / `{24D89E24-…}` / `{F42EE2D3-…}`    | `%USERPROFILE%\Documents` |

### 実行するスクリプト

PowerShellにそのまま貼ってね（今のウィンドウでOK）。

```powershell
$k = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders'
$map = @{
  'Desktop'                                = '%USERPROFILE%\Desktop'
  'My Pictures'                            = '%USERPROFILE%\Pictures'
  '{339719B5-8C47-4894-94C2-D8F77ADD44A6}' = '%USERPROFILE%\Pictures'
  '{0DDD015D-B06C-45D5-8C4C-F59713854639}' = '%USERPROFILE%\Pictures'
  'Personal'                               = '%USERPROFILE%\Documents'
  '{24D89E24-2F19-4534-9DDE-6A6671FBB8FE}' = '%USERPROFILE%\Documents'
  '{F42EE2D3-909F-4907-8871-4C22FC0BF756}' = '%USERPROFILE%\Documents'
}
foreach ($name in $map.Keys) {
  Set-ItemProperty -Path $k -Name $name -Value $map[$name] -Type ExpandString
}
New-Item -ItemType Directory -Force "$env:USERPROFILE\Desktop","$env:USERPROFILE\Pictures","$env:USERPROFILE\Documents" | Out-Null
```

次に、**何も出なければ成功**の確認コマンド：

```powershell
(Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders').PSObject.Properties | Where-Object { $_.Value -like '*OneDrive*' } | Select-Object Name, Value
```

## 反映と仕上げ

1. **サインアウト → サインイン**（または再起動）。エクスプローラーだけ再起動するなら `Stop-Process -Name explorer -Force` でもいいけど、アプリ側に古い場所が残ってることがあるから、再起動のほうが確実だよ
2. `C:\Users\negim\OneDrive` の中に**新しく保存されたファイルがないか**見る。あれば `Desktop` / `Pictures` / `Documents` に移動
3. 空になったら `OneDrive` フォルダを削除

日本語Windowsだと、実際のフォルダ名は `Desktop` / `Pictures` / `Documents`（英語）のままで、エクスプローラー上だけ「デスクトップ」「画像」「ドキュメント」と表示されるよ。`C:\Users\negim\Pictures` が「画像」に見えてても正常だから安心してね。

「利用できません」のウィンドウが消えたか、教えてね！

最後の行でエクスプローラーが再起動するから、画面が一瞬チカッとするよ。

確認で他の項目も出てきた場合は、名前に合わせて同じ要領で：

| 確認で出た名前                           | 戻す先                    |
| ---------------------------------------- | ------------------------- |
| `My Video`                               | `%USERPROFILE%\Videos`    |
| `My Music`                               | `%USERPROFILE%\Music`     |
| `{374DE290-123F-4565-9164-39C4925E467B}` | `%USERPROFILE%\Downloads` |

## 仕上げ

- 復活した `C:\Users\<名前>\OneDrive` フォルダを、**中身が空なのを確認してから**もう一度削除
- もう一度、上の確認コマンドを実行して何も出なければ完了

## サイドバーから非表示にする

アンインストールで普通は消えるんだけど、残ってたらレジストリで消せるよ。管理者のコマンドプロンプトで：

```cmd
reg add "HKCR\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /v System.IsPinnedToNameSpaceTree /t REG_DWORD /d 0 /f
```

エクスプローラーを再起動する（サインアウトでもOK）と反映されるよ。戻したい時は値を 1 にすればOK。
