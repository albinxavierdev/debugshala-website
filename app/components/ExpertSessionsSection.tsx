'use client';

import { useState } from 'react';

const ExpertCard = ({ name, linkedInPostUrl, linkedInEmbedSrc, category }) => {
  return (
    <div className="linkedin-post-card-small shadow-md hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden h-full flex flex-col">
      <div className="linkedin-embed-small relative flex-grow">
        <iframe 
          src={linkedInEmbedSrc}
          width="100%"
          height="100%"
          frameBorder="0" 
          allowFullScreen 
          title="Embedded post"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
      <div className="p-3 bg-white flex items-center justify-between">
        <h3 className="text-sm font-medium truncate">{name}</h3>
        <a 
          href={linkedInPostUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary text-xs px-3 py-1 whitespace-nowrap"
        >
          View on LinkedIn
        </a>
      </div>
    </div>
  );
};

const ExpertSessionsSection = () => {
  const [filter, setFilter] = useState('all');
  
  // Keep only LinkedIn posts
  const expertSessions = [
    {
      name: "Blockchain 2025: The Future of Web3",
      category: "webdev",
      linkedInPostUrl: "https://www.linkedin.com/posts/debugshala_blockchain2025-web3-blockchaintechnology-activity-7302667017688424448",
      linkedInEmbedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7302667017688424448",
    },
    {
      name: "Career Opportunities in Full Stack Development",
      category: "career",
      linkedInPostUrl: "https://www.linkedin.com/feed/update/urn:li:share:7301131790847541249",
      linkedInEmbedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7301131790847541249",
    },
    {
      name: "Data Science and Machine Learning Projects",
      category: "datascience",
      linkedInPostUrl: "https://www.linkedin.com/feed/update/urn:li:share:7299025032616284160",
      linkedInEmbedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7299025032616284160",
    },
    {
      name: "Web Development Best Practices",
      category: "webdev",
      linkedInPostUrl: "https://www.linkedin.com/feed/update/urn:li:share:7298369297289027585",
      linkedInEmbedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7298369297289027585",
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

        {/* 3-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session, index) => (
            <ExpertCard 
              key={index} 
              {...session} 
            />
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
