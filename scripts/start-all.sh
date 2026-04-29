#!/usr/bin/env bash
# This project uses per-artifact workflows so each preview pane (mobile, admin,
# api-server) is bound to its own webview. Running them all from a single
# combined workflow conflicts on ports and breaks the artifact previews, so
# this launcher is intentionally a no-op. Start each artifact workflow
# individually instead:
#   - artifacts/mobile: expo            (port 18115 — Expo / Metro)
#   - artifacts/admin: web              (port 23744 — Vite admin dashboard)
#   - artifacts/api-server: API Server  (port 8080  — Express API)
set -u
echo "[start-all] no-op: start the per-artifact workflows individually."
echo "[start-all] sleeping to keep the workflow alive."
# Keep the workflow process alive without binding any port.
exec sleep infinity
