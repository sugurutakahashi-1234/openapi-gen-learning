/**
 * Posts関連のReact Query Hooks
 * 
 * openapi-react-queryを使用し、Zodバリデーションを組み込んだ実装
 * 型安全性とランタイム安全性の両方を提供
 */
import { useQueryClient } from "@tanstack/react-query";
import { $api } from "../api/client";
import { schemas } from "../api/schemas";
import type { components } from "../generated/schema";

/**
 * 投稿一覧を取得するフック
 */
export const usePosts = () => {
  return $api.useQuery("get", "/api/posts");
};

/**
 * 投稿を個別に取得するフック
 */
export const usePost = (id: string) => {
  return $api.useQuery("get", "/api/posts/{id}", {
    params: { path: { id } },
  });
};

/**
 * 投稿を作成するフック
 * 
 * パターン1の実装: フック内でバリデーション（推奨）
 * - 型安全性: 引数の型が保証される（IDE補完も効く）
 * - ランタイム安全性: Zodによる実行時検証も実施
 * - 開発体験: TypeScriptとZodの両方の利点を活用
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("post", "/api/posts");

  // 型安全な引数を受け取りつつ、ランタイムバリデーションも実行
  const createPost = async (data: components["schemas"]["CreatePost"]) => {
    // バリデーション実行（型は既に保証されているが、ランタイムでも検証）
    const validatedData = schemas.CreatePost.parse(data);

    return mutation.mutateAsync(
      {
        body: validatedData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get", "/api/posts"],
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
 * Zodバリデーションを組み込んだ実装
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("put", "/api/posts/{id}");

  const updatePost = async ({
    id,
    data,
  }: {
    id: string;
    data: components["schemas"]["UpdatePost"];
  }) => {
    // バリデーション実行
    const validatedData = schemas.UpdatePost.parse(data);

    return mutation.mutateAsync(
      {
        params: { path: { id } },
        body: validatedData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get", "/api/posts"],
          });
          queryClient.invalidateQueries({
            queryKey: ["get", "/api/posts/{id}", { params: { path: { id } } }],
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
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const mutation = $api.useMutation("delete", "/api/posts/{id}");

  const deletePost = async (id: string) => {
    return mutation.mutateAsync(
      {
        params: { path: { id } },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get", "/api/posts"],
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