
# Security and Compliance Documentation

## 🔐 Authentication
- Firebase Auth with OAuth providers (Google, Microsoft)
- Role-based access control (RBAC) implemented

## 📜 Audit Logging
- Sensitive actions are logged with timestamp, user ID, and metadata

## 🛡️ Data Protection
- Encrypted in transit via HTTPS
- Firestore security rules limit access by UID and admin claims
- Data access is scoped to roles

## 📦 Export Controls
- Export permissions gated by role
- Admin UI in place for monitoring

## 🧯 Backups & Recovery
- Firebase-managed backups (FireStore and Auth)
- Additional policies pending enterprise deployment

