---
title: Server Connections (SSH & Host Mode)
description: How Nitrobase manages remote VPS machines via SSH and the local host machine using nsenter.
---

Nitrobase manages two distinct types of server environments:

## 1. Remote Servers (SSH2)
Remote servers are connected over SSH using public-key cryptography (Ed25519 or RSA).
* Keys are generated inside Nitrobase or imported by the user.
* Private keys and passphrases are encrypted at rest using AES-256-CBC.
* Nitrobase executes commands, monitors container metrics, and transfers files through SFTP sessions.

## 2. Localhost Server (Host Mode)
The server where Nitrobase itself is running can be bootstrapped as a managed target node (*Localhost*).
* Nitrobase runs inside a Docker container with `privileged: true` and `pid: host`.
* It utilizes `nsenter` to execute maintenance commands and interact with the host system and Docker socket directly without needing an SSH loopback connection.
