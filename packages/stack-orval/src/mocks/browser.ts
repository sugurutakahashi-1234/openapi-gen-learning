// ブラウザ環境でのMSWセットアップ
import { setupWorker } from "msw/browser";
import { queryClient } from "../queryClient";
import { handlers } from "./handlers";

// Service Workerのセットアップ（初期状態はハンドラーなし）
export const worker = setupWorker();

// MSWモードの切り替え
export function setMockMode(enabled: boolean) {
  if (enabled) {
    // モックハンドラーを設定
    worker.resetHandlers(...handlers);
    console.log("🔧 MSWモード: ON");
  } else {
    // すべてのハンドラーをクリア（リクエストをパススルー）
    worker.resetHandlers();
    console.log("🌐 MSWモード: OFF");
  }

  // React Queryのキャッシュを無効化して再フェッチ
  queryClient.invalidateQueries();
  console.log("🔄 React Queryキャッシュを無効化しました");
}
