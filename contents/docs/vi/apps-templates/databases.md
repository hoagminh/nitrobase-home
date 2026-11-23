---
title: Cơ sở dữ liệu độc lập (Standalone Databases)
description: Triển khai và quản lý PostgreSQL, MySQL, MariaDB, Valkey và MongoDB kèm Web Console, chuỗi kết nối và liên kết ứng dụng nội bộ.
---

Tại mục **Data → Databases**, Nitrobase cho phép triển khai các máy chủ cơ sở dữ liệu độc lập sử dụng Docker image chính thức, đi kèm sao lưu tự động, bảng điều khiển truy vấn ngay trên trình duyệt và cơ chế liên kết riêng tư tới ứng dụng.

## Các hệ quản trị được hỗ trợ

| Hệ quản trị | Phiên bản mặc định | Các phiên bản hỗ trợ | Cổng mặc định | Console | Quản lý User / DB | Chính sách nâng cấp tại chỗ |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **PostgreSQL** | `18.6` | `18.6`, `17.11`, `16.15`, `15.19`, `14.24` | `5432` | SQL (`psql`) | Có (gồm chủ sở hữu DB) | Bản vá cùng major (rollback `redeploy`) |
| **MySQL** | `8.4.11` | `8.4.11`, `9.7.2` | `3306` | SQL (`mysql`) | Có | Bản vá cùng major (rollback `redeploy`) |
| **MariaDB** | `11.8.9` | `11.8.9`, `11.4.13`, `10.11.19` | `3306` | SQL (`mariadb`) | Có | Nâng tiến (rollback `restore`) |
| **Valkey** | `9.1.2` | `9.1.2`, `9.0.6`, `8.1.10` | `6379` | Redis (`valkey-cli`) | Một mật khẩu duy nhất | Nâng tiến (rollback `restore`) |
| **MongoDB** | `8.0.32` | `8.0.32`, `9.0.2` | `27017` | JSON (`mongosh`) | User/DB mặc định | Bản vá cùng major (rollback `redeploy`) |

:::note[Mạng riêng tư mặc định]
Cơ sở dữ liệu độc lập **không** đi qua Traefik và chạy trên mạng Docker `internal` theo mặc định. Nếu cần kết nối từ bên ngoài, hãy bật rõ cổng xuất bản tại **Settings → Published ports** (hoặc kết nối qua SSH tunnel).
:::

## Liên kết cơ sở dữ liệu với ứng dụng

Thay vì mở cổng cơ sở dữ liệu ra Internet, bạn có thể liên kết trực tiếp với mọi ứng dụng trên cùng máy chủ:

1. Mở cơ sở dữ liệu và chọn tab **Links** (hoặc liên kết từ phần cài đặt của ứng dụng).
2. Nitrobase tạo một mạng bridge cô lập (`nitrobase-link-<id>`) và gắn container của cơ sở dữ liệu cùng container ứng dụng theo tên container (tránh trùng tên service `db` nếu ứng dụng cũng có service `db` riêng).
3. Nitrobase tự động bơm biến môi trường kết nối — mặc định là chuỗi URL (`DATABASE_URL`, `REDIS_URL` hoặc `MONGODB_URL`) và tùy chọn từng thành phần tách rời (`PGHOST`/`PGPORT`..., `MYSQL_*`, `REDIS_*`, `MONGODB_*`).
4. Với hệ quản trị hỗ trợ quản lý người dùng (PostgreSQL, MySQL, MariaDB), bạn có thể cấp tài khoản riêng ít quyền nhất cho ứng dụng hoặc dùng tài khoản chính (yêu cầu quyền `database.write`).

## Web Console tích hợp

Mọi cơ sở dữ liệu đều đi kèm Web Console có ghi nhật ký kiểm toán:

- **SQL Console (PostgreSQL / MySQL / MariaDB):** Chạy mặc định ở chế độ chỉ đọc trong giao dịch `READ ONLY` với giới hạn thời gian `15 giây` (`DATABASE_CONSOLE_TIMEOUT_MS`) và tối đa `500` dòng kết quả (`DATABASE_CONSOLE_MAX_ROWS`). Câu lệnh ghi yêu cầu quyền `database.write`.
- **Command Console (Valkey / MongoDB):** Chạy từng lệnh hoặc tài liệu JSON lệnh (ở chế độ chỉ đọc của Valkey, dùng `SCAN` thay vì `KEYS`).
- **Giới hạn đồng thời & tần suất:** Tối đa `2` truy vấn song song và `60` lượt/phút mỗi thành viên/token.

## Sao lưu & Nâng cấp

Mỗi hệ quản trị sử dụng chiến lược sao lưu nhất quán tương ứng (`postgres` cluster dump, `mysql`, `mariadb`, `redis` RDB snapshot, `mongodb` archive). Hệ quản trị và phiên bản được lưu dạng `<engine>@<tag>` (ví dụ `postgres@18.6`) giúp sao lưu, khôi phục, nhân bản và di chuyển máy chủ giữ nguyên chính xác phiên bản.
