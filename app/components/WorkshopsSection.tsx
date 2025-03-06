'use client';

import { useState } from 'react';

const WorkshopCard = ({ title, date, location, image, attendees, description, isUpcoming = false }) => {
  return (
    <div className="card overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(${image || '/images/placeholder.svg'})` }}
        />
        {isUpcoming && (
          <div className="absolute top-4 right-4 bg-[var(--secondary)] text-white px-3 py-1 rounded-full text-sm font-semibold">
            Upcoming
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-1 group-hover:text-[var(--primary)] transition-colors duration-300">{title}</h3>
      
      <div className="flex items-center text-gray-600 mb-2">
        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        {date}
      </div>
      
      <div className="flex items-center text-gray-600 mb-3">
        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        {location}
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-[var(--primary)] mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span>{attendees}+ Attendees</span>
        </div>
        
        <button className={`${isUpcoming ? 'btn-secondary' : 'btn-primary'} text-sm px-4 py-2 transition-all duration-300 hover:shadow-md`}>
          {isUpcoming ? 'Register Now' : 'View Details'}
        </button>
      </div>
    </div>
  );
};

const CollegeEvent = ({ college, date, event, image }) => {
  return (
    <div className="card overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(${image || '/images/placeholder.svg'})` }}
        />
      </div>
      
      <h3 className="text-xl font-bold mb-1 group-hover:text-[var(--primary)] transition-colors duration-300">{college}</h3>
      
      <div className="flex items-center text-gray-600 mb-2">
        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        {date}
      </div>
      
      <div className="flex items-center text-gray-600 mb-3">
        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M12 6.253v13h-8v-8.127c.496.097.912.319 1.23.667.573.62 1.056 1.436 1.377 2.209.276.667.5 1.418.695 2.251h4.096v-2h1v2h.465c.195-.833.419-1.584.695-2.251.321-.773.804-1.589 1.376-2.209.319-.348.734-.57 1.231-.667V6.253H12zm1-1H7v1h6V5.253zM12.382 3a3.976 3.976 0 0 0-.382-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3h-.618z" />
        </svg>
        {event}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-[var(--primary)] mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
          <span>Campus Event</span>
        </div>
        
        <button className="btn-primary text-sm px-4 py-2 transition-all duration-300 hover:shadow-md">
          View Details
        </button>
      </div>
    </div>
  );
};

const WorkshopsSection = () => {
  const [activeTab, setActiveTab] = useState('workshops');
  
  // Example workshops - replace with actual data
  const workshops = [
    {
      title: "Web Development Bootcamp",
      date: "March 15, 2025",
      location: "DebugShala Campus, Indore",
      image: "/images/placeholder.svg",
      attendees: 120,
      description: "Intensive hands-on workshop covering HTML, CSS, JavaScript, and modern frameworks.",
      isUpcoming: true
    },
    {
      title: "ML & AI Weekend Workshop",
      date: "February 22, 2025",
      location: "DebugShala Campus, Indore",
      image: "/images/placeholder.svg",
      attendees: 85,
      description: "Explore machine learning algorithms and AI applications through practical exercises."
    },
    {
      title: "System Design Masterclass",
      date: "January 18, 2025",
      location: "Online (Zoom)",
      image: "/images/placeholder.svg",
      attendees: 150,
      description: "Learn to design scalable systems and architecture for enterprise applications."
    },
    {
      title: "Hackathon: Build for Social Good",
      date: "December 10-12, 2024",
      location: "DebugShala Campus, Indore",
      image: "/images/placeholder.svg",
      attendees: 200,
      description: "48-hour hackathon focused on building solutions for social impact."
    }
  ];
  
  // Example college events - replace with actual data
  const collegeEvents = [
    {
      college: "IIT Indore",
      date: "February 15, 2025",
      event: "Tech Symposium 2025",
      image: "/images/placeholder.svg"
    },
    {
      college: "DAVV University",
      date: "January 20, 2025",
      event: "Career in Data Science Seminar",
      image: "/images/placeholder.svg"
    },
    {
      college: "SGSITS Indore",
      date: "December 18, 2024",
      event: "Web Development Workshop",
      image: "/images/placeholder.svg"
    },
    {
      college: "Acropolis Institute",
      date: "December 5, 2024",
      event: "AI in Healthcare Seminar",
      image: "/images/placeholder.svg"
    },
    {
      college: "Chameli Devi Group of Institutions",
      date: "November 30, 2024",
      event: "Programming Competition",
      image: "/images/placeholder.svg"
    },
    {
      college: "Medicaps University",
      date: "November 22, 2024",
      event: "Industry 4.0 Conference",
      image: "/images/placeholder.svg"
    }
  ];

  return (
    <section id="workshops" className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="section-heading text-center">Workshops & College Events</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Join our specialized workshops and college events to enhance your skills and connect with like-minded individuals.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-200 rounded-lg">
            <button
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === 'workshops' 
                  ? 'bg-white text-[var(--primary)] shadow-md' 
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
              onClick={() => setActiveTab('workshops')}
            >
              Workshops
            </button>
            <button
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === 'college' 
                  ? 'bg-white text-[var(--primary)] shadow-md' 
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
              onClick={() => setActiveTab('college')}
            >
              College Events
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="transition-opacity duration-300">
          {activeTab === 'workshops' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {workshops.map((workshop, index) => (
                <WorkshopCard 
                  key={index}
                  title={workshop.title}
                  date={workshop.date}
                  location={workshop.location}
                  image={workshop.image}
                  attendees={workshop.attendees}
                  description={workshop.description}
                  isUpcoming={workshop.isUpcoming}
                />
              ))}
            </div>
          )}
          
          {activeTab === 'college' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {collegeEvents.map((event, index) => (
                <CollegeEvent 
                  key={index}
                  college={event.college}
                  date={event.date}
                  event={event.event}
                  image={event.image}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="btn-secondary inline-flex items-center transition-all duration-300 hover:shadow-md group"
          >
            View All Events
            <svg 
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkshopsSection;