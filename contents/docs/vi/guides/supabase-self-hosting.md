---
title: "Chuyên sâu: Tự lưu trữ Supabase"
description: Cách Nitrobase triển khai, bảo mật, sao lưu và vận hành toàn bộ hệ sinh thái Supabase self-hosted.
---

Nitrobase hỗ trợ hạng nhất cho việc tự lưu trữ trọn bộ **Supabase** trực tiếp từ các bản phát hành hàng tháng chính thức của `supabase/supabase` (`v1.YY.MM`), trong đó mỗi phiên bản đều ghim bộ image đã được kiểm thử đồng bộ.

## Những gì Nitrobase tự động thiết lập

- **PostgreSQL + pgvector + Supavisor:** Hệ quản trị Postgres đầy đủ tiện ích mở rộng và bộ kết nối pooling.
- **Kong API Gateway, GoTrue Auth, PostgREST, Realtime, Storage, Edge Functions và Supabase Studio.**
- **Không dùng mật khẩu mẫu:** Giá trị mặc định lấy từ `.env.example` của upstream, và Nitrobase tự ghi đè mọi khóa demo kém an toàn bằng giá trị ngẫu nhiên mạnh — bao gồm `POSTGRES_PASSWORD`, `JWT_SECRET`, `ANON_KEY`/`SERVICE_ROLE_KEY` ký HS256 và thông tin đăng nhập Studio.
- **Khóa API bất đối xứng ES256 (từ v1.26.04+):** Với Supabase `v1.26.04` trở lên, Nitrobase tự sinh `SUPABASE_PUBLISHABLE_KEY` (`sb_publishable_...`), `SUPABASE_SECRET_KEY` (`sb_secret_...`), bộ khóa ES256 `JWT_KEYS`/`JWT_JWKS` cùng `ANON_KEY_ASYMMETRIC`/`SERVICE_ROLE_KEY_ASYMMETRIC`, và áp dụng `overlay-api-keys.yml` để bật xác thực bất đối xứng trong khi vẫn giữ khóa legacy hoạt động bình thường.

## Plugin quản trị Supabase tích hợp

Plugin Supabase của Nitrobase bổ sung các tab quản lý chuyên biệt ngay trên trang ứng dụng:

- **Edge Functions:** Tải lên, chỉnh sửa và triển khai Edge Functions (mặc định tối đa `50` tệp và `1 MB` mỗi function) cùng trình quản lý biến bí mật mã hóa (`service-env/functions.env`, quyền `0600`, tối đa `100` biến), đi kèm công cụ test gọi HTTP qua API gateway.
- **SQL Runner:** Thực thi SQL trực tiếp trong container Postgres (quyền `app.database`, timeout `30s`, có ghi audit log).
- **Storage Repair:** Kiểm tra và sửa lỗi siêu dữ liệu tệp Storage theo lô (`SUPABASE_STORAGE_REPAIR_BATCH=1000`).
- **Sao lưu nhất quán:** Kết hợp `pg_dumpall` (chụp sau khi dừng các service ghi) cùng volume Storage trong một tệp `.tar.zst` duy nhất.

## Khuyến nghị tài nguyên

Một cụm Supabase đầy đủ thường tiêu thụ **1–1,5 GB RAM** ở trạng thái nghỉ, do đó nên dùng VPS từ **2 GB RAM trở lên** (và bật thêm swap).
