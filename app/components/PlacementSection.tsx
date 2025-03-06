'use client';

import { useEffect } from 'react';

const PlacementSection = () => {
  // Instagram posts script loading
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    // Process Instagram embeds after script loads
    script.onload = () => {
      if (window && (window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };
    
    // Clean up on unmount
    return () => {
      // Find and remove the script
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('instagram.com/embed.js')) {
          document.body.removeChild(scripts[i]);
          break;
        }
      }
    };
  }, []);

  // YouTube shorts details
  const youtubeShorts = [
    {
      id: "CDGQkEQOyhY",
      title: "Success Story: Web Development"
    },
    {
      id: "7vVHNrU80Eg",
      title: "Success Story: Data Science"
    },
    {
      id: "_QYcA4NNdZk",
      title: "Success Story: Full Stack Developer"
    },
    {
      id: "XzSRJoRRPOQ",
      title: "Success Story: React Development"
    },
    {
      id: "jtnqF5WOIH0",
      title: "Success Story: Cloud Engineer"
    },
    {
      id: "BxrD6k2is0M",
      title: "Success Story: AI/ML Engineer"
    }
  ];

  return (
    <section id="placement" className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="section-heading text-center">Success Stories</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear directly from our students who have successfully launched their tech careers after training with us.
        </p>

        {/* Video Testimonials Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Student Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {youtubeShorts.map((video, index) => (
              <div key={index} className="youtube-shorts-card">
                <iframe 
                  className="rounded-xl shadow-lg w-full aspect-[9/16]"
                  src={`https://youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
                <h4 className="font-medium text-lg mt-3 text-center">{video.title}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-3 text-white">Our Placement Record</h3>
              <p className="text-white/80 mb-4">
                We&apos;ve helped hundreds of students land their dream jobs at top tech companies. 
                Our placement assistance program ensures you&apos;re prepared for the interview process.
              </p>
              <button className="bg-white text-[var(--primary)] px-6 py-3 rounded-md font-bold hover:bg-opacity-90 transition-all shadow-md">
                View All Placements
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-inner">
                <h4 className="text-3xl font-bold text-white">500+</h4>
                <p className="text-white/80">Students Placed</p>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-inner">
                <h4 className="text-3xl font-bold text-white">50+</h4>
                <p className="text-white/80">Hiring Partners</p>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-inner">
                <h4 className="text-3xl font-bold text-white">₹24L</h4>
                <p className="text-white/80">Highest Package</p>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-inner">
                <h4 className="text-3xl font-bold text-white">₹12L</h4>
                <p className="text-white/80">Average Package</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementSection;
