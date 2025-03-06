'use client';

import React from 'react';
import SpiderWebChart from './SpiderWebChart';

const SpiderWebChartSection = () => {
  // Sample data for the spider web chart
  const skills = [
    { name: 'Technical Skills', score: 80 },
    { name: 'Problem Solving', score: 85 },
    { name: 'Communication', score: 70 },
    { name: 'Teamwork', score: 75 },
    { name: 'Leadership', score: 65 },
    { name: 'Adaptability', score: 90 },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--dark)]">
            Skills Assessment
          </h2>
          <p className="text-[var(--gray-dark)] max-w-2xl mx-auto">
            Take our comprehensive skills assessment to identify your strengths and areas for improvement. 
            Our personalized learning paths will help you focus on what matters most for your career goals.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-[var(--gray-light)]">
              <SpiderWebChart skills={skills} />
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:pl-12">
            <h3 className="text-2xl font-bold mb-4 text-[var(--dark)]">Why Take Our Skills Assessment?</h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-[var(--dark)]">Personalized Learning Path</h4>
                  <p className="text-[var(--gray-dark)]">
                    Get a customized learning plan based on your skill assessment results.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-[var(--dark)]">Track Your Progress</h4>
                  <p className="text-[var(--gray-dark)]">
                    Monitor improvements in your skills over time with regular assessments.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-[var(--dark)]">Industry Benchmark</h4>
                  <p className="text-[var(--gray-dark)]">
                    Compare your skills with industry standards and identify gaps.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button 
                className="primary-button"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  border: '2px solid var(--primary)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                Take Free Assessment 
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiderWebChartSection;
