# Authentication Module

JWT-based authentication for **users** and **admins**, built to match the existing
project architecture (ESM, Express 5, `mysql2` promise pool, `{ success, message, ... }`
response envelope).

Accounts for both users and admins live in a **single table** — `user_signup` — and are
differentiated by the `role` column (`super_admin`, `admin`, `manager`, `user`).
There is no separate `admins` table.

---

## Folder Structure

Only files belonging to this module are listed. Everything else in the project is unchanged.

```
backend/
├── app.js                                  # MODIFIED: 2 route mounts added (see below)
├── controllers/
│   └── auth/
│       ├── userAuthController.js           # registerUser, loginUser
│       └── adminAuthController.js          # registerAdmin, loginAdmin
├── routes/
│   └── auth/
│       ├── userAuthRoutes.js               # /api/auth/*
│       └── adminAuthRoutes.js              # /api/admin/auth/*
├── middlewares/
│   └── authJwt.js                          # verifyToken, authorizeRoles
└── helpers/
    └── generateToken.js                    # signs the JWT
```

The only change to an existing file is in `app.js`:

```js
import userAuthRoutes from "./routes/auth/userAuthRoutes.js";
import adminAuthRoutes from "./routes/auth/adminAuthRoutes.js";

app.use("/api/auth", userAuthRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
```

> The legacy `middlewares/authMiddleware.js` (session-based, unused) is **not** part of this
> module and was left untouched. Use `middlewares/authJwt.js` for JWT auth.

---

## Authentication Flow

### Registration
1. Client sends `full_name`, `username`, `email`, `password` (+ optional `phone_number`).
2. Server validates required fields → `400` if missing.
3. Server checks `user_signup` for an existing `email` **or** `username` → `400` if taken.
4. Password is hashed with **bcrypt (10 salt rounds)**.
5. A business id is generated (`USR<timestamp>` for users, `ADM<timestamp>` for admins).
6. Row inserted with `role = 'user'` (user endpoint) or `role = 'admin'` (admin endpoint).
7. Responds `201` with `id` and `user_id`.

### Login
1. Client sends `email` **or** `username`, plus `password`.
2. Server looks up the account → `401 Invalid credentials` if not found.
3. **Admin login only:** role must be `admin` or `super_admin`, else `403 Access denied`.
4. Account `status` must be `active`, else `403 Account is not active`.
5. `bcrypt.compare` verifies the password → `401 Invalid credentials` on mismatch.
6. `last_login` is updated to `NOW()`.
7. A JWT is signed and returned along with a safe user object (**password is never returned**).

### Protected request
1. Client sends `Authorization: Bearer <token>`.
2. `verifyToken` validates the token and attaches the decoded payload to `req.user`.
3. `authorizeRoles(...)` (optional) checks `req.user.role` against allowed roles.
4. Handler runs, or the middleware rejects with `401` / `403`.

---

## JWT Payload

The token is signed in `helpers/generateToken.js` with `JWT_SECRET` and an expiry of
`JWT_EXPIRES_IN` (default `7d`). Payload:

```json
{
  "id": 12,
  "user_id": "USR1784788860644",
  "role": "user",
  "iat": 1784788861,
  "exp": 1785393661
}
```

| Field     | Meaning                                             |
|-----------|-----------------------------------------------------|
| `id`      | Primary key (`user_signup.id`)                      |
| `user_id` | Business id (`USR…` / `ADM…`)                        |
| `role`    | `super_admin` \| `admin` \| `manager` \| `user`     |
| `iat`/`exp` | Issued-at / expiry (added by `jsonwebtoken`)      |

After `verifyToken` runs, this payload is available as `req.user`.

---

## Middleware Usage

`middlewares/authJwt.js` exports two functions:

| Export | Purpose | Rejects with |
|--------|---------|--------------|
| `verifyToken` | Requires a valid `Authorization: Bearer <token>` header; sets `req.user`. | `401` if missing/malformed, `401` if invalid or expired |
| `authorizeRoles(...roles)` | Allows only the listed roles. Must run **after** `verifyToken`. | `403` if `req.user.role` is not allowed |

---

## Endpoints

| Method | Endpoint                     | Auth                                   | Purpose            |
|--------|------------------------------|----------------------------------------|--------------------|
| POST   | `/api/auth/register`         | Public                                 | User registration  |
| POST   | `/api/auth/login`            | Public                                 | User login         |
| POST   | `/api/admin/auth/login`      | Public (role must be admin/super_admin)| Admin login        |
| POST   | `/api/admin/auth/register`   | `verifyToken` + `authorizeRoles('super_admin')` | Create an admin |

Base URL in development: `http://localhost:5010`

---

## Request / Response Examples

### 1. User Register — `POST /api/auth/register`

**Request**
```json
{
  "full_name": "John Doe",
  "username": "johnd",
  "email": "john@example.com",
  "phone_number": "9876543210",
  "password": "Secret@123"
}
```
`phone_number` is optional; the other four are required.

**Success — `201`**
```json
{
  "success": true,
  "message": "User registered successfully",
  "id": 12,
  "user_id": "USR1784788860644"
}
```

**Errors**
```json
// 400 - missing fields
{ "success": false, "message": "Full Name, Username, Email and Password are required" }
// 400 - duplicate
{ "success": false, "message": "Email or Username already exists" }
// 500
{ "success": false, "message": "<error message>" }
```

### 2. User Login — `POST /api/auth/login`

**Request** (`email` or `username`, plus `password`)
```json
{ "email": "john@example.com", "password": "Secret@123" }
```

**Success — `200`**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": 12,
    "user_id": "USR1784788860644",
    "full_name": "John Doe",
    "username": "johnd",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Errors**
