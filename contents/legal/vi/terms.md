---
title: "Điều khoản Dịch vụ"
description: "Điều khoản sử dụng website, tóm tắt giấy phép phần mềm FSL-1.1-ALv2, phần mềm bên thứ ba và miễn trừ trách nhiệm của Nitrobase."
lastUpdated: "2026-11-27"
---

## 1. Phạm vi & Chấp thuận

Các Điều khoản Dịch vụ này ("Điều khoản") điều chỉnh việc bạn sử dụng website **Nitrobase** (`https://nitrobase.app`), tài liệu hướng dẫn và script cài đặt công khai (`https://nitrobase.app/install.sh`).

Việc bạn tải xuống, cài đặt, chỉnh sửa, phân phối lại và sử dụng **phần mềm Nitrobase** (`github.com/AydenGroup/nitrobase`) được điều chỉnh bởi giấy phép **Functional Source License, Version 1.1, ALv2 Future License (`FSL-1.1-ALv2`)** trong tệp [`LICENSE.md`](https://github.com/AydenGroup/nitrobase/blob/main/LICENSE.md). **Nếu có bất kỳ xung đột nào giữa Điều khoản này và `LICENSE.md` liên quan đến quyền sử dụng phần mềm Nitrobase, nội dung của `LICENSE.md` sẽ được ưu tiên áp dụng.**

## 2. Giấy phép Phần mềm (`FSL-1.1-ALv2`)

Nitrobase là phần mềm theo mô hình **Fair Source** (Bản quyền © 2026 Jimmy Phong), phát hành theo giấy phép `FSL-1.1-ALv2`:

- **Mục đích được phép (Permitted Purposes):** Tuân theo các điều kiện trong `LICENSE.md`, bạn được quyền sử dụng, sao chép, chỉnh sửa, tạo tác phẩm phái sinh, tự lưu trữ và phân phối lại Nitrobase cho mọi mục đích ngoại trừ Mục đích Cạnh tranh — bao gồm sử dụng cá nhân hoặc nội bộ doanh nghiệp, giáo dục phi thương mại, nghiên cứu phi thương mại và cung cấp dịch vụ chuyên môn/triển khai cho khách hàng sử dụng Nitrobase.
- **Cấm sử dụng cạnh tranh (No Competing Use):** Bạn **không** được cung cấp Nitrobase cho bên khác trong một sản phẩm hoặc dịch vụ thương mại thay thế cho Nitrobase, thay thế cho sản phẩm/dịch vụ khác mà chúng tôi cung cấp bằng Nitrobase, hoặc cung cấp chức năng giống hay tương tự về cơ bản với Nitrobase.
- **Tự động chuyển sang Apache 2.0 sau 2 năm:** Mỗi phiên bản Nitrobase tự động trở nên khả dụng theo giấy phép **Apache License, Version 2.0** vào đúng dịp kỷ niệm 2 năm kể từ ngày phiên bản đó được phát hành.
- **Phân phối lại & Ghi nhận bản quyền:** Mọi bản sao, chỉnh sửa hoặc tác phẩm phái sinh khi phân phối lại phải kèm theo bản sao hoặc liên kết tới `LICENSE.md` và giữ nguyên mọi thông báo bản quyền.
- **Sáng chế & Thương hiệu:** `LICENSE.md` cấp quyền sử dụng sáng chế cho các Mục đích được phép (và chấm dứt nếu bạn khởi kiện vi phạm sáng chế liên quan đến phần mềm). Cả `LICENSE.md` lẫn Điều khoản này đều không cấp quyền sử dụng tên gọi, logo hay thương hiệu **Nitrobase**, ngoại trừ mục đích hiển thị thông tin giấy phép và ghi nhận nguồn gốc phần mềm.

## 3. Trách nhiệm khi tự lưu trữ (Self-Hosted)

Nitrobase là phần mềm tự lưu trữ vận hành hoàn toàn trên hạ tầng do bạn sở hữu hoặc thuê. Bạn tự chịu trách nhiệm đối với:

- **Chi phí hạ tầng bên thứ ba:** Mọi chi phí VPS, băng thông, lưu trữ (S3/R2/B2), DNS và tên miền với nhà cung cấp bên thứ ba.
- **Bảo mật khóa & kiểm soát truy cập:** Bảo vệ tệp `.env`, `ENCRYPTION_KEY`, `SESSION_SECRET`, `SETUP_TOKEN`, khóa SSH, API/MCP token `nbk_...`, phân quyền đội ngũ RBAC và Xác thực hai yếu tố (2FA). Nếu mất `ENCRYPTION_KEY`, mọi bí mật đã lưu và bản sao lưu mã hóa đều không thể giải mã.
- **Sao lưu & khôi phục thảm họa:** Thiết lập sao lưu ngoài máy chủ, định kỳ kiểm thử khôi phục và kiểm tra migration cơ sở dữ liệu trước khi nâng cấp hệ thống production.
- **Quản trị máy chủ & tuân thủ pháp luật:** Cập nhật bản vá hệ điều hành, cấu hình tường lửa và tuân thủ quy định pháp lý đối với ứng dụng và dữ liệu bạn lưu trữ.

## 4. Phần mềm & Template của bên thứ ba

Nitrobase hỗ trợ bạn triển khai các ứng dụng, cơ sở dữ liệu và công cụ của bên thứ ba — bao gồm Supabase, Appwrite, PocketBase, PostgreSQL, MySQL, MariaDB, Valkey, MongoDB, n8n, Plausible, Umami, RustFS, Docker, Traefik, rclone, Railpack và Cloudflare Tunnel.

- Mỗi dự án bên thứ ba tuân theo **giấy phép riêng của dự án đó** (ví dụ: Apache 2.0, MIT, PostgreSQL, BSD-3-Clause, GPL-2.0, AGPL, Sustainable Use License hoặc **SSPL-1.0** của MongoDB — vốn không phải giấy phép nguồn mở OSI).
- Bạn có trách nhiệm tự xem xét và tuân thủ giấy phép cũng như điều khoản của từng template, container image hoặc dịch vụ đám mây bên thứ ba (như Supabase Cloud hay Appwrite Cloud) mà bạn triển khai hoặc kết nối.

## 5. Sử dụng hợp lệ đối với Website

Khi sử dụng `https://nitrobase.app` và các điểm phân phối công khai (như `/install.sh`), bạn đồng ý không:

- Sử dụng website trái với quy định pháp luật hiện hành.
- Thực hiện tấn công từ chối dịch vụ (DDoS), khai thác tự động gây quá tải hoặc tìm cách xâm nhập, phá hoại hạ tầng vận hành website.
- Mạo danh Nitrobase hoặc phát tán bộ cài đặt đã bị chỉnh sửa nhưng giả mạo là bản phát hành chính thức của Nitrobase.

Không có nội dung nào trong mục này hạn chế các quyền đã được cấp rõ ràng cho bạn đối với phần mềm Nitrobase theo `FSL-1.1-ALv2` (hoặc Apache 2.0 sau thời hạn 2 năm).

## 6. Quyền Sở hữu Trí tuệ

- **Phần mềm & Tài liệu Nitrobase:** Được cấp phép theo `FSL-1.1-ALv2` như quy định trong `LICENSE.md` (Bản quyền © 2026 Jimmy Phong).
- **Thương hiệu & Nhận diện:** Tên gọi Nitrobase, logo và tài sản thương hiệu vẫn thuộc quyền sở hữu độc quyền của chủ sở hữu bản quyền Nitrobase.
- **Ứng dụng & Dữ liệu của Bạn:** Bạn giữ 100% quyền sở hữu và quyền sở hữu trí tuệ đối với mã nguồn, cơ sở dữ liệu, schema, tệp tin và hệ thống của riêng bạn.

## 7. Miễn trừ Bảo đảm

WEBSITE, TÀI LIỆU, SCRIPT CÀI ĐẶT, TEMPLATE VÀ PHẦN MỀM NITROBASE ĐƯỢC CUNG CẤP THEO NGUYÊN TẮC **"NGUYÊN TRẠNG" (AS IS)** VÀ **"TÙY THEO TÌNH TRẠNG SẴN CÓ" (AS AVAILABLE)**, KHÔNG KÈM BẤT KỲ BẢO ĐẢM NÀO — DÙ RÕ RÀNG HAY NGỤ Ý — BAO GỒM NHƯNG KHÔNG GIỚI HẠN Ở BẢO ĐẢM VỀ KHẢ NĂNG THƯƠNG MẠI, SỰ PHÙ HỢP CHO MỤC ĐÍCH CỤ THỂ, QUYỀN SỞ HỮU, THỜI GIAN HOẠT ĐỘNG LIÊN TỤC HOẶC KHÔNG VI PHẠM QUYỀN BÊN THỨ BA.

## 8. Giới hạn Trách nhiệm Pháp lý

TRONG PHẠM VI TỐI ĐA ĐƯỢC PHÁP LUẬT HIỆN HÀNH CHO PHÉP, TRONG MỌI TRƯỜNG HỢP, NITROBASE, CHỦ SỞ HỮU BẢN QUYỀN, CỘNG TÁC VIÊN HOẶC ĐỐI TÁC LIÊN KẾT SẼ KHÔNG CHỊU TRÁCH NHIỆM PHÁP LÝ PHÁT SINH TỪ HOẶC LIÊN QUAN ĐẾN WEBSITE HAY PHẦN MỀM, BAO GỒM MỌI THIỆT HẠI GIÁN TIẾP, NGẪU NHIÊN, ĐẶC BIỆT, HỆ QUẢ HOẶC MANG TÍNH TRỪNG PHẠT, CŨNG NHƯ MẤT DỮ LIỆU, MẤT LỢI NHUẬN HAY GIÁN ĐOẠN MÁY CHỦ, NGAY CẢ KHI ĐÃ ĐƯỢC THÔNG BÁO TRƯỚC VỀ KHẢ NĂNG XẢY RA THIỆT HẠI ĐÓ.

## 9. Thay đổi Điều khoản

Chúng tôi có thể cập nhật Điều khoản website này theo thời gian bằng cách đăng phiên bản mới tại trang này và cập nhật ngày `Cập nhật lần cuối`. Giấy phép phần mềm của các phiên bản Nitrobase đã phát hành vẫn tuân thủ đúng điều khoản của `FSL-1.1-ALv2` (bao gồm cam kết không hủy ngang về việc chuyển sang Apache License 2.0 sau 2 năm).

## 10. Liên hệ

Nếu bạn có câu hỏi về Điều khoản này hoặc giấy phép Nitrobase, vui lòng liên hệ:

- **Email:** hoagminhit@gmail.com
- **GitHub:** https://github.com/AydenGroup/nitrobase
- **Website:** https://nitrobase.app
