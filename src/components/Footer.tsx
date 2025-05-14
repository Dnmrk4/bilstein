// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Bilstein Mobile Garage. All rights
          reserved.
        </p>

        <div className="flex space-x-6 text-sm">
          <Link href="/privacy" className="hover:text-red-500 transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-red-500 transition">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-red-500 transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
