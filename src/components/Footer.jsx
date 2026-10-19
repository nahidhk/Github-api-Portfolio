import React from "react";
import { useAsync, getUser } from "../data/github";

export default function Footer() {
  const { data: u } = useAsync(getUser);
  return (
    <footer className="footer">
      © {new Date().getFullYear()} {u?.name || u?.login || ""} · Built with React & the GitHub API
    </footer>
  );
}
