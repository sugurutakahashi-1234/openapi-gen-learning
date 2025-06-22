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
