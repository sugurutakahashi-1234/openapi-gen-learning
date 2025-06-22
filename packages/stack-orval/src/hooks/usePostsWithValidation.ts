/**
 * Posts関連のReact Query Hooks with Auto-Generated Zod Validation
 *
 * Orvalで自動生成されたZodスキーマを使用したバリデーション付きのフック
 * stack-oatsのパターンに従い、簡潔に実装
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
import type {
  CreatePost,
  GetPostsApiParams,
  UpdatePost,
} from "../generated/model";
import { postPostsApiBody, putPostsByIdApiBody } from "../generated/zod";

/**
 * 投稿一覧を取得するフック
 */
export const usePostsWithGeneratedValidation = (params?: GetPostsApiParams) => {
  return useGetPostsApi(params);
};

/**
 * 投稿を個別に取得するフック
 */
export const usePostWithGeneratedValidation = (id: string) => {
  return useGetPostsByIdApi(id);
};

/**
 * 投稿を作成するフック
 *
 * 自動生成されたZodスキーマでバリデーション
 */
export const useCreatePostWithGeneratedValidation = () => {
  const queryClient = useQueryClient();
  const mutation = usePostPostsApi();

  const createPost = async (data: CreatePost) => {
    // バリデーション実行
    const validatedData = postPostsApiBody.parse(data);

    return mutation.mutateAsync(
      { data: validatedData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetPostsApiQueryKey(),
          });
        },
      },
    );
  };

  return {
    createPost,
    ...mutation,
  };
};

/**
 * 投稿を更新するフック
 *
 * 自動生成されたZodスキーマでバリデーション
 */
export const useUpdatePostWithGeneratedValidation = () => {
  const queryClient = useQueryClient();
  const mutation = usePutPostsByIdApi();

  const updatePost = async ({ id, data }: { id: string; data: UpdatePost }) => {
    // バリデーション実行
    const validatedData = putPostsByIdApiBody.parse(data);

    return mutation.mutateAsync(
      {
        id,
        data: validatedData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetPostsApiQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetPostsByIdApiQueryKey(id),
          });
        },
      },
    );
  };

  return {
    updatePost,
    ...mutation,
  };
};

/**
 * 投稿を削除するフック
 */
export const useDeletePostWithGeneratedValidation = () => {
  const queryClient = useQueryClient();
  const mutation = useDeletePostsByIdApi();

  const deletePost = async (id: string) => {
    return mutation.mutateAsync(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetPostsApiQueryKey(),
          });
        },
      },
    );
  };

  return {
    deletePost,
    ...mutation,
  };
};
