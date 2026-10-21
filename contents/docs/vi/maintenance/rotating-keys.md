---
title: Xoay khóa mã hóa ENCRYPTION_KEY
description: Hướng dẫn xoay và tái mã hóa toàn bộ thông tin bảo mật với khóa mã hóa mới qua terminal.
---

Khi cần xoay khóa mã hóa chính:

1. Dừng container ứng dụng:
```bash
docker compose -f docker-compose.prod.yml stop app
```

2. Chạy script tái mã hóa dữ liệu:
```bash
docker compose -f docker-compose.prod.yml run --rm \
  -e OLD_ENCRYPTION_KEY='<khoa-hien-tai>' \
  -e ENCRYPTION_KEY='<khoa-moi>' \
  app bun scripts/rotate-encryption-key.ts
```

3. Cập nhật `ENCRYPTION_KEY` mới trong `.env` và điền khóa cũ vào biến `ENCRYPTION_KEY_PREVIOUS` để vẫn khôi phục được các bản backup trước đó.
4. Khởi động lại ứng dụng:
```bash
docker compose -f docker-compose.prod.yml up -d app
```
