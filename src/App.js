import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAsync, getUser } from "./data/github";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Repo from "./pages/Repo";
import Followers from "./pages/Followers";

function Meta() {
  const { pathname } = useLocation();
  const { data } = useAsync(getUser);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const move = (e) => {
      const c = e.target.closest && e.target.closest(".card");
      if (!c) return;
      const b = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - b.left + "px");
      c.style.setProperty("--my", e.clientY - b.top + "px");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  useEffect(() => {
    if (data) document.title = `${data.name || data.login} — Developer Portfolio`;
  }, [data]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Meta />
      <Nav />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repo" element={<Repo />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
