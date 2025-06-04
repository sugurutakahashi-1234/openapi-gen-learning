export default {
  input: './openapi.yaml',
  output: './generators/hey-api-zod',
  client: '@hey-api/client-fetch',
  plugins: [
    'zod',
  ],
};