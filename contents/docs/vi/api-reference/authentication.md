---
title: Xác thực REST API
description: Tạo và quản lý API Bearer Token (sbk_...) để xác thực các lệnh gọi REST API vào Nitrobase.
---

Nitrobase cung cấp giao diện REST API chuẩn tại `/api/v1`.

## Tạo mã API Token
1. Vào **Settings -> API tokens**.
2. Bấm **Create Token**.
3. Chọn **Personal Token** (quyền hạn theo tài khoản của bạn) hoặc **Team Token** (chỉ định quyền riêng).
4. Sao chép chuỗi token có tiền tố `sbk_`. Mã này chỉ hiển thị 1 lần duy nhất khi tạo.

## Sử dụng Token trong Header
```bash
curl -H "Authorization: Bearer sbk_token_cua_ban" \
  https://panel.domain-cua-ban.com/api/v1/apps
```
