---
title: Di chuyển App giữa các máy chủ
description: Chuyển ứng dụng và toàn bộ dữ liệu giữa 2 VPS khác nhau một cách an toàn không mất dữ liệu.
---

Khi bạn cần nâng cấp VPS cấu hình cao hơn hoặc đổi nhà cung cấp hạ tầng:

Tại mục **App -> Settings -> Move to another server**:
1. Ứng dụng sẽ được tạm dừng và sao lưu trên máy chủ cũ.
2. File sao lưu mã hóa được chuyển sang máy chủ mới thông qua kho lưu trữ S3/R2.
3. Khởi tạo và kiểm tra ứng dụng trên máy chủ mới.
4. Tự động chuyển hướng định tuyến Traefik và cập nhật DNS.
