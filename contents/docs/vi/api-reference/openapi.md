---
title: Đặc tả OpenAPI 3.1
description: Tài liệu OpenAPI 3.1.0 tự động sinh từ bộ định tuyến Zod của Nitrobase để tạo SDK và tích hợp API client.
---

Nitrobase tự động sinh tài liệu **OpenAPI 3.1.0** trực tiếp từ danh mục route API có kiểm định Zod (`src/server/api/v1.ts`):

```text
GET https://<panel-cua-ban>/api/v1/openapi.json
```

## Nội dung đặc tả

- Toàn bộ đường dẫn `/api/v1`, phương thức HTTP, `operationId` và mô tả tóm tắt.
- JSON Schema chính xác cho tham số đường dẫn và thân yêu cầu được chuyển đổi từ Zod (`z.toJSONSchema`).
- Cơ chế xác thực Bearer (`bearerFormat: "nbk_…"`).
- Siêu dữ liệu quyền yêu cầu (`x-permission`) cho từng thao tác.
- URL máy chủ tự điền từ `APP_URL`.

Bạn có thể nhập `/api/v1/openapi.json` vào Postman, Insomnia, Bruno, Scalar hoặc công cụ sinh mã như `openapi-typescript` để tạo SDK client có kiểu dữ liệu chặt chẽ.
