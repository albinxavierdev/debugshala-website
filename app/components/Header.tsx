"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!document.getElementById("dropdown-menu")?.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-7xl z-50 transition-all duration-300">
      <div 
        className={`flex items-center justify-between px-6 py-3 bg-white shadow-lg rounded-l-full rounded-r-full transition-all duration-300 ${
          isScrolled ? "py-2 shadow-md" : "py-3"
        }`}
      >
        
        {/* Logo */}
        <Link href="/" aria-label="Homepage">
          <Image 
            src="/images/debugshala-logo.svg" 
            alt="DebugShala Logo" 
            width={180} 
            height={50} 
            className="h-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">About Us</Link>
          <Link href="/courses" className="text-gray-700 hover:text-gray-900">Courses</Link>
          <Link href="/success-stories" className="text-gray-700 hover:text-gray-900">Success Stories</Link>
          <Link href="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
          <Link href="/careers" className="text-gray-700 hover:text-gray-900">Careers</Link>
          <div className="relative">
            <button onClick={() => setOpenDropdown(!openDropdown)} className="text-gray-700 hover:text-gray-900">
              Services ▼
            </button>
            {openDropdown && (
              <div id="dropdown-menu" className="absolute top-full left-0 bg-white shadow-lg rounded-md w-48">
                <Link href="/service1" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Service 1</Link>
                <Link href="/service2" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Service 2</Link>
              </div>
            )}
          </div>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-lg md:hidden mt-2 p-4">
          <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
          <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About Us</Link>
          <Link href="/courses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Courses</Link>
          <Link href="/success-stories" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Success Stories</Link>
          <Link href="/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Blog</Link>
          <Link href="/careers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Careers</Link>
          <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
