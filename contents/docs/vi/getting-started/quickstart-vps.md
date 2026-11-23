---
title: Cài đặt nhanh trên VPS
description: Cài đặt Nitrobase trên Ubuntu/Debian bằng script tự động hoặc trên mọi hệ điều hành bằng Docker installer image.
---

Nitrobase cung cấp hai phương thức cài đặt tự động tạo ra cùng một cấu trúc thư mục (`/opt/nitrobase` chứa `.env` và `docker-compose.prod.yml`, compose project `nitrobase`, container `nitrobase_app`), giúp tính năng nâng cấp ngay trong bảng điều khiển hoạt động giống hệt nhau.

## Cách 1: Script cài đặt (VPS Ubuntu hoặc Debian)

Kết nối SSH vào VPS **Ubuntu hoặc Debian** (`amd64` hoặc `arm64`) và chạy:

```bash
curl -fsSL https://nitrobase.app/install.sh | sudo bash
```

Nếu không truy cập được `nitrobase.app`, sử dụng bản lưu trên GitHub:

```bash
curl -fsSL https://raw.githubusercontent.com/AydenGroup/nitrobase/main/scripts/install.sh | sudo bash
```

Mỗi bản phát hành trên GitHub cũng đính kèm file `install.sh` riêng, và mọi bảng điều khiển Nitrobase đang chạy đều phục vụ script của chính phiên bản đó tại `https://<panel>/api/install.sh`.

## Cách 2: Docker Installer Image (Mọi hệ điều hành có Docker)

Trên bất kỳ máy nào đã cài Docker (`amd64` hoặc `arm64`), chạy installer image chính thức (Nitrobase đang ở giai đoạn beta nên `:beta` cài bản pre-release mới nhất; `:latest` dành cho bản ổn định khi phát hành):

```bash
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /opt/nitrobase:/opt/nitrobase \
  ghcr.io/aydengroup/nitrobase-installer:beta
```

:::note[Đường dẫn mount phải trùng khớp]
Thư mục cài đặt (`-v /opt/nitrobase:/opt/nitrobase`) **phải giống hệt nhau ở cả hai phía** để Docker phân giải thư mục compose trên máy chủ và quá trình nâng cấp trong panel mount lại chính xác sau này. Nếu đổi thư mục, hãy đổi cả hai phía và truyền `--dir`:
`-v /srv/nitrobase:/srv/nitrobase ... --dir /srv/nitrobase`.
:::

Cả hai image cũng được mirror trên Docker Hub tại `jimmyphong/nitrobase` và `jimmyphong/nitrobase-installer` (GHCR `ghcr.io/aydengroup/nitrobase` vẫn là nguồn mặc định).

### Docker Desktop (macOS / Windows)

Trên macOS, Docker Desktop không chia sẻ `/opt` theo mặc định. Hãy cài vào `$HOME/nitrobase` (trên Windows, chạy trong shell WSL 2):

```bash
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$HOME/nitrobase:$HOME/nitrobase" \
  ghcr.io/aydengroup/nitrobase-installer:beta --dir "$HOME/nitrobase"
```

Lưu ý trên Docker Desktop, máy chủ *Localhost* chính là máy ảo Linux của Docker chứ không phải hệ điều hành máy tính của bạn.

## Trình cài đặt tự động làm gì?

Trình cài đặt có tính **idempotent** — chạy lại sẽ giữ nguyên dữ liệu và các khóa bí mật hiện có:

1. **Kiểm tra hệ thống:** Kiểm tra quyền root, hệ điều hành (`ubuntu`/`debian`), CPU, RAM (cảnh báo dưới ~1,8 GB), ổ cứng (cảnh báo dưới 5 GB, dừng dưới 2 GB) và cổng mạng. Tự động cài Docker CE từ kho apt chính thức nếu chưa có (sẽ hỏi trước trừ khi truyền `--yes`).
2. **Tạo khóa bí mật:** Tạo `/opt/nitrobase/.env` với quyền `0600` chứa `ENCRYPTION_KEY`, `SESSION_SECRET` và `POSTGRES_PASSWORD` ngẫu nhiên.
3. **Mã thiết lập dùng một lần (Setup Token):** Sinh `SETUP_TOKEN` (32 ký tự hex) và in ra terminal để ngăn người lạ chiếm quyền bảng điều khiển mới cài.
4. **Kênh phát hành:** Khi cài bản pre-release và `.env` chưa có `RELEASE_CHANNEL`, tự đặt `RELEASE_CHANNEL=prerelease` để panel tiếp tục thông báo các bản pre-release tiếp theo.
5. **Khởi chạy dịch vụ:** Tải `docker-compose.prod.yml`, khởi động `nitrobase_postgres` và `nitrobase_app`, chờ `/api/health` khỏe mạnh (tối đa 300 giây) rồi hiển thị hướng dẫn tiếp theo.

## Các tùy chọn cài đặt

Truyền tùy chọn sau `sudo bash -s --` (với script) hoặc sau tên image (với Docker installer):

| Tùy chọn | Ý nghĩa |
| :--- | :--- |
| `--version <v>` | Phiên bản cụ thể cần cài (ví dụ `0.1.0-beta.9`). Chạy lại để đổi phiên bản. |
| `--dir <path>` | Thư mục cài đặt (mặc định `/opt/nitrobase`). |
| `--panel-bind <addr:port>` | Địa chỉ lắng nghe của panel (mặc định `0.0.0.0:3000`; tự đổi thành `127.0.0.1:3000` khi dùng `--domain`). |
| `--domain <host>` | Phục vụ panel qua HTTPS bằng Traefik + Let's Encrypt; tự thiết lập `APP_URL` và `TRUST_PROXY=true`. |
| `--repo <owner/name>` | Cài từ bản fork (mặc định `AydenGroup/nitrobase`). Với Gitea/Forgejo, thêm `--api-url` và `--raw-url`. |
| `--image <name>` / `--compose-url <url>` | Chỉ định image hoặc URL file compose tùy chỉnh. |
| `--yes` | Không hỏi xác nhận trước khi cài Docker. |
| `--skip-resource-check` | Bỏ qua kiểm tra mức RAM/ổ cứng tối thiểu trên máy thử nghiệm. |
| `--uninstall` | Dừng và xóa container, giữ nguyên dữ liệu và file `.env`. |
| `--uninstall --purge` | Xóa luôn volume dữ liệu và làm trống thư mục cài đặt (yêu cầu gõ `purge <dir>`, hoặc dùng `-e NITROBASE_PURGE_CONFIRM="purge <dir>"` khi chạy tự động). |
| `--print-config` / `--help` | Hiển thị cấu hình đã phân giải mà không thay đổi gì, hoặc xem trợ giúp. |

## Tạo Swap trên VPS nhỏ

Trên VPS 1–2 GB RAM, hãy thêm 2 GB swap để tránh container bị dừng đột ngột khi thiếu RAM:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## Truy cập bảng điều khiển

Sau khi hoàn tất, mở `http://<server-ip>:3000` (hoặc tạo đường hầm SSH trước: `ssh -L 3000:localhost:3000 root@<server-ip>`) và tiếp tục bước **Khởi tạo ban đầu**.
