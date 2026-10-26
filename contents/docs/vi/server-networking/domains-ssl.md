---
title: Tên miền & Chứng chỉ SSL (Traefik v3)
description: Cấu hình tên miền tùy chỉnh, chứng chỉ Let's Encrypt tự động và tên miền miễn phí sslip.io.
---

Nitrobase sử dụng **Traefik v3** để tự động nhận diện và định tuyến lưu lượng HTTP/HTTPS tới các container mà không cần khởi động lại proxy.

## Tên miền miễn phí tự động (sslip.io)
Để thử nghiệm nhanh chóng, Nitrobase tự động cấp tên miền miễn phí có SSL qua dịch vụ `sslip.io`:
```text
https://app-123.<ip-may-chu>.sslip.io
```

## Thêm tên miền riêng
1. Trên trình quản lý DNS của bạn, trỏ bản ghi **A** về địa chỉ IP của VPS.
2. Trong Nitrobase, vào ứng dụng -> chuyển tới tab **Domains** -> nhập tên miền của bạn (ví dụ: `api.domain-cua-ban.com`).
3. Bấm **Save & Apply**. Traefik sẽ ngay lập tức tự động đăng ký chứng chỉ SSL từ Let's Encrypt.
