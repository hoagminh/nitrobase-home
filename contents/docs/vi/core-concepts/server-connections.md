---
title: Cơ chế kết nối máy chủ (SSH & Host Mode)
description: Cách SaaSBase điều khiển VPS từ xa qua SSH và điều khiển máy chủ hiện tại thông qua nsenter.
---

SaaSBase hỗ trợ quản trị 2 loại máy chủ:

## 1. Máy chủ từ xa (Remote VPS qua SSH2)
Các VPS từ xa được kết nối an toàn qua SSH sử dụng khóa bất đối xứng (Ed25519 hoặc RSA).
* Khóa SSH có thể được tạo tự động trong SaaSBase hoặc do bạn nhập vào.
* Khóa riêng tư (Private key) và mật khẩu được mã hóa an toàn khi lưu vào database.
* SaaSBase thực thi lệnh, theo dõi chỉ số container và truyền file qua giao thức SFTP.

## 2. Máy chủ Localhost (Host Mode)
Chính máy chủ đang chạy SaaSBase cũng có thể trở thành một node triển khai ứng dụng (*Localhost*).
* Container SaaSBase chạy ở chế độ `privileged: true` và `pid: host`.
* Sử dụng lệnh `nsenter` để tương tác trực tiếp với hệ thống máy chủ host và Docker daemon mà không cần kết nối SSH ngược lại.
