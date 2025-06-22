# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要な指示

**すべての作業は日本語で行います**
- コメント、説明文、エラーメッセージ、質問への回答など、すべて日本語で記述
- コードのコメントも日本語で統一

**作業完了時の通知音**
- タスク完了時やユーザーへの報告時は、必ず最後に音で通知
- 以下のコマンドを一度だけ実行：

```shell
play /System/Library/Sounds/Frog.aiff vol 0.5
```

## 必須確認事項

**TypeScript実装前の型安全確認**:
- **必ず最初に**: @tsconfig.base.json の型安全制御設定を確認
- **型安全性は最高レベル**: `strict: true`により`noImplicitAny`を含むすべての厳格な型チェックが有効
- **よくある間違い**: エクスポートする関数・クラスの戻り値型や引数型の明示的な型注釈を忘れがち
- **注意**: このプロジェクトは型安全設定を採用しており、一般的なプロジェクトより遥かに厳格です

## よく使うコマンド

### 開発

```bash
# すべてのパッケージの開発サーバーを並行起動（モックサーバー含む）
pnpm run dev

# ポートをクリーンアップしてから開発サーバーを起動
pnpm run dev:clean

# 個別のパッケージの開発サーバーを起動
pnpm run dev:heyapi-zod      # Hey API + Zod版
pnpm run dev:heyapi-valibot  # Hey API + Valibot版
pnpm run dev:oats            # openapi-ts/oats版
pnpm run dev:orval           # Orval版
```

### コード生成

```bash
# すべてのパッケージのコードを並行生成
pnpm run generate

# 個別のパッケージのコード生成
pnpm run generate:heyapi-zod
pnpm run generate:heyapi-valibot
pnpm run generate:oats
pnpm run generate:orval
```

### 検証・ビルド

```bash
# ビルド、型チェック、Lintを並行実行
pnpm run verify

# 個別実行
pnpm run build      # すべてのパッケージをビルド
pnpm run typecheck  # すべてのパッケージの型チェック
pnpm run lint       # Lintチェック
pnpm run lint:fix   # Lint自動修正
```

### その他

```bash
# モックサーバーのみ起動
pnpm run mock

# 開発用ポートを強制終了
pnpm run kill:ports

# すべてのブラウザタブを開く
pnpm run open
```

### ポート一覧

- `4010`: Prismモックサーバー
- `5173`: stack-heyapi-zod
- `5174`: stack-heyapi-valibot
- `5175`: stack-oats
- `5176`: stack-orval

