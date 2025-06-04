import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Pet = z
  .object({
    id: z.number().int(),
    name: z.string(),
    tag: z.string().optional(),
  })
  .passthrough();
const Pets = z.array(Pet);
const Error = z
  .object({ code: z.number().int(), message: z.string() })
  .passthrough();

export const schemas = {
  Pet,
  Pets,
  Error,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/pets",
    alias: "listPets",
    requestFormat: "json",
    parameters: [
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(Pet),
  },
  {
    method: "post",
    path: "/pets",
    alias: "createPets",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/pets/:petId",
    alias: "showPetById",
    requestFormat: "json",
    parameters: [
      {
        name: "petId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Pet,
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
