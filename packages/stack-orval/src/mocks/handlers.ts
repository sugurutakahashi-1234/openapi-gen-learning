// Orvalで生成されたMSWハンドラーを集約
import {
  getGetPostsApiMockHandler,
  getMyAppAPIMock,
} from "../generated/api.msw";

// デフォルトのハンドラー（Orvalで生成されたすべてのハンドラー）
export const defaultHandlers = getMyAppAPIMock();

// 使用するハンドラーを選択（デフォルトまたはカスタム）
// デフォルトハンドラーに一部カスタムハンドラーを追加
export const handlers = [
  // 最初の5件の投稿に固定データを設定
  getGetPostsApiMockHandler(() => {
    return {
      data: [
        {
          id: "1",
          title: "🚀 MSWモックハンドラーのデモ",
          content:
            "これはMSWで生成された固定のモックデータです。Faker.jsではなく、カスタムハンドラーで設定されています。",
          published: true,
          userId: "user-1",
          tags: [],
          createdAt: new Date("2024-01-01").toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "📝 テスト投稿 - 下書き",
          content:
            "この投稿は下書き状態です。MSWハンドラーで公開状態を制御できます。",
          published: false,
          userId: "user-2",
          tags: [],
          createdAt: new Date("2024-01-02").toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "⚡ パフォーマンステスト用の投稿",
          content:
            "MSWは1秒の遅延を設定しているので、ローディング状態のテストができます。",
          published: true,
          userId: "user-1",
          tags: [],
          createdAt: new Date("2024-01-03").toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      status: "success" as const,
    };
  }),

  // 残りのデフォルトハンドラー
  ...defaultHandlers,
];
