import createClient from "openapi-fetch";
import type { paths } from "./generated/schema";

export const client = createClient<paths>({
  baseUrl: "http://localhost:4010",
});
