// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-red-700">
          Bilstein
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 font-medium text-white">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/feedback">Feedback</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-blue-800">
          <Link href="/" onClick={() => setIsOpen(false)} className="block">
            Home
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            Services
          </Link>
          <Link
            href="/feedback"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            Feedback
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
