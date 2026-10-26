---
title: Giới thiệu về Nitrobase
description: Tổng quan về Nitrobase, so sánh với Coolify, Dokploy, CapRover và yêu cầu phần cứng tối thiểu.
---

**Nitrobase** là nền tảng tự lưu trữ PaaS (Platform as a Service) và BaaS (Backend as a Service) hiện đại, dành cho lập trình viên, kỹ sư DevOps và các nhóm phát triển muốn toàn quyền sở hữu hạ tầng mà không cần đến sự phức tạp của Kubernetes.

Kết nối bất kỳ máy chủ VPS Linux nào qua SSH hoặc chạy trực tiếp trên máy chủ lưu trữ. Nitrobase tự động cấu hình Docker và Traefik v3, cấp phát chứng chỉ SSL tự động, và cho phép triển khai các ứng dụng mã nguồn mở phổ biến như **Supabase**, **PocketBase**, **Appwrite**, **n8n** hoặc các Git repository tùy biến.

## Bảng so sánh tính năng

| Tiêu chí | Nitrobase | Coolify | Dokploy | CapRover |
| :--- | :--- | :--- | :--- | :--- |
| **Trọng tâm sản phẩm** | PaaS bảo mật cao + Chuyên sâu Supabase | PaaS đa năng thay thế Heroku | Docker PaaS tinh gọn | PaaS dựa trên Docker Swarm |
| **Reverse Proxy** | **Traefik v3** (Định tuyến động) | Traefik | Traefik | NGINX |
| **Mạng Zero-Trust** | **Cloudflare Tunnel (Chế độ Tunnel-Only)** | Tự cấu hình thủ công | Tự cấu hình thủ công | Plugin NGINX |
| **Mã hóa bí mật** | **AES-256-CBC + HKDF (v2)** | Mã hóa cơ bản | Mã hóa cơ bản | Plain / Cơ bản |
| **Phục hồi thảm họa** | Chống Split-Brain + Đồng bộ S3/R2 | Backup S3 | Backup S3 | File nén thủ công |
| **Nhập dữ liệu đám mây**| **Đồng bộ từ Supabase Cloud (DB + File + Function)** | Không có | Không có | Không có |
| **Công nghệ lõi** | **Bun + React 19 + TanStack Start** | PHP / Laravel | Node.js / Next.js | Node.js |


## Yêu cầu hệ thống

### Cấu hình máy chủ khuyến nghị (VPS)
* **Hệ điều hành:** Ubuntu 22.04 / 24.04 LTS, Debian 11 / 12 (hỗ trợ kiến trúc amd64 và arm64).
* **CPU:** Tối thiểu 1 Core (Khuyến nghị 2+ Cores cho Supabase hoặc các tác vụ build source code).
* **RAM:**
  * Tối thiểu 1 GB cho Nitrobase và các ứng dụng nhẹ (PocketBase, SQLite).
  * Khuyến nghị từ 2 GB - 4 GB khi chạy trọn bộ ngăn xếp Supabase.
* **Ổ cứng:** Tối thiểu 20 GB SSD.
* **Cổng mạng (Chế độ thông thường):**
  * Cổng `22` (SSH)
  * Cổng `80` & `443` (HTTP/HTTPS qua Traefik)
  * Cổng `3000` (Bảng điều khiển Nitrobase Web Panel)

:::tip[Lợi ích khi dùng Cloudflare Tunnel]
Nếu bạn kích hoạt **Cloudflare Tunnel**, bạn có thể **đóng hoàn toàn cổng 80 và 443** trên tường lửa của máy chủ!
:::
