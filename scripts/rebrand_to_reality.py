#!/usr/bin/env python3
"""Rebrand 'Expaan' → 'Expaan Reality' across the whole site.

Word-boundary aware + negative lookahead so we:
- Replace 'Expaan' (capitalized, standalone) → 'Expaan Reality'
- Skip lowercase 'expaan' (slugs, seeds, domains, file paths)
- Skip 'Expaan Reality' if it already exists (no double-replacement)
"""
import re
from pathlib import Path

ROOT = Path('/home/z/my-project')

# Files to process (src/ + index.html)
TARGETS = []
for p in (ROOT / 'src').rglob('*.tsx'):
    TARGETS.append(p)
for p in (ROOT / 'src').rglob('*.ts'):
    TARGETS.append(p)
TARGETS.append(ROOT / 'index.html')

# Regex: \bExpaan\b NOT followed by ' Reality'
# This matches 'Expaan' as a whole word but skips 'Expaan Reality' (already branded)
PATTERN = re.compile(r'\bExpaan\b(?! Reality)')

stats = {'files_changed': 0, 'replacements': 0}
for p in TARGETS:
    if not p.exists():
        continue
    orig = p.read_text()
    new, n = PATTERN.subn('Expaan Reality', orig)
    if n > 0:
        p.write_text(new)
        stats['files_changed'] += 1
        stats['replacements'] += n
        rel = p.relative_to(ROOT)
        print(f'  ✓ {rel}  ({n} replacements)')

print(f"\nTotal: {stats['replacements']} replacements across {stats['files_changed']} files")
