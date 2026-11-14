# API Design Guidelines

## Overview

This document outlines the REST API conventions, versioning strategy, error codes, and pagination standards for the Lux.raw platform API.

---

## REST Conventions

- Use **nouns** for resource names, not verbs: `/products` not `/getProducts`
- Use **plural** resource names: `/orders`, `/collections`, `/users`
- Use **kebab-case** for multi-word resource paths: `/product-variants`
- HTTP methods map to CRUD operations:
  - `GET` — Read resource(s)
  - `POST` — Create a resource
  - `PUT` — Replace a resource entirely
  - `PATCH` — Partially update a resource
  - `DELETE` — Remove a resource
- Always return appropriate HTTP status codes

---

## Versioning

All API routes are versioned via URL prefix:

```
/api/v1/products
/api/v2/products
```

- Increment the major version for **breaking changes**
- Deprecate old versions with a `Deprecation` response header
- Maintain at least **two active versions** before sunsetting

---

## Error Codes

All error responses follow a consistent structure:

```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "The requested product does not exist.",
    "status": 404,
    "details": {}
  }
}
```

### Standard Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid auth token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource does not exist |
| `VALIDATION_ERROR` | 422 | Request body failed validation |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

## Pagination

Use **cursor-based pagination** for all list endpoints:

```json
{
  "data": [...],
  "pagination": {
    "cursor": "eyJpZCI6MTAwfQ==",
    "hasNextPage": true,
    "hasPreviousPage": false,
    "totalCount": 240
  }
}
```

### Query Parameters

- `limit` — Number of items per page (default: `20`, max: `100`)
- `cursor` — Opaque cursor string from previous response
- `sortBy` — Field to sort by (e.g., `createdAt`, `price`)
- `sortOrder` — `asc` or `desc`

---

## Authentication

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <jwt_token>
```

---

## Rate Limiting

- Default: **100 requests/minute** per authenticated user
- Unauthenticated: **20 requests/minute** per IP
- Headers returned: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
