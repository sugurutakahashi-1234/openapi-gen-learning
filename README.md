# OpenAPI Generator Learning

単一の openapi.yaml をもとに、4つのクライアント生成スタックを比較できる pnpm monorepo プロジェクトです。

## 🚀 クイックスタート

```bash
# 依存関係のインストール
pnpm install

# すべてのパッケージの開発サーバーを起動（モックサーバー含む）
pnpm run dev
```

## 🛠️ 開発コマンド

### コード生成

```bash
# すべてのパッケージのコードを並行生成
pnpm run generate
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

## 📦 パッケージ構成と詳細比較

このプロジェクトでは、同じOpenAPI仕様から5つの異なるアプローチでTypeScriptクライアントを生成し、それぞれの特徴を比較できます。

### 🔍 パッケージ一覧

| パッケージ名                   | コード生成ツール                        | バリデーション | HTTPクライアント      | React Query | 特徴                           |
| ------------------------------ | --------------------------------------- | -------------- | --------------------- | ----------- | ------------------------------ |
| `stack-heyapi-zod`             | @hey-api/openapi-ts                     | Zod            | @hey-api/client-fetch | ✅           | 新しいツールチェイン           |
| `stack-heyapi-valibot`         | @hey-api/openapi-ts                     | Valibot        | @hey-api/client-fetch | ✅           | 関数型バリデーション           |
| `stack-openapi-typescript`     | openapi-typescript                      | なし（型のみ） | openapi-fetch         | ✅           | 最小構成、型安全性重視         |
| `stack-openapi-typescript-zod` | openapi-typescript + openapi-zod-client | Zod            | openapi-fetch         | ✅           | 型定義とスキーマを分離         |
| `stack-orval`                  | orval                                   | Zod            | axios                 | ✅           | 最多機能、エンタープライズ向け |

### 📊 機能比較表

| 機能                          | Hey API (Zod) | Hey API (Valibot) | openapi-ts | openapi-ts + Zod | Orval     |
| ----------------------------- | ------------- | ----------------- | ---------- | ---------------- | --------- |
| **型定義生成**                | ✅             | ✅                 | ✅          | ✅                | ✅         |
| **ランタイムバリデーション**  | ✅             | ✅                 | ❌          | ✅                | ✅         |
| **React Queryフック自動生成** | ✅             | ✅                 | ✅          | ✅                | ✅         |
| **queryKey型安全性**          | ⭐⭐⭐⭐⭐         | ⭐⭐⭐⭐⭐             | ⭐⭐⭐        | ⭐⭐⭐              | ⭐⭐⭐⭐      |
| **queryKey生成関数**          | ✅             | ✅                 | ❌          | ❌                | ✅         |
| **パラメータ自動包含**        | ⭐⭐⭐⭐⭐※2       | ⭐⭐⭐⭐⭐※2           | ❌          | ❌                | ⭐⭐⭐※3     |
| **レスポンスモック生成**      | ❌             | ❌                 | ❌          | ❌                | ✅ (MSW)   |
| **モックデータ生成**          | ❌             | ❌                 | ❌          | ❌                | ✅ (Faker) |
| **カスタムフック生成**        | ✅             | ✅                 | ❌          | ❌                | ✅         |
| **エラーレスポンス型定義**    | ✅             | ✅                 | ✅          | ✅                | ✅         |
| **フィールド説明の保持**      | ❌             | ❌                 | ❌          | ❌                | ✅         |

※2: Hey APIは全パラメータ（path/query/body/headers）を自動的にqueryKeyに包含
※3: Orvalはpathパラメータのみ自動包含、queryパラメータは手動管理が必要


### 🎯 各パッケージの特徴と使い分け

#### 1. **Hey API系（stack-heyapi-zod / stack-heyapi-valibot）**
- **共通点**：
  - 同じコード生成ツール（@hey-api/openapi-ts）を使用
  - 専用のfetchクライアント（@hey-api/client-fetch）
  - React Queryフックの自動生成
  - クライアントSDKの生成（`sdk.gen.ts`）

- **相違点**：
  - **Zod版**: エコシステムが充実、コミュニティが大きい
  - **Valibot版**: より軽量（バンドルサイズ小）、関数型アプローチ（`pipe()`による制約チェーン）

- **適用場面**: 新規プロジェクトで最新のツールチェインを試したい場合

#### 2. **openapi-typescript（最小構成）**
- **特徴**：
  - 型定義のみ生成（ランタイムバリデーションなし）
  - 最小のバンドルサイズ
  - openapi-fetchとのシームレスな統合
  
- **適用場面**: 型安全性のみ必要で、バリデーションは不要な場合

#### 3. **openapi-typescript + Zod**
- **特徴**：
  - 型定義とZodスキーマを別々に生成
  - カスタムスクリプトでスキーマ生成をコントロール可能
  - 型とバリデーションの分離により柔軟な構成が可能
  
- **適用場面**: 型定義とバリデーションを独立して管理したい場合

#### 4. **Orval（エンタープライズ向け）**
- **特徴**：
  - 最も多機能（MSWモック、Fakerデータ生成）
  - OpenAPI仕様の情報を最も忠実に保持
  - エンドポイントごとにファイル分割される詳細な生成
  
- **適用場面**: 大規模プロジェクト、テスト自動化が重要な場合

### 🔧 実装の違い（同じZodを使う3つのパッケージの比較）

#### スキーマ定義の違い

**Hey API + Zod**:
```typescript
// シンプルだが情報が少ない
export const zPost = z.object({
  id: z.number(),
  title: z.string().min(1).max(200),
  content: z.string(),
  authorId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});
