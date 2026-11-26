---
title: "Privacy Policy"
description: "Learn how Nitrobase collects, protects, and manages your data when using our self-hosted infrastructure platform."
lastUpdated: "2026-10-15"
---

## 1. Introduction

Welcome to **Nitrobase** ("we", "our", or "us"). We are committed to protecting your privacy and ensuring you have complete control over your data. Because Nitrobase is built specifically for self-hosting Supabase and related backend infrastructure on your own servers, your core database records and sensitive application data remain exclusively under your control.

This Privacy Policy explains what information we collect, how we use it, and the choices available to you when you use our website, deployment dashboard, and associated services.

## 2. Our Core Philosophy: Your Infrastructure, Your Data

Unlike closed proprietary Cloud DB providers:

- **We never store your database rows, tables, or client records.** All databases, storage buckets, and auth schemas run directly within Docker containers deployed on your designated VPS server.
- **Direct SSH & API Connections:** Connection keys and server tokens used for one-click setup are encrypted with AES-256-GCM. We do not inspect your private database traffic.
- **Complete Portability:** You retain the freedom to export, migrate, or destroy your self-hosted instances at any time without vendor lock-in.

## 3. Information We Collect

### A. Account & Authentication Information
When you create an account or sign in to Nitrobase, we collect:
- Your email address.
- Your authentication credentials or third-party OAuth IDs (e.g., GitHub or Google profile identifiers).
- Your workspace and user profile settings.

### B. Server Configuration Metadata
To automate deployment and system health monitoring, our platform processes:
- VPS provider details (e.g., Hetzner, Vultr, DigitalOcean, or custom IP addresses).
- Operating system version (e.g., Ubuntu 22.04 / 24.04 LTS).
- System resource specifications (CPU, RAM, storage allocations).
- Deployment logs and health status pings.

### C. Technical & Usage Data
When you navigate our website, we may automatically collect standard diagnostic metrics:
- Device type, browser user agent, IP address, and preferred locale.
- Page interaction duration and referring URLs.

## 4. How We Use Your Information

We use the collected information for the following purposes:
- **Provisioning & Management:** Enabling one-click deployment, container orchestration, and automated backup configurations.
- **Platform Security:** Authenticating accounts, detecting fraudulent activities, and mitigating security threats.
- **Service Communications:** Sending critical deployment notifications, backup failure alerts, and security patches.
- **Product Improvements:** Analyzing non-identifiable usage statistics to optimize deployment scripts and CLI tools.

## 5. Data Security & Retention

We implement modern industry-standard security safeguards:
- **Encryption at Rest & in Transit:** All communications with Nitrobase are secured via TLS 1.3. Server keys are stored using hardware-level encryption mechanisms.
- **Zero Third-Party Data Selling:** We do not sell, rent, or monetize your personal or infrastructure information.
- **Account Deletion:** You can request account deletion at any time. Upon deletion, all associated configuration tokens and deployment profiles are permanently purged.

## 6. Your Rights

Depending on your jurisdiction (such as GDPR in the EU or CCPA in California), you have rights regarding your personal information, including:
- The right to access and obtain a copy of your stored account data.
- The right to rectify inaccurate information.
- The right to erasure ("Right to be Forgotten").
- The right to data portability.

## 7. Contact Us

If you have any questions or concerns regarding this Privacy Policy or our security practices, please contact our privacy team at:

- **Email:** hoagminhit@gmail.com
- **Discord Community:** https://discord.com
- **Website:** https://nitrobase.app
