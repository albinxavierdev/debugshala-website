'use client';

import { useState } from 'react';
import Image from 'next/image';

const CommunityPost = ({ image, title, description, date, likes, category }) => {
  return (
    <div className="card overflow-hidden group">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4 bg-gray-200">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute top-4 right-4 bg-white text-[var(--primary)] px-3 py-1 rounded-full text-sm font-semibold">
          {category}
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-3 text-sm">{description}</p>
      
      <div className="flex justify-between items-center text-sm">
        <div className="text-gray-500">{date}</div>
        <div className="flex items-center">
          <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          {likes}
        </div>
      </div>
    </div>
  );
};

const CommunitySection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Example community posts - replace with actual data
  const communityPosts = [
    {
      image: "/images/placeholder.svg",
      title: "Annual Company Outing to Mandu",
      description: "Team DebugShala having fun and building connections at our annual retreat in Mandu.",
      date: "Feb, 2025",
      likes: 245,
      category: "Team Building"
    },
    {
      image: "/images/placeholder.svg",
      title: "Diwali Celebrations at the Office",
      description: "Festivities, lights and joy at our office during Diwali. Celebrating the festival of lights together.",
      date: "Nov, 2024",
      likes: 186,
      category: "Celebrations"
    },
    {
      image: "/images/placeholder.svg",
      title: "Behind the Scenes: Creating Yukti AI",
      description: "Our developers working tirelessly to build and refine Yukti, our AI assistant for students.",
      date: "Jan, 2025",
      likes: 312,
      category: "Innovation"
    },
    {
      image: "/images/placeholder.svg",
      title: "Weekly Code Review Sessions",
      description: "A glimpse into our weekly code review sessions where we collaborate and enhance our skills.",
      date: "Feb, 2025",
      likes: 129,
      category: "Learning"
    },
    {
      image: "/images/placeholder.svg",
      title: "Celebrating Student Achievements",
      description: "Felicitation ceremony for our students who secured top positions in competitive coding challenges.",
      date: "Dec, 2024",
      likes: 278,
      category: "Achievements"
    },
    {
      image: "/images/placeholder.svg",
      title: "Friday Fun Activities",
      description: "Team bonding through fun games and activities every Friday at DebugShala.",
      date: "Jan, 2025",
      likes: 197,
      category: "Team Building"
    },
    {
      image: "/images/placeholder.svg",
      title: "Workshop Preparation Day",
      description: "Our team meticulously preparing content and resources for the upcoming workshops.",
      date: "Mar, 2025",
      likes: 154,
      category: "BTS"
    },
    {
      image: "/images/placeholder.svg",
      title: "Mentorship Sessions in Action",
      description: "Instructors providing one-on-one guidance to students on their projects.",
      date: "Feb, 2025",
      likes: 223,
      category: "Learning"
    }
  ];
  
  const filteredPosts = activeFilter === 'all' 
    ? communityPosts 
    : communityPosts.filter(post => post.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="community" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="section-heading text-center">Community & Behind The Scenes</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Get a glimpse into the DebugShala community and the people who make it special. 
          Discover the culture, celebrations, and everyday moments at our campus.
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12 flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full border ${
              activeFilter === 'all' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${
              activeFilter === 'team building' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('team building')}
          >
            Team Building
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${
              activeFilter === 'celebrations' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('celebrations')}
          >
            Celebrations
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${
              activeFilter === 'learning' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('learning')}
          >
            Learning
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${
              activeFilter === 'bts' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('bts')}
          >
            Behind The Scenes
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${
              activeFilter === 'achievements' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('achievements')}
          >
            Achievements
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post, index) => (
            <CommunityPost key={index} {...post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="https://www.instagram.com/debugshala/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[var(--primary)] font-semibold hover:underline">
            Follow us on Instagram for more updates
            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
