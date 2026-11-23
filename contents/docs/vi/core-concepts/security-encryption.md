---
title: Bảo mật & Mã hóa
description: Mã hóa xác thực AES-256-GCM (Format v3), chính sách bảo mật Docker Compose, chống SSRF và gia cố đăng nhập.
---

Bảo mật được tích hợp xuyên suốt mọi lớp của Nitrobase — từ mã hóa xác thực các khóa bí mật cho đến kiểm soát nghiêm ngặt Docker Compose và giới hạn tần suất đăng nhập.

## Mã hóa bí mật khi lưu trữ (Format v3)

Toàn bộ dữ liệu nhạy cảm trong PostgreSQL — khóa SSH, mật khẩu máy chủ, biến môi trường ứng dụng, tệp bí mật theo service, mật khẩu cơ sở dữ liệu, khóa kho sao lưu, token Cloud Sync và bí mật thông báo — đều được mã hóa theo **Format v3**:

- **Thuật toán:** `AES-256-GCM` (mã hóa có xác thực với IV ngẫu nhiên 12 byte và thẻ xác thực auth tag cố định 16 byte).
- **Dẫn xuất khóa:** `HKDF-SHA256` dẫn xuất khóa 32 byte từ `ENCRYPTION_KEY` với salt cố định `nitrobase/secrets-at-rest` và info `aes-256-gcm/v3`.
- **Định dạng dữ liệu:** `v3:` + `base64(iv[12] || authTag[16] || ciphertext)`.
- **Phát hiện giả mạo:** Mọi chỉnh sửa, cắt cụt, thiếu tiền tố hoặc sai khóa đều khiến bước xác thực GCM báo lỗi ngay lập tức.
- **Dự phòng sau xoay khóa:** Khi giải mã, nếu `ENCRYPTION_KEY` hiện tại không khớp, Nitrobase tự động thử lần lượt các khóa trong `ENCRYPTION_KEY_PREVIOUS` (cách nhau bằng dấu phẩy, mới nhất trước) để các bản sao lưu cũ (`env.enc`) vẫn khôi phục được.

:::note[Mã hóa tệp tự sao lưu (Self-Backup)]
Trong khi các trường cơ sở dữ liệu và tệp `env.enc` của ứng dụng dùng AES-256-GCM (Format v3), tệp **tự sao lưu** của Nitrobase (`.tar.gz.enc`) được mã hóa bằng OpenSSL `aes-256-cbc -pbkdf2 -md sha256 -iter 200000` với `ENCRYPTION_KEY` để bạn có thể giải mã trên bất kỳ máy nào chỉ bằng lệnh `openssl` chuẩn.
:::

## Chính sách bảo mật Docker Compose

Mọi file compose — từ template marketplace, kho GitHub gốc hay custom compose — đều được phân tích, viết lại và kiểm duyệt cả lúc biên dịch lẫn trên mô hình đầy đủ `docker compose config --format json` trên máy chủ:

- **Chống thoát khỏi thư mục ứng dụng:** Đường dẫn bind mount tương đối, `env_file` và build context bị khóa trong `/etc/nitrobase/apps/<folder>`. Cấm bind mount chính thư mục app, `.env`, `custom.env`, `service-env/` hoặc `docker-compose.yml`, đồng thời kiểm tra chống vượt symlink trên máy chủ.
- **Cấm đặc quyền nguy hiểm theo mặc định:** `privileged`, `network_mode: host`, `pid/ipc/uts/userns_mode: host`, `cap_add`, `devices`, `security_opt`, mount Docker socket, đường dẫn host ngoài thư mục app và volume/network bên ngoài đều bị từ chối trừ khi template khai báo rõ trong mục `[security]` (kèm cảnh báo yêu cầu người dùng xác nhận khi triển khai).
- **Luôn bị chặn:** `container:` namespace của ứng dụng khác, `network_mode: bridge`, `device_cgroup_rules`, `cgroup_parent`, `runtime`, `sysctls`, `isolation`, `oom_kill_disable`, `use_api_socket`, `external_links`, `include`, build context từ xa và nội suy biến `$` trong các trường liên quan đến bảo mật.
- **Không nhãn hoặc cổng dành riêng:** Các nhãn `traefik.*`, `com.docker.*`, `nitrobase.*` bị loại bỏ/chặn; cổng `ports` bị gỡ bỏ trừ khi bật có chủ đích qua `[[ports]]` của template (các cổng hệ thống `22, 80, 443, 2375, 2376, 3000` luôn bị chặn).

## Che giấu bí mật & Nhật ký kiểm toán

- **Tự động che bí mật:** Các biến có `secret = true` — cũng như mọi biến có tên khớp `SECRET_ENV_NAME_PATTERN` (`PASS|SECRET|TOKEN|PRIVATE|_KEY$|^KEY$|ENC_KEY|CRYPTO`) hoặc giá trị là URL chứa mật khẩu — đều được che giấu trên giao diện, phản hồi API và log container.
- **Nhật ký kiểm toán (Audit Log):** Mọi thao tác quản trị, lời gọi REST/MCP và hành động xem bí mật đều được ghi lại (lưu mặc định 365 ngày, xuất tối đa 50.000 dòng).

## Bảo vệ tài khoản & phiên đăng nhập

- **Mật khẩu:** Băm bằng `bcrypt` (`PASSWORD_BCRYPT_COST`, mặc định `12`), tối thiểu 8 ký tự.
- **Xác thực hai yếu tố (2FA):** Hỗ trợ TOTP kèm 10 mã khôi phục dùng một lần (`TWO_FACTOR_RECOVERY_CODES`).
- **Giới hạn tần suất (Rate Limit):** Giới hạn đăng nhập sai (`LOGIN_RATE_PER_IP=20`, `LOGIN_RATE_PER_ACCOUNT=8` mỗi 15 phút), thử 2FA (`6` mỗi 15 phút), đăng ký (`10` mỗi 15 phút), API (`120` mỗi phút) và webhook (`30` mỗi phút).
- **Chống SSRF:** Webhook thông báo, máy chủ SMTP, endpoint S3 và Cloud Sync chặn địa chỉ nội bộ/loopback và HTTP không mã hóa theo mặc định, trừ khi bật tùy chọn mạng nội bộ (`Private network`).
