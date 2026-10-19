import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function ErrorBox({ message }) {
  return (
    <div className="error">
      <FiAlertTriangle size={44} color="var(--accent)" />
      <h2>Couldn't load data</h2>
      <p>{message || "GitHub API is not responding."}</p>
      <button className="btn primary" onClick={() => window.location.reload()}>Try again</button>
    </div>
  );
}
