import { defineConfig } from "orval";

export default defineConfig({
  posts: {
    input: {
      target: "../../openapi.yaml",
    },
    output: {
      mode: "split",
      target: "./src/generated/api.ts",
      schemas: "./src/generated/model",
      client: "react-query",
      httpClient: "fetch", // fetchを使用
      baseUrl: "http://localhost:4010", // APIのベースURL
      mock: {
        type: "msw", // MSW v2形式のモックハンドラーを生成
        delay: 1000, // デフォルトの遅延時間（ミリ秒）
        baseUrl: "http://localhost:4010", // APIと同じURL（MSWがインターセプト）
      },
    },
  },
  postsZod: {
    input: {
      target: "../../openapi.yaml",
    },
    output: {
      mode: "split",
      target: "./src/generated/zod.ts",
      schemas: "./src/generated/zod",
      client: "zod",
    },
  },
});
