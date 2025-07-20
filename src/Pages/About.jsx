import React from 'react';

const team = [
  {
    name: 'Divesh Ramchandani',
    role: 'CEO & Founder',
    image: '/about-us-11.jpeg',
    desc: 'Visionary leader with 15+ years in water solutions.'
  },
  {
    name: 'S Mishra',
    role: 'UI Developer',
    image: '/about-us-2.jpg',
    desc: 'Designs seamless digital experiences for our clients.'
  },
  {
    name: 'Y M Parmar',
    role: 'Developer',
    image: '/about-us-3.jpeg',
    desc: 'Builds robust, scalable systems for HydroPlus.'
  },
  {
    name: 'Lisa Wang',
    role: 'Operations',
    image: '/about-us-7.jpg',
    desc: 'Ensures smooth operations and customer satisfaction.'
  },
];

const highlights = [
  {
    icon: '✅',
    title: 'Trusted & Certified',
    desc: 'ISO 9001:2015 certified, 25+ years of trust in water and air solutions.'
  },
  {
    icon: '🛠️',
    title: 'Expertise & Support',
    desc: 'Professional team, 750+ SKUs, and strong dealer education.'
  },
  {
    icon: '🔧',
    title: 'Wide Product Range',
    desc: 'Specializing in high-pressure washers, air compressors, and more.'
  },
  {
    icon: '🌏',
    title: 'Global Presence',
    desc: 'Products available worldwide, easy access to parts & support.'
  },
];

const About = () => {
  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-br from-black via-gray-900 to-black text-white py-0">
      {/* Full-width hero image and heading */}
      <div className="w-full">
        <img
          src="/istockphoto-1827291486-612x612.jpg"
          alt="About Us"
          className="w-full h-56 sm:h-72 md:h-96 object-contain sm:object-cover bg-black"
        />
      </div>
      <div className="w-full text-primary font-bold text-3xl sm:text-4xl mb-8 text-center mt-4">About Hydroplus International</div>
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Company Summary */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-lg sm:text-xl text-gray-200">
            Hydroplus International is a leading manufacturer and supplier of pumps, motors, and power tools for residential, commercial, and industrial use. With over a decade of experience, we are trusted for our quality, innovation, and customer satisfaction.
          </p>
        </div>
        {/* Years of Experience / Achievements */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-14">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary">20+</div>
            <div className="text-gray-300 text-base">Years Of Experience</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary">30+</div>
            <div className="text-gray-300 text-base">Team Members</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary">750+</div>
            <div className="text-gray-300 text-base">SKUs</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary">1000+</div>
            <div className="text-gray-300 text-base">Happy Clients</div>
          </div>
        </div>
        {/* Why Choose Us Section */}
        <div className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-primary">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white/10 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-bold text-lg text-white text-center mb-1">{item.title}</div>
                <div className="text-gray-300 text-sm text-center">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Video Section */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="bg-white/5 rounded-2xl shadow-2xl p-8 sm:p-10 border border-white/10 flex flex-col items-center">
            <div className="text-primary font-semibold text-xl mb-4">Watch Our Company Video</div>
            <iframe width="100%" height="250" className="rounded-lg mb-4" src="https://www.youtube.com/embed/NLN0R8RXLmA?si=i-omFJ2dooiaxbRx" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
        {/* Founder's Word Section */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="bg-white/5 rounded-2xl shadow-2xl p-8 sm:p-10 border border-white/10 flex flex-col items-center">
            <div className="text-primary font-semibold text-xl mb-2">Founder's Word</div>
            <blockquote className="italic text-gray-200 text-lg mb-4 text-center">
              "At Hydroplus, we save your time, money, and energy with innovative solutions and exceptional service. Our mission goes beyond selling products – we deliver solutions designed to simplify your life and enhance reliability. Thank you for trusting us to be part of your journey. Together, we’ll set new standards in efficiency and convenience."
            </blockquote>
            <div className="text-primary font-bold text-base">Warm Regards,</div>
            <div className="text-white font-semibold text-base">Divesh Ramchandani</div>
            <div className="text-gray-400 text-xs">Founder & CEO</div>
          </div>
        </div>
        {/* Office Contacts Section */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="bg-white/5 rounded-2xl shadow-2xl p-8 sm:p-10 border border-white/10">
            <div className="text-primary font-semibold text-xl mb-4 text-center">Office Contacts</div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
              <div className="flex-1">
                <div className="text-gray-400 text-sm mb-1">Phone</div>
                <div className="text-white text-base font-semibold mb-3">+91 77109 21153</div>
                <div className="text-gray-400 text-sm mb-1">Email</div>
                <div className="text-white text-base font-semibold mb-3">info@hydroplus.com</div>
              </div>
              <div className="flex-1">
                <div className="text-gray-400 text-sm mb-1">Address</div>
                <div className="text-white text-base font-semibold">
                  G1-2, Ground Floor, Shivai Plaza Co-Op Socity,<br />
                  Marol, Andheri East, Mumbai - 400059
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Meet Our Minds Section */}
        <div className="w-full mt-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-primary">Meet Our Minds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white/10 rounded-xl p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
                <img src={member.image} alt={member.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-primary shadow-md mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="font-bold text-lg text-white text-center mb-1 group-hover:text-primary transition-colors duration-300">{member.name}</div>
                <div className="text-primary text-xs font-semibold mb-1 text-center">{member.role}</div>
                <div className="text-gray-300 text-xs text-center">{member.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
