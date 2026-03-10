/**
 * Fetches public repos from GitHub and parses each README for tech stack.
 * Writes public/github-repos.json for the site to consume.
 * Run before build (e.g. in CI). Set GITHUB_USER and optionally GITHUB_TOKEN.
 *
 * Only includes repos updated on or after REPOS_UPDATED_AFTER (YYYY-MM-DD).
 * Defaults to today so only projects you work on from now on appear.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GITHUB_USER = process.env.GITHUB_USER || "vibhu-dixit";
const TOKEN = process.env.GITHUB_TOKEN || process.env.TOKEN;
const OUT_PATH = path.join(__dirname, "..", "public", "github-repos.json");

// Only repos updated on or after this date (YYYY-MM-DD). Default: today.
const REPOS_UPDATED_AFTER =
  process.env.REPOS_UPDATED_AFTER ||
  new Date().toISOString().slice(0, 10);

const headers = {
  Accept: "application/vnd.github.v3+json",
  ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
};

async function fetchJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

async function fetchRepos() {
  const url = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=40&type=owner`;
  const repos = await fetchJson(url);
  return repos.filter(
    (r) =>
      !r.fork &&
      !r.private &&
      (r.updated_at && r.updated_at.slice(0, 10) >= REPOS_UPDATED_AFTER)
  );
}

/**
 * Parse README markdown for tech stack / built with sections.
 * Looks for ## Tech Stack, ## Built With, ## Technologies, etc. and extracts list items or comma-separated values.
 */
function parseTechFromReadme(markdown) {
  if (!markdown || typeof markdown !== "string") return [];
  const tech = new Set();
  const sectionRegex = /(?:^|\n)(?:##|###)\s*(?:Tech\s*Stack|Built\s*With|Built\s*using|Technologies|Stack|Technologies\s*Used|Tools|Languages?|Frameworks?|🛠|🚀)[\s:]*\n([\s\S]*?)(?=\n(?:##|###)|\n\n\n|$)/gi;
  let m;
  while ((m = sectionRegex.exec(markdown)) !== null) {
    const block = m[1];
    // List items: - X, * X, • X, 1. X
    const listItemRegex = /[-*•]\s*\[?([^\]\n]+)\]?(?:\s*\([^)]*\))?|(?:\d+\.)\s*\[?([^\]\n]+)\]?/gi;
    let lm;
    while ((lm = listItemRegex.exec(block)) !== null) {
      const item = (lm[1] || lm[2] || "").trim().replace(/\s+/g, " ");
      if (item.length > 1 && item.length < 50) tech.add(item);
    }
    // Comma-separated in a line
    const lines = block.split("\n").filter((l) => l.trim());
    for (const line of lines) {
      if (line.startsWith("-") || line.startsWith("*") || line.startsWith("•")) continue;
      const parts = line.split(/[,|]/).map((p) => p.trim().replace(/\s*[-–].*$/, "").trim());
      parts.filter((p) => p.length > 1 && p.length < 40).forEach((p) => tech.add(p));
    }
  }
  return Array.from(tech).slice(0, 12);
}

async function fetchReadme(owner, repo) {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const data = await fetchJson(url);
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return parseTechFromReadme(content);
  } catch {
    return [];
  }
}

async function main() {
  console.log("Fetching repos for", GITHUB_USER, "(updated on or after", REPOS_UPDATED_AFTER + ")");
  const repos = await fetchRepos();
  const results = [];
  for (const r of repos) {
    const techFromReadme = await fetchReadme(r.owner.login, r.name);
    const language = r.language ? [r.language] : [];
    const tech = [...new Set([...language, ...techFromReadme])].slice(0, 10);
    const tags = Array.isArray(r.topics) ? r.topics.slice(0, 6) : [];
    results.push({
      name: r.name,
      description: r.description || "",
      url: r.html_url,
      language: r.language || null,
      topics: tags,
      tech: tech.length ? tech : (r.language ? [r.language] : []),
      updatedAt: r.updated_at,
    });
    await new Promise((resolve) => setTimeout(resolve, 200)); // avoid rate limit
  }
  const dir = path.dirname(OUT_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 0), "utf-8");
  console.log("Wrote", results.length, "repos to", OUT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
