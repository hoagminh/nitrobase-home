---
title: Endpoints Quản lý App & Server
description: Các API cơ bản để lấy danh sách ứng dụng, kích hoạt redeploy và kiểm tra thông tin server.
---

## Lấy danh sách ứng dụng
```http
GET /api/v1/apps
```

## Kích hoạt triển khai lại ứng dụng (Redeploy)
```http
POST /api/v1/apps/{appId}/redeploy
```

## Lấy danh sách máy chủ
```http
GET /api/v1/servers
```
