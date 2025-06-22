# Stack HeyAPI

Hey APIによるOpenAPIクライアント生成の実装例です。

## 特徴

- **@hey-api/openapi-ts**による自動生成
- React Query hooks（`@tanstack/react-query.gen.ts`）の自動生成
- Zodスキーマ（`zod.gen.ts`）の自動生成
- 型安全性とランタイムバリデーションの両立

## ディレクトリ構造

```
src/
├── generated/              # Hey APIによる自動生成ファイル
│   ├── @tanstack/
│   │   └── react-query.gen.ts  # React Query hooks
│   ├── client.gen.ts           # APIクライアント
│   ├── types.gen.ts            # TypeScript型定義
│   └── zod.gen.ts              # Zodスキーマ
└── hooks/
    └── usePosts.ts             # カスタムフック（Zodバリデーション付き）
```

## 使用方法

### 基本的な使い方（生成されたフックをそのまま使用）

```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPostsApiOptions, postPostsApiMutation } from "./generated/@tanstack/react-query.gen";

// GET
const posts = useQuery(getPostsApiOptions());

// POST
const mutation = useMutation(postPostsApiMutation());
await mutation.mutateAsync({ body: { title: "Hello", content: "World" } });
```

### Zodバリデーション付きカスタムフック

```typescript
import { useCreatePost } from "./hooks/usePosts";

const { createPost, isLoading, error } = useCreatePost();

// 型安全 + ランタイムバリデーション
await createPost({
  title: "Hello",
  content: "World", 
  userId: "123",
  published: false
});
```

## Stack OATsとの違い

| 項目 | Stack HeyAPI | Stack OATs |
|------|-------------|------------|
| クライアント生成 | @hey-api/openapi-ts | openapi-typescript + openapi-fetch |
| React Query | 自動生成されたhooks | openapi-react-query |
| Zodスキーマ | 自動生成（zod.gen.ts） | openapi-zod-clientで別途生成 |
| カスタマイズ性 | 中（生成されたコードをラップ） | 高（$apiインスタンスで統一的に管理） |

## メリット

1. **完全な自動生成**: React Query hooksも含めて自動生成
2. **型定義の一貫性**: 全て同じツールで生成されるため一貫性が高い
3. **Zodスキーマ**: バリデーション用のスキーマも同時に生成

## デメリット

1. **カスタマイズの制限**: 生成されたコードの変更は再生成で失われる
2. **ボイラープレート**: バリデーションを追加する場合はラップする必要がある