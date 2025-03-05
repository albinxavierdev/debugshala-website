'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Courses',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Data Science', href: '/courses/data-science' },
        { name: 'MERN Stack Development', href: '/courses/mern-stack' },
        { name: 'Java Web Development', href: '/courses/java-full-stack' },
      ]
    },
    {
      name: 'Hire From Us',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Hire Talent', href: '/hire-talent' },
        { name: 'Our Candidates', href: '/candidates' },
      ]
    },
    {
      name: 'Resources',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Practice', href: '/practice' },
        { name: 'Yukti AI', href: '/yukti-ai' },
        { name: 'Playground', href: '/compiler' },
      ]
    },
    { name: 'About Us', href: '/about-us', hasDropdown: false },
    { name: 'Contact', href: '/contact-us', hasDropdown: false },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="responsive-container flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/debugshala-logo.svg" 
            alt="DebugShala Logo" 
            width={180} 
            height={50} 
            className="h-auto" 
          />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-[var(--dark)] hover:text-[var(--primary)] transition-colors"
          aria-label="Toggle navigation menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center text-[var(--dark)] hover:text-[var(--primary)] transition-colors font-medium"
                    aria-expanded={openDropdown === item.name}
                    aria-haspopup="true"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-lg py-2 z-20 fade-in">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-[var(--dark)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="text-[var(--dark)] hover:text-[var(--primary)] transition-colors font-medium"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <Link 
            href="/enroll" 
            className="btn-primary"
          >
            Enroll Now
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-20 slide-up">
            <div className="responsive-container py-3">
              {navItems.map((item) => (
                <div key={item.name} className="py-2">
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center justify-between w-full text-[var(--dark)] font-medium py-2"
                        aria-expanded={openDropdown === item.name}
                        aria-haspopup="true"
                      >
                        {item.name}
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 mt-2 border-l-2 border-[var(--primary)] fade-in">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block py-2 text-[var(--dark)] hover:text-[var(--primary)] transition-colors"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-[var(--dark)] font-medium py-2 hover:text-[var(--primary)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-4 pb-2">
                <Link 
                  href="/enroll" 
                  className="btn-primary block w-full text-center"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
