---
title: Khởi tạo ban đầu & Tạo tài khoản Quản trị
description: Kích hoạt tài khoản quản trị viên tối cao hoặc khôi phục dữ liệu từ bản sao lưu cũ trong lần đầu khởi động.
---

Khi truy cập vào SaaSBase lần đầu tiên tại `http://<ip-may-chu>:3000`, bạn sẽ nhìn thấy giao diện **Wizard khởi tạo ban đầu**.

## Cơ chế bảo vệ an toàn

Để ngăn chặn các bot quét mạng internet chiếm quyền quản trị trên các máy chủ mới dựng, SaaSBase áp dụng 2 lớp bảo vệ:

1. **Setup Token:** Nếu cài đặt qua `scripts/install.sh`, hệ thống yêu cầu nhập mã **Setup Token** xuất hiện trên terminal khi cài đặt. Không có token này, trang đăng ký sẽ bị khóa hoàn toàn.
2. **Cảnh báo máy chủ mở:** Trong môi trường cài thủ công hoặc dev không cấu hình `SETUP_TOKEN`, trang đăng ký sẽ hiện cảnh báo bảo mật: *Người đầu tiên đăng ký tài khoản sẽ trở thành Quản trị viên của toàn bộ hệ thống.*


## Lựa chọn A: Đăng ký tài khoản Quản trị viên mới

1. Mở trình duyệt truy cập `http://<ip-may-chu>:3000`.
2. Nhập mã **Setup Token** (nếu có yêu cầu).
3. Điền thông tin tạo tài khoản quản trị:
   * **Email quản trị:** Dùng để nhận thông báo khẩn cấp và làm chủ sở hữu team mặc định.
   * **Mật khẩu:** Tối thiểu 10 ký tự.
4. Bấm **Hoàn tất thiết lập**. Bạn sẽ được chuyển thẳng vào Bảng điều khiển SaaSBase.


## Lựa chọn B: Khôi phục từ bản sao lưu cũ (Restore)

Nếu bạn đang chuyển SaaSBase từ một máy chủ cũ sang máy chủ mới:

1. Tại màn hình khởi tạo đầu tiên, chọn **Khôi phục từ bản sao lưu (Restore from a backup)**.
2. Nhập mã **Setup Token**.
3. Tải lên file sao lưu tự thân đã mã hóa (`saasbase/<ngay>.tar.gz.enc`).
4. Dán mã băm SHA-256 và nhập `ENCRYPTION_KEY` của máy chủ cũ.
5. SaaSBase sẽ tự động:
   * Kiểm tra tính toàn vẹn của file thông qua SHA-256.
   * Giải mã và kiểm tra manifest an toàn.
   * Nạp database dump trong một transaction độc lập với quyền người dùng an toàn.
   * Tái mã hóa toàn bộ dữ liệu bí mật sang khóa mới của máy chủ hiện tại.
   * Khởi động ở trạng thái **Tạm dừng (Paused)** để bảo vệ chống xung đột Split-Brain.
