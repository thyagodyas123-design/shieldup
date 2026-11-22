"""Serve the exported site at its Pages path during browser tests."""

import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

BASE_PATH = os.environ["PAGES_BASE_PATH"]


class PagesPreview(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="out", **kwargs)

    def send_head(self):
        if not self.path.startswith(f"{BASE_PATH}/"):
            self.send_error(404)
            return None
        return super().send_head()

    def translate_path(self, path):
        return super().translate_path(path.removeprefix(BASE_PATH))


class PreviewServer(ThreadingHTTPServer):
    request_queue_size = 128


if __name__ == "__main__":
    with PreviewServer(("127.0.0.1", 3100), PagesPreview) as server:
        server.serve_forever()
