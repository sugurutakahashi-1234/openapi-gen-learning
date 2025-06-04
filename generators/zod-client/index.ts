import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const User = z
  .object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string().min(1).max(100),
    role: z.enum(["admin", "user", "guest"]),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
    isActive: z.boolean(),
    avatarUrl: z.string().url().nullish(),
    metadata: z.record(z.string()).optional(),
  })
  .passthrough();
const Pagination = z
  .object({
    page: z.number().int().gte(1),
    limit: z.number().int().gte(1).lte(100),
    total: z.number().int().gte(0),
    totalPages: z.number().int().gte(0),
  })
  .passthrough();
const UsersListResponse = z
  .object({ users: z.array(User), pagination: Pagination })
  .passthrough();
const ValidationError = z
  .object({
    error: z.literal("validation_error"),
    message: z.string(),
    code: z.literal(400),
    details: z
      .object({
        issues: z.array(
          z
            .object({
              path: z.array(z.string()),
              message: z.string(),
              code: z.string(),
            })
            .passthrough()
        ),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();
const CreateUserRequest = z
  .object({
    email: z.string().email(),
    name: z.string().min(1).max(100),
    role: z.enum(["admin", "user", "guest"]).optional().default("user"),
    metadata: z.record(z.string()).optional(),
  })
  .passthrough();
const ConflictError = z
  .object({
    error: z.literal("conflict"),
    message: z.string(),
    code: z.literal(409),
  })
  .passthrough();
const NotFoundError = z
  .object({
    error: z.literal("not_found"),
    message: z.string(),
    code: z.literal(404),
  })
  .passthrough();
const UpdateUserRequest = z
  .object({
    name: z.string().min(1).max(100),
    role: z.enum(["admin", "user", "guest"]),
    isActive: z.boolean(),
    metadata: z.record(z.string()),
  })
  .partial()
  .passthrough();
const AvatarUploadResponse = z
  .object({ avatarUrl: z.string().url(), message: z.string() })
  .passthrough();
const FileTooLargeError = z
  .object({
    error: z.literal("file_too_large"),
    message: z.string(),
    code: z.literal(413),
  })
  .passthrough();

export const schemas = {
  User,
  Pagination,
  UsersListResponse,
  ValidationError,
  CreateUserRequest,
  ConflictError,
  NotFoundError,
  UpdateUserRequest,
  AvatarUploadResponse,
  FileTooLargeError,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/users",
    alias: "listUsers",
    description: `Retrieve a paginated list of users with optional filtering`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().gte(1).optional().default(1),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().gte(1).lte(100).optional().default(10),
      },
      {
        name: "role",
        type: "Query",
        schema: z.enum(["admin", "user", "guest"]).optional(),
      },
      {
        name: "isActive",
        type: "Query",
        schema: z.boolean().optional(),
      },
    ],
    response: UsersListResponse,
    errors: [
      {
        status: 400,
        description: `Invalid query parameters`,
        schema: ValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/users",
    alias: "createUser",
    description: `Create a new user with the provided information`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateUserRequest,
      },
    ],
    response: User,
    errors: [
      {
        status: 400,
        description: `Invalid user data`,
        schema: ValidationError,
      },
      {
        status: 409,
        description: `User with email already exists`,
        schema: ConflictError,
      },
    ],
  },
  {
    method: "get",
    path: "/users/:id",
    alias: "getUserById",
    description: `Retrieve a specific user by their unique identifier`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: User,
    errors: [
      {
        status: 400,
        description: `Invalid user ID format`,
        schema: ValidationError,
      },
      {
        status: 404,
        description: `User not found`,
        schema: NotFoundError,
      },
    ],
  },
  {
    method: "put",
    path: "/users/:id",
    alias: "updateUser",
    description: `Update an existing user with new information`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateUserRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: User,
    errors: [
      {
        status: 400,
        description: `Invalid user ID or data`,
        schema: ValidationError,
      },
      {
        status: 404,
        description: `User not found`,
        schema: NotFoundError,
      },
    ],
  },
  {
    method: "delete",
    path: "/users/:id",
    alias: "deleteUser",
    description: `Delete a user by their unique identifier`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid user ID format`,
        schema: ValidationError,
      },
      {
        status: 404,
        description: `User not found`,
        schema: NotFoundError,
      },
    ],
  },
  {
    method: "post",
    path: "/users/:id/avatar",
    alias: "uploadUserAvatar",
    description: `Upload an avatar image for a specific user`,
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ avatar: z.instanceof(File) }).passthrough(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: AvatarUploadResponse,
    errors: [
      {
        status: 400,
        description: `Invalid file or user ID`,
        schema: ValidationError,
      },
      {
        status: 404,
        description: `User not found`,
        schema: NotFoundError,
      },
      {
        status: 413,
        description: `File too large`,
        schema: FileTooLargeError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
