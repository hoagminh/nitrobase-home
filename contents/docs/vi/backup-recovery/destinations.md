---
title: Nơi lưu trữ sao lưu (S3, R2, B2)
description: Thiết lập các điểm lưu trữ sao lưu ngoài máy chủ bao gồm AWS S3, Cloudflare R2 và Backblaze B2.
---

SaaSBase hỗ trợ đa dạng các nền tảng lưu trữ đám mây. Việc lưu backup ra ngoài máy chủ đảm bảo bạn có thể khôi phục toàn bộ hệ thống ngay cả khi VPS bị hỏng vật lý.

## Các nhà cung cấp hỗ trợ
* **Cloudflare R2:** Không tính phí tải dữ liệu ra ngoài Egress (Khuyên dùng).
* **Amazon S3:** Chuẩn lưu trữ đối tượng AWS phổ biến.
* **Backblaze B2:** Dịch vụ lưu trữ tương thích S3 chi phí tiết kiệm.
* **Thư mục cục bộ (Local Folder):** Lưu trực tiếp trên ổ cứng máy chủ để khôi phục nhanh.

## Thêm đích lưu trữ mới
Vào **Data -> Destinations -> Add Destination**.
* **Loại:** Tương thích S3 (S3 Compatible)
* **Tên Bucket:** ví dụ `my-saasbase-backups`
* **Endpoint URL:** ví dụ `https://<account-id>.r2.cloudflarestorage.com`
* **Access Key ID & Secret Access Key** (Được mã hóa an toàn bằng chuẩn HKDF).
