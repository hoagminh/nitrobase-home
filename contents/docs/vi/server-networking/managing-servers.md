---
title: Quản lý máy chủ & Bootstrap
description: Cách thêm một máy chủ VPS mới, chạy quy trình bootstrap tự động và theo dõi sức khỏe tài nguyên.
---

## Thêm máy chủ mới

1. Điều hướng tới mục **Servers -> Add Server**.
2. Chọn **Remote VPS (SSH)**.
3. Điền thông tin kết nối máy chủ:
   * **IP máy chủ hoặc tên miền**
   * **Cổng:** Mặc định `22`
   * **Tài khoản:** Khuyến nghị `root`
   * **Phương thức xác thực:** Khóa SSH hoặc Mật khẩu.
4. Bấm **Connect & Test** để kiểm tra kết nối.

## Bootstrap máy chủ
Sau khi kết nối thành công, bấm **Bootstrap Server**. SaaSBase sẽ hiển thị danh sách các tác vụ sắp thực hiện:
* Cài đặt Docker CE (nếu chưa có).
* Khởi tạo mạng Docker nội bộ (`saasbase-network`).
* Triển khai container reverse proxy **Traefik v3**.
* Cấu hình thư mục dữ liệu và tường lửa.
