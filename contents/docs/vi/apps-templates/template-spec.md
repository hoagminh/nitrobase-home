---
title: Đặc tả Template (template.toml)
description: Hướng dẫn định dạng file template.toml để đóng góp template mới vào kho ứng dụng Nitrobase.
---

Mỗi ứng dụng trong marketplace của Nitrobase được định nghĩa thông qua một file `template.toml` nằm trong thư mục `templates/`.

```toml
[meta]
id = "pocketbase"
name = "PocketBase"
description = "Open Source backend in 1 file"
version = "0.22.0"

[services.pocketbase]
image = "ghcr.io/muchobien/pocketbase:{{version}}"
ports = [8090]
volumes = ["pb_data:/pb_data"]

[env]
PB_ENCRYPTION_KEY = { type = "random_hex", bytes = 32 }
```
