---
title: Cài đặt thủ công với Docker Compose
description: Hướng dẫn tự cài đặt Nitrobase bằng tệp phát hành chính thức hoặc mã nguồn Git với Docker Compose v2.
---

Nếu bạn muốn toàn quyền kiểm soát file compose hoặc build trực tiếp từ mã nguồn Git, bạn có thể chạy Nitrobase thủ công bằng Docker Compose v2.

## Yêu cầu trước khi cài

- Docker Engine kèm Docker Compose v2 (`docker compose`).
- Công cụ dòng lệnh `openssl` để sinh các khóa bí mật ngẫu nhiên.

## Cách A: Dùng tệp từ bản phát hành chính thức

Trong một thư mục trống, tải `docker-compose.prod.yml` và `.env.example` từ cùng một phiên bản trên [GitHub Releases](https://github.com/AydenGroup/nitrobase/releases):

```bash
mkdir nitrobase && cd nitrobase
VERSION=0.1.0-beta.9
BASE=https://github.com/AydenGroup/nitrobase/releases/download/v$VERSION
curl -fsSL -o compose.yaml "$BASE/docker-compose.prod.yml"
curl -fsSL -o .env "$BASE/env.example"

for key in ENCRYPTION_KEY SESSION_SECRET POSTGRES_PASSWORD; do
  sed -i.bak "s|^$key=.*|$key=$(openssl rand -hex 32)|" .env
done
sed -i.bak "s|^NITROBASE_VERSION=.*|NITROBASE_VERSION=$VERSION|" .env
rm -f .env.bak && chmod 600 .env

# Với bản pre-release, bật kiểm tra cập nhật pre-release:
case "$VERSION" in *-*) echo "RELEASE_CHANNEL=prerelease" >> .env ;; esac

docker compose up -d
docker compose logs app | grep "Setup token"
```

## Cách B: Build từ mã nguồn Git

```bash
git clone https://github.com/AydenGroup/nitrobase.git && cd nitrobase
cp .env.example .env
for key in ENCRYPTION_KEY SESSION_SECRET POSTGRES_PASSWORD; do
  sed -i "s|^$key=.*|$key=$(openssl rand -hex 32)|" .env
done
sed -i 's|^NITROBASE_IMAGE=.*|NITROBASE_IMAGE=nitrobase|; s|^NITROBASE_VERSION=.*|NITROBASE_VERSION=local|' .env
chmod 600 .env

docker compose -f docker-compose.prod.yml -f docker-compose.build.yml up -d --build
```

:::caution[Sao lưu ENCRYPTION_KEY]
Hãy lưu file `.env` — đặc biệt là `ENCRYPTION_KEY` — trong trình quản lý mật khẩu bên ngoài máy chủ. Nếu mất `ENCRYPTION_KEY`, mọi khóa SSH, mật khẩu đã lưu và bản sao lưu mã hóa đều không thể giải mã được.
:::

## Các biến môi trường cốt lõi

Mọi cấu hình runtime trong `src/config/server.ts` đều có thể đặt trong `.env` (được nạp qua `env_file` trong `docker-compose.prod.yml`). Máy chủ sẽ từ chối khởi động nếu thiếu khóa bắt buộc, khóa ngắn hơn 32 ký tự hoặc vẫn giữ giá trị mẫu.

| Biến môi trường | Bắt buộc | Mô tả |
| :--- | :--- | :--- |
| `DATABASE_URL` | **Có** | Chuỗi kết nối PostgreSQL (trong `docker-compose.prod.yml`, tự động ghép từ `POSTGRES_PASSWORD`). |
| `ENCRYPTION_KEY` | **Có** | Tối thiểu 32 ký tự ngẫu nhiên. Mã hóa mọi bí mật khi lưu trữ (AES-256-GCM + HKDF). |
| `ENCRYPTION_KEY_PREVIOUS` | Không | Danh sách các khóa mã hóa cũ phân tách bằng dấu phẩy (mới nhất trước) sau khi xoay khóa để vẫn khôi phục được bản sao lưu cũ. |
| `SESSION_SECRET` | **Có** | Tối thiểu 32 ký tự ngẫu nhiên để ký và bảo vệ cookie phiên đăng nhập. |
| `POSTGRES_PASSWORD` | **Có*** | Mật khẩu cho container `postgres:16-alpine` đi kèm trong `docker-compose.prod.yml` (nên dùng hex). |
| `NITROBASE_VERSION` | **Có*** | Tag phiên bản image (ví dụ `0.1.0-beta.9`), được tự động cập nhật khi nâng cấp trong panel. |
| `NITROBASE_IMAGE` | Không | Tên image panel không kèm tag (mặc định `ghcr.io/aydengroup/nitrobase`). |
| `PANEL_BIND` | Không | Địa chỉ và cổng bind trên host (mặc định `0.0.0.0:3000`). Đổi sang `127.0.0.1:3000` sau khi bật HTTPS. |
| `APP_URL` | Không | URL công khai của panel (ví dụ `https://panel.example.com`). Cookie chỉ gắn cờ `Secure` khi bắt đầu bằng `https://`. |
| `TRUST_PROXY` | Không | Đặt `true` khi chạy sau Traefik hoặc reverse proxy để rate limit và nhật ký kiểm toán đọc đúng IP người dùng (`TRUSTED_PROXY_HOPS`, mặc định `1`). |
| `ACME_EMAIL` | Không | Email đăng ký Let's Encrypt (mặc định lấy email của quản trị viên). |
| `GITHUB_TOKEN` | Không | Token GitHub tùy chọn giúp tăng giới hạn gọi API khi lấy danh sách phiên bản template. |
| `SETUP_TOKEN` | Không | Mã dùng một lần (tối thiểu 16 ký tự) cho lần đăng ký đầu tiên hoặc khôi phục ban đầu. Nếu bỏ trống, Nitrobase tự sinh và in ra log. |
| `RELEASE_CHANNEL` | Không | `stable` (mặc định) hoặc `prerelease` để nhận thông báo nâng cấp bản beta/pre-release. |

\* Bắt buộc khi chạy với `docker-compose.prod.yml`.
