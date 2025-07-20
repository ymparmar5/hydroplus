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

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden ">
      {/* Hero/Header Section */}
      <div className="relative h-[160px] xs:h-[200px] sm:h-[220px] md:h-[300px] lg:h-[350px] w-full mb-8 sm:mb-12 overflow-hidden animate-pulse-glow">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/about-us-11.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.8)',
          }}
        />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-black/50 to-black" />
        <div className="relative z-10 flex items-center justify-center h-full px-2">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 text-left ">
            About <span className="text-primary ">Hydroplus International</span>
          </h1>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 67, 0, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 67, 0, 0.6); }
        }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Story Card */}
        <div className="bg-white/5 rounded-2xl shadow-2xl p-0 sm:p-0 my-10 backdrop-blur-md border border-white/10 overflow-hidden">
          <div className="w-full">
            <img src="/about-us-11.jpeg" alt="About Us" className="w-full h-56 sm:h-72 md:h-96 object-cover object-center rounded-t-2xl" />
          </div>
          <div className="p-6 sm:p-10">
            <div className="text-primary font-semibold text-xl mb-2">Our Story</div>
            <div className="text-base leading-7 mb-2 text-gray-200">
              Founded in 2010, Hydroplus International is a Gujarat-based manufacturer and supplier of every type of pump, motor, and power tool for various purposes. Our journey began with a vision to revolutionize the industry by delivering high-quality, innovative products. From a small workshop, we have grown into a leading manufacturer known for our commitment to excellence and customer satisfaction.
            </div>
          </div>
        </div>
        {/* Mission Card */}
        <div className="bg-white/5 rounded-2xl shadow-2xl p-6 sm:p-10 my-10 backdrop-blur-md border border-white/10">
          <div className="text-primary font-semibold text-xl mb-2">Our Mission</div>
          <div className="text-base leading-7 mb-2 text-gray-200">
            Our mission is to deliver top-notch, customizable pumps and motors that effectively meet our clients' needs and enhance their operational efficiency. We are committed to sustainability, using eco-friendly materials and practices to minimize our environmental impact. Innovation is at the heart of everything we do, and our team is dedicated to providing exceptional service and building lasting relationships with our clients.
          </div>
        </div>
        {/* Products Card */}
        <div className="bg-white/5 rounded-2xl shadow-2xl p-6 sm:p-10 my-10 backdrop-blur-md border border-white/10">
          <div className="text-primary font-semibold text-xl mb-2">Our Products</div>
          <iframe width="100%" height="250" className="rounded-lg mb-4" src="https://www.youtube.com/embed/NLN0R8RXLmA?si=i-omFJ2dooiaxbRx" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div className="text-base leading-7 mb-2 text-gray-200">
            Our range of products is designed to provide superior performance, reliability, and efficiency across various industries. We offer customizable solutions to ensure our products align perfectly with our clients' operational needs. Our commitment to excellence drives us to continually improve and refine our designs, ensuring every product incorporates the latest technological advancements and highest industry standards.
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
