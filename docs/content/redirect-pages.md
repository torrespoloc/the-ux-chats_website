# Redirect Pages — Archive

These were standalone HTML files that served only as redirects. They were deleted when the
vanilla static site was removed, since the React app handles routing natively.

---

## `landing/index.html`

- Path: `/landing/` → redirect to `/`
- Method: `<meta http-equiv="refresh">` + JavaScript `window.location.replace()`
- Status: Redundant with React Router's BrowserRouter

---

## `become-a-special-guest/index.html`

- Path: `/become-a-special-guest/` → redirect to `/special-guest/`
- Method: `<meta http-equiv="refresh">` + JavaScript `window.location.replace()`
- The React route is `/become-a-guest` (handled by `BecomeAGuest.tsx`)
- Status: Redundant with React Router's `/become-a-guest` route
