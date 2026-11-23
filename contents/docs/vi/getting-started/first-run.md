---
title: Khởi tạo ban đầu & Tạo tài khoản Quản trị
description: Nhận quyền quản trị viên hệ thống lần đầu bằng Setup Token hoặc khôi phục trực tiếp từ bản tự sao lưu.
---

Khi truy cập bản Nitrobase mới cài lần đầu tại `http://<server-ip>:3000` (khuyến nghị truy cập qua SSH tunnel `ssh -L 3000:localhost:3000 root@<server-ip>` trước khi gắn HTTPS), bạn sẽ thấy màn hình **Khởi tạo ban đầu**.

## Mã thiết lập dùng một lần (Setup Token)

Để ngăn người khác quét Internet và chiếm quyền bảng điều khiển mới cài trước bạn, Nitrobase luôn yêu cầu **Setup Token** cho đến khi tài khoản đầu tiên được tạo:

- **Cài bằng script hoặc Docker installer:** Trình cài đặt tự sinh `SETUP_TOKEN` dài 32 ký tự, lưu vào `.env` và in ra terminal.
- **Cài thủ công không đặt `SETUP_TOKEN`:** Nitrobase tự tạo mã ngẫu nhiên khi khởi động và ghi vào log cho đến khi tài khoản đầu tiên tồn tại:
  ```bash
  docker compose logs app | grep "Setup token"
  ```

## Lựa chọn A: Tạo tài khoản Quản trị viên hệ thống

1. Mở `http://<server-ip>:3000` (hoặc `http://localhost:3000` qua SSH tunnel).
2. Nhập **Setup Token**.
3. Nhập email quản trị viên và mật khẩu (**tối thiểu 8 ký tự**).
4. Hoàn tất để đăng nhập. Tài khoản đầu tiên trở thành **Quản trị viên hệ thống (Instance Administrator)** và là **Owner** của đội ngũ mặc định.

## Lựa chọn B: Khôi phục từ bản tự sao lưu (Self-Backup)

Nếu bạn đang di chuyển một bản Nitrobase cũ sang máy chủ mới:

1. Tại màn hình khởi tạo, chọn **Restore from a backup**.
2. Nhập **Setup Token** của máy mới.
3. Tải lên tệp tự sao lưu đã mã hóa (`nitrobase/<date>-<id>.tar.gz.enc`, tối đa 256 MB theo mặc định).
4. Nhập mã kiểm tra **SHA-256** (hiển thị trong **Data → Backups**) và **`ENCRYPTION_KEY` cũ** từ máy chủ cũ.
5. Nitrobase sẽ kiểm tra checksum, giải mã tệp, nạp dữ liệu dưới role PostgreSQL không có quyền superuser (`nitrobase_restore`), chạy các migration mới nếu cần và mã hóa lại toàn bộ bí mật bằng `ENCRYPTION_KEY` của máy mới.
6. Bảng điều khiển sau khi khôi phục sẽ khởi động ở trạng thái **Tạm dừng (Paused)** (cơ chế chống split-brain) cho đến khi quản trị viên xác nhận tiếp quản.

## Danh sách việc cần làm sau khi thiết lập

Sau khi đăng nhập, danh sách **Getting started** trên bảng điều khiển sẽ hướng dẫn bạn:

1. **Chuẩn bị máy chủ:** Khởi tạo *Localhost* hoặc thêm VPS từ xa qua SSH.
2. **Triển khai ứng dụng đầu tiên:** Chọn template marketplace, cơ sở dữ liệu độc lập, kho Git hoặc custom compose (tên miền miễn phí `*.sslip.io` kèm HTTPS được cấp tự động cho các ứng dụng có định tuyến).
3. **Thêm điểm lưu trữ sao lưu từ xa:** Cấu hình S3, Cloudflare R2 hoặc Backblaze B2 tại **Data → Destinations** và tạo lịch sao lưu.
4. **Gia cố bảo mật panel:** Gắn tên miền HTTPS cho bảng điều khiển tại **Settings → Instance**, bật **Xác thực hai yếu tố (2FA)** và cấu hình kênh nhận thông báo.
