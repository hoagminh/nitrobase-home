---
title: Tích hợp Cloudflare Tunnel
description: Công khai ứng dụng ra Internet mà không cần mở cổng 80/443 thông qua Cloudflare Tunnel.
---

Máy chủ của bạn có thể xuất bản ứng dụng ra Internet thông qua **Cloudflare Tunnel** mà không cần mở bất kỳ cổng public nào trên tường lửa.

## Các bước thiết lập

1. Trên bảng điều khiển Cloudflare Zero Trust, vào **Networks -> Tunnels -> Create a tunnel**.
2. Sao chép chuỗi mã Token của tunnel.
3. Trong Nitrobase, vào mục **Server -> Settings -> Cloudflare Tunnel**. Dán mã Token và bật tùy chọn **Tunnel only**.
4. Trên Cloudflare, thêm **Public Hostname** trỏ tới dịch vụ:
   ```text
   http://nitrobase-traefik:8081
   ```

:::tip[Đóng toàn bộ cổng mạng]
Ở chế độ Tunnel-Only, bạn có thể đóng hoàn toàn cổng 80 và 443 trên firewall của VPS. Cloudflare sẽ xử lý SSL và chuyển tiếp an toàn lưu lượng vào mạng nội bộ của Traefik.
:::
