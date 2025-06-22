import { defaultPlugins, defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "../../openapi.yaml",
  output: {
    path: "./src/generated",
    format: "biome",
    lint: "biome",
  },
  plugins: [
    ...defaultPlugins,
    {
      name: "@hey-api/client-fetch",
      baseUrl: "http://localhost:4010",
      throwOnError: true,
    },
    {
      name: "@hey-api/typescript",
      enums: "javascript",
    },
    "valibot",
    {
      name: "@hey-api/sdk",
      validator: true,
    },
    {
      name: "valibot",
      exportFromIndex: true,
    },
    "@tanstack/react-query",
  ],
});
