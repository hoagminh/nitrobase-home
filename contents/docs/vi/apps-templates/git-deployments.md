---
title: Triển khai từ Git Repository
description: Triển khai ứng dụng tùy biến trực tiếp từ GitHub hoặc Git repo riêng qua Dockerfile.
---

Bên cạnh kho mẫu có sẵn, bạn có thể triển khai mã nguồn ứng dụng riêng của mình trực tiếp từ Git.

## Các bước triển khai từ Git
1. Vào **Apps -> New App -> Git Repository**.
2. Nhập URL repository (hỗ trợ HTTPS hoặc SSH Deploy Key).
3. Chỉ định nhánh cần triển khai (ví dụ: `main`).
4. Chọn phương thức build: **Dockerfile** hoặc **Nixpacks**.
5. Điền biến môi trường và cổng ứng dụng.
6. Bấm **Deploy**. Nitrobase sẽ kéo mã nguồn về và stream log quá trình build trực tiếp trên màn hình.
