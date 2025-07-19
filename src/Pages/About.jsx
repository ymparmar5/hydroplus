import React from 'react';

const About = () => {
  return (
    <div className="min-h-[80vh] bg-gray-100 text-gray-900 p-8 flex flex-col items-center">
      <div className="text-blue-700 font-bold text-3xl mb-6 text-center">About Hydroplus International</div>
      <div className="bg-white rounded-xl shadow-md p-8 my-6 max-w-3xl w-full">
        <div className="text-orange-500 font-semibold text-xl mb-4">Our Story</div>
        <img src="/about-us-11.jpeg" alt="About Us" className="w-full max-w-xs rounded-lg my-4 object-cover" />
        <div className="text-base leading-7 mb-4">
          Founded in 2010, Hydroplus International is a Gujarat-based manufacturer and supplier of every type of pump, motor, and power tool for various purposes. Our journey began with a vision to revolutionize the industry by delivering high-quality, innovative products. From a small workshop, we have grown into a leading manufacturer known for our commitment to excellence and customer satisfaction.
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-8 my-6 max-w-3xl w-full">
        <div className="text-orange-500 font-semibold text-xl mb-4">Our Mission</div>
        <div className="text-base leading-7 mb-4">
          Our mission is to deliver top-notch, customizable pumps and motors that effectively meet our clients' needs and enhance their operational efficiency. We are committed to sustainability, using eco-friendly materials and practices to minimize our environmental impact. Innovation is at the heart of everything we do, and our team is dedicated to providing exceptional service and building lasting relationships with our clients.
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-8 my-6 max-w-3xl w-full">
        <div className="text-orange-500 font-semibold text-xl mb-4">Our Products</div>
        <iframe width="100%" height="350" className="rounded-lg mb-4" src="https://www.youtube.com/embed/NLN0R8RXLmA?si=i-omFJ2dooiaxbRx" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <div className="text-base leading-7 mb-4">
          Our range of products is designed to provide superior performance, reliability, and efficiency across various industries. We offer customizable solutions to ensure our products align perfectly with our clients' operational needs. Our commitment to excellence drives us to continually improve and refine our designs, ensuring every product incorporates the latest technological advancements and highest industry standards.
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-8 my-6 max-w-3xl w-full">
        <div className="text-orange-500 font-semibold text-xl mb-4">Our Team</div>
        <img src="/about-us-9.jpeg" alt="Our Team" className="w-full max-w-xs rounded-lg my-4 object-cover" />
        <div className="text-base leading-7 mb-4">
          At the heart of our success lies our exceptional team, built on the core values of collaboration, integrity, and expertise. We foster a work environment that nurtures growth, creativity, and innovation. Our team works collaboratively, sharing knowledge and expertise to deliver results that exceed expectations and provide innovative solutions for our clients.
        </div>
      </div>
    </div>
  );
};

export default About;
