# API Documentation

Base: `/api`

Auth:
- POST `/auth/register` - body: `{ name, email, password, role? }`
- POST `/auth/login` - body: `{ email, password }`
- GET `/auth/me` - protected

Leads:
- GET `/leads` - query: `status`, `source`, `search`, `sort=latest|oldest`, `page`, `limit`
- POST `/leads` - admin only
- GET `/leads/:id`
- PUT `/leads/:id` - sales users can update assigned leads only
- DELETE `/leads/:id` - admin only

Responses follow JSON with proper status codes and pagination metadata for list endpoints.
