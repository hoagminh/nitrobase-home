---
title: Triển khai từ kho mã nguồn Git
description: Build và triển khai ứng dụng từ nhánh Git bằng Dockerfile, Railpack hoặc Static site kèm Push Webhook tự động.
---

Triển khai trực tiếp các ứng dụng web, API và trang tĩnh của riêng bạn từ bất kỳ kho Git nào (GitHub, GitLab, Gitea/Forgejo hoặc máy chủ Git riêng) với cơ chế tự động build khi push.

## Các trình build được hỗ trợ

Nitrobase có thể tự động nhận diện trình build khi bạn nhấn **Check repository** trong trình hướng dẫn, hoặc cho phép chọn thủ công:

| Trình build | Cổng mặc định | Cách hoạt động |
| :--- | :---: | :--- |
| **Dockerfile** | `3000` | Build trực tiếp `Dockerfile` trong kho mã nguồn, hỗ trợ tùy chỉnh đường dẫn Dockerfile, build target và build args. |
| **Railpack** | `3000` | Tự động nhận diện ngôn ngữ và framework (Node, Python, Go, PHP, Ruby, Java, Rust, ...) bằng [Railpack](https://railpack.com) (`v0.40.1` + BuildKit frontend) và đóng gói container image mà không cần viết `Dockerfile`. |
| **Static site** | `80` | Chạy lệnh build trong container tạm (`node:22-alpine` mặc định) và phục vụ thư mục đầu ra bằng máy chủ web tĩnh gọn nhẹ (`joseluisq/static-web-server`). |

## Các bước triển khai từ Git

1. Vào **Apps → New App → From Git repository**.
2. Nhập URL kho mã nguồn (HTTPS hoặc SSH). Với kho riêng tư qua SSH, Nitrobase có thể tạo sẵn **Deploy Key** để bạn thêm vào kho Git.
3. Nhấn **Check repository** để quét nhánh và tự nhận diện trình build.
4. Chọn **Nhánh (Branch)**, **Trình build**, cổng container, biến môi trường và tên miền (nếu có).
5. Nhấn **Deploy**. Nitrobase clone nhánh trong container dùng một lần (`alpine/git`), build image thông qua BuildKit builder riêng trên mỗi máy chủ (`nitrobase-builder`) có giới hạn RAM/CPU/thời gian (mặc định `2048 MB` RAM, `2` CPU, timeout `20 phút`), rồi khởi chạy kèm kiểm tra sức khỏe.

## Push Webhook (Tự động triển khai khi Push)

Mỗi ứng dụng Git có thể bật **Push Webhook** (`/api/hooks/git/<hookId>`) hỗ trợ GitHub, GitLab, Gitea/Forgejo và webhook ký HMAC tùy chỉnh:

- **Chống spam push (Debounce):** Các lần push liên tiếp được gom lại trong `WEBHOOK_DEBOUNCE_MS` (mặc định `10s`) để chỉ build commit mới nhất.
- **Chống phát lại & giới hạn tần suất:** Kiểm tra ID giao hàng chống replay (lưu 7 ngày) và giới hạn `30` yêu cầu/phút theo IP và hook.
- **Lịch sử image & Rollback:** Giữ mặc định `5` image thành công gần nhất cho mỗi ứng dụng (`GIT_KEEP_IMAGES`, cấu hình tối đa `50`) giúp quay lại commit cũ nhanh chóng.
- **Dọn cache BuildKit:** Tự động cắt gọn cache sau mỗi lần build trong giới hạn `BUILD_CACHE_KEEP_MB` (mặc định `4096 MB`).
