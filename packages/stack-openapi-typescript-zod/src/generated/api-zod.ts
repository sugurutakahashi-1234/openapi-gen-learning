import { z } from "zod";

const User = z
  .object({
    id: z.string(),
    name: z.string().min(1).max(100),
    email: z.string().email(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .strict()
  .passthrough();
const ApiErrorType = z.enum([
  "BadRequest",
  "ValidationFailed",
  "InvalidJson",
  "InvalidAgeRange",
  "Unauthorized",
  "Forbidden",
  "NotFound",
  "UserNotFound",
  "PostNotFound",
  "CommentNotFound",
  "TagNotFound",
  "Conflict",
  "EmailAlreadyExists",
  "TagAlreadyExists",
  "Unknown",
  "DatabaseError",
  "InternalServerError",
]);
const ErrorResponse = z
  .object({
    data: z.null(),
    status: z.literal("error"),
    errorType: ApiErrorType,
    message: z.string(),
    description: z.string(),
  })
  .strict()
  .passthrough();
const CreateUser = z
  .object({ name: z.string().min(1).max(100), email: z.string().email() })
  .strict()
  .passthrough();
const Tag = z
  .object({
    id: z.string(),
    name: z.string().min(1).max(50),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .strict()
  .passthrough();
const PostTag = z
  .object({
    postId: z.string(),
    tagId: z.string(),
    tag: Tag,
    taggedAt: z.string().datetime({ offset: true }),
  })
  .strict()
  .passthrough();
const Post = z
  .object({
    id: z.string(),
    title: z.string().min(1).max(200),
    content: z.string(),
    published: z.boolean(),
    userId: z.string(),
    tags: z.array(PostTag),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .strict()
  .passthrough();
const CreatePost = z
  .object({
    title: z.string().min(1).max(200),
    content: z.string().min(1),
    published: z.boolean().optional().default(false),
    userId: z.string(),
    tagIds: z.array(z.string()).optional(),
  })
  .strict()
  .passthrough();
const UpdatePost = z
  .object({
    title: z.string().min(1).max(200),
    content: z.string().min(1),
    published: z.boolean(),
    tagIds: z.array(z.string()),
  })
  .partial()
  .strict()
  .passthrough();
const CreateTag = z
  .object({
    name: z.string().min(1).max(50),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  })
  .strict()
  .passthrough();
const Comment = z
  .object({
    id: z.string(),
    content: z.string().min(1),
    postId: z.string(),
    user: z
      .object({
        id: z.string(),
        name: z.string().min(1).max(100),
        email: z.string().email(),
      })
      .strict()
      .passthrough(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .strict()
  .passthrough();
const CreateComment = z
  .object({
    content: z.string().min(1),
    postId: z.string(),
    userId: z.string(),
  })
  .strict()
  .passthrough();
const UpdateComment = z
  .object({ content: z.string().min(1) })
  .strict()
  .passthrough();

export const schemas = {
  User,
  ApiErrorType,
  ErrorResponse,
  CreateUser,
  Tag,
  PostTag,
  Post,
  CreatePost,
  UpdatePost,
  CreateTag,
  Comment,
  CreateComment,
  UpdateComment,
};
