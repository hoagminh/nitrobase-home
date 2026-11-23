---
title: Đặc tả Template (template.toml)
description: Tài liệu hướng dẫn viết template marketplace với template.toml, compose overlay, biểu thức biến và chiến lược sao lưu.
---

Mỗi template marketplace là một thư mục độc lập nằm tại `templates/<id>/` (`<id>` khớp `^[a-z0-9-]+$`). Thêm một template mới chỉ cần thêm thư mục và fixture kiểm thử offline — không cần sửa mã nguồn ứng dụng.

```text
templates/<id>/
  template.toml        # Bắt buộc: metadata, nguồn phiên bản, biến, tên miền, health, backup, security
  docker-compose.yml   # Tùy chọn: dùng khi không thiết lập source.path
  overlay.yml          # Tùy chọn: hợp nhất sâu (deep-merge) lên file compose trước khi Nitrobase biến đổi
  logo.svg             # Tùy chọn: biểu tượng hiển thị trên marketplace
```

## Ví dụ `template.toml`

```toml
id = "pocketbase"
name = "PocketBase"
description = "A one-file backend: realtime database, auth, file storage and admin dashboard."
category = "backend"
website = "https://pocketbase.io"
docs = "https://pocketbase.io/docs/"
tags = ["database", "auth"]
min_docker_version = "20.10"
notes = "Admin superuser is created on first start."

[source]
repo = "pocketbase/pocketbase"
versions = "releases"           # "releases" | "tags" | "commits" | "branches"
version_prefix = "v"
version_filter = '^v\d+\.\d+\.\d+$'
# Tùy chọn khi kéo file compose từ repo gốc:
# path = "docker"
# compose = "docker-compose.yml"
# env_defaults = ".env.example"
# include = ["docker-compose.yml", { path = "init.sh", min_version = "2.4.0" }]
# min_version = "v0.23.0"

[variables.PB_ADMIN_EMAIL]
value = ""
type = "email"
editable = true
prefill = "account_email"
credential = true
group = "Admin"
description = "Superuser email address."

[variables.PB_ADMIN_PASSWORD]
value = "${password:24}"
type = "string"
min_length = 10
secret = true
credential = true
editable = true
rotatable = true
group = "Admin"
description = "Superuser password."

[[domains]]
service = "pocketbase"
port = 8090
primary = true
https = true
# Tùy chọn: subdomain, path_prefix, root_redirect, paths, basic_auth, extra_domains

[[links]]
label = "Admin console"
path = "/_/"

[resources.pocketbase]
memory_mb = 512

[health]
service = "pocketbase"
path = "/api/health"
port = 8090
timeout_seconds = 300

[backup]
paths = ["pb_data"]
stop = true

[updates]
rollback = "redeploy"           # "redeploy" | "restore" | "manual"
```

## Biểu thức biến (Variable Expressions)

Giá trị trong `[variables.<NAME>]` hỗ trợ biểu thức `${...}` (dùng `$$` cho ký tự `$` thường). Các biến được phân giải theo thứ tự phụ thuộc và giữ nguyên giá trị đã tạo khi triển khai lại:

| Biểu thức | Kết quả |
| :--- | :--- |
| `${password:N}` | `N` ký tự chữ và số ngẫu nhiên |
| `${base64:N}` / `${hex:N}` | `N` byte ngẫu nhiên mã hóa base64 hoặc hex (`2N` ký tự) |
| `${uuid}` | UUID ngẫu nhiên |
| `${jwt:SECRET_VAR:role[:issuer]}` | HS256 JWT (`exp: +10y`) ký bằng biến `SECRET_VAR` |
| `${bcrypt:VAR[:cost]}` | Chuỗi băm bcrypt của `VAR` (cost mặc định `10`), tự tạo lại khi `VAR` đổi |
| `${opaque_key:PREFIX:NAMESPACE}` | Khóa opaque có checksum (định dạng `sb_publishable_` / `sb_secret_` của Supabase) |
| `${signing_keys:es256[:SECRET_VAR]}` | Mảng JSON gồm cặp khóa JWK ES256 (P-256) + khóa đối xứng HS256 tùy chọn |
| `${jwks:KEYS_VAR}` | Bộ khóa xác minh JWKS (`{"keys": [...]}`) đã bỏ phần khóa bí mật |
| `${jwt_es256:KEYS_VAR:role[:issuer]}` | ES256 JWT ký bằng khóa ES256 đầu tiên trong `KEYS_VAR` |
| `${OTHER_VAR}` | Giá trị của một biến khác |
| `${domain}`, `${url}` | Tên miền ứng dụng và `https://<domain>` |
| `${version}`, `${version_number}` | Ref đã chọn và ref đã bỏ `source.version_prefix` |
| `${app_id}`, `${app_name}`, `${folder}` | Các định danh của ứng dụng |

Biến còn hỗ trợ `initial_only = true` (khóa sau lần triển khai đầu), `min_version` (chỉ áp dụng từ phiên bản nguồn chỉ định trở lên), `permission` (quyền bổ sung để chỉnh sửa) và `[variables.<NAME>.on_rotate]` (bước SQL tùy chọn sau khi xoay khóa).

## Overlay, Cổng mở & Bảo mật

- **Compose overlay:** Đặt `overlay.yml` trong thư mục template để ghi đè sâu lên file compose gốc (giá trị `null` sẽ xóa khóa, ví dụ xóa service `traefik` của upstream). Hỗ trợ overlay theo phiên bản qua `[[overlays]]` và `min_version`.
- **Cổng xuất bản (`[[ports]]`):** Cổng host tùy chọn, tắt mặc định và do chủ sở hữu bật tại **Settings → Published ports**.
- **Cấu hình sao lưu (`[backup]`):** Hỗ trợ `paths`, `volumes`, `stop` (`true`, `false` hoặc danh sách service), `reset`/`reset_volumes`, `[backup.database]` (`postgres`, `mysql`, `mariadb`, `sqlite` hoặc chiến lược plugin) và `[[backup.hooks]]` (`pre`/`post`).
- **Danh sách ngoại lệ bảo mật (`[security]`):** Mọi đặc quyền đều tắt mặc định. Nếu template cần ngoại lệ (`cap_add`, `host_paths`, `external`, ...), bắt buộc phải điền trường `reason` để hiển thị cảnh báo xác nhận cho người dùng.
- **Đa ngôn ngữ:** Chuỗi văn bản trong template chỉ viết bằng tiếng Anh thuần, không chứa `{` hay `}`; lệnh `bun run i18n:extract` sẽ tự trích xuất vào catalog Lingui qua `scripts/lingui/template-extractor.ts`.

## Kiểm thử Template

Mỗi template cần có fixture offline tại `src/server/services/templates/__fixtures__/templates/<id>/` (`meta.json` cùng `upstream/` hoặc `spec.json`). Chạy `bun run test` để thực thi `shipped-templates.test.ts` kiểm tra biên dịch, chính sách bảo mật và snapshot.
