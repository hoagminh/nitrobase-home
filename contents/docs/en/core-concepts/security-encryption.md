---
title: Security & Encryption Format v2
description: Understanding Nitrobase's military-grade HKDF encryption format and secret management at rest.
---

Security is the cornerstone of Nitrobase. All sensitive information—including SSH private keys, database passwords, environment variables, API tokens, and backup destination credentials—is encrypted at rest.

## Encryption v2 Specification

Nitrobase uses **Versioned Encryption (Format v2)**:
* **Algorithm:** AES-256-CBC.
* **Key Derivation:** HKDF (HMAC-based Extract-and-Expand Key Derivation Function) with SHA-256.
* **Payload Structure:** `v2:<salt>:<iv>:<ciphertext>`.

```typescript
// Concept of Nitrobase v2 Encryption
const derivedKey = hkdf(masterEncryptionKey, salt, "nitrobase-v2-encryption");
const cipher = crypto.createCipheriv("aes-256-cbc", derivedKey, iv);
```

## Key Rotation
If your master encryption key is ever compromised, Nitrobase provides an atomic key rotation script:

```bash
docker compose -f docker-compose.prod.yml run --rm \
  -e OLD_ENCRYPTION_KEY='old-32-byte-hex-key' \
  -e ENCRYPTION_KEY='new-32-byte-hex-key' \
  app bun scripts/rotate-encryption-key.ts
```
