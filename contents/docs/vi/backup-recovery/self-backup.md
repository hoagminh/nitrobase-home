---
title: Tự sao lưu Nitrobase (Self-Backup)
description: Sao lưu toàn bộ dữ liệu hệ thống Nitrobase, tạo manifest và mã hóa qua OpenSSL.
---

Nitrobase có khả năng tự sao lưu toàn bộ cấu hình và cơ sở dữ liệu của chính mình tại **Data -> Backups -> Take Self-Backup**.

Gói sao lưu bao gồm:
1. Bản xuất toàn diện cơ sở dữ liệu PostgreSQL qua `pg_dump`.
2. File manifest chứa thông tin phiên bản schema, thời gian và instance marker.
3. Mã hóa an toàn bằng OpenSSL AES-256-CBC PBKDF2 sử dụng khóa `ENCRYPTION_KEY`.
