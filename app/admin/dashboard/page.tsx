'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import supabase from '../../../lib/supabase';

// Mock data for social media
const instagramPosts = [
  {
    id: 1,
    imageUrl: '/images/placeholders/instagram-1.jpg',
    caption: 'Our students crushing the coding challenge! 🚀 #DebugShala #CodingLife',
    likes: 142,
    comments: 28,
    date: '2025-03-05'
  },
  {
    id: 2,
    imageUrl: '/images/placeholders/instagram-2.jpg',
    caption: 'New course announcement! Learn AI Engineering with practical projects starting next month.',
    likes: 89,
    comments: 15,
    date: '2025-03-04'
  }
];

const linkedinPosts = [
  {
    id: 1,
    title: 'Alumni Achievement Spotlight',
    description: 'Celebrating our alumni who recently joined top tech companies as senior engineers!',
    reactions: 245,
    shares: 45,
    date: '2025-03-05'
  },
  {
    id: 2,
    title: 'Industry Partnership Announcement',
    description: 'We\'re excited to announce our new partnership with TechGiants Inc. for exclusive internship opportunities!',
    reactions: 189,
    shares: 32,
    date: '2025-03-03'
  }
];

export default function DashboardPage() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('http://localhost:3000');
  
  // Check connection status
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // First try to get auth status - this should always work if Supabase is reachable
        const { data, error } = await supabase.auth.getSession();
        
        // If we get here, we can connect to Supabase
        setConnectionStatus('connected');
      } catch (err) {
        console.error('Supabase connection error:', err);
        setConnectionStatus('error');
      }
    };
    
    checkConnection();
  }, []);

  const refreshPreview = () => {
    setPreviewLoading(true);
    setTimeout(() => setPreviewLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-6 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">DebugShala Admin Dashboard</h1>
        
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-xs flex items-center gap-2 ${
            connectionStatus === 'connected' ? 'bg-green-500/20 text-green-100' : 
            connectionStatus === 'error' ? 'bg-red-500/20 text-red-100' : 'bg-yellow-500/20 text-yellow-100'
          }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              connectionStatus === 'connected' ? 'bg-green-400' :
              connectionStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400'
            }`} />
            {connectionStatus === 'connected' ? 'Connected' : 
             connectionStatus === 'error' ? 'Connection Error' : 'Checking...'}
          </div>
          
          <Link href="/admin/auth/login" className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-1.5 rounded-lg transition-colors">
            Logout
          </Link>
        </div>
      </header>
      
      {/* Social Media Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Instagram Feed Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-white/15">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Instagram Posts</h2>
            <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
              Refresh Feed
            </button>
          </div>
          
          <div className="space-y-4">
            {instagramPosts.map(post => (
              <div key={post.id} className="bg-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/15">
                <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-500">
                  Image placeholder ({post.id})
                </div>
                <div className="p-4">
                  <p className="text-white mb-2">{post.caption}</p>
                  <div className="flex justify-between text-blue-100 text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center">❤️ {post.likes}</span>
                      <span className="flex items-center">💬 {post.comments}</span>
                    </div>
                    <span className="text-blue-200/70">{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LinkedIn Feed Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-white/15">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">LinkedIn Updates</h2>
            <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
              Refresh Feed
            </button>
          </div>
          
          <div className="space-y-4">
            {linkedinPosts.map(post => (
              <div key={post.id} className="bg-white/10 p-4 rounded-lg transition-all duration-300 hover:bg-white/15">
                <h3 className="text-white font-medium mb-1">{post.title}</h3>
                <p className="text-blue-100 mb-3 text-sm">{post.description}</p>
                <div className="flex justify-between text-blue-200/70 text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">👍 {post.reactions}</span>
                    <span className="flex items-center">↗️ {post.shares}</span>
                  </div>
                  <span>{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Front-End Preview Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-white/15">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-white">Website Preview</h2>
          
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              value={previewUrl} 
              onChange={(e) => setPreviewUrl(e.target.value)} 
              className="bg-white/5 border border-white/20 text-white text-sm rounded-lg px-3 py-1.5 w-56 md:w-auto"
            />
            <button 
              onClick={refreshPreview}
              className="bg-teal-500 hover:bg-teal-600 text-white text-sm px-4 py-1.5 rounded-lg transition-colors"
            >
              {previewLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
        
        <div className="aspect-video bg-white/5 rounded-xl border-2 border-white/10 overflow-hidden">
          <div className="h-full flex flex-col items-center justify-center text-white space-y-4">
            <div className="text-xl">Website Preview</div>
            <p className="text-blue-100/70 text-sm text-center max-w-md">
              Connect to the front-end by setting up an iframe or screenshot service.
              <br />For security reasons, real-time preview requires additional configuration.
            </p>
            <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors mt-2">
              Configure Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
