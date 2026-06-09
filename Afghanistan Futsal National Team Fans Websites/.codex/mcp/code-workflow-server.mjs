#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createReadStream, existsSync, promises as fs } from "node:fs";
import { createInterface } from "node:readline";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const serverName = "afghanistan-futsal-code-workflow";
const serverVersion = "1.0.0";

const ignoredDirectories = new Set([
  ".git",
  ".next",
  "dist",
  "node_modules",
  "coverage",
  ".turbo",
]);

const tools = [
  {
    name: "project_summary",
    title: "Project Summary",
    description:
      "Summarize the repository structure, AGENTS.md guidance, and package scripts for this project.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_project_files",
    title: "List Project Files",
    description:
      "List source and configuration files under the project, excluding generated and dependency directories.",
    inputSchema: {
      type: "object",
      properties: {
        subdir: {
          type: "string",
          description:
            "Optional project-relative directory to list from, such as frontend/src or backend/src.",
        },
        maxFiles: {
          type: "number",
          description: "Maximum number of files to return. Defaults to 200.",
        },
      },
    },
  },
  {
    name: "read_project_file",
    title: "Read Project File",
    description:
      "Read a non-secret project file by project-relative path. Refuses .env files and generated/dependency paths.",
    inputSchema: {
      type: "object",
      properties: {
        filePath: {
          type: "string",
          description: "Project-relative file path to read.",
        },
        maxBytes: {
          type: "number",
          description: "Maximum bytes to return. Defaults to 30000.",
        },
      },
      required: ["filePath"],
    },
  },
  {
    name: "git_status_diff",
    title: "Git Status And Diff",
    description:
      "Return git status, diff stat, and optionally the current patch if this folder is a git repository.",
    inputSchema: {
      type: "object",
      properties: {
        includePatch: {
          type: "boolean",
          description: "Include full git diff output. Defaults to false.",
        },
        maxBytes: {
          type: "number",
          description: "Maximum diff bytes to return when includePatch is true. Defaults to 40000.",
        },
      },
    },
  },
  {
    name: "run_project_checks",
    title: "Run Project Checks",
    description:
      "Run frontend and/or backend npm verification scripts such as typecheck and build.",
    inputSchema: {
      type: "object",
      properties: {
        target: {
          type: "string",
          enum: ["all", "frontend", "backend"],
          description: "Which app to check. Defaults to all.",
        },
        check: {
          type: "string",
          enum: ["typecheck", "build", "all"],
          description: "Which script set to run. Defaults to typecheck.",
        },
      },
    },
  },
  {
    name: "review_checklist",
    title: "Review Checklist",
    description:
      "Return a focused review checklist for this Next.js, Express, TypeScript, and PostgreSQL project.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

function sendResult(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function sendError(id, code, message, data) {
  send({
    jsonrpc: "2.0",
    id,
    error: data === undefined ? { code, message } : { code, message, data },
  });
}

function textResult(text, structuredContent) {
  return {
    content: [{ type: "text", text }],
    ...(structuredContent ? { structuredContent } : {}),
    isError: false,
  };
}

function errorToolResult(message, details) {
  return {
    content: [
      {
        type: "text",
        text: details ? `${message}\n\n${details}` : message,
      },
    ],
    isError: true,
  };
}

function toRelative(filePath) {
  return path.relative(projectRoot, filePath).replaceAll(path.sep, "/");
}

function resolveProjectPath(inputPath = ".") {
  const normalizedInput = String(inputPath || ".").replaceAll("\\", "/");
  const absolutePath = path.resolve(projectRoot, normalizedInput);
  const relativePath = path.relative(projectRoot, absolutePath);

  if (
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath) ||
    absolutePath === projectRoot + path.sep
  ) {
    throw new Error("Path must stay inside the project root.");
  }

  return absolutePath;
}

function assertAllowedPath(absolutePath) {
  const relative = path.relative(projectRoot, absolutePath);
  const parts = relative.split(path.sep).filter(Boolean);
  const baseName = path.basename(absolutePath).toLowerCase();

  if (baseName === ".env" || baseName.startsWith(".env.")) {
    throw new Error("Refusing to read environment secret files.");
  }

  for (const part of parts) {
    if (ignoredDirectories.has(part)) {
      throw new Error(`Refusing to read generated or dependency path: ${part}`);
    }
  }
}

async function readTextFile(relativePath, maxBytes = 30000) {
  const absolutePath = resolveProjectPath(relativePath);
  assertAllowedPath(absolutePath);

  const stat = await fs.stat(absolutePath);
  if (!stat.isFile()) {
    throw new Error("Path is not a file.");
  }

  const byteLimit = Number.isFinite(maxBytes) ? Math.max(1, maxBytes) : 30000;
  const chunks = [];
  let totalBytes = 0;

  for await (const chunk of createReadStream(absolutePath, {
    encoding: "utf8",
    highWaterMark: 4096,
  })) {
    totalBytes += Buffer.byteLength(chunk);
    chunks.push(chunk);

    if (totalBytes >= byteLimit) {
      break;
    }
  }

  const text = chunks.join("");
  return totalBytes > byteLimit ? `${text.slice(0, byteLimit)}\n[truncated]` : text;
}

async function listFiles(startPath, maxFiles = 200) {
  const start = resolveProjectPath(startPath || ".");
  assertAllowedPath(start);
  const limit = Math.min(Math.max(Number(maxFiles) || 200, 1), 1000);
  const results = [];

  async function visit(directory) {
    if (results.length >= limit) {
      return;
    }

    const entries = await fs.readdir(directory, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      if (results.length >= limit) {
        return;
      }

      if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
        continue;
      }

      const absoluteEntry = path.join(directory, entry.name);
      const relativeEntry = toRelative(absoluteEntry);

      if (entry.isDirectory()) {
        await visit(absoluteEntry);
      } else if (entry.isFile()) {
        if (entry.name.toLowerCase() === ".env" || entry.name.toLowerCase().startsWith(".env.")) {
          continue;
        }
        results.push(relativeEntry);
      }
    }
  }

  const stat = await fs.stat(start);
  if (stat.isFile()) {
    assertAllowedPath(start);
    return [toRelative(start)];
  }

  await visit(start);
  return results;
}

async function readJson(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  if (!existsSync(absolutePath)) {
    return null;
  }

  const content = await fs.readFile(absolutePath, "utf8");
  return JSON.parse(content);
}

async function projectSummary() {
  const [agents, frontendPackage, backendPackage, files] = await Promise.all([
    readTextFile("AGENTS.md", 20000).catch((error) => `AGENTS.md unavailable: ${error.message}`),
    readJson("frontend/package.json"),
    readJson("backend/package.json"),
    listFiles(".", 120),
  ]);

  const summary = {
    projectRoot,
    guidance: agents,
    frontendScripts: frontendPackage?.scripts ?? {},
    backendScripts: backendPackage?.scripts ?? {},
    files,
  };

  const text = [
    `Project root: ${projectRoot}`,
    "",
    "AGENTS.md:",
    agents,
    "",
    "Frontend scripts:",
    JSON.stringify(summary.frontendScripts, null, 2),
    "",
    "Backend scripts:",
    JSON.stringify(summary.backendScripts, null, 2),
    "",
    `Files shown: ${files.length}`,
    files.join("\n"),
  ].join("\n");

  return textResult(text, summary);
}

function runCommand(command, args, cwd, timeoutMs = 120000) {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let child;

    try {
      child = spawn(command, args, {
        cwd,
        shell: false,
        windowsHide: true,
        env: process.env,
      });
    } catch (error) {
      resolve({
        command: [command, ...args].join(" "),
        cwd,
        exitCode: null,
        timedOut: false,
        durationMs: Date.now() - startedAt,
        stdout,
        stderr: error instanceof Error ? error.message : String(error),
      });
      return;
    }

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
    }, timeoutMs);

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      resolve({
        command: [command, ...args].join(" "),
        cwd,
        exitCode: null,
        timedOut,
        durationMs: Date.now() - startedAt,
        stdout,
        stderr: `${stderr}${stderr ? "\n" : ""}${error.message}`,
      });
    });
    child.on("close", (exitCode) => {
      clearTimeout(timer);
      resolve({
        command: [command, ...args].join(" "),
        cwd,
        exitCode,
        timedOut,
        durationMs: Date.now() - startedAt,
        stdout,
        stderr,
      });
    });
  });
}

