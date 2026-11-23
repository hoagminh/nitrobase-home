---
title: Nâng cấp Nitrobase
description: Nâng cấp Nitrobase trực tiếp trong bảng điều khiển kèm tự sao lưu và rollback theo health-check, hoặc nâng cấp qua dòng lệnh.
---

Nitrobase tự động kiểm tra bản phát hành mới mỗi 6 giờ (`UPDATE_CHECK_CRON`, mặc định `23 */6 * * *`) từ `RELEASE_REPO` (mặc định `AydenGroup/nitrobase`). Đặt `RELEASE_CHANNEL=prerelease` để nhận cập nhật bản beta/pre-release, hoặc `UPDATE_CHECK_ENABLED=false` để tắt.

## Cách 1: Nâng cấp trực tiếp trong Panel (Khuyến nghị)

Quản trị viên hệ thống có thể nâng cấp ngay tại **Settings → Instance**:

1. **Chờ hoàn tất job:** Nitrobase chờ các job đang chạy kết thúc và tạm từ chối job mới cho đến khi nâng cấp xong.
2. **Tự sao lưu bắt buộc:** Tạo bản tự sao lưu mã hóa mới tới điểm lưu trữ bạn chọn trước khi thay đổi bất kỳ thứ gì.
3. **Updater container:** Tải image mới và khởi chạy container cập nhật ngắn hạn (`nitrobase-updater` dùng `docker:28.5.1-cli`) qua Docker socket. Updater sao lưu `.env` sang `.env.before-upgrade`, cập nhật `NITROBASE_VERSION` và tạo lại `nitrobase_app`.
4. **Kiểm tra sức khỏe & Rollback:** Chờ tối đa `UPGRADE_HEALTH_TIMEOUT_SECONDS` (mặc định `300s`) để `/api/health` phản hồi khỏe mạnh. Nếu bản mới không khởi động được, updater tự động quay về phiên bản cũ.

:::caution[Migration cơ sở dữ liệu khi Rollback]
Container panel được rollback tự động nếu kiểm tra sức khỏe thất bại, nhưng các thay đổi schema cơ sở dữ liệu không tự đảo ngược. Nếu phiên bản mới đã chạy migration PostgreSQL rồi mới lỗi, hãy khôi phục bản tự sao lưu bắt buộc đã tạo ở bước 2.
:::

## Cách 2: Nâng cấp qua dòng lệnh (Shell)

### Bằng Docker Installer

```bash
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /opt/nitrobase:/opt/nitrobase \
  ghcr.io/aydengroup/nitrobase-installer:beta --version <version>
```

### Bằng Script cài đặt

```bash
curl -fsSL https://nitrobase.app/install.sh | sudo bash -s -- --version <version>
```

### Bằng Docker Compose thủ công

Trong thư mục cài đặt, tải file `docker-compose.prod.yml` của bản mới, cập nhật `NITROBASE_VERSION` trong `.env` và chạy:

```bash
docker compose -f docker-compose.prod.yml up -d
```
