---
title: Cộng đồng & Đóng góp
description: Cách báo lỗi, đề xuất tính năng, đóng góp template marketplace và thông tin giấy phép Nitrobase.
---

Mọi đóng góp mã nguồn, báo cáo lỗi, đề xuất tính năng và template ứng dụng mới đều được hoan nghênh!

## Cách tham gia đóng góp

- **Kho mã nguồn GitHub:** Xem mã nguồn và các bản phát hành tại [github.com/AydenGroup/nitrobase](https://github.com/AydenGroup/nitrobase).
- **Báo lỗi & Đề xuất tính năng:** Mở issue tại [GitHub Issues](https://github.com/AydenGroup/nitrobase/issues).
- **Đóng góp Template ứng dụng:** Thêm một ứng dụng tự lưu trữ mới chỉ cần tạo thư mục `templates/<id>/` với `template.toml`, `docker-compose.yml` (hoặc `source.path` từ upstream), `logo.svg` và fixture kiểm thử offline. Xem chi tiết tại trang **Đặc tả Template**.
- **Dịch thuật:** Nitrobase dùng Lingui (hiện có tiếng Anh và tiếng Việt). Thêm ngôn ngữ mới chỉ cần khai báo locale và dịch tệp JSON catalog.

## Trước khi mở Pull Request

1. Tuân thủ chuẩn [Conventional Commits](https://www.conventionalcommits.org/) cho thông điệp commit.
2. Chạy `bun run typecheck`, `bun run check` và `bun run test`.
3. Nếu thay đổi văn bản giao diện hoặc template, chạy `bun run i18n:extract`, cập nhật bản dịch và kiểm tra bằng `bun run i18n:check`.

## Giấy phép

Nitrobase phát hành theo **Functional Source License, Version 1.1, ALv2 Future License (`FSL-1.1-ALv2`)** — miễn phí sử dụng, chỉnh sửa và tự lưu trữ cho cá nhân, công ty hoặc khách hàng (trừ việc cung cấp dịch vụ cạnh tranh trực tiếp), và tự động chuyển sang **Apache 2.0** sau 2 năm kể từ mỗi bản phát hành.
