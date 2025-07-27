import React from "react";

const socialLinks = [
  {
    icon: "/facebook.png",
    url: "https://www.facebook.com/people/Hydroplus-International/61576041157055/?mibextid=wwXIfr&rdid=Fbqr3NIgIqq5Eja9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Hr5PnDc7J%2F%3Fmibextid%3DwwXIfr",
    label: "Facebook",
  },
  {
    icon: "/instagram.png",
    url: "https://www.instagram.com/hydroplus_international_",
    label: "Instagram",
  },
  {
    icon: "/linkedin.png",
    url: "https://in.linkedin.com/in/hydroplus-international-17a643365?original_referer=https%3A%2F%2Fwww.google.com%2F",
    label: "LinkedIn",
  },
  {
    icon: "/youtube.png",
    url: "https://www.youtube.com/@hydroplusinternational",
    label: "YouTube",
  },
  {
    icon: "/whatsapp.png",
    url: "https://wa.me/918000074088",
    label: "WhatsApp",
  },
  {
    icon: "/telecall.png",
    url: "https://t.me/hydroplusinternational",
    label: "Telegram",
  },
  {
    icon: "/contact.png",
    url: "tel:+918000074088",
    label: "Call",
  },
];

const SocialSidebar = () => {
  return (
    <div className="fixed right-1 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {socialLinks.map((link, index) => (
        <div
          key={index}
          className="bg-white shadow border border-orange-500 w-12 h-14 rounded-l-full flex items-center justify-center cursor-pointer"
          onClick={() => window.open(link.url, link.url.startsWith('tel:') ? '_self' : '_blank')}
        >
          <img src={link.icon} alt={link.label} className="w-7 h-7 object-contain" />
        </div>
      ))}
    </div>
  );
};

export default SocialSidebar;