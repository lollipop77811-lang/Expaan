---
name: 21st-mcp
description: "21st.dev MCP — Search 12,000+ React/Tailwind/shadcn components, generate UI with AI, and install them directly. Use '21st' CLI or MCP tools: search, generate, get, iterate, take."
argument-hint: "[component-type] [description]"
license: MIT
metadata:
  author: 21st-dev
  version: "1.15.1"
  homepage: "https://21st.dev"
---

# 21st.dev MCP

AI-powered component discovery and generation. Search 12,000+ hand-crafted React + Tailwind CSS + shadcn/ui components, generate new UI with AI, and install them directly from your editor.

## Setup

### Step 1: Get Your API Key
Visit **https://21st.dev/mcp** to generate your API key.

### Step 2: Configure MCP
Replace `YOUR_21ST_API_KEY` in the MCP config files:

**HTTP MCP (recommended for remote):**
```json
{
  "mcpServers": {
    "21st": {
      "url": "https://21st.dev/api/mcp",
      "headers": {
        "x-api-key": "YOUR_21ST_API_KEY"
      }
    }
  }
}
```

**Stdio MCP (via npx proxy):**
```json
{
  "mcpServers": {
    "21st": {
      "command": "npx",
      "args": ["-y", "@21st-dev/magic@latest"],
      "env": {
        "API_KEY": "YOUR_21ST_API_KEY"
      }
    }
  }
}
```

### Step 3: Or Use CLI Init
```bash
npx @21st-dev/cli@latest init --client cursor   # or: claude | vscode | windsurf | codex
```

## CLI Commands

```bash
# Login (browser-based auth)
21st login

# Search components/themes/templates
21st search "dashboard sidebar" --type c          # components only
21st search "dark theme" --type theme             # themes only
21st search "landing page" --type template        # templates only
21st search "button" --free                       # free only
21st search "form" --tag shadcn                   # by tag
21st search "chart" --limit 5 --json              # JSON output

# Get component code
21st get <component-id>

# Get theme CSS
21st theme <theme-id>

# Generate UI with AI
21st generate "A pricing card with 3 tiers" --variants 3
21st generate "User profile card with avatar" --context auto

# Iterate on a generation
21st iterate <project-id> "Make the button larger and add a gradient"

# Get the generated code
21st take <project-id> --take 1 --code

# Search logos
21st logo "github"

# View usage/quota
21st usage

# Manage bookmarks
21st bookmarks --type component
21st bookmark <id> --type component
```

## MCP Tools (via AI Agent)

When connected via MCP, these tools are available:

| Tool | Description |
|------|-------------|
| `search` | Search 12,000+ components, themes, and templates |
| `generate` | AI-generate UI components from a description |
| `get_inspiration` | Get design inspiration and suggestions |
| `search_logo` | Search brand/UI SVG logos |

Legacy tool names (still work):
- `21st_magic_component_builder` → `generate`
- `21st_magic_component_inspiration` → `get_inspiration`
- `21st_magic_component_refiner` → `generate`

## What's Available

- **12,000+ React components** — shadcn/ui, Tailwind CSS, Radix UI
- **Themes** — Color schemes, design tokens, CSS variables
- **Templates** — Full page layouts, dashboards, landing pages
- **SVG Logos** — Brand and UI logos (free, no login)
- **AI Generation** — Describe UI, get production-ready code in variants
- **Team Libraries** — Shared component libraries for teams

## Configuration Files

- Cursor: `.cursor/mcp.json`
- Claude Code: `.claude/mcp.json`
- VS Code: `.vscode/mcp.json`
- Windsurf: `.windsurf/mcp.json`

## Links

- Get API key: https://21st.dev/mcp
- Browse components: https://21st.dev
- AI Generator: https://21st.dev/ai
- GitHub: https://github.com/21st-dev/magic-mcp
- CLI on npm: https://www.npmjs.com/package/@21st-dev/cli
