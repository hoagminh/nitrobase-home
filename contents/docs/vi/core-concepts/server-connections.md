---
title: Kết nối máy chủ (SSH & Localhost)
description: Cách Nitrobase quản lý VPS từ xa qua SSH2 và quản lý chính máy chủ cục bộ thông qua nsenter.
---

Nitrobase hỗ trợ hai phương thức kết nối máy chủ — cả hai đều thực thi cùng một bộ lệnh Docker, Traefik, sao lưu và giám sát thông qua lớp executor thống nhất.

## 1. Máy chủ từ xa (SSH2)

Các máy chủ Linux từ xa được kết nối qua giao thức **SSH2** (thư viện `ssh2`):

- **Xác thực:** Dùng khóa SSH (Ed25519 hoặc RSA, tạo trực tiếp trong Nitrobase hoặc nhập tại **Settings → SSH keys**) hoặc mật khẩu. Toàn bộ khóa riêng, passphrase và mật khẩu được mã hóa bằng AES-256-GCM (Format v3).
- **Xác minh khóa máy chủ (Host Key):** Nitrobase kiểm tra dấu vân tay SSH (TOFU — Trust On First Use, yêu cầu xác nhận khi thay đổi) để ngăn tấn công MITM.
- **Thời gian chờ & giữ kết nối:** Có thể tinh chỉnh qua `SSH_READY_TIMEOUT_MS` (mặc định `10s`), `SSH_KEEPALIVE_MS` (`10s`), `COMMAND_TIMEOUT_MS` (`10m`) và `TERMINAL_IDLE_TIMEOUT_MS` (`30m`).
- **Không cần cài agent:** Mọi lệnh, log, chỉ số giám sát và truyền tệp đều đi qua SSH/SFTP mà không để lại daemon thường trú trên VPS.

## 2. Máy chủ Localhost (Chế độ Host)

Mỗi bản cài đặt Nitrobase mới đều có sẵn máy chủ **Localhost** đại diện cho chính máy đang chạy bảng điều khiển.

- Trong `docker-compose.prod.yml`, container `nitrobase_app` chạy với `privileged: true` và `pid: host`.
- Điều khiển qua biến `LOCAL_EXEC_MODE` (mặc định `auto`):
  - `auto`: Tự phát hiện Nitrobase đang chạy trong container (`/.dockerenv`, `/run/.containerenv` hoặc cgroup mountinfo) và dùng `nsenter` vào namespace của PID 1 để quản lý hệ điều hành host và Docker daemon trực tiếp mà không cần vòng lặp SSH.
  - `container`: Luôn dùng `nsenter`.
  - `host`: Chạy lệnh trực tiếp trên máy chủ (dùng khi chạy Nitrobase ngoài Docker, ví dụ môi trường dev).

:::note[Docker Desktop trên macOS / Windows]
Khi chạy Nitrobase trên Docker Desktop, máy chủ *Localhost* là máy ảo Linux nội bộ của Docker chứ không phải hệ điều hành macOS hay Windows của bạn.
:::
