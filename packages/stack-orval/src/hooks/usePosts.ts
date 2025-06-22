/**
 * Posts関連のReact Query Hooks
 *
 * Orvalで生成されたReact Query hooksをラップし、
 * キャッシュの無効化処理を追加
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
import type { GetPostsApiParams } from "../generated/model";

/**
 * 投稿一覧を取得するフック
 */
export const usePosts = (params?: GetPostsApiParams) => {
  return useGetPostsApi(params);
};

/**
 * 投稿を個別に取得するフック
 */
export const usePost = (id: string) => {
  return useGetPostsByIdApi(id);
};

/**
 * 投稿を作成するフック
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return usePostPostsApi({
    mutation: {
      onSuccess: () => {
        // 投稿一覧のキャッシュを無効化
        queryClient.invalidateQueries({
          queryKey: getGetPostsApiQueryKey(),
        });
      },
    },
  });
};

/**
 * 投稿を更新するフック
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return usePutPostsByIdApi({
    mutation: {
      onSuccess: (_data, variables) => {
        // 投稿一覧のキャッシュを無効化
        queryClient.invalidateQueries({
          queryKey: getGetPostsApiQueryKey(),
        });
        // 個別投稿のキャッシュも無効化
        if (variables.id) {
          queryClient.invalidateQueries({
            queryKey: getGetPostsByIdApiQueryKey(variables.id),
          });
        }
      },
    },
  });
};

/**
 * 投稿を削除するフック
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useDeletePostsByIdApi({
    mutation: {
      onSuccess: () => {
        // 投稿一覧のキャッシュを無効化
        queryClient.invalidateQueries({
          queryKey: getGetPostsApiQueryKey(),
        });
      },
    },
  });
};
