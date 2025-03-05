import React from 'react';

// Import components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CoursesSection from './components/CoursesSection';
import PlacementSection from './components/PlacementSection';
import ExpertSessionsSection from './components/ExpertSessionsSection';
import WorkshopsSection from './components/WorkshopsSection';
import CommunitySection from './components/CommunitySection';
import ChatbotSection from './components/ChatbotSection';
import SpiderWebChartSection from './components/SpiderWebChartSection';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CoursesSection />
      <SpiderWebChartSection />
      <PlacementSection />
      <ExpertSessionsSection />
      <WorkshopsSection />
      <CommunitySection />
      <ChatbotSection />
      <Footer />
      <BackToTop />
    </main>
  );
}
