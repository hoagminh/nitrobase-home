---
title: Bảo mật & Định dạng mã hóa v2
description: Tìm hiểu chuẩn mã hóa HKDF quân sự và cơ chế lưu trữ bí mật an toàn của Nitrobase.
---

Bảo mật là tiêu chí hàng đầu trong Nitrobase. Mọi thông tin nhạy cảm bao gồm SSH private key, mật khẩu database, biến môi trường và thông tin chứng thực backup đều được mã hóa khi lưu trữ (Encryption at rest).

## Đặc tả định dạng mã hóa v2

Nitrobase áp dụng chuẩn **Versioned Encryption (Định dạng v2)**:
* **Thuật toán:** AES-256-CBC.
* **Hàm sinh khóa:** HKDF (HMAC-based Key Derivation Function) kết hợp SHA-256.
* **Cấu trúc dữ liệu:** `v2:<salt>:<iv>:<ciphertext>`.

## Xoay khóa mã hóa an toàn (Key Rotation)
Khi cần đổi khóa mã hóa chính, Nitrobase cung cấp script xoay khóa an toàn chạy trong một database transaction duy nhất:

```bash
docker compose -f docker-compose.prod.yml run --rm \
  -e OLD_ENCRYPTION_KEY='khoa-cu-32-byte' \
  -e ENCRYPTION_KEY='khoa-moi-32-byte' \
  app bun scripts/rotate-encryption-key.ts
```