async function gitStatusDiff(args = {}) {
  if (!existsSync(path.join(projectRoot, ".git"))) {
    return errorToolResult("This project folder is not currently a git repository.");
  }

  const includePatch = Boolean(args.includePatch);
  const maxBytes = Math.min(Math.max(Number(args.maxBytes) || 40000, 1000), 200000);
  const commands = [
    await runCommand("git", ["status", "--short"], projectRoot, 30000),
    await runCommand("git", ["diff", "--stat"], projectRoot, 30000),
  ];

  if (includePatch) {
    const diff = await runCommand("git", ["diff", "--"], projectRoot, 30000);
    if (Buffer.byteLength(diff.stdout) > maxBytes) {
      diff.stdout = `${diff.stdout.slice(0, maxBytes)}\n[truncated]`;
    }
    commands.push(diff);
  }

  const text = commands
    .map((result) =>
      [
        `$ ${result.command}`,
        `cwd: ${result.cwd}`,
        `exitCode: ${result.exitCode}`,
        result.stdout.trim() ? `stdout:\n${result.stdout.trim()}` : "stdout: <empty>",
        result.stderr.trim() ? `stderr:\n${result.stderr.trim()}` : "stderr: <empty>",
      ].join("\n"),
    )
    .join("\n\n");

  return textResult(text, { commands });
}

