自分だけ EditorConfig や Language Server を使いたいときなど、ファイルを追加したいが他のメンバーに影響がでないようコミットはしたくない場合がある。
`{PROJECT_ROOT}/.gitignore` では差分が出てしまい、`~/.gitignore` では他のプロジェクトでgit管理している場合に困る。

プロジェクト内の特定のファイルを自分だけgitignoreするには、プロジェクトの .git/info/exclude に .gitignore と同じように除外ファイルを指定すればよい。。
