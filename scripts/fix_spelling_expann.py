#!/usr/bin/env python3
"""Fix spelling: 'Expaan' → 'Expann' (and lowercase 'expaan' → 'expann').

Renames PNG files in /public/realestate/, updates src/lib/image.ts mapping,
and replaces all 'expaan' (case-sensitive both ways) across src/ + index.html.
"""
import re
import os
from pathlib import Path

ROOT = Path('/home/z/my-project')

# 1. Rename PNG files: expaan-*.png → expann-*.png
print("=== Renaming PNG files in /public/realestate/ ===")
realestate_dir = ROOT / 'public' / 'realestate'
renamed = 0
for p in realestate_dir.iterdir():
    if p.is_file() and 'expaan' in p.name:
        new_name = p.name.replace('expaan', 'expann')
        new_path = p.with_name(new_name)
        p.rename(new_path)
        renamed += 1
        print(f"  ✓ {p.name} → {new_name}")
print(f"Renamed {renamed} files\n")

# 2. Replace 'Expaan' → 'Expann' and 'expaan' → 'expann' across all source files
TARGETS = []
for p in (ROOT / 'src').rglob('*.tsx'):
    TARGETS.append(p)
for p in (ROOT / 'src').rglob('*.ts'):
    TARGETS.append(p)
for p in (ROOT / 'src').rglob('*.css'):
    TARGETS.append(p)
TARGETS.append(ROOT / 'index.html')

stats = {'files_changed': 0, 'expaan_count': 0, 'Expaan_count': 0}
for p in TARGETS:
    if not p.exists():
        continue
    orig = p.read_text()
    new = orig
    # Replace capitalized first (Expaan → Expann)
    new, n1 = re.subn(r'Expaan', 'Expann', new)
    # Then lowercase (expaan → expann)
    new, n2 = re.subn(r'expaan', 'expann', new)
    total = n1 + n2
    if total > 0:
        p.write_text(new)
        stats['files_changed'] += 1
        stats['Expaan_count'] += n1
        stats['expaan_count'] += n2
        rel = p.relative_to(ROOT)
        print(f"  ✓ {rel}  ({n1} Expaan, {n2} expaan)")

print(f"\nTotal: {stats['Expaan_count']} 'Expaan' + {stats['expaan_count']} 'expaan' replaced across {stats['files_changed']} files")
