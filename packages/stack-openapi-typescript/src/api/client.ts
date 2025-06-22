/**
 * openapi-react-query クライアントの設定
 *
 * openapi-fetchクライアントをベースに、React Query用のフックを生成
 */

import type { OpenapiQueryClient } from "openapi-react-query";
import createClient from "openapi-react-query";
import { client as fetchClient } from "../api";
import type { paths } from "../generated/api";

/**
 * React Query用のAPIクライアント
 * useQuery、useMutation などのフックを自動生成
 */
export const $api: OpenapiQueryClient<paths, "application/json"> =
  createClient(fetchClient);
