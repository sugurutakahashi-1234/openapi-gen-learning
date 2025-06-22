/**
 * Posts関連のReact Query Hooks with Auto-Generated Zod Validation
 *
 * Orvalで自動生成されたZodスキーマを使用したバリデーション付きのフック
 * APIレスポンスをZodスキーマで検証し、型安全性を高める
 */
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetPostsApiQueryKey,
  getGetPostsByIdApiQueryKey,
  useDeletePostsByIdApi,
  useGetPostsApi,
  useGetPostsByIdApi,
  usePostPostsApi,
  usePutPostsByIdApi,
} from "../generated/api";
import type { CreatePost, GetPostsApiParams, UpdatePost } from "../generated/model";
import {
  getPostsApiResponse,
  getPostsByIdApiResponse,
  postPostsApiBody,
  putPostsByIdApiBody,
} from "../generated/zod";

/**
 * バリデーションエラーを扱うカスタムエラークラス
 */
export class ZodValidationError extends Error {
  constructor(
    message: string,
    public zodError: unknown,
  ) {
    super(message);
    this.name = "ZodValidationError";
  }
}

/**
 * 投稿一覧を取得するフック（自動生成Zodバリデーション付き）
 */
export const usePostsWithGeneratedValidation = (params?: GetPostsApiParams) => {
  const query = useGetPostsApi(params, {
    query: {
      select: (response) => {
        try {
          const validated = getPostsApiResponse.parse(response.data);
          return validated;
        } catch (error) {
          throw new ZodValidationError(
            "レスポンスのバリデーションに失敗しました",
            error,
          );
        }
      },
    },
  });

  return query;
};

/**
 * 投稿を個別に取得するフック（自動生成Zodバリデーション付き）
 */
export const usePostWithGeneratedValidation = (id: string) => {
  const query = useGetPostsByIdApi(id, {
    query: {
      select: (response) => {
        try {
          const validated = getPostsByIdApiResponse.parse(response.data);
          return validated;
        } catch (error) {
          throw new ZodValidationError(
            "レスポンスのバリデーションに失敗しました",
            error,
          );
        }
      },
    },
  });

  return query;
};

/**
 * 投稿を作成するフック（自動生成Zodバリデーション付き）
 */
export const useCreatePostWithGeneratedValidation = () => {
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
    mutate: (variables: { data: Parameters<typeof postPostsApiBody.parse>[0] }) => {
      try {
        // リクエストデータのバリデーション
        const validatedData = postPostsApiBody.parse(variables.data);
        
        // バリデーション済みデータでmutateを実行
        return baseMutation.mutate({ data: validatedData });
      } catch (error) {
        throw new ZodValidationError(
          "データのバリデーションに失敗しました",
          error,
        );
      }
    },
    mutateAsync: async (variables: {
      data: Parameters<typeof postPostsApiBody.parse>[0];
    }) => {
      try {
        // リクエストデータのバリデーション
        const validatedData = postPostsApiBody.parse(variables.data);

        // バリデーション済みデータでmutateAsyncを実行
        const response = await baseMutation.mutateAsync({
          data: validatedData,
        });

        return response;
      } catch (error) {
        throw new ZodValidationError(
          "データのバリデーションに失敗しました",
          error,
        );
      }
    },
  };
};

/**
 * 投稿を更新するフック（自動生成Zodバリデーション付き）
 */
export const useUpdatePostWithGeneratedValidation = () => {
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
      data: Parameters<typeof putPostsByIdApiBody.parse>[0];
    }) => {
      try {
        // リクエストデータのバリデーション
        const validatedData = putPostsByIdApiBody.parse(variables.data);

        // バリデーション済みデータでmutateを実行
        return baseMutation.mutate({
          id: variables.id,
          data: validatedData as UpdatePost,
        });
      } catch (error) {
        throw new ZodValidationError(
          "データのバリデーションに失敗しました",
          error,
        );
      }
    },
    mutateAsync: async (variables: {
      id: string;
      data: Parameters<typeof putPostsByIdApiBody.parse>[0];
    }) => {
      try {
        // リクエストデータのバリデーション
        const validatedData = putPostsByIdApiBody.parse(variables.data);

        // バリデーション済みデータでmutateAsyncを実行
        const response = await baseMutation.mutateAsync({
          id: variables.id,
          data: validatedData as UpdatePost,
        });

        return response;
      } catch (error) {
        throw new ZodValidationError(
          "データのバリデーションに失敗しました",
          error,
        );
      }
    },
  };
};

/**
 * 投稿を削除するフック（自動生成Zodバリデーション付き）
 */
export const useDeletePostWithGeneratedValidation = () => {
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