---
title: Triển khai ứng dụng Marketplace
description: Triển khai các template mã nguồn mở tuyển chọn gồm Supabase, Appwrite, PocketBase, n8n, Plausible, Umami và RustFS.
---

Nitrobase tích hợp sẵn kho template mã nguồn mở tuyển chọn nằm trong thư mục `templates/`. Mỗi template đều tự sinh khóa bí mật mạnh, đi qua chính sách bảo mật compose của Nitrobase và có sẵn cấu hình kiểm tra sức khỏe cũng như sao lưu theo đúng kiến trúc ứng dụng.

## Các Template có sẵn

| Template | Danh mục | Mô tả |
| :--- | :--- | :--- |
| **Supabase** | Backend | Nền tảng Postgres đầy đủ: database, GoTrue Auth, PostgREST, Realtime, Storage, Edge Functions và Studio. Hỗ trợ nhập/xuất với Supabase Cloud. |
| **Appwrite** | Backend | Auth, databases, storage, messaging, realtime và Appwrite Console (lưu ý: bộ thực thi Functions/Sites được tắt để đảm bảo an toàn máy chủ vì yêu cầu quyền truy cập Docker socket). Hỗ trợ nhập/xuất với Appwrite Cloud. |
| **PocketBase** | Backend | Backend gọn nhẹ build từ tệp phát hành chính thức có xác minh checksum: cơ sở dữ liệu SQLite realtime, auth, lưu trữ tệp và trang quản trị (`/_/`). |
| **Standalone Database** | Database | Cơ sở dữ liệu độc lập PostgreSQL, MySQL, MariaDB, Valkey hoặc MongoDB kèm web console, chuỗi kết nối và liên kết ứng dụng. |
| **n8n** | Tự động hóa | Tự động hóa quy trình với 400+ tích hợp, bước code và AI agent trên Postgres (tài khoản chủ sở hữu và khóa mã hóa được quản lý tự động). |
| **Plausible** | Phân tích Web | Phân tích web bảo vệ quyền riêng tư chạy trên ClickHouse và PostgreSQL (theo các nhánh phiên bản CE chính thức). |
| **Umami** | Phân tích Web | Phân tích web không dùng cookie chạy trên PostgreSQL (tự động đổi mật khẩu admin mặc định ngay lần khởi chạy đầu). |
| **RustFS** | Lưu trữ | Lưu trữ đối tượng tương thích S3 (Apache-2.0) với S3 API trên tên miền chính và giao diện quản trị tại `console.<domain>`. |
| **From Git Repository** | Tùy biến | Build và triển khai mã nguồn từ nhánh Git bằng Dockerfile, Railpack hoặc Static site. |
| **Custom Compose** | Tùy biến | Dán bất kỳ file `docker-compose.yml` nào để triển khai theo cùng chính sách an toàn và cơ chế sao lưu. |

## Quy trình triển khai

1. Vào **Apps → New App** và chọn template.
2. Chọn **Máy chủ** đã sẵn sàng và **Phiên bản** (được ghim theo commit SHA khi triển khai để đảm bảo triển khai lại luôn đồng nhất).
3. Tùy chọn nhập **Tên miền riêng** (bỏ trống để tự động cấp tên miền HTTPS `*.sslip.io` miễn phí) và chỉnh các biến môi trường cần thiết.
4. Nitrobase chạy **Kiểm tra trước triển khai (Pre-flight)** nhằm xác minh trạng thái máy chủ, giới hạn RAM/ổ cứng, cổng mạng, tên miền và chính sách compose trước khi tạo ứng dụng.
5. Nhấn **Deploy**. Nitrobase ghi `/etc/nitrobase/apps/<folder>/`, tải image, khởi động container, gắn các service định tuyến vào `nitrobase-network`, kiểm tra sức khỏe và độ ổn định HTTP, sau đó hiển thị thông tin đăng nhập tự sinh trong bảng **Credentials**.

## Tính năng sau triển khai

- **Trình sửa biến môi trường:** Tự động che giá trị bí mật; biến `initial_only` tự khóa chỉ đọc sau lần triển khai đầu; bí mật `rotatable` hỗ trợ xoay khóa (kèm hook SQL tùy chọn) và triển khai lại chỉ với 1 click.
- **Giới hạn tài nguyên:** Ghi đè giới hạn RAM, soft reservation và số nhân CPU cho từng service.
- **Mở cổng máy chủ (Published Ports):** Chủ động bật cổng host cho các template có khai báo `[[ports]]` (mặc định tắt, cấu hình trong **Settings → Published ports**).
- **Tác vụ định kỳ (Scheduled Tasks):** Chạy lệnh cron định kỳ bên trong container của ứng dụng (tab **Tasks**, tối đa 20 tác vụ mỗi app, chu kỳ tối thiểu 5 phút).
