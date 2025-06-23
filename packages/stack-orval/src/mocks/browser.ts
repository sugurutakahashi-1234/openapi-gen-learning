// ブラウザ環境でのMSWセットアップ
import { setupWorker } from "msw/browser";
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
}
