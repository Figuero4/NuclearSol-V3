#!/usr/bin/env python3
"""Inline CSS/JS into a single self-contained HTML file for preview/publishing."""
import re, pathlib

root = pathlib.Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")

def css(m):
    p = root / m.group(1)
    return "<style>\n" + p.read_text(encoding="utf-8") + "\n</style>"

def js(m):
    p = root / m.group(1)
    return "<script>\n" + p.read_text(encoding="utf-8") + "\n</script>"

html = re.sub(r'<link rel="stylesheet" href="(assets/[^"]+)"\s*/?>', css, html)
html = re.sub(r'<script src="(assets/[^"]+)"></script>', js, html)

out = root.parent / "ins-preview.html"
out.write_text(html, encoding="utf-8")
print("built", out, len(html), "bytes")
