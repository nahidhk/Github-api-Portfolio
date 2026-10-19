import React from "react";
import { FiStar, FiGitBranch, FiExternalLink } from "react-icons/fi";
import { abs } from "../data/github";

const colors = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", PHP: "#4F5D95",
  HTML: "#e34c26", CSS: "#563d7c", Java: "#b07219", "C++": "#f34b7d", C: "#9a9a9a",
  Dart: "#00B4AB", Shell: "#89e051", Vue: "#41b883", Kotlin: "#A97BFF",
};
export const langColor = (l) => colors[l] || "#8a91a3";

export default function RepoCard({ r }) {
  return (
    <article className="card repo">
      <a href={r.html_url} target="_blank" rel="noreferrer" className="repo-name">{r.name}</a>
      <p className="repo-desc">{r.description || "No description provided."}</p>
      {r.topics?.length > 0 && (
        <div className="tags">{r.topics.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}</div>
      )}
      <div className="repo-foot">
        {r.language && <span className="meta-i"><i className="dot" style={{ background: langColor(r.language) }} />{r.language}</span>}
        <span className="meta-i"><FiStar />{r.stargazers_count}</span>
        <span className="meta-i"><FiGitBranch />{r.forks_count}</span>
        <span className="grow" />
        {r.homepage && (
          <a className="icon-link" href={abs(r.homepage)} target="_blank" rel="noreferrer" aria-label="Live demo" title="Live demo"><FiExternalLink /></a>
        )}
      </div>
    </article>
  );
}
