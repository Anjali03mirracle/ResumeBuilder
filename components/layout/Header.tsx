"use client";

import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
  const user = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Features", href: "/#features" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* SaaS Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">RC</span>
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">ResumeCraft</h1>
              <p className="text-xs text-slate-500 -mt-1">AI Resume Builder</p>
            </div>
          </Link>

          {/* Center Navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-600 hover:text-blue-600 font-medium transition"
              >
                {link.label}
              </Link>
            ))}

            {user?.isLoaded && user?.isSignedIn && (
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-blue-600 font-medium transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user?.isLoaded && user?.isSignedIn && (
              <>
                <div className="hidden md:block">
                  <UserButton showName={true} />
                </div>

                <div className="md:hidden">
                  <UserButton showName={false} />
                </div>
              </>
            )}

            {!user?.isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  className="hidden md:block text-slate-600 hover:text-blue-600 font-medium"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="hidden sm:inline-block bg-gradient-to-r from-blue-600 to-violet-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="hidden sm:inline-block bg-gradient-to-r from-blue-600 to-violet-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition"
              >
                Dashboard
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-700" />
              ) : (
                <Menu className="h-6 w-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-200 mt-4 space-y-3 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium py-1 px-2 rounded-lg hover:bg-slate-50 transition"
              >
                {link.label}
              </Link>
            ))}

            {user?.isLoaded && user?.isSignedIn && (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium py-1 px-2 rounded-lg hover:bg-slate-50 transition"
              >
                Dashboard
              </Link>
            )}

            <div className="pt-2 flex flex-col gap-2">
              {!user?.isSignedIn ? (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center text-slate-700 font-medium py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center bg-gradient-to-r from-blue-600 to-violet-600 text-white py-2.5 rounded-xl font-medium shadow-md transition"
                  >
                    Get Started Free
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center bg-gradient-to-r from-blue-600 to-violet-600 text-white py-2.5 rounded-xl font-medium shadow-md transition"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
