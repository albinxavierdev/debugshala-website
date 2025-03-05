'use client';

import { useState } from 'react';

const WorkshopCard = ({ title, date, location, image, attendees, description, isUpcoming = false }) => {
  return (
    <div className="card overflow-hidden group">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(${image})` }}
        />
        {isUpcoming && (
          <div className="absolute top-4 right-4 bg-[var(--secondary)] text-white px-3 py-1 rounded-full text-sm font-semibold">
            Upcoming
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      
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
        
        <button className={`${isUpcoming ? 'btn-secondary' : 'btn-primary'} text-sm px-4 py-2`}>
          {isUpcoming ? 'Register Now' : 'View Details'}
        </button>
      </div>
    </div>
  );
};

const CollegeEvent = ({ college, date, event, image }) => {
  return (
    <div className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="w-16 h-16 relative rounded-lg overflow-hidden mr-4 flex-shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div>
        <h3 className="font-semibold">{college}</h3>
        <p className="text-gray-600 text-sm">{event}</p>
        <p className="text-gray-500 text-xs">{date}</p>
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
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our specialized workshops and college events to enhance your skills and connect with like-minded individuals.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-200 rounded-lg">
            <button
              className={`px-6 py-3 rounded-lg ${
                activeTab === 'workshops' 
                  ? 'bg-white text-[var(--primary)] shadow-md' 
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
              onClick={() => setActiveTab('workshops')}
            >
              Workshops
            </button>
            <button
              className={`px-6 py-3 rounded-lg ${
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

        {activeTab === 'workshops' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workshops.map((workshop, index) => (
              <WorkshopCard key={index} {...workshop} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collegeEvents.map((event, index) => (
              <CollegeEvent key={index} {...event} />
            ))}
          </div>
        )}

        <div className="mt-12 bg-gray-100 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-3 text-[var(--primary)]">Lifetime Workshop Access</h3>
              <p className="text-gray-600 mb-4">
                Get lifetime access to all DebugShala workshops, recordings, and resources for just ₹999.
              </p>
              <button className="btn-secondary">
                Get Lifetime Access
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-auto">
              <div className="text-center">
                <span className="text-gray-500 line-through text-lg">₹4,999</span>
                <h4 className="text-3xl font-bold text-[var(--primary)]">₹999</h4>
                <p className="text-gray-600">One-time payment</p>
                <p className="text-[var(--secondary)] mt-2 font-semibold">80% Discount</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopsSection;
