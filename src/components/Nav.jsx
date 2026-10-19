import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAsync, getUser } from "../data/github";

const links = [["/", "Overview"], ["/repo", "Projects"], ["/followers", "Followers"]];

export default function Nav() {
  const { data: u } = useAsync(getUser);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="nav">
      <div className="container nav-in">
        <NavLink to="/" className="brand" onClick={close}>
          {u?.avatar_url && <img src={u.avatar_url} alt="" />}
          <span>{u?.name || u?.login || "Portfolio"}</span>
        </NavLink>
        <button className="burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
        <nav className={"links" + (open ? " open" : "")}>
          {links.map(([to, t]) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={close}>{t}</NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
