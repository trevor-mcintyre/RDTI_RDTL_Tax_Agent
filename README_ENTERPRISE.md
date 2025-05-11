
# RPPL Tax Agent – Enterprise Ready Version

This version of the RPPL Tax Agent app includes enhancements specifically designed for enterprise environments and SOC 2 alignment.

---

## ✅ Key Enterprise Features

### 🔐 Role-Based Access Control (RBAC)
- Roles defined in `src/roles.js` (Admin, Accountant, Reviewer, Auditor)
- Role enforcement via `RequireAuth` and `RoleContext`
- Change user role in `RoleContext.js` for local testing

### 🧾 Audit Logging
- `logAuditAction` utility in `src/services/auditLogService.js`
- Logs user actions (view, update, export) with metadata
- Example in Admin Dashboard with "Simulate Log Action" button

### 📊 Admin Dashboard
- Route: `/admin`
- Displays a placeholder admin panel for managing users and logs
- Access restricted to `Roles.ADMIN`

### 📄 Security Documentation
- `docs/security.md` provides compliance overview
- Covers auth, RBAC, audit logs, export controls, and data protection

---

## 🧪 Testing Instructions

1. Start the app locally.
2. Modify the default role in `src/context/RoleContext.js` to test access restrictions.
3. Navigate to `/admin` to verify role-based protection and audit log simulation.
4. Check the browser console to see the logged audit actions.

---

## 🛠️ Notes

- The audit log currently prints to console. Integrate with Firestore or Supabase for persistent logging.
- Export routes should be extended to check user roles before allowing downloads.
- Add SCIM/SSO integration for true enterprise deployment.

