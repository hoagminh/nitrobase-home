---
title: Nâng cấp phiên bản Nitrobase
description: Quy trình tự động nâng cấp an toàn qua container trung gian và tự động rollback khi có lỗi.
---

Nitrobase cung cấp cơ chế tự nâng cấp trực tiếp ngay trên giao diện web tại **Settings -> Instance -> Upgrade to vX**.

## Quy trình tự nâng cấp hoạt động ra sao
1. Bảng điều khiển tự động chụp 1 bản sao lưu dự phòng (Self-backup) trước khi chạy.
2. Khởi chạy một **Container trung gian (Updater Container)** có quyền truy cập Docker socket.
3. Container updater dừng panel cũ, chạy migration database và bật phiên bản mới lên.
4. Chờ kiểm tra trạng thái tại endpoint `/api/health`.
5. Nếu phiên bản mới khởi động không thành công, updater sẽ tự động rollback trở lại phiên bản cũ ngay lập tức.
