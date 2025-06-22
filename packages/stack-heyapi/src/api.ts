import { createClient } from './generated'

export const client = createClient({
  baseUrl: 'http://localhost:4010',
})