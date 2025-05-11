
# 🧰 RPPL Tax Agent – Developer Portal (Preview)

Welcome to the developer toolkit for the RPPL Tax Agent platform. This guide will help you integrate, extend, and automate with our tools.

---

## 🔌 API Access (Preview)

We provide a REST-style mock API for future integrations.

📄 [OpenAPI Spec](./openapi.yaml)

**Endpoints:**
- `GET /claims` – List existing claims
- `POST /claims` – Create a new claim
- `GET /activities` – Fetch logged activity

---

## 🪝 Webhooks (Stubbed)

You can simulate webhook triggers using:

📁 `functions/webhookDispatcher.js`

Trigger events like:
- `onClaimApproved`
- `onExportComplete`

---

## 🛠 CLI Tool

Preview our CLI tool for automation scripts and exports:

📁 `cli/index.js`

```bash
node cli/index.js --export
```

---

## 🧪 Developer Testing

Use our Postman and Insomnia integrations:

📦 [Postman Collection](./rppl_tax_agent.postman_collection.json)  
📦 [Insomnia Export](./rppl_tax_agent_insomnia.yaml)

---

## 🧱 Error Schema

We return structured error responses:

```json
{
  "error": {
    "code": "CLAIM_NOT_FOUND",
    "message": "The claim ID does not exist",
    "traceId": "abc-123"
  }
}
```

---

## 📚 Architecture Overview

- **Auth**: Firebase (Google + Microsoft SSO)
- **Database**: Firestore with role-based rules
- **Hosting**: Vercel + Firebase Functions

---

For full documentation, see [developer.md](./developer.md) or reach out to our team.
