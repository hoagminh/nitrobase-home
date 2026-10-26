
export default {
  "en": {
    "workflowSteps": [
      {
        "step": 1,
        "badgeKey": "01",
        "title": "Connect VPS & Bootstrap",
        "desc": "Connect any fresh Ubuntu or Debian server over SSH with TOFU host key verification. Nitrobase automatically provisions Docker Engine 27, Traefik v3 reverse proxy, and configures TLS 1.3 Let's Encrypt certificates.",
        "imageUrl": "/uploads/step-1.png"
      },
      {
        "step": 2,
        "badgeKey": "02",
        "title": "Deploy Supabase & Backends",
        "desc": "Launch full-stack Supabase (Postgres 16, pgvector, GoTrue Auth, Kong Gateway, Studio), PocketBase, Appwrite, or import your entire database directly from Supabase Cloud with automatic credential generation.",
        "imageUrl": "/uploads/step-2.png"
      },
      {
        "step": 3,
        "badgeKey": "03",
        "title": "Backups & Zero-Downtime Migration",
        "desc": "Automate AES-256-CBC encrypted backups streamed offsite to Cloudflare R2, AWS S3, or B2. Move apps between servers seamlessly with automated health verification, instant rollback, and real-time telemetry.",
        "imageUrl": "/uploads/step-3.png"
      }
    ]
  },
  "vi": {
    "workflowSteps": [
      {
        "step": 1,
        "badgeKey": "01",
        "title": "Kết nối VPS & Khởi tạo tự động",
        "desc": "Kết nối máy chủ Ubuntu hoặc Debian mới qua SSH với cơ chế xác minh khóa TOFU. Nitrobase tự động cài đặt Docker Engine 27, reverse proxy Traefik v3 và cấu hình chứng chỉ SSL Let's Encrypt TLS 1.3.",
        "imageUrl": "/uploads/step-1.png"
      },
      {
        "step": 2,
        "badgeKey": "02",
        "title": "Triển khai Supabase & Backend",
        "desc": "Khởi chạy cụm Supabase full-stack (Postgres 16, pgvector, GoTrue Auth, Kong Gateway, Studio), PocketBase, Appwrite hoặc nhập trực tiếp database từ Supabase Cloud với thông tin xác thực tự sinh.",
        "imageUrl": "/uploads/step-2.png"
      },
      {
        "step": 3,
        "badgeKey": "03",
        "title": "Sao lưu & Di chuyển không Downtime",
        "desc": "Tự động sao lưu mã hóa AES-256-CBC truyền trực tiếp lên Cloudflare R2, AWS S3 hoặc B2. Di chuyển ứng dụng giữa các máy chủ an toàn với xác minh sức khỏe tự động, hoàn tác tức thì và giám sát theo thời gian thực.",
        "imageUrl": "/uploads/step-3.png"
      }
    ]
  }
}