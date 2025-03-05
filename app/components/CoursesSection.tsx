'use client';

import { useState } from 'react';
import Image from 'next/image';

const CourseCard = ({ 
  title, 
  description, 
  duration, 
  features, 
  price, 
  isPopular = false 
}) => {
  return (
    <div className={`relative card border transition-all duration-300 hover:shadow-lg ${isPopular ? 'border-[var(--secondary)]' : 'border-gray-200'}`}>
      {isPopular && (
        <div className="absolute -top-4 -right-4 bg-[var(--secondary)] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-[var(--gray-dark)] mb-4">{description}</p>
      <div className="flex items-center mb-4">
        <svg className="w-5 h-5 text-[var(--secondary)] mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span className="text-[var(--gray-dark)]">{duration}</span>
      </div>
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[var(--gray-dark)]">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="text-2xl font-bold mb-4 text-[var(--primary)]">{price}</div>
      <button className={`w-full ${isPopular ? 'btn-primary' : 'btn-tertiary'}`}>
        Enroll Now
      </button>
    </div>
  );
};

const CoursesSection = () => {
  const [activeTab, setActiveTab] = useState('fullstack');

  return (
    <section id="courses" className="section bg-gray-50">
      <div className="responsive-container">
        <h2 className="section-heading">Our Specialized Courses</h2>
        <p className="section-subheading">
          Choose from our industry-focused courses designed to fast-track your career in tech. 
          Gain practical skills and get placed in top companies.
        </p>

        {/* Course Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-200 rounded-lg">
            <button
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === 'fullstack' 
                  ? 'bg-white text-[var(--primary)] shadow-md' 
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
              onClick={() => setActiveTab('fullstack')}
            >
              Full Stack Web Development
            </button>
            <button
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === 'datascience' 
                  ? 'bg-white text-[var(--primary)] shadow-md' 
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
              onClick={() => setActiveTab('datascience')}
            >
              Data Science with AI
            </button>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === 'fullstack' ? (
            <>
              <CourseCard 
                title="MERN Stack Development"
                description="Master MongoDB, Express.js, React, and Node.js to build modern web applications."
                duration="6 Months (Weekday/Weekend Batches)"
                features={[
                  "Hands-on project-based learning",
                  "Industry expert mentorship",
                  "Real-world applications development",
                  "100% placement assistance",
                  "Portfolio development"
                ]}
                price="₹49,999"
                isPopular={true}
              />
              <CourseCard 
                title="Java Web Development"
                description="Learn Java, Spring Boot, Hibernate, and modern web frameworks"
                duration="6 Months (Weekday/Weekend Batches)"
                features={[
                  "Enterprise application development",
                  "Database design & optimization",
                  "RESTful APIs implementation",
                  "Industry recognized certification",
                  "Live project experience"
                ]}
                price="₹45,999"
              />
              <CourseCard 
                title="Frontend Development"
                description="Focus on modern UI/UX with React, Redux, and advanced CSS"
                duration="4 Months (Weekday/Weekend Batches)"
                features={[
                  "Modern UI frameworks & libraries",
                  "State management techniques",
                  "Responsive design principles",
                  "Performance optimization",
                  "UX/UI design fundamentals"
                ]}
                price="₹29,999"
              />
            </>
          ) : (
            <>
              <CourseCard 
                title="Data Science with Python"
                description="Master data analysis, machine learning, and AI technologies with Python"
                duration="6 Months (Weekday/Weekend Batches)"
                features={[
                  "Statistics & probability fundamentals",
                  "Machine learning algorithms",
                  "Deep learning & neural networks",
                  "Natural language processing",
                  "Data visualization & storytelling"
                ]}
                price="₹49,999"
                isPopular={true}
              />
              <CourseCard 
                title="AI Engineering"
                description="Specialized training in artificial intelligence and application development"
                duration="6 Months (Weekday/Weekend Batches)"
                features={[
                  "Deep learning architectures",
                  "Computer vision applications",
                  "Generative AI & LLMs",
                  "AI product development",
                  "MLOps & deployment"
                ]}
                price="₹54,999"
              />
              <CourseCard 
                title="Data Engineering"
                description="Learn to build robust data pipelines and infrastructure for big data"
                duration="5 Months (Weekday/Weekend Batches)"
                features={[
                  "Big data technologies",
                  "Data warehouse design",
                  "ETL pipelines implementation",
                  "Data modeling & architecture",
                  "Cloud data solutions"
                ]}
                price="₹45,999"
              />
            </>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[var(--gray-dark)] mb-4">Not sure which course is right for you?</p>
          <button className="btn-tertiary">
            Book a Free Career Counseling Session
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
