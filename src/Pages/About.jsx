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
    <div className="min-h-[80vh] w-full bg-gradient-to-br from-black via-gray-900 to-black text-white py-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Heading */}
        <div className="text-primary font-bold text-3xl sm:text-4xl mb-4 text-center">About Hydroplus International</div>
        {/* Story Card */}
        <div className="bg-white/5 rounded-2xl shadow-xl p-6 sm:p-10 my-6 backdrop-blur-md border border-white/10">
          <div className="text-primary font-semibold text-xl mb-2">Our Story</div>
          <img src="/about-us-11.jpeg" alt="About Us" className="w-full max-w-xs rounded-lg my-4 object-cover mx-auto shadow-lg hover:scale-105 transition-transform duration-300" />
          <div className="text-base leading-7 mb-2 text-gray-200">
            Founded in 2010, Hydroplus International is a Gujarat-based manufacturer and supplier of every type of pump, motor, and power tool for various purposes. Our journey began with a vision to revolutionize the industry by delivering high-quality, innovative products. From a small workshop, we have grown into a leading manufacturer known for our commitment to excellence and customer satisfaction.
          </div>
        </div>
        {/* Mission Card */}
        <div className="bg-white/5 rounded-2xl shadow-xl p-6 sm:p-10 my-6 backdrop-blur-md border border-white/10">
          <div className="text-primary font-semibold text-xl mb-2">Our Mission</div>
          <div className="text-base leading-7 mb-2 text-gray-200">
            Our mission is to deliver top-notch, customizable pumps and motors that effectively meet our clients' needs and enhance their operational efficiency. We are committed to sustainability, using eco-friendly materials and practices to minimize our environmental impact. Innovation is at the heart of everything we do, and our team is dedicated to providing exceptional service and building lasting relationships with our clients.
          </div>
        </div>
        {/* Products Card */}
        <div className="bg-white/5 rounded-2xl shadow-xl p-6 sm:p-10 my-6 backdrop-blur-md border border-white/10">
          <div className="text-primary font-semibold text-xl mb-2">Our Products</div>
          <iframe width="100%" height="250" className="rounded-lg mb-4" src="https://www.youtube.com/embed/NLN0R8RXLmA?si=i-omFJ2dooiaxbRx" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div className="text-base leading-7 mb-2 text-gray-200">
            Our range of products is designed to provide superior performance, reliability, and efficiency across various industries. We offer customizable solutions to ensure our products align perfectly with our clients' operational needs. Our commitment to excellence drives us to continually improve and refine our designs, ensuring every product incorporates the latest technological advancements and highest industry standards.
          </div>
        </div>
        {/* Meet Our Minds Section */}
        <div className="w-full mt-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-primary">Meet Our Minds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white/10 rounded-xl p-4 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
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
