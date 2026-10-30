#!/usr/bin/env python3
"""serve this folder the way a static host would: the same headers as _headers,
no directory listing, no version in the server header.

    python3 serve.py            # http://localhost:4321
    python3 serve.py 8080       # pick a port
"""

import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4321
ROOT = Path(__file__).resolve().parent

HEADERS = [
    ("X-Content-Type-Options", "nosniff"),
    ("Referrer-Policy", "no-referrer"),
    ("X-Frame-Options", "DENY"),
    ("Permissions-Policy", "geolocation=(), camera=(), microphone=()"),
    ("Cross-Origin-Opener-Policy", "same-origin"),
    ("Cross-Origin-Resource-Policy", "same-origin"),
    (
        "Content-Security-Policy",
        "default-src 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; "
        "script-src 'self' 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    ),
]


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def version_string(self):
        return "server"

    def end_headers(self):
        for name, value in HEADERS:
            self.send_header(name, value)
        super().end_headers()

    def list_directory(self, path):
        # no directory listings, just say no
        self.send_error(404, "not found")
        return None

    def log_message(self, fmt, *args):
        sys.stderr.write("%s %s\n" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    print("serving %s on http://localhost:%d" % (ROOT, PORT), flush=True)
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
