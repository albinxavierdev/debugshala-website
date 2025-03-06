'use client';

import { useState } from 'react';

const LinkedInPostCard = ({ title, linkedInPostUrl, linkedInEmbedSrc, isCompact }) => {
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
        <h3 className="text-sm font-medium truncate">{title}</h3>
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

const WorkshopsSection = () => {
  const [activeTab, setActiveTab] = useState('workshops');
  
  // LinkedIn workshop posts
  const workshopPosts = [
    {
      title: "Web Development Workshop",
      linkedInPostUrl: "https://www.linkedin.com/posts/debugshala_webdevelopment-fullstack-reactjs-activity-7289537226349473792",
      linkedInEmbedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7289537224306475011",
      isCompact: false
    },
    {
      title: "Data Science Workshop Series",
      linkedInPostUrl: "https://www.linkedin.com/posts/debugshala_datascience-machinelearning-aiworkshop-activity-7293618208396374017",
      linkedInEmbedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7293618206546501632",
      isCompact: false
    },
    {
      title: "Career Readiness Workshop",
      linkedInPostUrl: "https://www.linkedin.com/posts/debugshala_careerreadiness-jobopenings-skills-activity-7241422472460713984",
      linkedInEmbedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7241422471155875840",
      isCompact: false
    }
  ];
  
  // LinkedIn college event posts
  const collegeEventPosts = [
    {
      title: "IIT Indore Tech Fest",
      linkedInPostUrl: "https://www.linkedin.com/posts/debugshala_webdevelopment-fullstack-reactjs-activity-7289537226349473792",
      linkedInEmbedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7289537224306475011",
      isCompact: false
    },
    {
      title: "DAVV University Placement Drive",
      linkedInPostUrl: "https://www.linkedin.com/posts/debugshala_davvuniversity-placementdrive-debugshala-activity-7292887686112907264",
      linkedInEmbedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:share:7292887684216168448",
      isCompact: false
    },
    {
      title: "Career Development Program",
      linkedInPostUrl: "https://www.linkedin.com/posts/debugshala_careerreadiness-jobopenings-skills-activity-7241422472460713984",
      linkedInEmbedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7241422471155875840",
      isCompact: false
    }
  ];

  return (
    <section id="workshops" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="section-heading text-center">Workshops & College Events</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
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

        {/* Content - Updated grid to match ExpertSessions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'workshops' && 
            workshopPosts.map((post, index) => (
              <LinkedInPostCard 
                key={index} 
                {...post} 
              />
            ))
          }
          
          {activeTab === 'college' && 
            collegeEventPosts.map((post, index) => (
              <LinkedInPostCard 
                key={index} 
                {...post} 
              />
            ))
          }
        </div>

        <div className="mt-12 text-center">
          <button className="btn-secondary">
            View All {activeTab === 'workshops' ? 'Workshops' : 'College Events'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkshopsSection;