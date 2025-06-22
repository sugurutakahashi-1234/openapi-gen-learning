/**
 * Posts関連のReact Query Hooks（Zodバリデーション付き）
 *
 * Hey APIで生成されたReact Query hooksとZodスキーマを利用した実装
 * 型安全性とランタイム安全性の両方を提供
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePostsByIdApiMutation,
  getPostsApiOptions,
  getPostsByIdApiOptions,
  postPostsApiMutation,
  putPostsByIdApiMutation,
} from "../generated/@tanstack/react-query.gen";
import type { CreatePost, UpdatePost } from "../generated/types.gen";
import { zCreatePost, zUpdatePost } from "../generated/zod.gen";

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
 * 投稿を作成するフック（Zodバリデーション付き）
 *
 * - 型安全性: 引数の型が保証される（IDE補完も効く）
 * - ランタイム安全性: Zodによる実行時検証も実施
 * - 開発体験: TypeScriptとZodの両方の利点を活用
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutationOptions = postPostsApiMutation();

  const mutation = useMutation({
    ...mutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getPostsApiOptions().queryKey,
      });
    },
  });

  // 型安全な引数を受け取りつつ、ランタイムバリデーションも実行
  const createPost = async (data: CreatePost) => {
    // バリデーション実行（型は既に保証されているが、ランタイムでも検証）
    const validatedData = zCreatePost.parse(data);

    return mutation.mutateAsync({
      body: validatedData,
    });
  };

  return {
    createPost,
    ...mutation,
  };
};

/**
 * 投稿を更新するフック（Zodバリデーション付き）
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const mutationOptions = putPostsByIdApiMutation();

  const mutation = useMutation({
    ...mutationOptions,
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

  const updatePost = async ({ id, data }: { id: string; data: UpdatePost }) => {
    // バリデーション実行
    const validatedData = zUpdatePost.parse(data);

    return mutation.mutateAsync({
      path: { id },
      body: validatedData,
    });
  };

  return {
    updatePost,
    ...mutation,
  };
};

/**
 * 投稿を削除するフック
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const mutationOptions = deletePostsByIdApiMutation();

  const mutation = useMutation({
    ...mutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getPostsApiOptions().queryKey,
      });
    },
  });

  const deletePost = async (id: string) => {
    return mutation.mutateAsync({
      path: { id },
    });
  };

  return {
    deletePost,
    ...mutation,
  };
};
