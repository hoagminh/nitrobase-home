---
title: Docker Compose tùy biến (Custom Compose)
description: Triển khai các stack nhiều container bằng file docker-compose.yml của riêng bạn với kiểm duyệt bảo mật, định tuyến Traefik và sao lưu volume.
---

Khi cần chạy một hệ thống nhiều container không có sẵn trong marketplace, hãy sử dụng template **Custom compose** (`source.type = "inline"`).

## Cách hoạt động

1. Vào **Apps → New App → Custom compose**.
2. Dán nội dung `docker-compose.yml` và các biến `.env` tùy chọn (lưu mã hóa trong `apps.custom_spec_encrypted`).
3. Chọn service và cổng container muốn Traefik định tuyến, đồng thời chọn các named volume cần đưa vào bản sao lưu.
4. Trình hướng dẫn phân tích file compose trực tiếp và kiểm duyệt theo **Chính sách bảo mật Compose** của Nitrobase trước khi triển khai.
5. Sau khi chạy, bạn có thể chỉnh sửa compose bất kỳ lúc nào tại **App → Settings** kèm xem trước diff, rồi chọn **Save** hoặc **Save and redeploy**.

## Quy tắc định tuyến & an toàn

Ứng dụng Custom Compose đi qua đúng quy trình viết lại và kiểm duyệt bảo mật như template marketplace (với danh sách ngoại lệ `[security]` luôn trống):

- **Định tuyến Traefik:** Nitrobase gỡ bỏ mọi nhãn `traefik.*` và `com.docker.*`, tự sinh file định tuyến động tại `/etc/nitrobase/traefik/dynamic/app-<key>.yml`, và gắn container được định tuyến vào `nitrobase-network` theo tên container sau lệnh `docker compose up`.
- **Cổng xuất bản (`ports`):** Mọi mục `ports:` trong file compose bị gỡ tự động; lưu lượng HTTP/HTTPS đi qua Traefik.
- **Chính sách khởi động lại:** Service không khai báo `restart:` sẽ nhận `APP_DEFAULT_RESTART` (mặc định `unless-stopped`) để tự chạy lại sau khi máy chủ reboot (`restart: always` cũng được chuẩn hóa về `unless-stopped` để nút Stop giữ nguyên trạng thái dừng).
- **Bind mount tệp:** Đường dẫn tương đối phải nằm trong thư mục ứng dụng (`/etc/nitrobase/apps/<folder>`). Nếu compose mount các tệp cấu hình do ứng dụng tự tạo lúc chạy, hãy liệt kê chúng trong mục **Files the app creates itself** (`dataBinds`) để tránh lỗi khi Docker tự tạo thư mục rỗng.
- **Sao lưu:** Các lượt sao lưu thủ công và theo lịch sẽ dừng ngắn ứng dụng và nén toàn bộ named volume đã chọn thành gói `.tar.zst`.
