'use client';

import { useState, useEffect } from 'react';

const CommunityPost = ({ permalink }) => {
  return (
    <div className="instagram-post-container rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <blockquote className="instagram-media" dataInstgrmCaptioned dataInstgrmPermalink={permalink} dataInstgrmVersion="14" style={{ background: "#FFF", border: 0, borderRadius: "12px", boxShadow: "none", margin: 0, maxWidth: "100%", minWidth: "326px", padding: 0, width: "100%" }}>
        <div style={{ padding: "16px" }}>
          <a href={permalink} style={{ background: "#FFFFFF", lineHeight: 0, padding: 0, textAlign: "center", textDecoration: "none", width: "100%" }} target="_blank" rel="noopener noreferrer">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", flexGrow: 0, height: "40px", marginRight: "14px", width: "40px" }}></div>
              <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", marginBottom: "6px", width: "100px" }}></div>
                <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", width: "60px" }}></div>
              </div>
            </div>
            <div style={{ padding: "19% 0" }}></div>
            <div style={{ display: "block", height: "50px", margin: "0 auto 12px", width: "50px" }}>
              <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                    <g>
                      <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div style={{ paddingTop: "8px" }}>
              <div style={{ color: "#3897f0", fontFamily: "Arial,sans-serif", fontSize: "14px", fontStyle: "normal", fontWeight: 550, lineHeight: "18px" }}>View this post on Instagram</div>
            </div>
            <div style={{ padding: "12.5% 0" }}></div>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: "14px", alignItems: "center" }}>
              <div>
                <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", height: "12.5px", width: "12.5px", transform: "translateX(0px) translateY(7px)" }}></div>
                <div style={{ backgroundColor: "#F4F4F4", height: "12.5px", transform: "rotate(-45deg) translateX(3px) translateY(1px)", width: "12.5px", flexGrow: 0, marginRight: "14px", marginLeft: "2px" }}></div>
                <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", height: "12.5px", width: "12.5px", transform: "translateX(9px) translateY(-18px)" }}></div>
              </div>
              <div style={{ marginLeft: "8px" }}>
                <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", flexGrow: 0, height: "20px", width: "20px" }}></div>
                <div style={{ width: 0, height: 0, borderTop: "2px solid transparent", borderLeft: "6px solid #f4f4f4", borderBottom: "2px solid transparent", transform: "translateX(16px) translateY(-4px) rotate(30deg)" }}></div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <div style={{ width: 0, borderTop: "8px solid #F4F4F4", borderRight: "8px solid transparent", transform: "translateY(16px)" }}></div>
                <div style={{ backgroundColor: "#F4F4F4", flexGrow: 0, height: "12px", width: "16px", transform: "translateY(-4px)" }}></div>
                <div style={{ width: 0, height: 0, borderTop: "8px solid #F4F4F4", borderLeft: "8px solid transparent", transform: "translateY(-4px) translateX(8px)" }}></div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center", marginBottom: "24px" }}>
              <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", marginBottom: "6px", width: "224px" }}></div>
              <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", width: "144px" }}></div>
            </div>
          </a>
          <p style={{ color: "#c9c8cd", fontFamily: "Arial,sans-serif", fontSize: "14px", lineHeight: "17px", marginBottom: 0, marginTop: "8px", overflow: "hidden", padding: "8px 0 7px", textAlign: "center", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            <a href={permalink} style={{ color: "#c9c8cd", fontFamily: "Arial,sans-serif", fontSize: "14px", fontStyle: "normal", fontWeight: "normal", lineHeight: "17px", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">A post shared by DebugShala | Training &amp; Placements (@debugshala)</a>
          </p>
        </div>
      </blockquote>
    </div>
  );
};

const CommunitySection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Array of Instagram post permalinks
  const posts = [
    "https://www.instagram.com/p/C296PX4MYz_/?utm_source=ig_embed&amp;utm_campaign=loading",
    "https://www.instagram.com/reel/C5eBDVCNzVW/?utm_source=ig_embed&amp;utm_campaign=loading", 
    "https://www.instagram.com/reel/C5Yd_xUNnUB/?utm_source=ig_embed&amp;utm_campaign=loading", 
    "https://www.instagram.com/reel/C5FRRzZtDYz/?utm_source=ig_embed&amp;utm_campaign=loading"  
  ];

  // Categorized posts for filtering
  const categorizedPosts = {
    all: [
      "https://www.instagram.com/p/C296PX4MYz_/?utm_source=ig_embed&amp;utm_campaign=loading",
      "https://www.instagram.com/reel/C5eBDVCNzVW/?utm_source=ig_embed&amp;utm_campaign=loading",
      "https://www.instagram.com/reel/C5Yd_xUNnUB/?utm_source=ig_embed&amp;utm_campaign=loading",
      "https://www.instagram.com/reel/C5FRRzZtDYz/?utm_source=ig_embed&amp;utm_campaign=loading"
    ],
    learning: [
      "https://www.instagram.com/p/C296PX4MYz_/?utm_source=ig_embed&amp;utm_campaign=loading",
      "https://www.instagram.com/reel/C5eBDVCNzVW/?utm_source=ig_embed&amp;utm_campaign=loading"
    ],
    bts: [
      "https://www.instagram.com/reel/C5Yd_xUNnUB/?utm_source=ig_embed&amp;utm_campaign=loading"
    ],
    achievements: [
      "https://www.instagram.com/reel/C5FRRzZtDYz/?utm_source=ig_embed&amp;utm_campaign=loading"
    ]
  };

  useEffect(() => {
    // Load the Instagram embed script
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

    // Also try to process embeds after component mounts/updates
    // This helps when script is already loaded but new posts are displayed
    if (window && (window as any).instgrm) {
      setTimeout(() => {
        (window as any).instgrm.Embeds.process();
      }, 1000);
    }

    // Cleanup function to remove the script when the component unmounts
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
  }, [activeFilter]); // Re-run when filter changes

  return (
    <section id="community" className="py-20 bg-gray-50">
      <div className="responsive-container">
        <h2 className="section-heading text-center">Community & Behind The Scenes</h2>
        <p className="section-subheading text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Get a glimpse into the DebugShala community and the people who make it special. 
          Discover the culture, celebrations, and everyday moments at our campus.
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-16 flex-wrap gap-3">
          <button
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === 'all' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === 'team building' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('team building')}
          >
            Team Building
          </button>
          <button
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === 'celebrations' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('celebrations')}
          >
            Celebrations
          </button>
          <button
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === 'learning' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('learning')}
          >
            Learning
          </button>
          <button
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === 'bts' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('bts')}
          >
            Behind The Scenes
          </button>
          <button
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === 'achievements' 
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveFilter('achievements')}
          >
            Achievements
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {/* Map over the filtered posts array to render CommunityPost for each post */}
          {categorizedPosts[activeFilter].map((post, index) => (
            <div key={index} className="w-full max-w-[326px] mx-auto transform hover:scale-[1.01] transition-all duration-300">
              <CommunityPost key={index} permalink={post} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="https://www.instagram.com/debugshala/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Follow us on Instagram
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;