---
title: Triển khai Docker Compose tùy biến
description: Triển khai kiến trúc đa container phức tạp bằng file docker-compose.yml tùy chỉnh.
---

Đối với các ứng dụng phức tạp gồm nhiều microservices, bạn có thể triển khai trực tiếp bằng file `docker-compose.yml`.

SaaSBase sẽ tự động gắn các nhãn (labels) định tuyến Traefik và kết nối container vào mạng `saasbase-network`.
