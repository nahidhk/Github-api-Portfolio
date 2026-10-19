import React from "react";
import cfg from "../data/username.json";
import urls from "../data/LinkUrl.json";
import { FaTelegramPlane, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaSnapchat, FaXTwitter } from "react-icons/fa6";

const items = [
  ["telegram_username", "telegram_url", FaTelegramPlane, "Telegram"],
  ["facebook_id_username", "facebook_url", FaFacebookF, "Facebook"],
  ["linkedIn_username", "linkedin_url", FaLinkedinIn, "LinkedIn"],
  ["whatsapp_number", "whatsapp_api", FaWhatsapp, "WhatsApp"],
  ["snapchat_username", "snapchat_url", FaSnapchat, "Snapchat"],
  ["twitter_X_username", "x_url", FaXTwitter, "X"],
];

export default function Contacts() {
  return (
    <div className="socials">
      {items.filter(([k]) => cfg[k]).map(([k, u, Icon, label]) => (
        <a key={k} href={urls[u] + String(cfg[k]).replace(/^@/, "")} target="_blank" rel="noreferrer" aria-label={label} title={label}>
          <Icon />
        </a>
      ))}
    </div>
  );
}
