import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useAsync, getRepos } from "../data/github";
import Loading from "../components/Loading";
import ErrorBox from "../components/Error";
import RepoCard from "../components/RepoCard";

export default function Repo() {
  const { data, loading, error } = useAsync(getRepos);
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("");
  const [sort, setSort] = useState("updated");
  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;

  const own = data.filter((r) => !r.fork);
  const langs = [...new Set(own.map((r) => r.language).filter(Boolean))].sort();
  const list = own
    .filter((r) => (!lang || r.language === lang) && `${r.name} ${r.description || ""}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sort === "stars"
      ? b.stargazers_count - a.stargazers_count
      : new Date(b.pushed_at) - new Date(a.pushed_at));

  return (
    <section>
      <h1 className="page-title">Projects</h1>
      <p className="sub">{list.length} of {own.length} public repositories</p>
      <div className="toolbar">
        <label className="search"><FiSearch /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…" /></label>
        <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language">
          <option value="">All languages</option>
          {langs.map((l) => <option key={l}>{l}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
          <option value="updated">Recently updated</option>
          <option value="stars">Most starred</option>
        </select>
      </div>
      {list.length ? <div className="grid repos">{list.map((r) => <RepoCard key={r.id} r={r} />)}</div> : <p className="sub">No projects match your filters.</p>}
    </section>
  );
}
