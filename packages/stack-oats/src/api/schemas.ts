/**
 * Zodスキーマの再エクスポート
 * 
 * 生成されたZodスキーマを使いやすい形で再エクスポート
 */
import { schemas as generatedSchemas } from "../generated/api-zod";

// 個別のスキーマをエクスポート
export const {
  User,
  CreateUser,
  Post,
  CreatePost,
  UpdatePost,
  Tag,
  CreateTag,
  PostTag,
  Comment,
  CreateComment,
  UpdateComment,
  ErrorResponse,
  ApiErrorType,
} = generatedSchemas;

// スキーマグループとして再エクスポート
export const schemas = generatedSchemas;