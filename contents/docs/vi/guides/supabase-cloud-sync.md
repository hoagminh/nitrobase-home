---
title: Đồng bộ Cloud (Supabase & Appwrite)
description: Nhập dự án từ và xuất ứng dụng lên Supabase Cloud và Appwrite Cloud với xác minh TLS và kiểm tra pre-flight.
---

Công cụ **Cloud Sync** của Nitrobase hỗ trợ sao chép hai chiều một lần — **Nhập (Import)** từ cloud về self-hosted và **Xuất (Export)** từ self-hosted lên dự án cloud trống — cho cả **Supabase Cloud** lẫn **Appwrite Cloud**.

## Đồng bộ Supabase Cloud

### 1. Cấu hình chứng chỉ Root CA (TLS `verify-full`)

Nitrobase kết nối tới session pooler của Supabase bằng `sslmode=verify-full`. Hãy đặt chứng chỉ root CA của Supabase (`prod-ca-2021.crt` và `prod-ca-2025.crt` từ [`supabase/cli`](https://github.com/supabase/cli)) vào `certs/supabase-root-ca.pem`, trỏ `CLOUD_SYNC_SUPABASE_CA_FILE` tới tệp CA của bạn hoặc dán chứng chỉ PEM bổ sung trực tiếp trên biểu mẫu kết nối.

### 2. Thêm kết nối Cloud

Vào **Settings → Cloud connections → Add connection** và chọn **Supabase**:

- **Project reference:** Mã 20 ký tự từ `https://<reference>.supabase.co`.
- **Personal access token:** Tạo tại Supabase Account → Access tokens (đọc thông tin dự án, cấu hình pooler và Edge Functions qua Management API).
- **Database password:** Lấy tại Project Settings → Database.
- **Storage S3 access key ID & secret (tùy chọn):** Lấy tại Project Settings → Storage → S3 access keys (cần thiết để sao chép tệp Storage bằng `rclone`).
- **Pooler host (tùy chọn):** Để trống để tự đọc từ cấu hình session pooler của dự án.

Nhấn **Test connection** để xác minh Management API, Database (pooler) và Storage (S3).

### 3. Nhập hoặc Xuất

- **Nhập (Import):** Vào **Apps → New App → Import from Supabase cloud** (quyền `app.sync`). Nitrobase chạy bước pre-flight (đếm bảng, dòng, bucket, function, kiểm tra tương thích phiên bản Postgres và đảm bảo dung lượng đĩa trống ≥ `2,5×` tổng kích thước), triển khai ứng dụng Supabase mới và sao chép:
  - **Cơ sở dữ liệu** (dùng image Postgres client đúng phiên bản major có bản vá `\restrict` CVE-2025-8714)
  - **Tệp Storage** (truyền song song qua `rclone`)
  - **Edge Functions**
  - **Tác vụ `pg_cron`:** Mặc định tạo lại ở trạng thái tạm dừng (`CLOUD_SYNC_CRON_JOBS=paused`) để tránh gọi nhầm về địa chỉ cũ, hoặc chọn `active` / `skip`.
- **Xuất (Export):** Từ tab **Cloud sync** trên ứng dụng Supabase self-hosted, xuất cơ sở dữ liệu, tệp Storage và Edge Functions sang một dự án Supabase Cloud trống (có tùy chọn dừng các service ghi trong lúc sao chép để đảm bảo ảnh chụp chính xác tuyệt đối).

## Đồng bộ Appwrite Cloud

Tại **Settings → Cloud connections**, bạn cũng có thể kết nối dự án **Appwrite Cloud** (`https://<region>.cloud.appwrite.io/v1`, Project ID và một API key tạm giới hạn quyền) để:

- **Nhập từ Appwrite Cloud:** Tạo ứng dụng Appwrite self-hosted giữ nguyên **Project ID** (ứng dụng client chỉ cần đổi endpoint) và di chuyển **người dùng & đội ngũ**, **cơ sở dữ liệu**, **tệp Storage**, **cấu hình & biến Functions**, và **Platforms**.
- **Xuất lên Appwrite Cloud:** Xuất các tài nguyên tương tự sang một dự án Appwrite Cloud trống (API key cloud cần thêm quyền `migrations.read` và `migrations.write`).
