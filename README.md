# OpenAPI Generator Learning

単一の openapi.yaml をもとに、4つのクライアント生成スタックを比較できる pnpm monorepo プロジェクトです。

## 🏆 OpenAPI スキーマ生成ツール比較

### OpenAPI YAML 表現力ランキング

#### 🥇 1位: **Orval** ★★★★★

OpenAPIの情報を最も忠実に再現する最強ツール

**優れている点:**
- ✅ `describe()` で全フィールドの説明を保持
- ✅ 制約値を定数として外出し（再利用可能）
- ✅ JSDocでAPI操作の説明も含む
- ✅ デフォルト値の明示的な定義
- ✅ 正規表現を変数として保持

---

#### 🥈 2位: **openapi-zod-client** (oats) ★★★★☆

厳密な型チェックと高度な日時処理が特徴

**優れている点:**
- ✅ `strict().passthrough()` で厳密な型チェック
- ✅ `datetime({ offset: true })` でタイムゾーン対応
- ✅ `partial()` で部分更新を適切に表現

**不足している点:**
- ❌ フィールドの説明（description）が欠落
- ❌ API操作レベルの情報なし

---

#### 🥉 3位: **Hey API + Zod** ★★★☆☆

シンプルで扱いやすいが、情報の欠落が目立つ

**優れている点:**
- ✅ シンプルで読みやすいスキーマ
- ✅ `datetime()` バリデーション

**不足している点:**
- ❌ API操作用スキーマが冗長
- ❌ フィールドの説明なし
- ❌ 制約値がハードコード

---

#### 🏅 4位: **Hey API + Valibot** ★★☆☆☆

関数型アプローチは魅力的だが、エコシステムが未成熟

**優れている点:**
- ✅ `pipe()` で制約を関数的に表現
- ✅ `isoTimestamp()` でISO8601検証

**不足している点:**
- ❌ Zodと同様の冗長性
- ❌ フィールドの説明なし
- ❌ Valibotエコシステムがまだ小さい

### 📊 詳細比較

| 機能                 | Orval       | openapi-zod-client | Hey API + Zod   | Hey API + Valibot |
| -------------------- | ----------- | ------------------ | --------------- | ----------------- |
| フィールド説明の保持 | ✅           | ❌                  | ❌               | ❌                 |
| 制約値の再利用性     | ✅ 定数化    | ❌                  | ❌               | ❌                 |
| デフォルト値の表現   | ✅ 明示的    | ✅ `.default()`     | ✅ `.default()`  | ✅ `.optional()`   |
| 日時フォーマット対応 | ✅           | ✅ offset対応       | ✅               | ✅ ISO8601         |
| 部分更新の表現       | ✅           | ✅ `.partial()`     | ✅ `.optional()` | ✅ `.optional()`   |
| API操作の説明        | ✅ JSDoc付き | ❌ なし             | ⚠️ 過剰に詳細    | ⚠️ 過剰に詳細      |
| エコシステム         | ✅ 充実      | ✅ 充実             | ✅ 充実          | ⚠️ 発展途上        |

### 💡 「API操作の説明」とは？

生成されたコードにOpenAPIで定義したAPI操作（エンドポイント）の説明が含まれているかを示します：

- **✅ JSDoc付き（Orval）**: 各API操作に `@summary` や `@description` として説明が付与される
  ```typescript
  /**
   * システムに登録されているすべてのユーザーを取得します
   * @summary 全ユーザーを取得
   */
  ```

- **❌ なし（openapi-zod-client）**: スキーマのみ生成され、API操作の説明は含まれない

- **⚠️ 過剰に詳細（Hey API）**: リクエストの構造（body/headers/path/query）を必要以上に詳細に定義
  ```typescript
  export const zGetUsersApiData = z.object({
    body: z.never().optional(),
    headers: z.never().optional(),
    path: z.never().optional(),
    query: z.never().optional()
  });
  ```

### 🎯 結論

**Orval** が最もOpenAPIの情報を忠実に保持し、実用性も高いツールです。特に大規模プロジェクトやAPIドキュメントとの整合性を重視する場合に推奨されます。

---

## 📦 パッケージ構成

| ディレクトリ                    | 役割                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `packages/stack-heyapi-zod`     | Hey API + client-fetch + TanStack Query + Zod                                 |
| `packages/stack-heyapi-valibot` | Hey API + client-fetch + TanStack Query + Valibot                             |
| `packages/stack-oats`           | openapi-typescript + openapi-fetch + openapi-react-query + openapi-zod-client |
| `packages/stack-orval`          | Orval (react-query / Zod / MSW+Faker)                                         |

## 🚀 クイックスタート

```bash
# 依存関係のインストール
pnpm install

# すべてのパッケージの開発サーバーを起動（モックサーバー含む）
pnpm run dev

# 個別のパッケージを起動
pnpm run dev:heyapi-zod      # Hey API + Zod版
pnpm run dev:heyapi-valibot  # Hey API + Valibot版
pnpm run dev:oats            # openapi-ts/oats版
pnpm run dev:orval           # Orval版
```

## 🛠️ 開発コマンド

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

## 📡 ポート一覧

- `4010`: Prismモックサーバー
- `5173`: stack-heyapi-zod
- `5174`: stack-heyapi-valibot
- `5175`: stack-oats
- `5176`: stack-orval

## 🏗️ 技術スタック

- **パッケージマネージャー**: pnpm workspace
- **フレームワーク**: React + Vite
- **言語**: TypeScript (strict mode)
- **状態管理**: TanStack Query
- **バリデーション**: Zod / Valibot
- **モックサーバー**: Prism
- **コード品質**: Biome (Lint & Format)