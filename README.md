目的

単一の openapi.yaml をもとに、3 通り のクライアント生成スタックを比較できる pnpm monorepo を構築する。各パッケージは相互依存させず、共通設定だけを共有する。

⸻

1. ルート構成

ディレクトリ	役割
packages/stack-heyapi	hey-api + client-fetch + TanStack Query + Zod
packages/stack-oats	openapi-typescript + openapi-fetch + openapi-react-query + openapi-zod-client
packages/stack-orval	Orval (react-query / Zod / MSW+Faker)
openapi.yaml	共通 API 定義（CRUD: /api/posts 系5本）
tsconfig.base.json	ベース設定（各パッケージの tsconfig.json が継承）
prism	モックサーバー起動用スクリプト


⸻

2. 共通開発ガイドライン
	1.	pnpm workspace
	•	各スタックを独立パッケージ化し、依存はルートの devDependencies のみ共有。
	2.	TypeScript
	•	ルートに tsconfig.base.json を置き、strict 系オプションはここで一括管理。
	3.	Vite + React
	•	各パッケージに vite.config.ts を配置し、画面は TanStack Query でデータ取得・更新を行う。
	4.	画面要件（全スタック共通）
	•	一覧・詳細・作成・更新・削除を行うシンプル UI。
	•	CRUD すべて useQuery / useMutation で実装。
	5.	テスト & モック
	•	prism mock openapi.yaml でローカル API を提供。
	•	MSW を使うスタックでは通信をインターセプトし、Faker でダミー応答を生成。

⸻

3. 各スタックで実現すること

項目	hey-api	openapi-typescript 系	Orval
型安全クライアント生成	client-fetch	openapi-fetch	Orval client
TanStack Query 用フック	@tanstack/react-query プラグイン	openapi-react-query	Orval react-query
Zod スキーマ	zod プラグイン	openapi-zod-client	Orval zod
MSW 連携	手動設定予定	openapi-msw	Orval mock (MSW+Faker)
Faker ダミーデータ	後で検討	後で検討	自動生成


⸻

4. 実装ステップ（全スタック共通）
	1.	コード生成

# 例: hey-api
npx hey-api openapi-ts -i ../../openapi.yaml -o src/generated --plugins=@hey-api/client-fetch,@tanstack/react-query,zod


	2.	型安全リクエスト
	•	生成クライアントをラップして api.ts を用意。
	3.	カスタム React Query フック
	•	usePosts() / usePost(id) / useCreatePost() … を実装。
	4.	Zod バリデーション
	•	送信前に入力データを schema.parse で検証。
	5.	MSW + Faker
	•	モックレスポンスをスキーマに沿って自動 or 手動生成。

⸻

これで、同じ API 定義・同じ UI 要件 のもとで 3 種類のライブラリ構成を比較できる、整理された monorepo 設計となります。