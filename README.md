# OpenAPI SDK Generator Comparison

このプロジェクトでは、TypeScript向けのOpenAPI SDKジェネレーターの比較を行います。

## 目的

以下の3つのSDKジェネレーターで生成されるコードの違いを比較し、実際のWebクライアントで使用する際の特徴を評価します：

1. **openapi-zod-client + Zodios**
2. **@hey-api/openapi-ts + @hey-api/client-fetch**
3. **openapi-typescript + openapi-fetch**

## 比較対象

- 生成されるコードの構造
- 型安全性
- ランタイムバリデーション
- API呼び出しの書きやすさ
- バンドルサイズ
- エラーハンドリング

## プロジェクト構成

```
├── openapi.yaml                 # 共通のOpenAPI仕様書
├── generators/
│   ├── zod-client/             # openapi-zod-client + Zodios
│   ├── hey-api/                # @hey-api/openapi-ts + client-fetch
│   └── openapi-typescript/     # openapi-typescript + openapi-fetch
├── clients/
│   ├── zod-client-demo/        # Zodiosを使用したクライアント実装
│   ├── hey-api-demo/           # hey-apiを使用したクライアント実装
│   └── openapi-typescript-demo/ # openapi-fetchを使用したクライアント実装
└── comparison/                 # 比較結果とドキュメント
```

## 使用するOpenAPI仕様

Swagger Petstoreの簡単なAPI仕様を使用して比較を行います：
- GET /pets - ペット一覧取得
- POST /pets - ペット作成
- GET /pets/{petId} - 特定ペット取得

## セットアップ

```bash
npm install
npm run generate:all
npm run dev
```

## TypeScript設定

厳格な型チェックを有効にした設定で、各SDKの型安全性を評価します。

## SDK比較詳細

### 1. openapi-zod-client + Zodios

**特徴:**
- Zodスキーマベースのランタイムバリデーション
- 型とバリデーションが一体化
- 豊富なバリデーション機能

**生成コード:**
```typescript
const Pet = z.object({
  id: z.number().int(),
  name: z.string(),
  tag: z.string().optional(),
}).passthrough();

const api = new Zodios(baseUrl, endpoints);
```

**API呼び出し:**
```typescript
// シンプルなメソッド呼び出し
const pets = await api.listPets({ queries: { limit: 10 } });
const pet = await api.showPetById({ params: { petId: "1" } });
```

**型安全性:** ⭐⭐⭐⭐⭐
- 完全な型推論
- ランタイムバリデーション
- リクエスト/レスポンスの自動検証

**エラーハンドリング:**
- Zodバリデーションエラー
- HTTPエラー
- 詳細なエラー情報付き

**メリット:**
- 最高レベルの型安全性
- ランタイムでのデータ検証
- 開発時の優秀なIntelliSense

**デメリット:**
- バンドルサイズが大きい
- 学習コストが高い
- パフォーマンスオーバーヘッド

---

### 2. @hey-api/openapi-ts + @hey-api/client-fetch

**特徴:**
- モダンなfetchベースクライアント
- 生成されたサービス関数
- 柔軟なエラーハンドリング

**生成コード:**
```typescript
export type Pet = {
  id: number;
  name: string;
  tag?: string;
};

export const listPets = <ThrowOnError extends boolean = false>(
  options?: Options<ListPetsData, ThrowOnError>
) => {
  return client.get<ListPetsResponse, ListPetsError, ThrowOnError>({
    url: '/pets'
  });
};
```

**API呼び出し:**
```typescript
// サービス関数を直接呼び出し
const { data, error } = await listPets({ 
  client,
  query: { limit: 10 }
});
```

**型安全性:** ⭐⭐⭐⭐
- 強力な型推論
- リクエスト/レスポンス型の自動生成
- ランタイムバリデーションなし

**エラーハンドリング:**
- 構造化されたエラー型
- `ThrowOnError`ジェネリクスでエラー処理方法を選択可能
- HTTPステータスコード別のエラー型

**メリット:**
- バランスの良い型安全性
- 使いやすいAPI
- 軽量なランタイム

**デメリット:**
- ランタイムバリデーションなし
- 手動でのエラーチェックが必要

---

### 3. openapi-typescript + openapi-fetch

**特徴:**
- 最小ランタイム
- 型システムによる強力な推論
- パス型ベースのAPI設計

**生成コード:**
```typescript
export interface paths {
  "/pets": {
    get: operations["listPets"];
    post: operations["createPets"];
  };
}

// クライアントは汎用的
const client = createClient<paths>({ baseUrl });
```

**API呼び出し:**
```typescript
// パスと型を明示的に指定
const { data, error } = await client.GET("/pets", {
  params: { query: { limit: 10 } }
});
```

**型安全性:** ⭐⭐⭐⭐⭐
- コンパイル時の完全な型チェック
- パス、パラメーター、レスポンスの厳密な型付け
- 判別共用体による詳細なレスポンス型

**エラーハンドリング:**
- 型レベルでのエラー情報
- HTTPステータスコード別の詳細な型
- ユニオン型による網羅的エラーハンドリング

**メリット:**
- 最軽量のランタイム
- 最高レベルのコンパイル時型安全性
- Tree-shakingに優れている

**デメリット:**
- 手動でのクライアント使用
- ランタイムバリデーションなし
- APIが低レベル

## 総合比較

| 項目 | Zodios | Hey API | OpenAPI TypeScript |
|------|--------|---------|-------------------|
| 型安全性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| ランタイムバリデーション | ✅ | ❌ | ❌ |
| バンドルサイズ | 大 | 中 | 小 |
| 学習コスト | 高 | 中 | 中 |
| 開発体験 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| パフォーマンス | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 推奨用途

**Zodios**: ランタイムでのデータ検証が重要なアプリケーション、型安全性を最優先する場合

**Hey API**: バランスの取れた開発体験とパフォーマンスを求める一般的なWebアプリケーション

**OpenAPI TypeScript**: 最軽量で高性能なクライアントが必要な場合、ライブラリサイズを最小化したい場合