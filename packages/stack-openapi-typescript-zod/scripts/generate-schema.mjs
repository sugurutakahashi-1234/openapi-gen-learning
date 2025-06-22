import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import openapiTS, { astToString } from "openapi-typescript";
import ts from "typescript";

const baseDir = path.dirname(fileURLToPath(import.meta.url));

// OpenAPIファイルのパスを指定
const localPath = new URL(
  path.resolve(baseDir, "../../../openapi.yaml"),
  import.meta.url,
);

const output = await openapiTS(localPath, {
  transform(schemaObject) {
    // オブジェクト型の場合、オプショナルプロパティに undefined を追加
    if (schemaObject.type === "object") {
      const optionalKeys = Object.keys(schemaObject.properties || {}).filter(
        (key) => !schemaObject.required || !schemaObject.required.includes(key),
      );

      for (const key of optionalKeys) {
        const prop = schemaObject.properties[key];
        // プロパティの型に undefined を追加
        if (Array.isArray(prop.type)) {
          if (!prop.type.includes("undefined")) {
            prop.type.push("undefined");
          }
        } else {
          prop.type = [prop.type, "undefined"];
        }
      }
    }

    // undefined を含むユニオン型の処理
    if (
      Array.isArray(schemaObject.type) &&
      schemaObject.type.includes("undefined")
    ) {
      const union = [];
      for (const type of schemaObject.type) {
        switch (type) {
          case "integer":
            union.push(ts.factory.createIdentifier("number"));
            break;
          case "array":
            if (schemaObject.items) {
              const itemType = schemaObject.items.type || "unknown";
              union.push(
                ts.factory.createArrayTypeNode(
                  ts.factory.createIdentifier(
                    itemType === "integer" ? "number" : itemType,
                  ),
                ),
              );
            } else {
              union.push(ts.factory.createIdentifier("unknown[]"));
            }
            break;
          default:
            union.push(ts.factory.createIdentifier(type));
        }
      }
      return ts.factory.createUnionTypeNode(union);
    }
  },
});

// 生成された型定義をファイルに書き込み
await fs.promises.writeFile(
  path.resolve(baseDir, "../src/generated/schema.ts"),
  astToString(output),
);

console.log(
  "✅ Schema types generated with undefined support for optional properties",
);