```json
// 400
{ "success": false, "message": "Email or Username and Password are required" }
// 401 - unknown account or wrong password
{ "success": false, "message": "Invalid credentials" }
// 403 - status not active
{ "success": false, "message": "Account is not active" }
```

### 3. Admin Login — `POST /api/admin/auth/login`

**Request**
```json
{ "email": "admin@example.com", "password": "Secret@123" }
```

**Success — `200`** — same shape as user login; `data.role` is `admin` / `super_admin`.

**Errors**
```json
// 401
{ "success": false, "message": "Invalid credentials" }
// 403 - account exists but is not an admin
{ "success": false, "message": "Access denied" }
// 403 - status not active
{ "success": false, "message": "Account is not active" }
```

### 4. Admin Register — `POST /api/admin/auth/register` (protected)

**Headers**
```
Authorization: Bearer <super_admin JWT>
Content-Type: application/json
```

**Request**
```json
{
  "full_name": "New Admin",
  "username": "newadmin",
  "email": "newadmin@example.com",
  "phone_number": "9876500000",
  "password": "Secret@123"
}
```

**Success — `201`**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "id": 20,
  "user_id": "ADM1784788863386"
}
```

**Errors**
```json
// 401 - no/malformed Authorization header
{ "success": false, "message": "Authentication token is required" }
// 401 - invalid or expired token
{ "success": false, "message": "Invalid or expired token" }
// 403 - authenticated but not super_admin
{ "success": false, "message": "Access denied" }
// 400 - missing fields / duplicate
{ "success": false, "message": "Email or Username already exists" }
```

---

## Protecting Future Routes

Import the middleware and place it before your handler(s).

```js
import express from "express";
import { verifyToken, authorizeRoles } from "../middlewares/authJwt.js";
import { getMyProfile, listAllUsers } from "../controllers/example.js";

const router = express.Router();

// Any authenticated account (user or admin)
router.get("/profile", verifyToken, getMyProfile);

// Admins and super_admins only
router.get("/admin/users", verifyToken, authorizeRoles("admin", "super_admin"), listAllUsers);

// super_admins only
router.delete("/admin/users/:id", verifyToken, authorizeRoles("super_admin"), deleteUser);

export default router;
```

Inside a protected handler, the authenticated identity is on `req.user`:

```js
export const getMyProfile = async (req, res) => {
  const { id, user_id, role } = req.user;   // from the verified JWT
  // ...fetch and return the caller's own data
};
```

Rules of thumb:
- `verifyToken` **always comes first**; `authorizeRoles(...)` only works after it.
- Omit `authorizeRoles` when any logged-in account should have access.
- Pass every role that should be allowed: `authorizeRoles("admin", "super_admin")`.

---

## Creating the First `super_admin`

Admin registration is protected and requires a `super_admin` JWT, so the very first
`super_admin` must be seeded directly into the database. Passwords **must** be bcrypt
hashes — never insert plaintext.

**Option A — one-off Node script (recommended; reuses the project's bcrypt & DB config).**
Create `seedSuperAdmin.js` in the `backend/` folder, run it once with `node seedSuperAdmin.js`,
then delete it:

```js
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import db from "./config/db.js";

const run = async () => {
  const hash = await bcrypt.hash("ChangeMe@123", 10); // change this password
  const user_id = `ADM${Date.now()}`;
  await db.query(
    `INSERT INTO user_signup
     (user_id, full_name, username, email, phone_number, password, role, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, "Super Admin", "superadmin", "superadmin@vrkss.com", null, hash, "super_admin", "active"]
  );
  console.log("Seeded super_admin:", user_id);
  process.exit(0);
};
run().catch((e) => { console.error(e.message); process.exit(1); });
```

After seeding, log in via `POST /api/admin/auth/login` and use that token to create further
admins through `POST /api/admin/auth/register`.

**Option B — raw SQL.** Generate a bcrypt hash first (e.g. with the script above or any bcrypt
tool), then:

```sql
INSERT INTO user_signup
  (user_id, full_name, username, email, password, role, status)
VALUES
  ('ADM1700000000000', 'Super Admin', 'superadmin', 'superadmin@vrkss.com',
   '$2b$10$REPLACE_WITH_A_REAL_BCRYPT_HASH', 'super_admin', 'active');
```

---

## Environment Variables

Defined in `backend/.env` (already present in this project except where noted):

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `JWT_SECRET` | Yes | — | Secret used to sign/verify tokens. Use a long random string in production. |
| `JWT_EXPIRES_IN` | No | `7d` | Token lifetime (`jsonwebtoken` format: `60`, `"10m"`, `"2h"`, `"7d"`). Falls back to `7d` if unset. |
| `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Yes | — | MySQL connection (existing project vars). |
| `PORT` | No | `5000` | Server port (project uses `5010`). |

Example:

```env
JWT_SECRET=change-this-to-a-long-random-secret
JWT_EXPIRES_IN=7d
```

---

## Sample Frontend Integration

### Login and store the JWT

```js
async function login(email, password) {
  const res = await fetch("http://localhost:5010/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.data));
  return data.data;
}
```

### Call a protected endpoint with the token

```js
async function getProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5010/api/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    // token missing/expired → send the user back to login
    localStorage.clear();
    window.location.href = "/login";
    return;
  }
  return res.json();
}
```

### Axios instance that attaches the token automatically

```js
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5010/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirect to login on auth failures
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response && [401, 403].includes(err.response.status)) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
```

### Simple client-side route guard

```js
function requireAuth() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }
}

function requireAdmin() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!["admin", "super_admin"].includes(user.role)) {
    window.location.href = "/login";
  }
}
```

> Client-side guards are for UX only. Every sensitive operation must also be protected
> on the backend with `verifyToken` / `authorizeRoles`, since the JWT is verified there.
