---
title: Di chuyển ứng dụng giữa các máy chủ
description: Di chuyển ứng dụng đang chạy và cơ sở dữ liệu độc lập sang VPS mới với kiểm tra sức khỏe và tự động rollback.
---

Cần nâng cấp lên VPS cấu hình cao hơn, đổi khu vực địa lý hoặc chuyển nhà cung cấp? Nitrobase cho phép di chuyển mọi ứng dụng hoặc cơ sở dữ liệu độc lập sang máy chủ khác (quyền `app.move`) kèm cơ chế rollback tự động khi gặp sự cố.

## Quy trình di chuyển ứng dụng

Mở **App → Settings → Move to another server**, chọn máy chủ đích đã sẵn sàng (và điểm lưu trữ sao lưu từ xa nếu cần trung chuyển gói sao lưu) rồi khởi chạy:

1. **Kiểm tra & Sao lưu:** Nitrobase kiểm tra máy chủ đích và tạo bản sao lưu nhất quán đầy đủ (database dump + volumes + `.env` mã hóa + phiên bản/commit đã ghim) trên máy chủ nguồn.
2. **Khôi phục trên máy đích:** Khôi phục ứng dụng lên máy chủ đích với **cùng App ID, dữ liệu và biến môi trường**.
3. **Xác minh sức khỏe:** Khởi chạy container trên máy đích và chờ mọi kiểm tra health và ổn định đạt yêu cầu.
4. **Hoàn tất & Dọn dẹp:** Chỉ sau khi bản chạy trên máy đích hoạt động ổn định, Nitrobase mới gỡ bỏ bản cũ trên máy chủ nguồn.

## An toàn khi gặp lỗi

Nếu bất kỳ bước nào thất bại trước khi chuyển giao hoàn tất, Nitrobase sẽ xóa bản sao chưa hoàn chỉnh trên máy đích và khởi động lại ứng dụng gốc trên máy nguồn nguyên vẹn.

## Tên miền & DNS sau khi di chuyển

- **Tên miền miễn phí `*.sslip.io`:** Tự động cập nhật trỏ sang địa chỉ IP của máy chủ đích.
- **Tên miền riêng:** Nhật ký job di chuyển sẽ liệt kê chính xác các bản ghi DNS (A/CNAME) bạn cần cập nhật tại nhà cung cấp DNS để trỏ về IP máy chủ mới.
