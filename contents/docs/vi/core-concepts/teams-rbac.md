---
title: Đội ngũ & Phân quyền RBAC
description: Quản lý đa người dùng, cộng tác nhóm, phân quyền và tạo liên kết mời thành viên.
---

Nitrobase hỗ trợ đa người dùng ngay từ nền tảng. Mọi tài nguyên như máy chủ, ứng dụng, tên miền, đích sao lưu đều thuộc về một **Nhóm (Team)**.

## Ma trận phân quyền 4 cấp (RBAC)

| Vai trò | Quản lý Server | Deploy App | Xem thông tin mật | Quản lý thành viên |
| :--- | :---: | :---: | :---: | :---: |
| **Owner** (Chủ sở hữu) | Toàn quyền | Toàn quyền | Toàn quyền | Toàn quyền |
| **Admin** (Quản trị viên) | Toàn quyền | Toàn quyền | Toàn quyền | Có (Không thể xóa team) |
| **Developer** (Lập trình viên)| Chỉ xem | Triển khai / Sửa app | Bị ẩn / Che mờ | Không |
| **Viewer** (Quan sát viên) | Chỉ xem | Chỉ xem log | Bị ẩn | Không |

## Mời thành viên mới
Quản trị viên nhóm có thể tạo link mời tham gia tại mục **Settings -> Team -> Invites**, link có thể gửi tự động qua email hoặc copy gửi trực tiếp.
