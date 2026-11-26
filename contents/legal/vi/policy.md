---
title: "Chính sách Bảo mật"
description: "Tìm hiểu cách Nitrobase thu thập, bảo vệ và quản lý dữ liệu của bạn khi sử dụng nền tảng hạ tầng tự lưu trữ."
lastUpdated: "2026-10-15"
---

## 1. Giới thiệu

Chào mừng bạn đến với **Nitrobase** ("chúng tôi"). Chúng tôi cam kết bảo vệ quyền riêng tư và đảm bảo bạn có toàn quyền kiểm soát tuyệt đối đối với dữ liệu của mình. Do Nitrobase được xây dựng chuyên biệt để triển khai Supabase tự lưu trữ (self-hosted) trên máy chủ riêng (VPS) của bạn, dữ liệu cơ sở dữ liệu và thông tin nhạy cảm của ứng dụng luôn nằm trọn vẹn dưới quyền kiểm soát của bạn.

Chính sách bảo mật này giải thích thông tin nào được thu thập, cách thức sử dụng và quyền hạn của bạn khi truy cập website, bảng điều khiển triển khai và các dịch vụ liên quan.

## 2. Triết lý cốt lõi: Máy chủ của bạn, Dữ liệu của bạn

Khác biệt với các nền tảng đám mây đóng:

- **Chúng tôi không bao giờ lưu trữ các bản ghi dữ liệu hay bảng cơ sở dữ liệu của bạn.** Mọi database, storage bucket và bảng xác thực đều vận hành trực tiếp bên trong các Docker container trên VPS của bạn.
- **Kết nối SSH và API trực tiếp:** Khóa máy chủ dùng để thiết lập 1-click được mã hóa AES-256-GCM an toàn. Chúng tôi không can thiệp vào lưu lượng dữ liệu riêng tư.
- **Tự do di chuyển 100%:** Bạn có thể xuất dữ liệu, sao lưu, di chuyển sang nhà cung cấp VPS khác hoặc hủy bỏ phiên bản bất cứ lúc nào mà không bị ràng buộc (vendor lock-in).

## 3. Thông tin chúng tôi thu thập

### A. Thông tin tài khoản & Xác thực
Khi bạn đăng ký hoặc đăng nhập tài khoản Nitrobase, chúng tôi thu thập:
- Địa chỉ email của bạn.
- Thông tin đăng nhập hoặc định danh OAuth của bên thứ ba (như tài khoản GitHub hoặc Google).
- Cài đặt workspace và thông tin hồ sơ của bạn.

### B. Siêu dữ liệu cấu hình máy chủ
Để tự động hóa quá trình triển khai và theo dõi trạng thái hệ thống:
- Thông tin nhà cung cấp VPS (ví dụ: Hetzner, Vultr, DigitalOcean, hoặc địa chỉ IP tùy chỉnh).
- Phiên bản hệ điều hành (ví dụ: Ubuntu 22.04 / 24.04 LTS).
- Cấu hình tài nguyên hệ thống (CPU, RAM, dung lượng ổ đĩa).
- Nhật ký quá trình triển khai và tín hiệu kiểm tra tình trạng hoạt động (health check).

### C. Dữ liệu kỹ thuật & Nhật ký truy cập
Khi bạn sử dụng website, chúng tôi có thể thu thập thông tin chẩn đoán tiêu chuẩn:
- Loại thiết bị, trình duyệt, địa chỉ IP và ngôn ngữ ưu tiên.
- Thời gian tương tác và đường dẫn chuyển hướng.

## 4. Cách chúng tôi sử dụng thông tin

Thông tin thu thập được sử dụng nhằm các mục đích:
- **Khởi tạo & Quản lý:** Thực hiện việc cài đặt 1-click, điều phối container Docker và thiết lập lịch tự động sao lưu.
- **Bảo mật hệ thống:** Xác thực tài khoản, phát hiện hành vi gian lận và ngăn chặn các mối đe dọa bảo mật.
- **Thông báo dịch vụ:** Gửi cảnh báo quan trọng về trạng thái triển khai, thông báo sự cố sao lưu và các bản vá lỗi bảo mật.
- **Nâng cấp sản phẩm:** Phân tích ẩn danh để tối ưu hóa hiệu năng kịch bản triển khai và công cụ dòng lệnh (CLI).

## 5. An toàn dữ liệu & Thời gian lưu trữ

Chúng tôi áp dụng các tiêu chuẩn bảo mật hiện đại:
- **Mã hóa toàn diện:** Tất cả kết nối qua Nitrobase đều sử dụng mã hóa TLS 1.3. Khóa bảo mật được bảo vệ bằng cơ chế mã hóa cấp độ phần cứng.
- **Không bán dữ liệu:** Chúng tôi không bán, cho thuê hoặc thương mại hóa thông tin cá nhân hay cấu hình hạ tầng của bạn.
- **Xóa tài khoản:** Bạn có thể yêu cầu xóa tài khoản bất cứ lúc nào. Khi tài khoản bị xóa, toàn bộ token cấu hình liên quan sẽ được dọn dẹp vĩnh viễn.

## 6. Quyền của bạn

Bạn có đầy đủ các quyền đối với dữ liệu của mình:
- Yêu cầu truy cập và xuất bản sao dữ liệu tài khoản.
- Yêu cầu chỉnh sửa các thông tin chưa chính xác.
- Yêu cầu xóa toàn bộ dữ liệu ("Quyền được lãng quên").
- Rút lại sự đồng ý đối với việc xử lý thông tin bất kỳ lúc nào.

## 7. Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào liên quan đến Chính sách Bảo mật, vui lòng liên hệ với chúng tôi:

- **Email:** hoagminhit@gmail.com
- **Cộng đồng Discord:** https://discord.com
- **Website:** https://nitrobase.app
