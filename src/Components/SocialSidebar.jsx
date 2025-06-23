import React from "react";
import "../Style/SocialSidebar.css";

const socialLinks = [
  {
    icon: "/facebook.png",
    url: "https://www.facebook.com/",
    label: "Facebook",
  },
  {
    icon: "/instagram.png",
    url: "https://www.instagram.com/",
    label: "Instagram",
  },
  {
    icon: "/linkedin.png",
    url: "https://www.linkedin.com/",
    label: "LinkedIn",
  },
  {
    icon: "/youtube.png",
    url: "https://www.youtube.com/",
    label: "YouTube",
  },
  {
    icon: "/whatsapp.png",
    url: "https://www.whatsapp.com/",
    label: "WhatsApp",
  },

];

const SocialSidebar = () => {
  return (
    <div className="social-sidebar">
      <ul>
        {socialLinks.map((link, index) => (
          <li key={index} className="social-item">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <div className="icon-circle">
                <img src={link.icon} alt={link.label} />
              </div>
              <span className="label">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialSidebar;