import React from 'react';
import { Mail, Phone, MapPin, Award, Users, Target, Eye, Wrench, Shield, Globe, Zap, Droplet, ChevronRight, Star, CheckCircle, ArrowUp } from 'lucide-react';

const colors = {
  primary: '#ff4300',
  secondary: '#ff6b35',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden text-white">
      {/* Animated Background (static) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute w-60 h-60 xs:w-72 xs:h-72 sm:w-96 sm:h-96 rounded-full opacity-10 animate-pulse"
          style={{
            background: 'radial-gradient(circle, #ff4300, transparent)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
      {/* Additional Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 xs:h-24 sm:h-32 bg-gradient-to-t from-primary/10 to-transparent z-0"></div>
      <div className="absolute top-0 right-0 w-40 xs:w-52 sm:w-64 h-40 xs:h-52 sm:h-64 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl z-0"></div>
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 67, 0, 0.1);
        }
      `}</style>

      {/* Header Section (exact replica of Contact) */}
      <div className="relative h-[160px] xs:h-[200px] sm:h-[220px] md:h-[300px] lg:h-[350px] w-full mb-8 sm:mb-12 overflow-hidden animate-pulse-glow">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/contact.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.8)',
          }}
        />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-black/50 to-black" />
        <div className="relative z-10 flex items-center justify-center h-full px-2">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 text-left ">
            About <span className="text-primary ">Hydroplus</span> International
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Company Overview */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">Our Story</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Hydroplus International stands as a beacon of innovation in the water solutions industry. 
              With over two decades of unwavering commitment to excellence, we have evolved from a 
              visionary startup to a globally recognized leader in manufacturing and supplying premium 
              pumps, motors, and power tools.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Our journey is marked by continuous innovation, exceptional quality, and an unrelenting 
              focus on customer satisfaction. Today, we serve thousands of clients worldwide, delivering 
              solutions that power industries and enhance lives.
            </p>
          </div>
        </div>

        {/* Achievements Counter (static) */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="glass-effect rounded-2xl p-6 md:p-8">
                <div className="mb-4 flex justify-center" style={{ color: colors.primary }}><Award className="w-5 h-5" /></div>
                <div className="text-3xl md:text-4xl font-bold mb-2 gradient-text">5+</div>
                <div className="text-gray-600 text-sm md:text-base font-medium">Years Experience</div>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-2xl p-6 md:p-8">
                <div className="mb-4 flex justify-center" style={{ color: colors.primary }}><Users className="w-5 h-5" /></div>
                <div className="text-3xl md:text-4xl font-bold mb-2 gradient-text">30+</div>
                <div className="text-gray-600 text-sm md:text-base font-medium">Team Members</div>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-2xl p-6 md:p-8">
                <div className="mb-4 flex justify-center" style={{ color: colors.primary }}><Wrench className="w-5 h-5" /></div>
                <div className="text-3xl md:text-4xl font-bold mb-2 gradient-text">50+</div>
                <div className="text-gray-600 text-sm md:text-base font-medium">SKUs</div>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-2xl p-6 md:p-8">
                <div className="mb-4 flex justify-center" style={{ color: colors.primary }}><Star className="w-5 h-5" /></div>
                <div className="text-3xl md:text-4xl font-bold mb-2 gradient-text">1000+</div>
                <div className="text-gray-600 text-sm md:text-base font-medium">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision (static) */}
        <div className="mb-20 grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="glass-effect rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 mr-4" style={{ color: colors.primary }} />
              <h3 className="text-2xl font-bold gradient-text">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To revolutionize the water and power solutions industry by delivering innovative, 
              reliable, and sustainable products that exceed customer expectations while 
              contributing to global progress and environmental stewardship.
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 mr-4" style={{ color: colors.primary }} />
              <h3 className="text-2xl font-bold gradient-text">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be the world's most trusted and innovative leader in water and power solutions, 
              setting new industry standards while fostering sustainable development and 
              empowering communities globally.
            </p>
          </div>
        </div>

        {/* Our Services (static) */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Our Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-2xl p-8">
              <div className="mb-6" style={{ color: colors.primary }}><Droplet className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold mb-4 gradient-text">Water Pumps</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                High-efficiency water pumps for residential, commercial and industrial applications.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />Submersible Pumps</li>
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />Centrifugal Pumps</li>
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />Pressure Booster Pumps</li>
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />Solar Water Pumps</li>
              </ul>
            </div>
            <div className="glass-effect rounded-2xl p-8">
              <div className="mb-6" style={{ color: colors.primary }}><Zap className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold mb-4 gradient-text">Motors & Drives</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Reliable motors and drive systems engineered for optimal performance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />AC Motors</li>
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />DC Motors</li>
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />Variable Drives</li>
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />Motor Controllers</li>
              </ul>
            </div>
            <div className="glass-effect rounded-2xl p-8">
              <div className="mb-6" style={{ color: colors.primary }}><Wrench className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold mb-4 gradient-text">Power Tools</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Professional-grade power tools for various industrial applications.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />High-Pressure Washers</li>
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />Air Compressors</li>
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />Welding Equipment</li>
                <li className="flex items-center text-sm text-gray-500"><ChevronRight className="w-4 h-4 mr-2" style={{ color: colors.primary }} />Cutting Tools</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values (static) */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="glass-effect rounded-xl p-6">
                <div className="mb-4 flex justify-center" style={{ color: colors.primary }}><Target className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold mb-3 gradient-text">Innovation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Continuously advancing technology to deliver cutting-edge solutions.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-xl p-6">
                <div className="mb-4 flex justify-center" style={{ color: colors.primary }}><Shield className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold mb-3 gradient-text">Quality</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Uncompromising commitment to excellence in every product we manufacture.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-xl p-6">
                <div className="mb-4 flex justify-center" style={{ color: colors.primary }}><CheckCircle className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold mb-3 gradient-text">Reliability</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Building trust through consistent performance and dependable service.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-xl p-6">
                <div className="mb-4 flex justify-center" style={{ color: colors.primary }}><Globe className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold mb-3 gradient-text">Sustainability</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Creating eco-friendly solutions for a sustainable future.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us (static) */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Why Choose Hydroplus</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="glass-effect rounded-xl p-6 h-full">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}><Shield className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-center mb-3 gradient-text">Trusted & Certified</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">ISO 9001:2015 certified, 25+ years of trust in water and air solutions.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-xl p-6 h-full">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}><Wrench className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-center mb-3 gradient-text">Expertise & Support</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">Professional team, 750+ SKUs, and strong dealer education.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-xl p-6 h-full">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}><Globe className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-center mb-3 gradient-text">Wide Product Range</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">Specializing in high-pressure washers, air compressors, and more.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-xl p-6 h-full">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}><Zap className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-center mb-3 gradient-text">Global Presence</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">Products available worldwide, easy access to parts & support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Video (static) */}
        {/* <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-6 gradient-text">Experience Hydroplus</h3>
            <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                className="absolute inset-0 rounded-lg" 
                src="https://www.youtube.com/embed/NLN0R8RXLmA?si=i-omFJ2dooiaxbRx" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          </div>
        </div> */}

        {/* Founder's Message (static) */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-effect rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Message from Our Founder</h3>
            <blockquote className="text-lg text-gray-700 italic mb-8 leading-relaxed">
              "At Hydroplus, we don't just manufacture products – we craft solutions that transform lives. 
              Our commitment extends beyond delivering exceptional quality; we're dedicated to saving your 
              time, money, and energy through innovative engineering and unparalleled service."
            </blockquote>
            <div className="space-y-2">
              <div className="gradient-text font-bold text-lg">Warm Regards,</div>
              <div className="text-gray-800 font-semibold text-xl">Aardip Jogani</div>
              <div className="text-gray-500 text-sm">Founder & CEO, Hydroplus International</div>
            </div>
          </div>
        </div>

        {/* Team Section (static) */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Meet Our Leadership</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="glass-effect rounded-2xl p-6">
                <div className="relative mb-6">
                  <img 
                    src="/admin.png" 
                    alt="Divesh Ramchandani" 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto shadow-lg" 
                    style={{ border: `3px solid ${colors.primary}40` }}
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 gradient-text">Aardip jogani</h3>
                <div className="text-sm font-semibold mb-2" style={{ color: colors.primary }}>CEO & Founder</div>
                <div className="text-xs mb-3" style={{ color: colors.secondary }}>Strategic Leadership</div>
                <p className="text-gray-600 text-sm leading-relaxed">Visionary leader with 15+ years in water solutions.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-2xl p-6">
                <div className="relative mb-6">
                  <img 
                    src="/about-us-2.jpg" 
                    alt="S Mishra" 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto shadow-lg" 
                    style={{ border: `3px solid ${colors.primary}40` }}
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 gradient-text">S Mishra</h3>
                <div className="text-sm font-semibold mb-2" style={{ color: colors.primary }}>UI Developer</div>
                <div className="text-xs mb-3" style={{ color: colors.secondary }}>Digital Innovation</div>
                <p className="text-gray-600 text-sm leading-relaxed">Designs seamless digital experiences for our clients.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-2xl p-6">
                <div className="relative mb-6">
                  <img 
                    src="/about-us-3.jpeg" 
                    alt="Y M Parmar" 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto shadow-lg" 
                    style={{ border: `3px solid ${colors.primary}40` }}
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 gradient-text">Y M Parmar</h3>
                <div className="text-sm font-semibold mb-2" style={{ color: colors.primary }}>Developer</div>
                <div className="text-xs mb-3" style={{ color: colors.secondary }}>System Architecture</div>
                <p className="text-gray-600 text-sm leading-relaxed">Builds robust, scalable systems for HydroPlus.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="glass-effect rounded-2xl p-6">
                <div className="relative mb-6">
                  <img 
                    src="/about-us-7.jpg" 
                    alt="Lisa Wang" 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto shadow-lg" 
                    style={{ border: `3px solid ${colors.primary}40` }}
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 gradient-text">Lisa Wang</h3>
                <div className="text-sm font-semibold mb-2" style={{ color: colors.primary }}>Operations</div>
                <div className="text-xs mb-3" style={{ color: colors.secondary }}>Quality Assurance</div>
                <p className="text-gray-600 text-sm leading-relaxed">Ensures smooth operations and customer satisfaction.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section (static) */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Get in Touch</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <a 
                href="mailto:contact.hydroplusinternational@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center p-4 rounded-xl"
                style={{ backgroundColor: `${colors.primary}08` }}
              >
                <div 
                  className="w-10 h-10 flex items-center justify-center rounded-full shadow-lg mb-3 text-white"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div className="gradient-text font-semibold mb-1">Email</div>
                <div className="text-gray-600 text-sm text-center leading-snug">contact.hydroplusinternational@gmail.com</div>
              </a>
              <a 
                href="tel:+918000074088" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center p-4 rounded-xl"
                style={{ backgroundColor: `${colors.primary}08` }}
              >
                <div 
                  className="w-10 h-10 flex items-center justify-center rounded-full shadow-lg mb-3 text-white"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div className="gradient-text font-semibold mb-1">Phone</div>
                <div className="text-gray-600 text-sm text-center leading-snug">+91 8000074088</div>
              </a>
              <a 
                href="https://goo.gl/maps/2w1vQw8Qw8Qw8Qw8A" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center p-4 rounded-xl"
                style={{ backgroundColor: `${colors.primary}08` }}
              >
                <div 
                  className="w-10 h-10 flex items-center justify-center rounded-full shadow-lg mb-3 text-white"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="gradient-text font-semibold mb-1">Location</div>
                <div className="text-gray-600 text-sm text-center leading-snug">Surat, Gujarat, India</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}