/**
 * Posts関連のReact Query Hooks
 *
 * openapi-react-queryの$apiを利用したシンプルな実装
 * 標準的なReact Queryの使い方に従う
 */
import { useQueryClient } from "@tanstack/react-query";
import { $api } from "../api/client";
import type { components } from "../generated/api";

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
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return $api.useMutation("post", "/api/posts", {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get", "/api/posts"],
      });
    },
  });
};

/**
 * 投稿を更新するフック
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return $api.useMutation("put", "/api/posts/{id}", {
    onSuccess: (
      _data: components["schemas"]["Post"] | undefined,
      variables: {
        params: { path: { id: string } };
        body?: components["schemas"]["UpdatePost"];
      },
    ) => {
      queryClient.invalidateQueries({
        queryKey: ["get", "/api/posts"],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "get",
          "/api/posts/{id}",
          { params: { path: { id: variables.params.path.id } } },
        ],
      });
    },
  });
};

/**
 * 投稿を削除するフック
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return $api.useMutation("delete", "/api/posts/{id}", {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get", "/api/posts"],
      });
    },
  });
};
