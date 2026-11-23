---
title: Đội ngũ & Phân quyền RBAC
description: Kiến trúc đa đội ngũ (multi-tenant), mô hình quyền, vai trò, quản trị viên hệ thống và liên kết mời thành viên.
---

Nitrobase hỗ trợ đa đội ngũ ngay từ thiết kế cốt lõi. Mọi máy chủ, khóa SSH, ứng dụng, cơ sở dữ liệu độc lập, điểm lưu trữ sao lưu, kênh thông báo và API token đều thuộc về một **Đội ngũ (Team)**.

## Các vai trò trong Đội ngũ

Các vai trò được định nghĩa trong `src/config/permissions.ts` theo thứ bậc rõ ràng (vai trò cao hơn quản lý vai trò thấp hơn; Admin không thể hạ cấp Owner, và mỗi đội ngũ luôn giữ tối thiểu một Owner):

| Vai trò | Cấp bậc | Quyền hạn |
| :--- | :---: | :--- |
| **Owner** | 40 | Toàn bộ quyền trong đội ngũ, bao gồm đổi tên/xóa đội ngũ (`team.manage`) và quản lý các Owner khác. |
| **Admin** | 30 | Mọi quyền trong đội ngũ ngoại trừ xóa/đổi tên đội ngũ (`team.manage`) và quản lý Owner. Được phép quản lý máy chủ, khóa SSH, thành viên, API token, điểm sao lưu và kênh thông báo. |
| **Developer** | 20 | Triển khai, triển khai lại, bật/tắt/khởi động lại ứng dụng; sửa & xem biến môi trường/bí mật ứng dụng; mở terminal container; chạy SQL & quản lý cơ sở dữ liệu (`database.manage`, `database.write`, `database.credentials.reveal`); quản lý tên miền, nguồn Git, tác vụ định kỳ, chính sách cập nhật; tạo, khôi phục và tải bản sao lưu; xem audit log. **Không** được quản lý máy chủ, khóa SSH, điểm lưu trữ sao lưu, kênh thông báo, thành viên hoặc xóa/di chuyển ứng dụng. |
| **Viewer** | 10 | Chỉ xem (`team.view`, `server.view`, `ssh_key.view`, `app.view`, `database.view`, `backup.view`, `monitoring.view`, `cloud_connection.view`). Mọi khóa bí mật và mật khẩu đều bị ẩn. |

## Quản trị viên hệ thống (Instance Administrator)

Tài khoản đầu tiên tạo ở bước Khởi tạo ban đầu là **Quản trị viên hệ thống**. Quyền cấp hệ thống (`instance.manage`) không bao giờ được cấp thông qua vai trò đội ngũ, mà chỉ dành cho Quản trị viên hệ thống để thao tác trên:

- **Settings → Instance:** Tên miền HTTPS của panel và nâng cấp Nitrobase ngay trong giao diện.
- **Tự sao lưu Nitrobase (Self-Backup):** Tạo và tải xuống bản sao lưu cơ sở dữ liệu của bảng điều khiển.
- **Tạo đội ngũ mới:** Điều khiển qua biến `TEAM_CREATION` (`admins` theo mặc định, hoặc `everyone` để mọi tài khoản đều tạo được đội ngũ mới).

## Mời thành viên

1. Vào **Settings → Team** và tạo liên kết mời kèm vai trò mong muốn.
2. Liên kết mời có hiệu lực trong `INVITE_TTL_HOURS` (mặc định **72 giờ**).
3. Gửi đường dẫn mời cho đồng đội (khi cấu hình `APP_URL`, Nitrobase sinh đường dẫn đầy đủ).
4. Mọi thao tác mời, đổi vai trò và xem bí mật đều được ghi trong **Audit Log**.
