import { defineConfig } from 'orval'

export default defineConfig({
  posts: {
    input: {
      target: '../../openapi.yaml',
    },
    output: {
      mode: 'split',
      target: './src/generated/api.ts',
      schemas: './src/generated/model',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/axiosInstance.ts',
          name: 'customInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
})