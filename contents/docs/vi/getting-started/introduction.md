---
title: Giới thiệu về Nitrobase
description: Tổng quan về Nitrobase, các tính năng cốt lõi, giấy phép và yêu cầu cấu hình hệ thống.
---

**Nitrobase** là bảng điều khiển tự lưu trữ (self-hosted) kết hợp PaaS (Platform as a Service) và BaaS (Backend as a Service), được thiết kế cho lập trình viên và đội ngũ kỹ thuật muốn trải nghiệm triển khai chỉ với vài cú nhấp chuột ngay trên máy chủ của riêng mình — không phức tạp như Kubernetes và không bị phụ thuộc nhà cung cấp.

Kết nối bất kỳ VPS Ubuntu hoặc Debian nào qua SSH — hoặc quản lý ngay chính máy chủ đang chạy Nitrobase (*Localhost*) — để Nitrobase tự động cấu hình Docker và Traefik v3. Từ đó, bạn có thể triển khai **Supabase**, **Appwrite**, **PocketBase**, **cơ sở dữ liệu độc lập** (PostgreSQL, MySQL, MariaDB, MongoDB, Valkey), **n8n**, **Plausible**, **Umami**, **RustFS**, file `docker-compose.yml` tùy biến hoặc kho mã nguồn **Git** của riêng bạn với HTTPS, sao lưu, giám sát, cập nhật tự động và máy chủ MCP cho AI agent tích hợp sẵn.

## Điểm nổi bật

- **Dùng bất kỳ VPS nào:** Thêm máy chủ từ xa qua SSH hoặc khởi tạo (bootstrap) chính *Localhost*. Trình khởi tạo luôn hiển thị trước mọi thay đổi trước khi tác động lên máy chủ, kèm dấu nhận diện sở hữu để hai bảng điều khiển không bao giờ xung đột trên cùng một máy chủ.
- **Backend hoàn chỉnh, không chỉ container:** Template hạng nhất cho Supabase, Appwrite và PocketBase với bí mật tự sinh, bảng thông tin đăng nhập và cơ chế sao lưu chuẩn theo từng ứng dụng.
- **An toàn mặc định:** Mọi file compose — dù từ marketplace hay custom compose — đều đi qua cùng một chính sách bảo mật (không mount host bên ngoài thư mục ứng dụng, không container privileged, không nhãn hoặc mạng nội bộ dành riêng).
- **Vận hành trọn gói:** Sao lưu tự động lên S3, Cloudflare R2, Backblaze B2 hoặc thư mục máy chủ có xác minh khi khôi phục; giám sát máy chủ/container và cảnh báo trực tiếp; cập nhật 1-click có tự động rollback; di chuyển ứng dụng giữa các máy chủ; Web Terminal và console cơ sở dữ liệu.
- **Tự động hóa & AI Agents:** REST API phân quyền theo đội ngũ (`/api/v1`) kèm đặc tả OpenAPI 3.1 và **MCP server** stateless (`/api/mcp`) giúp AI agent như Claude Code hay Cursor kiểm tra và vận hành hạ tầng an toàn.

## Yêu cầu hệ thống

Bảng điều khiển Nitrobase và PostgreSQL đi kèm sử dụng khoảng **300 MB RAM và 1 GB ổ cứng**. Phần tài nguyên còn lại dành cho các ứng dụng bạn triển khai (ví dụ, một cụm Supabase đầy đủ thường cần 1–1,5 GB RAM).

- **Hệ điều hành:** Ubuntu hoặc Debian (`amd64` hoặc `arm64`) cho trình khởi tạo máy chủ và script cài đặt VPS. Mọi hệ điều hành có Docker đều dùng được với Docker installer image.
- **RAM:** Khuyến nghị **2 GB** trở lên (trình cài đặt cảnh báo dưới ~1,8 GB nhưng vẫn tiếp tục). Trên VPS nhỏ, nên tạo thêm 2 GB swap để tránh bị OOM kill khi build hoặc tải tăng đột biến.
- **Ổ cứng:** Khuyến nghị trống **5 GB** trở lên (cảnh báo dưới 5 GB và dừng cài đặt dưới 2 GB). Có thể dùng `--skip-resource-check` trên máy thử nghiệm nhỏ.
- **Một bản cài đặt mỗi máy:** Các container (`nitrobase_app`, `nitrobase_postgres`) và volume (`nitrobase_postgres_data`, `nitrobase_data`) dùng tên cố định. Trình cài đặt sẽ từ chối cài đặt bản thứ hai trên cùng một máy chủ.
- **Cổng mạng (chế độ tiêu chuẩn):**
  - `22` (SSH)
  - `80` & `443` (HTTP/HTTPS qua Traefik v3)
  - `3000` (Giao diện Web Nitrobase; nên bind về `127.0.0.1:3000` sau khi bật HTTPS)

:::tip[Lợi thế chế độ Chỉ dùng Tunnel]
Khi công khai ứng dụng qua **Cloudflare Tunnel** ở chế độ **Tunnel only**, bạn có thể đóng hoàn toàn cổng `80` và `443` trên tường lửa máy chủ.
:::

## Giấy phép

Nitrobase áp dụng mô hình **fair source** theo giấy phép **Functional Source License, Version 1.1, ALv2 Future License (`FSL-1.1-ALv2`)**. Bạn được tự do sử dụng, sao chép, chỉnh sửa và tự lưu trữ Nitrobase cho mọi mục đích — bao gồm nội bộ công ty và cho khách hàng — ngoại trừ việc cung cấp sản phẩm/dịch vụ cạnh tranh trực tiếp với Nitrobase. Mỗi phiên bản tự động chuyển sang **Apache License 2.0** sau hai năm kể từ ngày phát hành.
