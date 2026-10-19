import { useEffect, useState } from "react";
import cfg from "./username.json";

const API = "https://api.github.com";
const cache = {};
const once = (key, fn) =>
  (cache[key] ??= fn().catch((e) => { delete cache[key]; throw e; }));

async function json(url) {
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) {
    throw new Error(res.status === 403
      ? "GitHub API rate limit exceeded. Please try again in a few minutes."
      : `GitHub API error (${res.status}).`);
  }
  return res.json();
}

export const abs = (u) => (/^https?:\/\//.test(u) ? u : `https://${u}`);

export const getUser = () => once("user", () => json(`${API}/users/${cfg.github_username}`));

export const getRepos = () => once("repos", async () => {
  let all = [], page = 1, batch;
  do {
    batch = await json(`${API}/users/${cfg.github_username}/repos?per_page=100&sort=updated&page=${page++}`);
    all = all.concat(batch);
  } while (batch.length === 100);
  return all;
});

export const getFollowers = (page) =>
  once(`f${page}`, () => json(`${API}/users/${cfg.github_username}/followers?per_page=30&page=${page}`));

export function useAsync(fn, deps = []) {
  const [s, set] = useState({ data: null, error: null, loading: true });
  useEffect(() => {
    let live = true;
    set((x) => ({ ...x, loading: true }));
    fn()
      .then((data) => live && set({ data, error: null, loading: false }))
      .catch((e) => live && set({ data: null, error: e.message, loading: false }));
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return s;
}
