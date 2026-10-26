---
title: Tự động cập nhật & Rollback an toàn
description: Cơ chế kiểm tra phiên bản mới, tự động sao lưu trước khi nâng cấp và khôi phục khi có sự cố.
---

Nitrobase định kỳ kiểm tra các phiên bản mới của template và commit mới trên nhánh Git.

## Quy trình nâng cấp an toàn
1. **Tự động sao lưu trước khi cập nhật:** Chụp snapshot volume dữ liệu của ứng dụng.
2. **Triển khai phiên bản mới:** Tải image mới và áp dụng cấu hình.
3. **Kiểm tra trạng thái sức khỏe (Health Check):** Đợi container phản hồi thành công.
4. **Tự động Rollback:** Nếu container mới bị lỗi hoặc không khởi động được, hệ thống sẽ tự động khôi phục lại phiên bản cũ và dữ liệu backup.
