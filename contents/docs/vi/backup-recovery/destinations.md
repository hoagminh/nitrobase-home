---
title: Điểm lưu trữ sao lưu (S3, R2, B2 & Local)
description: Cấu hình điểm lưu trữ sao lưu từ xa qua rclone cho Amazon S3, Cloudflare R2, Backblaze B2 và thư mục máy chủ cục bộ.
---

Nitrobase tải lên và tải xuống các bản sao lưu thông qua container `rclone` ghim phiên bản (`rclone/rclone:1.71.1`), hỗ trợ cả kho lưu trữ đối tượng từ xa lẫn thư mục trên máy chủ. Lưu trữ sao lưu ngoài máy chủ giúp bạn khôi phục hoàn toàn ngay cả khi VPS gặp sự cố phần cứng.

## Các driver lưu trữ hỗ trợ

| Driver | Mô tả | Thông tin cấu hình chính |
| :--- | :--- | :--- |
| **Cloudflare R2** | Lưu trữ tương thích S3 không tính phí băng thông tải ra (khuyến nghị). | Cloudflare Account ID (32 ký tự hex), Bucket, Prefix (tùy chọn), Access Key ID, Secret Access Key. |
| **S3-compatible** | Amazon S3, MinIO, RustFS, Wasabi, DigitalOcean Spaces và các API S3 khác. | Endpoint URL, Region (tùy chọn), Bucket, Prefix, Access Key ID, Secret Access Key, Path-style URLs (mặc định bật), tùy chọn endpoint nội bộ/HTTP. |
| **Backblaze B2** | API gốc của Backblaze B2. | Bucket, Prefix (tùy chọn), Application Key ID, Application Key. |
| **Thư mục máy chủ (`local`)** | Thư mục trên chính máy chủ của ứng dụng dưới `BACKUP_LOCAL_ROOT` (mặc định `/var/backups/nitrobase`). | Thư mục con tùy chọn. Tiện cho rollback nhanh, nhưng sẽ mất nếu hỏng máy chủ — nên kết hợp thêm điểm lưu trữ từ xa. |

## Thêm & Kiểm tra điểm lưu trữ

1. Vào **Data → Destinations → Add destination** (quyền `destination.manage`).
2. Chọn driver và điền thông tin kết nối (mọi trường bí mật được mã hóa bằng AES-256-GCM Format v3).
3. Với S3-compatible, mặc định yêu cầu HTTPS tới máy chủ công khai (chống SSRF); chỉ bật **Private or plain-HTTP endpoint** khi kết nối tới S3 nội bộ (như MinIO hoặc RustFS trong mạng LAN).
4. Nhấn **Test** để kiểm tra toàn diện: Nitrobase chạy 3 bước — **Ghi tệp thử nghiệm**, **Đọc lại** và **Xóa** — đồng thời báo rõ nhóm lỗi (`auth`, `not_found`, `permission`, `network`, `tls`).
