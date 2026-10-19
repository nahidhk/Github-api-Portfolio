import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAsync, getUser, getFollowers } from "../data/github";
import formatNumber from "../script/formatNuber";
import Loading from "../components/Loading";
import ErrorBox from "../components/Error";

export default function Followers() {
  const [page, setPage] = useState(1);
  const u = useAsync(getUser);
  const f = useAsync(() => getFollowers(page), [page]);
  if (u.error || f.error) return <ErrorBox message={u.error || f.error} />;

  const pages = Math.ceil((u.data?.followers || 0) / 30) || 1;
  return (
    <section>
      <h1 className="page-title">Followers</h1>
      <p className="sub">{u.data ? formatNumber(u.data.followers) : "…"} people follow {u.data?.login}</p>
      {f.loading ? <Loading /> : (
        <div className="grid people">
          {(f.data || []).map((p) => (
            <a key={p.id} className="card person" href={p.html_url} target="_blank" rel="noreferrer">
              <img src={p.avatar_url} alt="" loading="lazy" /><span>{p.login}</span>
            </a>
          ))}
        </div>
      )}
      <div className="pager">
        <button className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}><FiChevronLeft /> Previous</button>
        <span>Page {page} / {pages}</span>
        <button className="btn" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next <FiChevronRight /></button>
      </div>
    </section>
  );
}
