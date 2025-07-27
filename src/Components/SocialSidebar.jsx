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
    <div className="fixed right-1 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {socialLinks.map((link, index) => (
        <div
          key={index}
          className="bg-white shadow border border-orange-500 w-12 h-14 rounded-l-full flex items-center justify-center"
        >
          <img src={link.icon} alt={link.label} className="w-7 h-7 object-contain" />
        </div>
      ))}
    </div>
  );
};

export default SocialSidebar;