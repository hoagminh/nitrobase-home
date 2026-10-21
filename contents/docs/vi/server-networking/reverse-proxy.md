---
title: Proxy ngược & Xử lý Header tin cậy
description: Đọc đúng địa chỉ IP thực của người dùng qua header X-Forwarded-For khi đứng sau Reverse Proxy.
---

Khi SaaSBase hoạt động đằng sau hệ thống Reverse Proxy (như Traefik hoặc Cloudflare), các request gửi đến có thể mang địa chỉ IP của chính proxy.

## Thiết lập TRUST_PROXY

Để đảm bảo hệ thống giới hạn tần suất (Rate Limit) và lịch sử thao tác (Audit Log) ghi nhận chính xác IP người dùng:

1. Đặt biến `TRUST_PROXY=true` trong file `.env` của SaaSBase.
2. Cấu hình số bước proxy qua biến `TRUSTED_PROXY_HOPS` (mặc định là `1`).

```bash
TRUST_PROXY=true
TRUSTED_PROXY_HOPS=1
```
