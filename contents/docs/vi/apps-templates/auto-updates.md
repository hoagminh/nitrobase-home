---
title: Tự động cập nhật & Rollback
description: Kiểm tra phiên bản định kỳ cho template, cơ sở dữ liệu và Git; cập nhật sao lưu trước; khung giờ bảo trì và cơ chế rollback.
---

Nitrobase tự động kiểm tra bản phát hành mới cho các ứng dụng có phiên bản (template marketplace, cơ sở dữ liệu độc lập và nhánh Git) và hỗ trợ cập nhật 1-click hoặc tự động kèm sao lưu trước và rollback khi lỗi.

## Kiểm tra bản cập nhật

- Chạy theo lịch `APP_UPDATE_CHECK_CRON` (mặc định `41 */6 * * *`, mỗi 6 giờ) khi `APP_UPDATE_CHECK_ENABLED=true`.
- Kiểm tra commit mới trên nhánh Git có thể bật/tắt riêng bằng `APP_UPDATE_CHECK_GIT=true`.
- Khi có bản mới, nhãn **Update available** sẽ hiển thị ở bảng điều khiển, thanh bên và danh sách ứng dụng, đồng thời phát sự kiện `app.update_available`.
- Hỗ trợ cập nhật hàng loạt tối đa `50` ứng dụng (`APP_UPDATE_BATCH_MAX`) trong một đợt.

## Quy trình cập nhật an toàn

Khi một lượt cập nhật chạy:

1. **Sao lưu trước khi cập nhật:** Bật mặc định (bắt buộc với cập nhật tự động), tạo bản sao lưu đầy đủ trước khi thay đổi ứng dụng.
2. **Triển khai phiên bản mới:** Phân giải phiên bản/commit mới, biên dịch lại cấu hình/overlay, kéo hoặc build image mới và khởi động lại dịch vụ.
3. **Xác minh sẵn sàng & ổn định:** Chờ kiểm tra HTTP health và đảm bảo mọi container ổn định không khởi động lại trong `APP_READY_STABLE_MS` (mặc định `20s`, `3` mẫu liên tiếp) và không vượt ngưỡng `APP_DEPLOY_RESTART_LIMIT` (mặc định `6` lần restart).
4. **Tự động Rollback khi thất bại:** Thực hiện theo chính sách `[updates].rollback` của template hoặc hệ quản trị DB:
   - `redeploy` (mặc định): Triển khai lại phiên bản/commit cũ trước đó (giữ nguyên dữ liệu).
   - `restore`: Khôi phục bản sao lưu vừa tạo trước khi cập nhật (áp dụng khi bản mới nâng cấp dữ liệu không thể đảo ngược, như MariaDB hoặc Valkey). Nếu không có bản sao lưu, chuyển về `manual` để tránh chạy bản cũ lên dữ liệu đã nâng cấp.
   - `manual`: Giữ nguyên trạng thái để quản trị viên xử lý thủ công và phát cảnh báo `app.update_failed`.

## Cập nhật tự động & Khung giờ bảo trì

Trong phần **Update policy** của ứng dụng (quyền `app.update_policy.manage`), bạn có thể bật tự động cập nhật cho các bản **patch** hoặc **minor** theo chuẩn semver (phiên bản không đúng chuẩn semver không bao giờ tự cập nhật):

- Cập nhật tự động luôn sao lưu trước.
- Các lượt cập nhật tự động chỉ bắt đầu trong khung giờ bảo trì cấu hình bởi `APP_AUTO_UPDATE_CRON` (mặc định `0 3 * * *`, 03:00 hàng ngày) trong khoảng `APP_AUTO_UPDATE_WINDOW_MINUTES` (mặc định `120` phút).
