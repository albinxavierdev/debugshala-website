'use client';

import { useState } from 'react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[75%] px-4 py-3 rounded-lg ${
        isUser 
          ? 'bg-[var(--primary)] text-white rounded-tr-none' 
          : 'bg-gray-100 text-gray-800 rounded-tl-none'
      }`}>
        {message}
      </div>
    </div>
  );
};

const ChatbotSection = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { message: "Hi there! I'm Yukti, your AI learning assistant from DebugShala. How can I help you today?", isUser: false },
    { message: "Can you tell me about the Data Science course?", isUser: true },
    { message: "Our Data Science course is a 6-month comprehensive program covering Python, statistics, machine learning, deep learning, and more. You'll work on real-world projects and receive placement assistance. The course has helped students land jobs with packages up to ₹25 LPA!", isUser: false },
  ]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    setChatMessages([...chatMessages, { message: inputMessage, isUser: true }]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Our courses are designed by industry experts with practical, hands-on learning. We focus on real-world projects and provide 100% placement assistance.",
        "You can enroll by visiting our campus in Indore or by scheduling a call with our counselors. We offer flexible payment options too!",
        "DebugShala has helped over 500 students get placed in top companies like Microsoft, Amazon, Flipkart, and many more.",
        "Yukti AI is your personalized learning assistant that helps you with coding problems, provides learning resources, and offers career guidance.",
        "We have weekend batches available for working professionals. You can attend classes on Saturdays and Sundays."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prevMessages => [...prevMessages, { message: randomResponse, isUser: false }]);
    }, 1000);
  };

  return (
    <section id="chatbot" className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Side - Chat Interface */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--dark-bg)] p-4 text-white flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Yukti AI</h3>
                  <p className="text-xs text-green-300">Online</p>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="p-4 h-80 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <ChatMessage key={index} message={msg.message} isUser={msg.isUser} />
                ))}
              </div>
              
              {/* Chat Input */}
              <div className="p-4 border-t">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Ask Yukti something..."
                    className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    className="bg-[var(--primary)] text-white px-4 py-2 rounded-r-md"
                    onClick={handleSendMessage}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">Meet Yukti AI</h2>
            <h3 className="text-xl mb-6 text-gray-600">Your Personal Learning Assistant</h3>
            
            <p className="text-gray-600 mb-6">
              Yukti is Indore&apos;s first AI-powered educational assistant, designed to enhance your learning experience at DebugShala. 
              Get personalized guidance, instant code reviews, and access to a vast knowledge repository.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-[var(--secondary)] p-2 rounded-full text-white mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">24/7 Learning Support</h4>
                  <p className="text-gray-600">Get answers to your coding questions anytime, any day</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[var(--secondary)] p-2 rounded-full text-white mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Personalized Resources</h4>
                  <p className="text-gray-600">Get recommended learning paths tailored to your goals</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[var(--secondary)] p-2 rounded-full text-white mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Code Reviews & Debugging</h4>
                  <p className="text-gray-600">Get instant feedback on your code and solutions to bugs</p>
                </div>
              </div>
            </div>
            
            <button className="btn-secondary">
              Try Yukti for Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
