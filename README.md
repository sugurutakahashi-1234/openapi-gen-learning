# OpenAPI SDK Generator Comparison

このプロジェクトでは、TypeScript向けのOpenAPI SDKジェネレーターの比較を行います。

## 目的

以下の4つのアプローチで生成されるコードの違いを比較し、実際のWebクライアントで使用する際の特徴を評価します：

1. **openapi-zod-client + Zodios**
2. **@hey-api/openapi-ts + @hey-api/client-fetch**
3. **@hey-api/openapi-ts + Zod**
4. **openapi-typescript + openapi-fetch**

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
│   ├── hey-api-zod/            # @hey-api/openapi-ts + Zod schemas
│   └── openapi-typescript/     # openapi-typescript + openapi-fetch
├── clients/
│   ├── zod-client-demo/        # Zodiosを使用したクライアント実装
│   ├── hey-api-demo/           # hey-apiを使用したクライアント実装
│   ├── hey-api-zod-demo/       # hey-api + Zodを使用したクライアント実装
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

### 3. @hey-api/openapi-ts + Zod

**特徴:**
- Hey APIの便利なサービス関数
- Zodスキーマによるランタイムバリデーション
- 必要に応じた柔軟なバリデーション

**生成コード:**
```typescript
// Hey API service functions
export const listPets = (options) => {
  return client.get<ListPetsResponses, ListPetsErrors>({
    url: '/pets'
  });
};

// Generated Zod schemas
export const zPet = z.object({
  id: z.coerce.bigint(),
  name: z.string(),
  tag: z.string().optional()
});
```

**API呼び出し:**
```typescript
// Hey APIでデータ取得
const response = await listPets({ client, query: { limit: 10 } });

// 必要に応じてZodでバリデーション
if (response.data) {
  const validatedData = zListPetsResponse.parse(response.data);
  console.log("Validated pets:", validatedData);
}
```

**型安全性:** ⭐⭐⭐⭐⭐
- Hey APIの型推論
- Zodによるランタイムバリデーション
- 柔軟なバリデーション戦略

**エラーハンドリング:**
- Hey APIのエラー型
- Zodバリデーションエラー
- 両方の利点を享受

**メリット:**
- Hey APIとZodの両方の利点
- 必要な箇所だけバリデーション可能
- 最も柔軟なアプローチ
- 段階的な導入が可能

**デメリット:**
- 手動でのバリデーション呼び出しが必要
- 設定がやや複雑
- 型の不一致への対処が必要

---

### 4. openapi-typescript + openapi-fetch

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

| 項目 | Zodios | Hey API | Hey API + Zod | OpenAPI TypeScript |
|------|--------|---------|---------------|-------------------|
| 型安全性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| ランタイムバリデーション | ✅ 自動 | ❌ | ✅ 手動 | ❌ |
| バンドルサイズ | 大 | 中 | 中～大 | 小 |
| 学習コスト | 高 | 中 | 中～高 | 中 |
| 開発体験 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| パフォーマンス | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 柔軟性 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 推奨用途

**Zodios**: ランタイムでのデータ検証が重要で、完全統合されたソリューションを求める場合

**Hey API**: バランスの取れた開発体験とパフォーマンスを求める一般的なWebアプリケーション

**Hey API + Zod**: 最大の柔軟性を求め、必要な箇所だけランタイムバリデーションを行いたい場合

**OpenAPI TypeScript**: 最軽量で高性能なクライアントが必要な場合、ライブラリサイズを最小化したい場合

## 選択指針

### プロジェクトの特性に応じた選択

- **新規プロジェクト** → Hey API + Zod（最も柔軟で将来性がある）
- **パフォーマンス重視** → OpenAPI TypeScript（最軽量）
- **安全性最優先** → Zodios（完全なランタイム保護）
- **既存プロジェクト** → Hey API（段階的導入が容易）

### チームのスキルレベル

- **TypeScript上級者** → OpenAPI TypeScript または Hey API + Zod
- **中級者** → Hey API
- **Zod経験者** → Zodios または Hey API + Zod
- **初心者** → Hey API

### アプリケーションの要件

- **外部API連携** → Zodios または Hey API + Zod（データ検証が重要）
- **内部API** → Hey API または OpenAPI TypeScript
- **モバイルアプリ** → OpenAPI TypeScript（軽量性重視）
- **エンタープライズ** → Hey API + Zod（柔軟性と安全性のバランス）