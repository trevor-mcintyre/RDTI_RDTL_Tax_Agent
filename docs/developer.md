
# 👨‍💻 RPPL Developer Guide

## API Access

While we don't yet expose a public API, this project includes a preview OpenAPI spec under `/docs/openapi.yaml`.

## Webhooks

Pluggable webhook dispatcher stub is located in `functions/webhookDispatcher.js`. Extend this to emit events like:

- `onExportComplete`
- `onClaimApproved`

## CLI Tool

The `cli/index.js` file shows how you might automate claim export or system checks in the future.

## Error Format

All future endpoints will return standardized JSON errors:

```json
{
  "error": {
    "code": "CLAIM_NOT_FOUND",
    "message": "The claim ID does not exist",
    "traceId": "abc-123"
  }
}
```

## Architecture

This app uses:
- Firebase Auth
- Firestore DB with scoped access rules
- Vercel + Node functions
