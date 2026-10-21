---
title: Managing Servers & Bootstrap
description: How to add a new VPS node, perform server bootstrap, and monitor server resource health.
---

## Adding a New Server

1. Navigate to **Servers -> Add Server**.
2. Select **Remote VPS (SSH)**.
3. Provide connection credentials:
   * **Host IP / Domain**
   * **Port:** Default `22`
   * **User:** Recommended `root`
   * **Authentication Method:** SSH Key or Password.
4. Click **Connect & Test**.

## Server Bootstrap
Once connected, click **Bootstrap Server**. SaaSBase will preview the actions it plans to execute:
* Install Docker CE (if not installed).
* Create the shared internal Docker network (`saasbase-network`).
* Deploy the **Traefik v3** reverse proxy container.
* Configure firewall rules and prepare storage paths.
