# Security Specification - NômadeHub Firebase Security

## 1. Data Invariants
- **SiteMediaItem**:
  - Must have a valid alphanumeric or hyphenated document ID of size <= 128 (`isValidId`).
  - Required fields: `id`, `title`, `category`, `imageUrl`, `isActive`, `displayOrder`.
  - Allowed categories: `top_banner`, `housing_gallery`, `lockers_gallery`, `infrastructure`, `social_impact`.
  - Bounded string sizes: `title` <= 160, `description` <= 1000, `imageUrl` <= 500000 chars, `badge` <= 60 chars.
  - Public unauthenticated visitors can only READ items where `resource.data.isActive == true`.
  - Only authenticated administrators or the bootstrap admin (`dca.tec.br@gmail.com` with `email_verified == true` or documented in `/admins/$(request.auth.uid)`) can create, update, or delete media items.
- **AdminProfile**:
  - Stored at `/admins/{adminId}` where `adminId == request.auth.uid`.
  - Cannot be self-promoted by arbitrary users. Only the root bootstrap admin (`dca.tec.br@gmail.com`) or existing superadmins can write to `/admins/{adminId}`.

## 2. The Dirty Dozen Payloads (Negative Tests)
1. **Unauthenticated Write**: An anonymous user attempts to POST a new top banner (`site_media/banner-01`) -> *PERMISSION_DENIED*.
2. **Ghost Field Injection (Shadow Update)**: An update includes an undeclared ghost field `isAdmin: true` -> *PERMISSION_DENIED*.
3. **Invalid Category Poisoning**: An item created with category `"malicious_payload"` not in the enum -> *PERMISSION_DENIED*.
4. **Huge String Attack (Denial of Wallet)**: An item created with a `title` exceeding 160 characters -> *PERMISSION_DENIED*.
5. **Oversized Image Attack**: Image data URI exceeding 500,000 characters -> *PERMISSION_DENIED*.
6. **Path Traversal / ID Injection**: Attempt to write to `/site_media/../../../etc/passwd` or invalid ID -> *PERMISSION_DENIED*.
7. **Email Spoofing Attack**: Request claiming email `dca.tec.br@gmail.com` but with `email_verified: false` -> *PERMISSION_DENIED*.
8. **Draft Leak / Inactive Public Scrape**: An unauthenticated user queries for `isActive == false` unpublished draft banners -> *PERMISSION_DENIED*.
9. **Arbitrary Self-Admin Escalation**: A standard authenticated user creates `/admins/$(request.auth.uid)` with `role: "superadmin"` -> *PERMISSION_DENIED*.
10. **Missing Required Fields**: Creating a `site_media` document without `category` or `imageUrl` -> *PERMISSION_DENIED*.
11. **Type Mismatch Poisoning**: Setting `displayOrder` to a boolean or string instead of a number -> *PERMISSION_DENIED*.
12. **Malicious Delete**: Non-admin user tries to delete an active banner document -> *PERMISSION_DENIED*.
