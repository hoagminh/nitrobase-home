---
title: Proxy ngược & Trusted Headers
description: Cấu hình TRUST_PROXY, TRUSTED_PROXY_HOPS, APP_URL và header bảo mật HSTS khi chạy sau Traefik hoặc Cloudflare.
---

Khi Nitrobase chạy phía sau một reverse proxy — chẳng hạn chính route Traefik v3 của panel, một proxy bên ngoài hoặc Cloudflare — kết nối TCP đi vào sẽ mang địa chỉ IP của proxy thay vì IP thật của người dùng.

## Cấu hình `TRUST_PROXY` và `TRUSTED_PROXY_HOPS`

Để giới hạn đăng nhập, rate limit API, nhật ký kiểm toán (Audit Log) và cảnh báo bảo mật (`security.new_login`) ghi nhận đúng IP người dùng thật:

```bash
APP_URL=https://panel.example.com
TRUST_PROXY=true
TRUSTED_PROXY_HOPS=1
```

- **`TRUST_PROXY` (mặc định `false`):** Chỉ bật khi **mọi** yêu cầu tới Nitrobase đều đi qua proxy tin cậy (ví dụ sau khi đặt `PANEL_BIND=127.0.0.1:3000`). Nếu vẫn mở truy cập trực tiếp không qua proxy, kẻ tấn công có thể giả mạo header `X-Forwarded-For`.
- **`TRUSTED_PROXY_HOPS` (mặc định `1`, từ `1` đến `5`):** Số lớp proxy tin cậy đứng trước Nitrobase có nối thêm vào `X-Forwarded-For`. Nitrobase đọc IP đếm từ **bên phải** sang theo đúng số lớp này và bỏ qua mọi giá trị bên trái do client gửi lên.
  - Chỉ đứng sau Traefik của chính Nitrobase: `TRUSTED_PROXY_HOPS=1`.
  - Đứng sau Cloudflare + Traefik: `TRUSTED_PROXY_HOPS=2`.
- **`APP_URL`:** Đặt đúng URL `https://` công khai của panel. Nitrobase chỉ gắn cờ `Secure` cho cookie phiên đăng nhập khi `APP_URL` bắt đầu bằng `https://`, đồng thời dùng URL này cho liên kết mời thành viên, tin nhắn thông báo và trường server trong OpenAPI.

## Middleware Security Headers (Traefik)

Nitrobase quản lý middleware `secure-headers` dùng chung trong `/etc/nitrobase/traefik/dynamic/middlewares.yml` cho các ứng dụng có định tuyến, bao gồm HTTP Strict Transport Security (HSTS):

- `TRAEFIK_HSTS_SECONDS` (mặc định `31536000` — 1 năm)
- `TRAEFIK_HSTS_PRELOAD` (mặc định `true`; đặt `false` nếu tên miền ứng dụng có thể cần quay lại HTTP thuần trong tương lai, vì danh sách HSTS preload của trình duyệt rất khó gỡ)
