---
title: "Chính sách Bảo mật"
description: "Tìm hiểu cách website Nitrobase xử lý dữ liệu truy cập và cách phần mềm Nitrobase tự lưu trữ giữ toàn bộ dữ liệu trên máy chủ riêng của bạn."
lastUpdated: "2026-11-27"
---

## 1. Tổng quan

Chính sách Bảo mật này mô tả cách dữ liệu được xử lý trên hai phạm vi tách biệt:

1. **Website Nitrobase** (`https://nitrobase.app`), bao gồm trang giới thiệu, tài liệu hướng dẫn và script cài đặt công khai (`https://nitrobase.app/install.sh`).
2. **Phần mềm Nitrobase tự lưu trữ (Self-Hosted)** (`github.com/AydenGroup/nitrobase`), do bạn tự tải về và vận hành trên máy chủ của riêng mình theo giấy phép **Functional Source License, Version 1.1, ALv2 Future License (`FSL-1.1-ALv2`)**.

Vì Nitrobase là bảng điều khiển **100% tự lưu trữ**, chúng tôi không vận hành dịch vụ đám mây tập trung để thu thập khóa máy chủ, cơ sở dữ liệu hay dữ liệu ứng dụng của bạn.

## 2. Phần mềm Nitrobase tự lưu trữ (Máy chủ của bạn, Dữ liệu của bạn)

Khi bạn cài đặt và vận hành Nitrobase trên VPS hoặc máy chủ cục bộ của mình:

- **Không thu thập Telemetry (Zero Telemetry):** Nitrobase **không** gửi dữ liệu thống kê sử dụng, địa chỉ IP máy chủ, thông tin tài khoản, nhật ký triển khai hay báo cáo lỗi về cho chúng tôi.
- **Toàn quyền lưu trữ cục bộ:** Mọi tài khoản panel, đội ngũ, khóa SSH, mật khẩu máy chủ, biến môi trường, dữ liệu cơ sở dữ liệu, chỉ số giám sát, nhật ký kiểm toán (Audit Log) và bản sao lưu đều nằm hoàn toàn trên hạ tầng do bạn kiểm soát.
- **Mã hóa phần mềm khi lưu trữ:** Toàn bộ bí mật lưu trong PostgreSQL của bảng điều khiển và tệp `env.enc` trong bản sao lưu ứng dụng được mã hóa ngay trên máy chủ của bạn bằng **AES-256-GCM** có xác thực kết hợp **HKDF-SHA256** (Format `v3:`) từ chính `ENCRYPTION_KEY` của bạn. Tệp tự sao lưu bảng điều khiển (`.tar.gz.enc`) được mã hóa bằng OpenSSL **AES-256-CBC** (PBKDF2-SHA256, 200.000 vòng lặp) với `ENCRYPTION_KEY` của bạn. Chúng tôi không bao giờ có quyền truy cập vào `ENCRYPTION_KEY` hay dữ liệu đã mã hóa của bạn.

### Các kết nối chiều đi từ bản Nitrobase tự lưu trữ

Bản Nitrobase trên máy chủ của bạn chỉ tạo kết nối mạng chiều đi trực tiếp tới các dịch vụ bên thứ ba phục vụ cho tính năng bạn sử dụng hoặc chủ động cấu hình:

- **Kiểm tra phiên bản & template:** Truy vấn `RELEASE_REPO` (mặc định `AydenGroup/nitrobase` trên GitHub) và kho mã nguồn của các template trên GitHub để lấy danh sách phiên bản. Bạn có thể tắt kiểm tra cập nhật panel bằng `UPDATE_CHECK_ENABLED=false` trong `.env`, hoặc trỏ `RELEASE_REPO` / `RELEASE_API_URL` sang máy chủ Git riêng.
- **Kho chứa container (Container Registry):** Kéo Docker image từ GHCR (`ghcr.io`), Docker Hub hoặc registry khai báo trong ứng dụng/template của bạn.
- **TLS & Tên miền:** Kết nối tới Let's Encrypt (ACME) khi cấp/gia hạn chứng chỉ HTTPS và `sslip.io` khi dùng tên miền miễn phí tự động.
- **Tích hợp do bạn cấu hình:** Kết nối trực tiếp tới điểm lưu trữ sao lưu (S3, Cloudflare R2, Backblaze B2), máy chủ Git, Cloudflare Tunnel, kênh thông báo (SMTP, Discord, Slack, Telegram, Webhook) hoặc Cloud Sync (Supabase Cloud, Appwrite Cloud) mà bạn tự thiết lập.

