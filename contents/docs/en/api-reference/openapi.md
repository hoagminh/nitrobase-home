---
title: OpenAPI 3.1 Specification
description: Auto-generated OpenAPI 3.1.0 schema from Nitrobase's Zod route registry for SDK generation and API clients.
---

Nitrobase automatically generates an **OpenAPI 3.1.0** document directly from its Zod-validated API route registry (`src/server/api/v1.ts`):

```text
GET https://<your-panel>/api/v1/openapi.json
```

## What the Schema Includes

- All `/api/v1` paths, HTTP methods, `operationId`s, and summaries.
- Exact JSON Schema definitions for path parameters and request bodies converted from Zod (`z.toJSONSchema`).
- Bearer authentication security scheme (`bearerFormat: "nbk_…"`).
- Required permission metadata (`x-permission`) on every operation.
- Server URL populated from `APP_URL`.

You can import `/api/v1/openapi.json` into Postman, Insomnia, Bruno, Scalar, or code generators like `openapi-typescript` to generate strongly typed API clients.
