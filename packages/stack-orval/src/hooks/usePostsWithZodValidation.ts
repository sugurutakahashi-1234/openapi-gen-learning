/**
 * Posts関連のReact Query Hooks with Zod Validation
 *
 * Zodを使用したランタイムバリデーション付きのフック
 * APIレスポンスをZodスキーマで検証し、型安全性を高める
 */
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  getGetPostsApiQueryKey,
  getGetPostsByIdApiQueryKey,
  useDeletePostsByIdApi,
  useGetPostsApi,
  useGetPostsByIdApi,
  usePostPostsApi,
  usePutPostsByIdApi,
} from "../generated/api";
import type { GetPostsApiParams, UpdatePost } from "../generated/model";

// Zodスキーマの定義
const PostTagSchema = z.object({
  tagId: z.string(),
  tagName: z.string(),
});

const PostSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  content: z.string(),
  published: z.boolean(),
  userId: z.string(),
  tags: z.array(PostTagSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const PostsResponseSchema = z.object({
  data: z.object({
    data: z.array(PostSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  }),
  status: z.literal("success"),
});

const PostResponseSchema = z.object({
  data: z.object({
    data: PostSchema,
  }),
  status: z.literal("success"),
});

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string(),
  published: z.boolean(),
  userId: z.string(),
});

const UpdatePostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  userId: z.string().optional(),
});

/**
 * バリデーションエラーを扱うカスタムエラークラス
 */
export class ZodValidationError extends Error {
  constructor(
    message: string,
    public zodError: z.ZodError,
  ) {
    super(message);
    this.name = "ZodValidationError";
  }
}

/**
 * 投稿一覧を取得するフック（Zodバリデーション付き）
 */
export const usePostsWithValidation = (params?: GetPostsApiParams) => {
  const query = useGetPostsApi(params, {
    query: {
      select: (response) => {
        try {
          const validated = PostsResponseSchema.parse(response.data);
          return validated;
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new ZodValidationError(
              "レスポンスのバリデーションに失敗しました",
              error,
            );
          }
          throw error;
        }
      },
    },
  });

  return query;
};

/**
 * 投稿を個別に取得するフック（Zodバリデーション付き）
 */
export const usePostWithValidation = (id: string) => {
  const query = useGetPostsByIdApi(id, {
    query: {
      select: (response) => {
        try {
          const validated = PostResponseSchema.parse(response.data);
          return validated;
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new ZodValidationError(
              "レスポンスのバリデーションに失敗しました",
              error,
            );
          }
          throw error;
        }
      },
    },
  });

  return query;
};

/**
 * 投稿を作成するフック（Zodバリデーション付き）
 */
export const useCreatePostWithValidation = () => {
  const queryClient = useQueryClient();
  const baseMutation = usePostPostsApi({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetPostsApiQueryKey(),
        });
      },
    },
  });

  return {
    ...baseMutation,
    mutate: (variables: { data: z.infer<typeof CreatePostSchema> }) => {
      try {
        // リクエストデータのバリデーション
        const validatedData = CreatePostSchema.parse(variables.data);

        // バリデーション済みデータでmutateを実行
        return baseMutation.mutate({ data: validatedData });
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ZodValidationError(
            "データのバリデーションに失敗しました",
            error,
          );
        }
        throw error;
      }
    },
    mutateAsync: async (variables: {
      data: z.infer<typeof CreatePostSchema>;
    }) => {
      try {
        // リクエストデータのバリデーション
        const validatedData = CreatePostSchema.parse(variables.data);

        // バリデーション済みデータでmutateAsyncを実行
        const response = await baseMutation.mutateAsync({
          data: validatedData,
        });

        // レスポンスのバリデーション
        PostResponseSchema.parse(response.data);
        return response;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ZodValidationError(
            "データのバリデーションに失敗しました",
            error,
          );
        }
        throw error;
      }
    },
  };
};

/**
 * 投稿を更新するフック（Zodバリデーション付き）
 */
export const useUpdatePostWithValidation = () => {
  const queryClient = useQueryClient();
  const baseMutation = usePutPostsByIdApi({
    mutation: {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: getGetPostsApiQueryKey(),
        });
        if (variables.id) {
          queryClient.invalidateQueries({
            queryKey: getGetPostsByIdApiQueryKey(variables.id),
          });
        }
      },
    },
  });

  return {
    ...baseMutation,
    mutate: (variables: {
      id: string;
      data: z.infer<typeof UpdatePostSchema>;
    }) => {
      try {
        // リクエストデータのバリデーション
        const validatedData = UpdatePostSchema.parse(variables.data);

        // バリデーション済みデータでmutateを実行
        return baseMutation.mutate({
          id: variables.id,
          data: validatedData as UpdatePost,
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ZodValidationError(
            "データのバリデーションに失敗しました",
            error,
          );
        }
        throw error;
      }
    },
    mutateAsync: async (variables: {
      id: string;
      data: z.infer<typeof UpdatePostSchema>;
    }) => {
      try {
        // リクエストデータのバリデーション
        const validatedData = UpdatePostSchema.parse(variables.data);

        // バリデーション済みデータでmutateAsyncを実行
        const response = await baseMutation.mutateAsync({
          id: variables.id,
          data: validatedData as UpdatePost,
        });

        // レスポンスのバリデーション
        PostResponseSchema.parse(response.data);
        return response;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ZodValidationError(
            "データのバリデーションに失敗しました",
            error,
          );
        }
        throw error;
      }
    },
  };
};

/**
 * 投稿を削除するフック（Zodバリデーション付き）
 */
export const useDeletePostWithValidation = () => {
  const queryClient = useQueryClient();

  return useDeletePostsByIdApi({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetPostsApiQueryKey(),
        });
      },
    },
  });
};

// Zodスキーマのエクスポート（外部で利用する場合）
export const schemas = {
  Post: PostSchema,
  PostsResponse: PostsResponseSchema,
  PostResponse: PostResponseSchema,
  CreatePost: CreatePostSchema,
  UpdatePost: UpdatePostSchema,
};
