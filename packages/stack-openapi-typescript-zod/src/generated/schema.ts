export interface paths {
    "/api/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 全ユーザーを取得
         * @description システムに登録されているすべてのユーザーを取得します
         */
        get: operations["getUsersApi"];
        put?: never;
        /**
         * 新規ユーザーを作成
         * @description 新しいユーザーをシステムに登録します
         */
        post: operations["postUsersApi"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/users/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 特定のユーザーを取得
         * @description 指定されたIDのユーザー情報を取得します
         */
        get: operations["getUsersByIdApi"];
        put?: never;
        post?: never;
        /**
         * ユーザーを削除
         * @description 指定されたIDのユーザーを削除します
         */
        delete: operations["deleteUsersByIdApi"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 全投稿を取得
         * @description システムに登録されているすべての投稿を取得します。公開状態でフィルタ可能
         */
        get: operations["getPostsApi"];
        put?: never;
        /**
         * 新規投稿を作成
         * @description 新しい投稿をシステムに登録します
         */
        post: operations["postPostsApi"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/posts/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 特定の投稿を取得
         * @description 指定されたIDの投稿情報を取得します
         */
        get: operations["getPostsByIdApi"];
        /**
         * 投稿を更新
         * @description 指定されたIDの投稿を更新します
         */
        put: operations["putPostsByIdApi"];
        post?: never;
        /**
         * 投稿を削除
         * @description 指定されたIDの投稿を削除します
         */
        delete: operations["deletePostsByIdApi"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 全タグを取得
         * @description システムに登録されているすべてのタグを取得します
         */
        get: operations["getTagsApi"];
        put?: never;
        /**
         * 新規タグを作成
         * @description 新しいタグをシステムに登録します
         */
        post: operations["postTagsApi"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tags/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 特定のタグを取得
         * @description 指定されたIDのタグ情報を取得します
         */
        get: operations["getTagsByIdApi"];
        put?: never;
        post?: never;
        /**
         * タグを削除
         * @description 指定されたIDのタグを削除します
         */
        delete: operations["deleteTagsByIdApi"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/comments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 特定の投稿のコメントを取得
         * @description 指定された投稿IDに関連するすべてのコメントを取得します
         */
        get: operations["getCommentsApi"];
        put?: never;
        /**
         * 新規コメントを作成
         * @description 新しいコメントをシステムに登録します
         */
        post: operations["postCommentsApi"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/comments/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 特定のコメントを取得
         * @description 指定されたIDのコメント情報を取得します
         */
        get: operations["getCommentsByIdApi"];
        /**
         * コメントを更新
         * @description 指定されたIDのコメントを更新します
         */
        put: operations["putCommentsByIdApi"];
        post?: never;
        /**
         * コメントを削除
         * @description 指定されたIDのコメントを削除します
         */
        delete: operations["deleteCommentsByIdApi"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description ユーザー情報 */
        User: {
            /**
             * Format: cuid
             * @description 一意識別子（CUID形式）
             * @example clh1234567890abcdef
             */
            id: string;
            /**
             * @description 名前
             * @example 山田太郎
             */
            name: string;
            /**
             * Format: email
             * @description メールアドレス
             * @example user@example.com
             */
            email: string;
            /**
             * Format: date-time
             * @description 作成日時
             * @example 2024-01-01T09:00:00.000Z
             */
            createdAt: string;
            /**
             * Format: date-time
             * @description 更新日時
             * @example 2024-01-02T10:30:00.000Z
             */
            updatedAt: string;
        };
        /**
         * @description エラータイプ
         * @example ValidationFailed
         * @enum {string}
         */
        ApiErrorType: "BadRequest" | "ValidationFailed" | "InvalidJson" | "InvalidAgeRange" | "Unauthorized" | "Forbidden" | "NotFound" | "UserNotFound" | "PostNotFound" | "CommentNotFound" | "TagNotFound" | "Conflict" | "EmailAlreadyExists" | "TagAlreadyExists" | "Unknown" | "DatabaseError" | "InternalServerError";
        /** @description APIエラーレスポンス */
        ErrorResponse: {
            /** @description エラー時は常にnull */
            data: null;
            /**
             * @description エラーステータス
             * @enum {string}
             */
            status: "error";
            errorType: components["schemas"]["ApiErrorType"];
            /**
             * @description エラーメッセージ（ユーザー向け）
             * @example バリデーションに失敗しました
             */
            message: string;
            /**
             * @description エラーの詳細説明（開発者向け）
             * @example User with id 'abc123' not found in database
             */
            description: string;
        };
        /** @description ユーザー作成リクエスト */
        CreateUser: {
            /**
             * @description 名前
             * @example 山田太郎
             */
            name: string;
            /**
             * Format: email
             * @description メールアドレス
             * @example user@example.com
             */
            email: string;
        };
        /** @description タグ情報 */
        Tag: {
            /**
             * Format: cuid
             * @description 一意識別子（CUID形式）
             * @example clh1234567890abcdef
             */
            id: string;
            /**
             * @description タグ名
             * @example TypeScript
             */
            name: string;
            /**
             * @description URLスラッグ
             * @example typescript
             */
            slug: string;
            /**
             * Format: date-time
             * @description 作成日時
             * @example 2024-01-01T09:00:00.000Z
             */
            createdAt: string;
            /**
             * Format: date-time
             * @description 更新日時
             * @example 2024-01-02T10:30:00.000Z
             */
            updatedAt: string;
        };
        /** @description 投稿とタグの関連情報 */
        PostTag: {
            /**
             * Format: cuid
             * @description 投稿ID
             * @example clh1234567890abcdef
             */
            postId: string;
            /**
             * Format: cuid
             * @description タグID
             * @example clh0987654321fedcba
             */
            tagId: string;
            tag: components["schemas"]["Tag"];
            /**
             * Format: date-time
             * @description タグ付け日時
             * @example 2024-01-01T09:00:00.000Z
             */
            taggedAt: string;
        };
        /** @description 投稿情報 */
        Post: {
            /**
             * Format: cuid
             * @description 一意識別子（CUID形式）
             * @example clh1234567890abcdef
             */
            id: string;
            /**
             * @description タイトル
             * @example TypeScriptの型システムについて
             */
            title: string;
            /**
             * @description 本文
             * @example TypeScriptの型システムは...
             */
            content: string;
            /**
             * @description 公開状態（必ずtrue/false）
             * @example true
             */
            published: boolean;
            /**
             * Format: cuid
             * @description 投稿者ID
             * @example clh0987654321fedcba
             */
            userId: string;
            /** @description タグ一覧（空配列の可能性あり） */
            tags: components["schemas"]["PostTag"][];
            /**
             * Format: date-time
             * @description 作成日時
             * @example 2024-01-01T09:00:00.000Z
             */
            createdAt: string;
            /**
             * Format: date-time
             * @description 更新日時
             * @example 2024-01-02T10:30:00.000Z
             */
            updatedAt: string;
        };
        /** @description 投稿作成リクエスト */
        CreatePost: {
            /**
             * @description タイトル（必須）
             * @example TypeScriptの型システムについて
             */
            title: string;
            /**
             * @description 本文（必須）
             * @example TypeScriptの型システムは...
             */
            content: string;
            /**
             * @description 公開状態（省略時: false）
             * @default false
             * @example true
             */
            published: boolean | undefined;
            /**
             * Format: cuid
             * @description 投稿者ID（必須）
             * @example clh0987654321fedcba
             */
            userId: string;
            /**
             * @description タグIDの配列（省略時: タグなし）
             * @example [
             *       "clhtag123456789abc",
             *       "clhtag987654321xyz"
             *     ]
             */
            tagIds?: string[] | undefined;
        };
        /** @description 投稿更新リクエスト（PATCH） */
        UpdatePost: {
            /**
             * @description タイトル（更新する場合のみ指定）
             * @example 更新後のタイトル
             */
            title?: string | undefined;
            /**
             * @description 本文（更新する場合のみ指定）
             * @example 更新後の本文...
             */
            content?: string | undefined;
            /**
             * @description 公開状態（更新する場合のみ指定）
             * @example true
             */
            published?: boolean | undefined;
            /**
             * @description タグIDの配列 - 省略時: 変更なし、空配列: すべて削除、配列指定: 完全置換
             * @example [
             *       "clhtag123456789abc",
             *       "clhtag987654321xyz"
             *     ]
             */
            tagIds?: string[] | undefined;
        };
        /** @description タグ作成リクエスト */
        CreateTag: {
            /**
             * @description タグ名
             * @example TypeScript
             */
            name: string;
            /**
             * @description URLスラッグ
             * @example typescript
             */
            slug: string;
        };
        /** @description コメント情報 */
        Comment: {
            /**
             * Format: cuid
             * @description 一意識別子（CUID形式）
             * @example clh1234567890abcdef
             */
            id: string;
            /**
             * @description コメント内容
             * @example 素晴らしい記事ですね！
             */
            content: string;
            /**
             * Format: cuid
             * @description 投稿ID
             * @example clh5678901234abcdef
             */
            postId: string;
            /** @description ユーザー情報 */
            user: {
                /**
                 * Format: cuid
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
                /**
                 * @description 名前
                 * @example 山田太郎
                 */
                name: string;
                /**
                 * Format: email
                 * @description メールアドレス
                 * @example user@example.com
                 */
                email: string;
            };
            /**
             * Format: date-time
             * @description 作成日時
             * @example 2024-01-01T09:00:00.000Z
             */
            createdAt: string;
            /**
             * Format: date-time
             * @description 更新日時
             * @example 2024-01-02T10:30:00.000Z
             */
            updatedAt: string;
        };
        /** @description コメント作成リクエスト */
        CreateComment: {
            /**
             * @description コメント内容
             * @example 素晴らしい記事ですね！
             */
            content: string;
            /**
             * Format: cuid
             * @description 投稿ID
             * @example clh1234567890abcdef
             */
            postId: string;
            /**
             * Format: cuid
             * @description ユーザーID
             * @example clh0987654321fedcba
             */
            userId: string;
        };
        /** @description コメント更新リクエスト */
        UpdateComment: {
            /**
             * @description コメント内容
             * @example 更新後のコメント内容
             */
            content: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getUsersApi: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ユーザー一覧 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["User"][];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    postUsersApi: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateUser"];
            };
        };
        responses: {
            /** @description 作成されたユーザー */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["User"];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getUsersByIdApi: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ユーザー情報 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["User"];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    deleteUsersByIdApi: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 削除成功 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getPostsApi: {
        parameters: {
            query?: {
                /**
                 * @description ページ番号（1から開始）
                 * @example 1
                 */
                page?: string;
                /**
                 * @description 1ページあたりの件数（最大100）
                 * @example 10
                 */
                limit?: string;
                /**
                 * @description ユーザーIDでフィルタリング
                 * @example clh0987654321fedcba
                 */
                userId?: string;
                /**
                 * @description 公開状態でフィルタリング
                 * @example true
                 */
                published?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 投稿一覧 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Post"][];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    postPostsApi: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreatePost"];
            };
        };
        responses: {
            /** @description 作成された投稿 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Post"];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getPostsByIdApi: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 投稿情報 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Post"];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    putPostsByIdApi: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdatePost"];
            };
        };
        responses: {
            /** @description 更新された投稿 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Post"];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    deletePostsByIdApi: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 削除成功 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getTagsApi: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description タグ一覧 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Tag"][];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    postTagsApi: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateTag"];
            };
        };
        responses: {
            /** @description 作成されたタグ */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Tag"];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getTagsByIdApi: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description タグ情報 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Tag"];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    deleteTagsByIdApi: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 削除成功 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getCommentsApi: {
        parameters: {
            query: {
                /**
                 * @description 投稿ID
                 * @example clh1234567890abcdef
                 */
                postId: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description コメント一覧 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Comment"][];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    postCommentsApi: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateComment"];
            };
        };
        responses: {
            /** @description 作成されたコメント */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Comment"];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    getCommentsByIdApi: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description コメント情報 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Comment"];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    putCommentsByIdApi: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateComment"];
            };
        };
        responses: {
            /** @description 更新されたコメント */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Comment"];
                        /**
                         * @description 成功ステータス
                         * @enum {string}
                         */
                        status: "success";
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    deleteCommentsByIdApi: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description 一意識別子（CUID形式）
                 * @example clh1234567890abcdef
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 削除成功 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
}
