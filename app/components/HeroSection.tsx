'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'data-science',
  });
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const typeWriterTexts = ['Java_Developer', 'MERN_Developer', 'Data_Scientist', 'Data_Engineer'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % typeWriterTexts.length);
    }, 4000); // Change every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry! We will contact you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: 'data-science',
    });
  };

  return (
    <section className="pt-28 pb-20 relative overflow-hidden gradient-bg">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="relative responsive-container z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Column - Hero Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Become a
              <span className="block text-[var(--secondary)] typewriter-effect">
                {typeWriterTexts[currentTextIndex]}
              </span>
            </h1>
            
            <p className="text-white/90 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Unlock your potential with DebugShala, Indore's premier training and placement institute. 
              Elevate your career with our expert-led courses and guaranteed placement assistance.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="mr-3 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-white/70 text-xs">Students Enrolled</p>
                  <p className="text-white font-bold">5000+</p>
                </div>
              </div>
              
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="mr-3 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-white/70 text-xs">Placement Rate</p>
                  <p className="text-white font-bold">95%</p>
                </div>
              </div>
              
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="mr-3 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-white/70 text-xs">Practical Training</p>
                  <p className="text-white font-bold">100%</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link href="#courses" className="btn-secondary">
                Explore Courses
              </Link>
              <Link href="#about" className="btn-ghost">
                About DebugShala
              </Link>
            </div>
          </div>
          
          {/* Right Column - Enquiry Form */}
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
            <div className="bg-white rounded-xl shadow-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-[var(--dark)] mb-6 text-center">
                Get Course Information
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name" 
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address" 
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number" 
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="course" className="form-label">
                    Select Course
                  </label>
                  <select 
                    id="course" 
                    name="course" 
                    value={formData.course}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="data-science">Data Science</option>
                    <option value="mern-stack">MERN Stack Development</option>
                    <option value="java-web">Java Web Development</option>
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full flex items-center justify-center mt-6"
                >
                  Submit Enquiry
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </form>
              
              <div className="mt-6 text-center text-[var(--gray-dark)] text-sm">
                <p>
                  Or call us directly at{' '}
                  <a href="tel:+918982385539" className="text-[var(--primary)] font-medium hover:underline">
                    +91 89823 85539
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