```

**openapi-typescript + Zod**:
```typescript
// strictモードで厳密な型チェック
export const postSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1).max(200),
  content: z.string(),
  authorId: z.number().int(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true })
}).strict().passthrough();
```

**Orval**:
```typescript
// フィールドの説明やデフォルト値も保持
export const postSchema = z.object({
  id: z.number().describe('投稿の一意識別子'),
  title: z.string().min(POST_TITLE_MIN).max(POST_TITLE_MAX).describe('投稿のタイトル'),
  content: z.string().describe('投稿の本文'),
  authorId: z.number().describe('投稿者のユーザーID'),
  createdAt: z.string().datetime().describe('投稿の作成日時'),
  updatedAt: z.string().datetime().describe('投稿の最終更新日時')
});

// 制約値を定数として外出し
export const POST_TITLE_MIN = 1;
export const POST_TITLE_MAX = 200;
```

### 🔑 queryKeyの型安全性比較

React Queryでキャッシュ管理に使用される`queryKey`の実装を比較：

#### **Hey API系（最高の型安全性）** ⭐⭐⭐⭐⭐
```typescript
// 自動生成されるqueryKey関数
const queryKey = getPostsApiQueryKey({ query: { limit: 10 } });
// => [{ _id: 'getPostsApi', baseUrl: 'http://...', query: { limit: 10 } }]

// パラメータが自動的にqueryKeyに含まれる
queryClient.invalidateQueries({ 
  queryKey: getPostsByIdApiQueryKey({ path: { id: "123" } }) 
});
```
- ✅ 完全な型安全性
- ✅ パラメータの自動包含
- ✅ 再利用可能な関数

#### **Orval（シンプルで実用的）** ⭐⭐⭐⭐
```typescript
// エンドポイントごとの関数
const queryKey = getGetPostsApiQueryKey(); // => ['/api/posts']
const queryKey = getGetPostsByIdApiQueryKey(id); // => ['/api/posts/123']

// invalidateでの使用
queryClient.invalidateQueries({ 
  queryKey: getGetPostsApiQueryKey() 
});
```
- ✅ 型安全な関数
- ✅ シンプルなパス形式
- ⚠️ queryパラメータは手動管理

#### **openapi-typescript（標準的）** ⭐⭐⭐
```typescript
// 手動でqueryKeyを構築
$api.useQuery("get", "/api/posts", { params: { query: { limit: 10 } } });
// 内部的に: ["get", "/api/posts", { params: { query: { limit: 10 } } }]

// invalidateも手動
queryClient.invalidateQueries({ 
  queryKey: ["get", "/api/posts"] 
});
```
- ⚠️ 手動構築が必要
- ⚠️ 型推論に依存
- ❌ 専用関数なし

### 📌 パラメータ自動包含の具体例

#### **Hey API（全パラメータ自動包含）** ⭐⭐⭐⭐⭐
```typescript
// queryパラメータも自動的にqueryKeyに含まれる
const key1 = getPostsApiQueryKey({ query: { limit: 10, offset: 20 } });
// => [{ _id: 'getPostsApi', baseUrl: '...', query: { limit: 10, offset: 20 } }]

// pathパラメータも同様
const key2 = getPostsByIdApiQueryKey({ path: { id: "123" } });
// => [{ _id: 'getPostsByIdApi', baseUrl: '...', path: { id: "123" } }]

// bodyやheadersも含まれる（POSTリクエストなど）
const key3 = createPostApiQueryKey({ 
  body: { title: "新規投稿" },
  headers: { "X-Custom": "value" }
});
```

#### **Orval（pathのみ自動、queryは手動）** ⭐⭐⭐
```typescript
// pathパラメータは自動的にURLに埋め込まれる
const key1 = getGetPostsByIdApiQueryKey("123");
// => ['/api/posts/123'] ✅

// queryパラメータは手動で渡す必要がある
const key2 = getGetPostsApiQueryKey({ limit: 10, offset: 20 });
// => ['/api/posts', { limit: 10, offset: 20 }]

// ただし、パラメータなしでも呼べてしまう
const key3 = getGetPostsApiQueryKey();
// => ['/api/posts'] ⚠️ queryパラメータが含まれない！
```

### 💡 選択のガイドライン

- **シンプルさ重視** → `stack-openapi-typescript`
- **最新ツールチェイン** → `stack-heyapi-zod`
- **軽量バリデーション** → `stack-heyapi-valibot`
- **柔軟な構成** → `stack-openapi-typescript-zod`
- **エンタープライズ機能** → `stack-orval`
- **queryKey型安全性重視** → `stack-heyapi-*` または `stack-orval`
