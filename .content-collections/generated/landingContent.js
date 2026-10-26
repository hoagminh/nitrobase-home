
export default {
  "en": {
    "techPartners": [
      {
        "id": "supabase",
        "name": "Supabase",
        "logoUrl": "/uploads/supabase.png"
      },
      {
        "id": "postgresql",
        "name": "PostgreSQL",
        "logoUrl": "/uploads/postgresql.png"
      },
      {
        "id": "docker",
        "name": "Docker",
        "logoUrl": "/uploads/docker.png"
      },
      {
        "id": "vultr",
        "name": "Vultr",
        "logoUrl": "/uploads/vultr.png"
      },
      {
        "id": "digitalocean",
        "name": "DigitalOcean",
        "logoUrl": "/uploads/digitalocean.png"
      },
      {
        "id": "linode",
        "name": "Linode",
        "logoUrl": "/uploads/linode.png"
      }
    ],
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
    ],
    "benefitItems": [
      {
        "id": "vps-bootstrap",
        "iconName": "server",
        "title": "1-Click VPS & Docker Bootstrap",
        "desc": "Connect any Ubuntu or Debian VPS via SSH. Nitrobase bootstraps Docker 27, Traefik v3 reverse proxy, and SSL certificates automatically, or publishes securely through Cloudflare Tunnel without opening ports 80/443.",
        "action": "View architecture",
        "tags": [
          "Ubuntu / Debian",
          "Docker 27",
          "Traefik v3"
        ]
      },
      {
        "id": "supabase-full-stack",
        "iconName": "database",
        "title": "Supabase, PocketBase, Appwrite & n8n",
        "desc": "Deploy full-stack Supabase (Postgres 16, pgvector, Auth, Studio), PocketBase, Appwrite, or workflow automation with n8n in 1 click with auto-generated credentials.",
        "action": "Explore stacks",
        "tags": [
          "Supabase",
          "PocketBase",
          "Appwrite",
          "n8n"
        ]
      },
      {
        "id": "cloud-sync-migration",
        "iconName": "refresh-cw",
        "title": "Cloud Sync & Atomic Migration",
        "desc": "Import directly from Supabase Cloud - pulling database schemas, data, storage files, and edge functions to your VPS. Move running apps between servers with automated health verification and zero-downtime rollback.",
        "action": "Cloud sync",
        "tags": [
          "Supabase Cloud",
          "Zero-Downtime",
          "Rollback"
        ]
      },
      {
        "id": "enterprise-security",
        "iconName": "shield-check",
        "title": "Encrypted Backups & Security",
        "desc": "Enterprise-grade security with HKDF-derived versioned secrets, zero-downtime key rotation, AES-256-CBC encrypted backups streamed to Cloudflare R2/S3, one-time SETUP_TOKEN protection, 2FA, and full audit logs.",
        "action": "Security specs",
        "tags": [
          "AES-256-CBC",
          "Cloudflare R2 / S3",
          "HKDF v2"
        ]
      }
    ],
    "testimonials": [
      {
        "id": "alex-carter",
        "name": "Alex Carter",
        "role": "Full-stack Developer",
        "quote": "Nitrobase made self-hosting Supabase completely effortless. What used to take hours of manual Docker Compose configuration, Traefik routing, and SSL renewals now happens in one click. Our production cluster runs like a dream.",
        "avatarUrl": "/uploads/avatar-alex.png"
      },
      {
        "id": "sophia-kim",
        "name": "Sophia Kim",
        "role": "Indie Hacker",
        "quote": "Moving from hosted Supabase Cloud to my own $10 Hetzner VPS slashed my monthly infrastructure bill by 80%. The 1-click Cloud Sync pulled my entire database and storage buckets across without any friction.",
        "avatarUrl": "/uploads/avatar-sophia.png"
      },
      {
        "id": "daniel-ruiz",
        "name": "Daniel Ruiz",
        "role": "CTO & Co-founder",
        "quote": "The zero-downtime server migration and AES-256 encrypted offsite backups to Cloudflare R2 give our engineering team enterprise resilience. We own our data 100% with zero vendor lock-in.",
        "avatarUrl": "/uploads/avatar-daniel.png"
      },
      {
        "id": "marcus-vance",
        "name": "Marcus Vance",
        "role": "Lead DevOps Engineer",
        "quote": "Publishing backends through Cloudflare Tunnel without opening ports 80/443 on our VPS is brilliant. The SSH TOFU verification, scoped API tokens, and multi-channel alerts fit seamlessly into our team's workflow.",
        "avatarUrl": "/uploads/avatar-alex.png"
      }
    ],
    "faqItems": [
      {
        "id": "faq-1",
        "question": "What is Nitrobase and how does it compare to Coolify or Dokploy?",
        "answer": "Nitrobase is an open-source, self-hosted PaaS and BaaS deployer. While general PaaS tools focus on general web apps, Nitrobase provides deep, specialized automation for modern Backend-as-a-Service and workflow platforms (including Supabase, PocketBase, Appwrite, and n8n), with automated database clustering, connection pooling, cloud migration, and offsite disaster recovery."
      },
      {
        "id": "faq-2",
        "question": "What VPS providers and operating systems are supported?",
        "answer": "Nitrobase runs on any fresh Ubuntu (20.04/22.04/24.04 LTS) or Debian server (amd64 or arm64 architecture) with 1 GB RAM minimum (512 MB for PocketBase, 2 GB for Appwrite & n8n, 4 GB+ recommended for full Supabase stacks). You can connect servers from Hetzner, DigitalOcean, Vultr, Linode, AWS, GCP, OVH, Scaleway, Contabo, or any bare-metal server via SSH."
      },
      {
        "id": "faq-3",
        "question": "What components are included in the self-hosted Supabase stack?",
        "answer": "The stack deploys the full production Supabase ecosystem: PostgreSQL 16 (with pgvector for AI embeddings), Supavisor connection pooler, Kong API Gateway, GoTrue Auth with JWT & OAuth, PostgREST for REST APIs, Realtime WebSockets (CDC), Storage, and the Supabase Studio dashboard."
      },
      {
        "id": "faq-4",
        "question": "How does Cloud Sync from Supabase Cloud work?",
        "answer": "Nitrobase securely connects to your hosted Supabase Cloud project via encrypted credentials and session pooler, then automatically replicates your database schema, table data, storage bucket files, and edge functions to your private VPS, eliminating prohibitive egress bandwidth fees."
      },
      {
        "id": "faq-5",
        "question": "How does Nitrobase secure secrets, keys, and backups?",
        "answer": "All secrets, passwords, and SSH keys are stored in a versioned format (v2:) using HKDF key derivation. Database backups are encrypted with AES-256-CBC and streamed offsite to Cloudflare R2, AWS S3, or Backblaze B2. Furthermore, a one-time SETUP_TOKEN prevents unauthorized instance takeovers during initialization."
      },
      {
        "id": "faq-6",
        "question": "Can I publish apps securely without opening public firewall ports?",
        "answer": "Yes! Nitrobase natively integrates Cloudflare Tunnel (Zero Trust). You can publish your applications and dashboards to the web using an outbound tunnel connector token, keeping ports 80 and 443 closed on your VPS firewall."
      },
      {
        "id": "faq-7",
        "question": "How does zero-downtime server migration work?",
        "answer": "When moving an app to another server, Nitrobase takes an atomic backup, streams it via S3/R2 storage, restores and health-checks all containers on the target machine, updates DNS records, and only removes source resources once health is 100% verified. If any step fails, it automatically rolls back."
      }
    ]
  },
  "vi": {
    "techPartners": [
      {
        "id": "supabase",
        "name": "Supabase",
        "logoUrl": "/uploads/supabase.png"
      },
      {
        "id": "postgresql",
        "name": "PostgreSQL",
        "logoUrl": "/uploads/postgresql.png"
      },
      {
        "id": "docker",
        "name": "Docker",
        "logoUrl": "/uploads/docker.png"
      },
      {
        "id": "vultr",
        "name": "Vultr",
        "logoUrl": "/uploads/vultr.png"
      },
      {
        "id": "digitalocean",
        "name": "DigitalOcean",
        "logoUrl": "/uploads/digitalocean.png"
      },
      {
        "id": "linode",
        "name": "Linode",
        "logoUrl": "/uploads/linode.png"
      }
    ],
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
    ],
    "benefitItems": [
      {
        "id": "vps-bootstrap",
        "iconName": "server",
        "title": "Khởi tạo VPS & Docker 1-Click",
        "desc": "Kết nối bất kỳ VPS Ubuntu hoặc Debian nào qua SSH. Nitrobase tự động cài đặt Docker 27, Traefik v3 và chứng chỉ SSL, hoặc xuất bản an toàn qua Cloudflare Tunnel mà không cần mở cổng 80/443.",
        "action": "Xem kiến trúc",
        "tags": [
          "Ubuntu / Debian",
          "Docker 27",
          "Traefik v3"
        ]
      },
      {
        "id": "supabase-full-stack",
        "iconName": "database",
        "title": "Supabase, PocketBase, Appwrite & n8n",
        "desc": "Triển khai cụm Supabase đầy đủ (Postgres 16, pgvector, Auth, Studio), PocketBase, Appwrite hoặc nền tảng tự động hóa quy trình n8n chỉ trong 1 cú nhấp chuột với thông tin xác thực được tạo tự động.",
        "action": "Khám phá các stack",
        "tags": [
          "Supabase",
          "PocketBase",
          "Appwrite",
          "n8n"
        ]
      },
      {
        "id": "cloud-sync-migration",
        "iconName": "refresh-cw",
        "title": "Đồng bộ Đám mây & Di chuyển An toàn",
        "desc": "Nhập trực tiếp từ Supabase Cloud - đồng bộ schema database, dữ liệu bảng, tệp storage và edge functions về VPS của bạn. Di chuyển ứng dụng giữa các máy chủ với xác thực sức khỏe tự động và hoàn tác không gián đoạn.",
        "action": "Đồng bộ Cloud",
        "tags": [
          "Supabase Cloud",
          "Zero-Downtime",
          "Rollback"
        ]
      },
      {
        "id": "enterprise-security",
        "iconName": "shield-check",
        "title": "Sao lưu Mã hóa & Bảo mật Doanh nghiệp",
        "desc": "Bảo mật chuẩn doanh nghiệp với mã hóa bí mật định dạng v2 bằng HKDF, xoay vòng khóa không gián đoạn, sao lưu mã hóa AES-256-CBC truyền lên Cloudflare R2/S3, mã SETUP_TOKEN chống chiếm quyền, 2FA và nhật ký kiểm toán toàn diện.",
        "action": "Thông số bảo mật",
        "tags": [
          "AES-256-CBC",
          "Cloudflare R2 / S3",
          "HKDF v2"
        ]
      }
    ],
    "testimonials": [
      {
        "id": "alex-carter",
        "name": "Alex Carter",
        "role": "Lập trình viên Full-stack",
        "quote": "Nitrobase giúp việc tự host Supabase trở nên hoàn toàn dễ dàng. Những việc từng tốn hàng giờ cấu hình thủ công Docker Compose, định tuyến Traefik và gia hạn SSL giờ chỉ mất một cú nhấp chuột. Cụm máy chủ production của chúng tôi chạy cực kỳ mượt mà.",
        "avatarUrl": "/uploads/avatar-alex.png"
      },
      {
        "id": "sophia-kim",
        "name": "Sophia Kim",
        "role": "Indie Hacker",
        "quote": "Chuyển từ Supabase Cloud sang VPS Hetzner của riêng tôi đã giúp cắt giảm 80% hóa đơn hạ tầng hàng tháng. Tính năng Cloud Sync 1-click đã kéo toàn bộ database và storage bucket về suôn sẻ mà không gặp bất kỳ trở ngại nào.",
        "avatarUrl": "/uploads/avatar-sophia.png"
      },
      {
        "id": "daniel-ruiz",
        "name": "Daniel Ruiz",
        "role": "CTO & Đồng sáng lập",
        "quote": "Khả năng di chuyển máy chủ không gián đoạn và sao lưu mã hóa AES-256 lên Cloudflare R2 mang lại độ tin cậy chuẩn doanh nghiệp cho đội ngũ kỹ thuật. Chúng tôi làm chủ dữ liệu 100% và không lo bị trói buộc nhà cung cấp.",
        "avatarUrl": "/uploads/avatar-daniel.png"
      },
      {
        "id": "marcus-vance",
        "name": "Marcus Vance",
        "role": "Kỹ sư DevOps Trưởng",
        "quote": "Xuất bản backend qua Cloudflare Tunnel mà không cần mở cổng 80/443 trên VPS là một giải pháp bảo mật tuyệt vời. Cơ chế xác thực SSH TOFU, scoped API token và cảnh báo đa kênh tích hợp hoàn hảo vào quy trình làm việc của nhóm.",
        "avatarUrl": "/uploads/avatar-alex.png"
      }
    ],
    "faqItems": [
      {
        "id": "faq-1",
        "question": "Nitrobase là gì và so với Coolify hay Dokploy như thế nào?",
        "answer": "Nitrobase là nền tảng PaaS & BaaS Deployer tự lưu trữ mã nguồn mở. Trong khi các công cụ PaaS thông thường tập trung vào ứng dụng web tổng quát, Nitrobase được tối ưu chuyên biệt cho các nền tảng Backend-as-a-Service và tự động hóa quy trình hiện đại (bao gồm Supabase, PocketBase, Appwrite và n8n), với tự động hóa cụm cơ sở dữ liệu, connection pooling, đồng bộ đám mây và phục hồi thảm họa ngoại vi."
      },
      {
        "id": "faq-2",
        "question": "Những nhà cung cấp VPS và hệ điều hành nào được hỗ trợ?",
        "answer": "Nitrobase hoạt động trên mọi máy chủ Ubuntu (20.04/22.04/24.04 LTS) hoặc Debian mới (kiến trúc amd64 hoặc arm64) với tối thiểu 1 GB RAM (512 MB cho PocketBase, 2 GB cho Appwrite & n8n, khuyến nghị từ 4 GB RAM cho cụm Supabase đầy đủ). Bạn có thể kết nối VPS từ Hetzner, DigitalOcean, Vultr, Linode, AWS, GCP, OVH, Scaleway, Contabo hoặc máy chủ vật lý riêng thông qua SSH."
      },
      {
        "id": "faq-3",
        "question": "Cụm Supabase tự lưu trữ bao gồm những thành phần nào?",
        "answer": "Hệ thống triển khai đầy đủ hệ sinh thái Supabase chuẩn production: PostgreSQL 16 (tích hợp sẵn pgvector cho AI vector embeddings), Supavisor connection pooler, Kong API Gateway, GoTrue Auth hỗ trợ JWT & OAuth, PostgREST cho RESTful API, Realtime WebSockets (CDC), Storage và bảng điều khiển Supabase Studio."
      },
      {
        "id": "faq-4",
        "question": "Tính năng Cloud Sync từ Supabase Cloud hoạt động ra sao?",
        "answer": "Nitrobase kết nối bảo mật tới dự án Supabase Cloud đang chạy thông qua thông tin mã hóa và session pooler, sau đó tự động sao chép toàn bộ schema cơ sở dữ liệu, dữ liệu bảng, tệp tin Storage và Edge Functions về máy chủ riêng của bạn, giúp loại bỏ hoàn toàn chi phí băng thông ngoại vi đắt đỏ."
      },
      {
        "id": "faq-5",
        "question": "Nitrobase bảo vệ các bí mật, khóa và bản sao lưu như thế nào?",
        "answer": "Bảo mật chuẩn doanh nghiệp với mã hóa bí mật định dạng v2 bằng HKDF, xoay vòng khóa không gián đoạn, sao lưu mã hóa AES-256-CBC truyền lên Cloudflare R2/S3, mã SETUP_TOKEN chống chiếm quyền, 2FA và nhật ký kiểm toán toàn diện."
      },
      {
        "id": "faq-6",
        "question": "Tôi có thể xuất bản ứng dụng an toàn mà không cần mở cổng tường lửa công khai không?",
        "answer": "Hoàn toàn được! Nitrobase tích hợp sẵn Cloudflare Tunnel (Zero Trust). Bạn có thể xuất bản ứng dụng và bảng điều khiển ra Internet chỉ bằng token kết nối tunnel một chiều, giữ kín hoàn toàn cổng 80 và 443 trên tường lửa máy chủ của bạn."
      },
      {
        "id": "faq-7",
        "question": "Quy trình di chuyển máy chủ không gián đoạn (Zero-Downtime Migration) diễn ra như thế nào?",
        "answer": "Khi chuyển ứng dụng sang máy chủ khác, Nitrobase tự động tạo bản sao lưu nguyên khối, truyền qua bộ lưu trữ S3/R2, bung nén và kiểm tra sức khỏe tất cả container trên máy chủ đích, cập nhật DNS và chỉ dọn dẹp tài nguyên ở máy chủ nguồn khi đích đến đã đạt 100% hoạt động. Nếu có bất kỳ lỗi nào xảy ra, hệ thống sẽ tự động rollback nguyên vẹn về nguồn."
      }
    ]
  }
}