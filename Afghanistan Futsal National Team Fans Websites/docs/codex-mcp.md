# Codex MCP Setup

This project includes a local MCP server for Codex CLI:

```text
.codex/mcp/code-workflow-server.mjs
```

Codex loads it from:

```text
.codex/config.toml
```

## What It Does

The server gives Codex project-aware tools:

- `project_summary` reads repo guidance and package scripts.
- `list_project_files` lists source/config files without generated folders.
- `read_project_file` reads non-secret project files.
- `git_status_diff` reports Git status and diffs when the project is in Git.
- `run_project_checks` runs frontend/backend `typecheck` and `build` scripts when the host allows Node child processes.
- `review_checklist` returns a focused review checklist for this stack.

It intentionally does not write files. Codex CLI already has normal file-editing tools, so code changes stay visible through Codex's usual approval and patch flow.

If `run_project_checks` returns `spawn EINVAL` or `spawn EPERM` on Windows, ask Codex to run the same commands directly:

```powershell
cd "C:\Users\muhammadhussian\Desktop\Codex Projects\Afghanistan Futsal National Team Fans Websites\frontend"
npm.cmd run typecheck

cd "C:\Users\muhammadhussian\Desktop\Codex Projects\Afghanistan Futsal National Team Fans Websites\backend"
npm.cmd run typecheck
```

## Use It

From PowerShell:

```powershell
& "$env:APPDATA\npm\codex.cmd" -C "C:\Users\muhammadhussian\Desktop\Codex Projects\Afghanistan Futsal National Team Fans Websites"
```

Inside Codex CLI, run:

```text
/mcp
```

You should see `project_code_workflow`. Ask Codex to use it when reviewing or verifying code, for example:

```text
Review this project. Use the project_code_workflow MCP server for project summary, review checklist, and typecheck verification.
```
