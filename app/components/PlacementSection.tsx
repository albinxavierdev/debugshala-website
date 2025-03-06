'use client';

import { useState, useRef, useEffect } from 'react';

const TestimonialCard = ({ name, role, company, salary, videoId, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200">
        {!isPlaying ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${thumbnail})` }}
            />
            <button 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--secondary)] text-white">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        ) : (
          <video 
            ref={videoRef} 
            src={`https://www.youtube.com/embed/${videoId}`} 
            controls 
            className="w-full h-full"
            onPause={() => setIsPlaying(false)}
          />
        )}
      </div>
      <h3 className="font-bold text-xl mb-1">{name}</h3>
      <p className="text-gray-600 mb-2">{role} at {company}</p>
      <p className="text-[var(--primary)] font-semibold">Package: {salary}</p>
    </div>
  );
};

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

  // Example testimonials - replace with actual data
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      company: "Microsoft",
      salary: "₹18 LPA",
      videoId: "example1",
      thumbnail: "/images/placeholder.svg"
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      company: "Amazon",
      salary: "₹22 LPA",
      videoId: "example2",
      thumbnail: "/images/placeholder.svg"
    },
    {
      name: "Arjun Mehta",
      role: "Full Stack Developer",
      company: "Flipkart",
      salary: "₹16 LPA",
      videoId: "example3",
      thumbnail: "/images/placeholder.svg"
    },
    {
      name: "Neha Gupta",
      role: "ML Engineer",
      company: "Google",
      salary: "₹25 LPA",
      videoId: "example4",
      thumbnail: "/images/placeholder.svg"
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
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6 text-center">Latest Student Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {/* YouTube Video Embeds */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <iframe 
                width="100%" 
                height="500px" 
                src="https://youtube.com/embed/CDGQkEQOyhY" 
                title="YouTube Testimonial" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <iframe 
                width="100%" 
                height="500px" 
                src="https://youtube.com/embed/7vVHNrU80Eg?si=Q8SBwxXc-W11nBJV" 
                title="YouTube Testimonial" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <iframe 
                width="100%" 
                height="500px" 
                src="https://youtube.com/embed/_QYcA4NNdZk?si=GCExMwHz9wtSw8fC" 
                title="YouTube Testimonial" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>

        {/* Testimonial Cards Section */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-8 text-center">Placement Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-[var(--primary)] to-[var(--dark-bg)] rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-3 text-black">Our Placement Record</h3>
              <p className="text-gray-600 mb-4">
                We&apos;ve helped hundreds of students land their dream jobs at top tech companies. 
                Our placement assistance program ensures you&apos;re prepared for the interview process.
              </p>
              <button className="bg-white text-[var(--primary)] px-6 py-3 rounded-md font-bold hover:bg-opacity-90 transition-all">
                View All Placements
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <h4 className="text-3xl font-bold text-[var(--secondary)]">500+</h4>
                <p className="text-gray-700">Students Placed</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <h4 className="text-3xl font-bold text-[var(--secondary)]">50+</h4>
                <p className="text-gray-700">Hiring Partners</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <h4 className="text-3xl font-bold text-[var(--secondary)]">25 LPA</h4>
                <p className="text-gray-700">Highest Package</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <h4 className="text-3xl font-bold text-[var(--secondary)]">12 LPA</h4>
                <p className="text-gray-700">Average Package</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementSection;