Mỗi dịch vụ bên thứ ba bạn kết nối tuân theo chính sách bảo mật riêng của nhà cung cấp đó.

## 3. Thông tin được xử lý bởi Website Nitrobase (`https://nitrobase.app`)

Khi bạn truy cập `https://nitrobase.app` hoặc tải `https://nitrobase.app/install.sh`:

- **Nhật ký máy chủ/CDN tiêu chuẩn:** Hạ tầng lưu trữ/CDN của website (Cloudflare) có thể xử lý siêu dữ liệu yêu cầu HTTP cơ bản — như địa chỉ IP, trình duyệt (user agent), đường dẫn yêu cầu và thời điểm truy cập — nhằm đảm bảo bảo mật, chống tấn công DDoS và duy trì ổn định hệ thống.
- **Tùy chọn hiển thị:** Trình duyệt lưu các tùy chọn nhẹ ở phía người dùng (ngôn ngữ `en`/`vi` và giao diện sáng/tối).
- **Thông tin bạn chủ động gửi:** Nếu bạn gửi email tới `hoagminhit@gmail.com` hoặc gửi yêu cầu liên hệ/đăng ký nhận tin trên website, chúng tôi chỉ dùng thông tin liên hệ đó để phản hồi yêu cầu hoặc gửi thông báo cập nhật bạn đã đăng ký.

## 4. Mục đích sử dụng thông tin trên Website

Thông tin trên `https://nitrobase.app` chỉ được sử dụng để:

- Phục vụ nội dung website, tài liệu kỹ thuật và script cài đặt ổn định, an toàn.
- Ngăn chặn lạm dụng, tấn công tự động và bảo vệ hạ tầng website.
- Phản hồi các câu hỏi hỗ trợ, bảo mật, giấy phép hoặc pháp lý từ bạn.

Chúng tôi **không bao giờ bán, cho thuê hoặc trao đổi** thông tin cá nhân của bạn cho bên thứ ba.

## 5. Lưu giữ dữ liệu & Quyền của bạn

- **Dữ liệu tự lưu trữ:** Bạn trực tiếp kiểm soát thời gian lưu giữ, sao lưu, phân quyền và xóa dữ liệu trong bản Nitrobase trên máy chủ của chính mình.
- **Trao đổi qua website/email:** Email hoặc yêu cầu bạn gửi chỉ được lưu trong thời gian cần thiết để giải quyết yêu cầu hoặc tuân thủ quy định pháp luật.
- **Quyền riêng tư:** Tùy theo quy định pháp luật tại khu vực của bạn (bao gồm GDPR và CCPA), bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin liên hệ cá nhân đã gửi cho chúng tôi qua email.

## 6. Thay đổi Chính sách

Chúng tôi có thể cập nhật Chính sách Bảo mật này khi website hoặc yêu cầu pháp lý thay đổi. Mọi cập nhật sẽ được công bố tại trang này kèm ngày `Cập nhật lần cuối` mới.

## 7. Liên hệ

Nếu bạn có bất kỳ câu hỏi nào về Chính sách Bảo mật hoặc muốn thực hiện quyền riêng tư của mình, vui lòng liên hệ:

- **Email:** hoagminhit@gmail.com
- **GitHub:** https://github.com/AydenGroup/nitrobase
- **Website:** https://nitrobase.app
