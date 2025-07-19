import React from "react";

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
    <div className="fixed left-4 top-1/3 z-40 flex flex-col gap-3 md:left-4 md:top-1/3 md:flex-col md:gap-3
      sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:top-auto sm:flex-row sm:gap-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center md:flex-col sm:flex-row"
          aria-label={link.label}
        >
          <div className="bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center transition-transform transform hover:scale-110 hover:bg-blue-100 border border-blue-200">
            <img src={link.icon} alt={link.label} className="w-7 h-7 object-contain" />
          </div>
          <span className="ml-3 md:ml-0 md:mt-2 text-sm text-gray-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:hidden">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;