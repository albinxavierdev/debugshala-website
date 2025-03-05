'use client';

import { useState } from 'react';

const ExpertCard = ({ name, role, company, image, topics, date }) => {
  return (
    <div className="card flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-200">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      </div>
      <div className="w-full md:w-2/3">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-gray-600 mb-3">{role} at {company}</p>
        
        <div className="mb-3">
          <h4 className="font-semibold text-gray-700 mb-1">Topics Covered:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4 flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {date}
        </div>
        
        <div className="flex gap-2">
          <button className="btn-primary text-sm px-4 py-2">
            Watch Recording
          </button>
          <button className="border border-[var(--primary)] text-[var(--primary)] px-4 py-2 rounded-md hover:bg-[var(--primary)] hover:text-white transition-all duration-300 text-sm">
            View Resources
          </button>
        </div>
      </div>
    </div>
  );
};

const ExpertSessionsSection = () => {
  const [filter, setFilter] = useState('all');
  
  // Example expert sessions - replace with actual data
  const expertSessions = [
    {
      name: "Vikram Singh",
      role: "Senior Software Engineer",
      company: "Google",
      image: "/images/placeholder.svg",
      topics: [
        "System Design Fundamentals",
        "Scalable Architecture",
        "Design Patterns"
      ],
      date: "February 15, 2025",
      category: "webdev"
    },
    {
      name: "Ananya Desai",
      role: "AI Researcher",
      company: "OpenAI",
      image: "/images/placeholder.svg",
      topics: [
        "Large Language Models",
        "Generative AI Applications",
        "Prompt Engineering"
      ],
      date: "January 28, 2025",
      category: "datascience"
    },
    {
      name: "Rajat Verma",
      role: "Engineering Manager",
      company: "Microsoft",
      image: "/images/placeholder.svg",
      topics: [
        "Career Growth in Tech",
        "Building Engineering Teams",
        "Technical Leadership"
      ],
      date: "January 10, 2025",
      category: "career"
    },
    {
      name: "Meera Iyer",
      role: "Data Science Lead",
      company: "Flipkart",
      image: "/images/placeholder.svg",
      topics: [
        "ML in E-commerce",
        "Recommendation Systems",
        "A/B Testing"
      ],
      date: "December 22, 2024",
      category: "datascience"
    }
  ];
  
  const filteredSessions = filter === 'all' 
    ? expertSessions 
    : expertSessions.filter(session => session.category === filter);

  return (
    <section id="expert-sessions" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="section-heading text-center">Expert Sessions</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Learn directly from industry professionals through our expert sessions. 
          Gain insights into real-world applications and career opportunities.
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-200 rounded-lg">
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === 'all' 
                  ? 'bg-white text-[var(--primary)] shadow-md' 
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
              onClick={() => setFilter('all')}
            >
              All Sessions
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === 'webdev' 
                  ? 'bg-white text-[var(--primary)] shadow-md' 
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
              onClick={() => setFilter('webdev')}
            >
              Web Development
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === 'datascience' 
                  ? 'bg-white text-[var(--primary)] shadow-md' 
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
              onClick={() => setFilter('datascience')}
            >
              Data Science
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filter === 'career' 
                  ? 'bg-white text-[var(--primary)] shadow-md' 
                  : 'text-gray-600 hover:text-[var(--primary)]'
              }`}
              onClick={() => setFilter('career')}
            >
              Career Growth
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {filteredSessions.map((session, index) => (
            <ExpertCard key={index} {...session} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="btn-secondary">
            View All Expert Sessions
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExpertSessionsSection;
