---
title: Tích hợp Cloudflare Tunnel
description: Xuất bản ứng dụng không cần mở cổng 80/443 bằng Cloudflare Tunnel và cổng vào cô lập trên Traefik.
---

Máy chủ được quản lý có thể công khai ứng dụng qua [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) thay vì mở cổng công khai `80` và `443`. Nitrobase chỉ cần token kết nối của tunnel — không gọi API Cloudflare và không lưu thông tin tài khoản Cloudflare của bạn.

## Các bước thiết lập

1. Trong **Cloudflare Zero Trust**, vào **Networks → Tunnels**, tạo một tunnel quản lý từ xa (`cloudflared`) và sao chép token kết nối.
2. Trong Nitrobase, mở **Server → Settings → Cloudflare Tunnel**:
   - Dán token kết nối (lưu tại `/etc/nitrobase/tunnel/cloudflared.env` quyền `0600` và mã hóa trong PostgreSQL).
   - Bật tunnel.
   - Tùy chọn bật chế độ **Tunnel only** để Traefik không mở cổng `80`/`443` trên tường lửa máy chủ.
3. Trong Cloudflare Zero Trust, thêm **Public Hostname** cho từng tên miền trỏ về dịch vụ:
   ```text
   http://nitrobase-traefik:8081
   ```
4. Trong Nitrobase, đánh dấu tên miền là **Via Cloudflare Tunnel** tại tab **Domains** của ứng dụng.

## Kiến trúc cô lập mạng Tunnel

Nitrobase tách biệt lưu lượng tunnel trên một mạng Docker riêng (`nitrobase-tunnel`, subnet mặc định `172.31.254.0/29`) chỉ dùng chung giữa `nitrobase-traefik` (bind tại `172.31.254.2:8081`) và `nitrobase-cloudflared`:

- Các container ứng dụng trên `nitrobase-network` không thể chạm tới cổng tunnel này.
- Các tên miền chạy qua tunnel chỉ gắn vào entrypoint riêng `:8081`, đảm bảo không ai có thể vượt qua Cloudflare Access hoặc WAF bằng cách gửi thẳng yêu cầu vào IP công khai của VPS trên cổng `80`/`443`.
- Nitrobase kiểm tra endpoint `/ready` nội bộ của `cloudflared` (`CLOUDFLARED_METRICS_PORT`, mặc định `20241`) để hiển thị trạng thái kết nối trực tiếp.

:::tip[Không cần mở cổng Web]
Khi bật **Tunnel only**, bạn có thể chặn hoàn toàn cổng `80` và `443` trên tường lửa VPS — chỉ cần cho phép kết nối chiều đi từ `cloudflared`.
:::
