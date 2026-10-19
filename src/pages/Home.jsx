import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiBriefcase, FiLink, FiGithub, FiStar, FiUsers, FiBook, FiCalendar, FiArrowRight } from "react-icons/fi";
import { useAsync, getUser, getRepos, abs } from "../data/github";
import formatNumber from "../script/formatNuber";
import Loading from "../components/Loading";
import ErrorBox from "../components/Error";
import Contacts from "../components/Contacts";
import RepoCard, { langColor } from "../components/RepoCard";
import profile from "../data/profile.json";

function Typed({ words }) {
  const [t, setT] = useState("");
  useEffect(() => {
    let i = 0, j = 0, del = false, id;
    const tick = () => {
      const w = words[i];
      j += del ? -1 : 1;
      setT(w.slice(0, j));
      let d = del ? 40 : 80;
      if (!del && j === w.length) { del = true; d = 1400; }
      else if (del && j === 0) { del = false; i = (i + 1) % words.length; d = 300; }
      id = setTimeout(tick, d);
    };
    id = setTimeout(tick, 400);
    return () => clearTimeout(id);
  }, [words]);
  return <p className="role">&gt; {t}<span className="caret" /></p>;
}

export default function Home() {
  const u = useAsync(getUser);
  const r = useAsync(getRepos);
  if (u.loading) return <Loading />;
  if (u.error) return <ErrorBox message={u.error} />;

  const user = u.data;
  const repos = (r.data || []).filter((x) => !x.fork);
  const stars = repos.reduce((s, x) => s + x.stargazers_count, 0);
  const counts = repos.reduce((m, x) => (x.language && (m[x.language] = (m[x.language] || 0) + 1), m), {});
  const langs = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const top = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 6);
  const stats = [
    [FiBook, "Repositories", formatNumber(user.public_repos || 0)],
    [FiStar, "Stars earned", r.loading ? "—" : formatNumber(stars)],
    [FiUsers, "Followers", formatNumber(user.followers || 0)],
    [FiCalendar, "On GitHub since", String(new Date(user.created_at).getFullYear())],
  ];

  return (
    <>
      <section className="hero">
        <img className="avatar" src={user.avatar_url} alt={user.name || user.login} />
        <div>
          {user.hireable && <span className="badge">Available for work</span>}
          <h1>{user.name || user.login}</h1>
          {profile.roles?.length > 0 && <Typed words={profile.roles} />}
          {user.bio && <p className="lead">{user.bio}</p>}
          <ul className="meta">
            {user.location && <li><FiMapPin />{user.location}</li>}
            {user.company && <li><FiBriefcase />{user.company}</li>}
            {user.blog && <li><FiLink /><a href={abs(user.blog)} target="_blank" rel="noreferrer">{user.blog.replace(/^https?:\/\//, "")}</a></li>}
          </ul>
          <div className="cta">
            <Link className="btn primary" to="/repo">View projects <FiArrowRight /></Link>
            <a className="btn" href={user.html_url} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
            <Contacts />
          </div>
        </div>
      </section>

      <section className="stats">
        {stats.map(([Icon, label, value]) => (
          <div key={label} className="card stat"><Icon /><div><b>{value}</b><span>{label}</span></div></div>
        ))}
      </section>

      {profile.skills?.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>Tech stack</h2></div>
          <div className="chips">{profile.skills.map((k) => <span key={k} className="chip">{k}</span>)}</div>
        </section>
      )}

      {langs.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>Top languages</h2></div>
          <div className="card langs">
            {langs.map(([name, c]) => {
              const p = Math.round((c / total) * 100);
              return (
                <div className="lang-row" key={name}>
                  <span>{name}</span>
                  <div className="bar"><i style={{ width: p + "%", background: langColor(name) }} /></div>
                  <span>{p}%</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {top.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>Featured projects</h2><Link className="more" to="/repo">View all →</Link></div>
          <div className="grid repos">{top.map((x) => <RepoCard key={x.id} r={x} />)}</div>
        </section>
      )}
    </>
  );
}