async function runProjectChecks(args = {}) {
  const target = args.target || "all";
  const check = args.check || "typecheck";
  const targets =
    target === "all"
      ? ["frontend", "backend"]
      : target === "frontend" || target === "backend"
        ? [target]
        : null;

  if (!targets) {
    return errorToolResult("target must be one of: all, frontend, backend.");
  }

  const scripts =
    check === "all"
      ? ["typecheck", "build"]
      : check === "typecheck" || check === "build"
        ? [check]
        : null;

  if (!scripts) {
    return errorToolResult("check must be one of: typecheck, build, all.");
  }

  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const results = [];

  for (const app of targets) {
    for (const script of scripts) {
      const appDir = path.join(projectRoot, app);
      if (!existsSync(path.join(appDir, "package.json"))) {
        results.push({
          command: `${npmCommand} run ${script}`,
          cwd: appDir,
          exitCode: null,
          timedOut: false,
          durationMs: 0,
          stdout: "",
          stderr: "package.json not found",
        });
        continue;
      }

      results.push(await runCommand(npmCommand, ["run", script], appDir, 120000));
    }
  }

  const failed = results.some((result) => result.exitCode !== 0);
  const text = results
    .map((result) =>
      [
        `$ ${result.command}`,
        `cwd: ${result.cwd}`,
        `exitCode: ${result.exitCode}`,
        `durationMs: ${result.durationMs}`,
        result.timedOut ? "timedOut: true" : "timedOut: false",
        result.stdout.trim() ? `stdout:\n${result.stdout.trim()}` : "stdout: <empty>",
        result.stderr.trim() ? `stderr:\n${result.stderr.trim()}` : "stderr: <empty>",
      ].join("\n"),
    )
    .join("\n\n");

  return {
    content: [{ type: "text", text }],
    structuredContent: { results },
    isError: failed,
  };
}

async function reviewChecklist() {
  const checklist = [
    "Frontend: verify every route renders without hydration errors, text overflow, or broken responsive layouts.",
    "Frontend: keep Tailwind classes consistent with the existing design system and avoid one-off visual patterns.",
    "Frontend: check API calls handle loading, empty, and error states.",
    "Backend: validate request bodies, auth boundaries, and error responses for every endpoint touched.",
    "Backend: avoid leaking secrets from .env or database errors to clients.",
    "Database: confirm SQL migrations, seed scripts, and schema assumptions match the Express handlers.",
    "TypeScript: run frontend and backend typecheck before finishing.",
    "Build: run production builds when changes touch routing, config, imports, or shared types.",
  ];

  return textResult(checklist.map((item) => `- ${item}`).join("\n"), {
    checklist,
  });
}

async function callTool(name, args = {}) {
  switch (name) {
    case "project_summary":
      return projectSummary();
    case "list_project_files": {
      const files = await listFiles(args.subdir || ".", args.maxFiles || 200);
      return textResult(files.join("\n"), { files });
    }
    case "read_project_file": {
      const filePath = args.filePath;
      if (!filePath) {
        return errorToolResult("filePath is required.");
      }
      const text = await readTextFile(filePath, args.maxBytes || 30000);
      return textResult(text, { filePath });
    }
    case "git_status_diff":
      return gitStatusDiff(args);
    case "run_project_checks":
      return runProjectChecks(args);
    case "review_checklist":
      return reviewChecklist();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function handleRequest(message) {
  if (!message || message.jsonrpc !== "2.0") {
    return;
  }

  const { id, method, params } = message;

  try {
    if (method === "initialize") {
      sendResult(id, {
        protocolVersion: params?.protocolVersion || "2025-06-18",
        capabilities: {
          tools: { listChanged: false },
        },
        serverInfo: {
          name: serverName,
          title: "Afghanistan Futsal Code Workflow",
          version: serverVersion,
        },
        instructions:
          "Use this server for project-specific code workflow context and verification. It does not write files; Codex should edit code through its normal file tools, then call run_project_checks and git_status_diff when useful.",
      });
      return;
    }

    if (method === "notifications/initialized" || method?.startsWith("notifications/")) {
      return;
    }

    if (method === "ping") {
      sendResult(id, {});
      return;
    }

    if (method === "tools/list") {
      sendResult(id, { tools });
      return;
    }

    if (method === "tools/call") {
      const result = await callTool(params?.name, params?.arguments || {});
      sendResult(id, result);
      return;
    }

    sendError(id, -32601, `Method not found: ${method}`);
  } catch (error) {
    sendError(id, -32000, error instanceof Error ? error.message : String(error));
  }
}

const rl = createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) {
    return;
  }

  let message;
  try {
    message = JSON.parse(trimmed);
  } catch (error) {
    sendError(null, -32700, "Parse error", error instanceof Error ? error.message : String(error));
    return;
  }

  void handleRequest(message);
});

process.stderr.write(`${serverName} running for ${projectRoot}\n`);
