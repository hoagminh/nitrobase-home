
export default {
  "en": {
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