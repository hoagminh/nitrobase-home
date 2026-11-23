---
title: Tên miền & SSL (Traefik v3)
description: Tự động cấp tên miền HTTPS miễn phí sslip.io, gắn tên miền riêng với Let's Encrypt, kiểm tra DNS và giám sát chứng chỉ.
---

Nitrobase sử dụng **Traefik v3** (`nitrobase-traefik`) với các file định tuyến động phẳng nằm trong `/etc/nitrobase/traefik/dynamic/app-<key>.yml`, giúp mọi thay đổi tên miền có hiệu lực ngay lập tức mà không cần khởi động lại proxy.

## Tên miền miễn phí tự động (`sslip.io`)

Khi bạn triển khai một ứng dụng có định tuyến mà bỏ trống tên miền riêng, Nitrobase tự động cấp tên miền miễn phí `*.sslip.io` (tùy chỉnh qua `FREE_DOMAIN_PROVIDER`) trỏ về IP công khai của máy chủ kèm chứng chỉ HTTPS Let's Encrypt tự động.

## Gắn tên miền riêng

1. Tại nhà cung cấp DNS, tạo bản ghi **A** (hoặc CNAME) trỏ tên miền (ví dụ `app.example.com`) về địa chỉ IP công khai của máy chủ.
2. Mở ứng dụng trong Nitrobase, chọn tab **Domains** và thêm tên miền.
3. Nitrobase kiểm tra DNS, ghi file định tuyến Traefik mới và Traefik tự động xin chứng chỉ TLS từ Let's Encrypt (`ACME_EMAIL`, mặc định dùng email quản trị viên).
4. Sau khi triển khai hoặc đổi cấu hình định tuyến, Nitrobase tự kiểm tra lại khả năng truy cập tên miền và trạng thái TLS sau `DOMAIN_RECHECK_DELAY_MS` (mặc định `20s`).

## Định tuyến nhiều Service & theo Đường dẫn

Template có thể khai báo nhiều service và tiền tố đường dẫn trong `[[domains]]`:

- **Tên miền chính:** Gán cho service chính (ví dụ `app.example.com`).
- **Tên miền phụ:** Các service bổ sung nhận `<subdomain>.<domain>` (ví dụ RustFS định tuyến S3 API tại `app.example.com` và giao diện quản trị tại `console.app.example.com`).
- **Định tuyến theo đường dẫn (Path):** Nhiều service trên cùng một tên miền có thể chia theo tiền tố đường dẫn (ưu tiên tiền tố dài nhất) — ví dụ Appwrite định tuyến console ở `/`, API ở `/v1` và realtime ở `/v1/realtime`.
- **Basic Auth:** Template có thể bật middleware `basic_auth` dùng mật khẩu băm bcrypt (lưu file quyền `0600`).
- **Chính sách tên miền phụ thêm:** Một số ứng dụng nhạy cảm với xác thực sẽ cảnh báo hoặc từ chối gắn thêm tên miền phụ khi đăng nhập chỉ hoạt động trên tên miền chính.

## Giám sát hạn chứng chỉ TLS

Nitrobase quét chứng chỉ TLS của mọi tên miền mỗi ngày (`CERT_SCAN_CRON`, mặc định `23 6 * * *`) và phát sự kiện thông báo `cert.expiring` (khi còn dưới `CERT_EXPIRY_WARNING_DAYS`, mặc định `14` ngày) hoặc `cert.error` nếu gia hạn thất bại.

## Tên miền cho bảng điều khiển Nitrobase

Bạn có thể gắn tên miền HTTPS cho chính bảng điều khiển khi cài đặt (`--domain panel.example.com`) hoặc sau này trong **Settings → Instance → Panel domain**. Sau khi bật, hãy đặt `PANEL_BIND=127.0.0.1:3000` trong `.env` để tắt truy cập HTTP không mã hóa trên máy chủ.
