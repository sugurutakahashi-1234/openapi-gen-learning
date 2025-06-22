/**
 * Posts関連のReact Query Hooks
 *
 * Hey APIで生成されたReact Query hooksをシンプルに利用
 * TypeScriptの型安全性に依存し、生成されたコードを最大限活用
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePostsByIdApiMutation,
  getPostsApiOptions,
  getPostsByIdApiOptions,
  postPostsApiMutation,
  putPostsByIdApiMutation,
} from "../generated/@tanstack/react-query.gen";

/**
 * 投稿一覧を取得するフック
 */
export const usePosts = () => {
  return useQuery(getPostsApiOptions());
};

/**
 * 投稿を個別に取得するフック
 */
export const usePost = (id: string) => {
  return useQuery(
    getPostsByIdApiOptions({
      path: { id },
    }),
  );
};

/**
 * 投稿を作成するフック
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...postPostsApiMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getPostsApiOptions().queryKey,
      });
    },
  });
};

/**
 * 投稿を更新するフック
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...putPostsByIdApiMutation(),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: getPostsApiOptions().queryKey,
      });
      if (variables.path?.id) {
        queryClient.invalidateQueries({
          queryKey: getPostsByIdApiOptions({ path: { id: variables.path.id } })
            .queryKey,
        });
      }
    },
  });
};

/**
 * 投稿を削除するフック
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...deletePostsByIdApiMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getPostsApiOptions().queryKey,
      });
    },
  });
};
