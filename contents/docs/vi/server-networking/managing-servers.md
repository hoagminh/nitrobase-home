---
title: Quản lý máy chủ & Khởi tạo (Bootstrap)
description: Thêm VPS từ xa hoặc Localhost, trình khởi tạo xem trước thay đổi, dấu sở hữu máy chủ và giới hạn tài nguyên.
---

Nitrobase có thể quản lý cả máy chủ mà chính nó đang chạy (*Localhost*) lẫn nhiều máy chủ **Ubuntu hoặc Debian** từ xa qua SSH.

## Thêm máy chủ từ xa

1. Vào **Servers → Add Server**.
2. Nhập thông tin kết nối:
   - **Host IP / Hostname**
   - **Cổng SSH** (mặc định `22`)
   - **Tên đăng nhập** (mặc định `root`)
   - **Phương thức xác thực:** Khóa SSH (quản lý tại **Settings → SSH keys**) hoặc mật khẩu.
3. Kiểm tra kết nối để xác minh khả năng truy cập SSH và dấu vân tay host key.

## Trình khởi tạo máy chủ (Guided Bootstrap)

Trước khi thay đổi bất kỳ thứ gì trên máy chủ, **Bootstrap** sẽ kiểm tra máy đích và hiển thị trước toàn bộ danh sách thay đổi dự kiến:

- **Hệ điều hành & công cụ cơ bản:** Kiểm tra Ubuntu hoặc Debian (`/etc/os-release`) và cài các gói còn thiếu (`ca-certificates`, `curl`, `wget`, `git`, `jq`, `openssl`).
- **Docker Engine:** Tự động cài `docker-ce`, `docker-ce-cli`, `containerd.io`, `docker-buildx-plugin` và `docker-compose-plugin` từ kho apt chính thức của Docker nếu chưa có, đồng thời bật dịch vụ `docker`.
- **Cấu trúc thư mục:** Khởi tạo `/etc/nitrobase` (`apps/`, `traefik/dynamic/`, `traefik/acme/`, `logs/`, ...).
- **Mạng proxy dùng chung:** Tạo mạng bridge `nitrobase-network`.
- **Traefik v3:** Khởi chạy container `nitrobase-traefik` (mặc định `traefik:v3.6.25`) với định tuyến động theo tệp và chứng chỉ Let's Encrypt ACME.
- **Kiểm tra tường lửa & cổng:** Kiểm tra cổng `80` và `443` (hoặc bỏ qua khi máy chủ cấu hình chỉ chạy qua Cloudflare Tunnel).
- **Dấu nhận diện sở hữu:** Gắn nhãn `nitrobase.instance=<instanceId>` lên container Traefik để ngăn hai bảng điều khiển Nitrobase vô tình cùng quản lý một máy chủ.

## Giới hạn tài nguyên trên máy chủ

Tại **Server → Settings → Resource limits**, quản trị viên có thể yêu cầu mọi service triển khai lên máy chủ đó phải khai báo giới hạn RAM/CPU. Trong bước pre-flight khi triển khai ứng dụng, Nitrobase sẽ cảnh báo nếu tổng giới hạn RAM hoặc CPU vượt quá `RESOURCE_OVERCOMMIT_PERCENT` (mặc định `100%`) tài nguyên phần cứng của máy chủ.
