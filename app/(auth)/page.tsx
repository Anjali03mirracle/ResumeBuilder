"use client";

import Header from "@/components/layout/Header";
import { useUser } from "@clerk/nextjs";
import {
  ArrowBigUp,
  ArrowRight,
  AtomIcon,
  Bot,
  CheckCircle2,
  Edit,
  Eye,
  FileCheck,
  Palette,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  const user = useUser();
  const ctaLink = !user?.isSignedIn ? "/sign-up" : "/dashboard";

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-16 sm:py-24 px-6 mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs sm:text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>AI-Powered Resume Builder with Google Gemini</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Build a Job-Winning Resume <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              In Just Minutes
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Effortlessly craft, customize, and optimize an ATS-ready professional
            resume powered by intelligent AI suggestions and real-time live preview.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={ctaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Build My Resume Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-slate-700 bg-white border border-slate-200 font-medium hover:bg-slate-50 shadow-sm transition"
            >
              See How It Works
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section
          id="how-it-works"
          className="scroll-mt-24 py-16 px-6 mx-auto max-w-7xl text-center"
        >
          <div className="mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Simple & Fast
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              How It Works
            </h3>
            <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
              Generate a polished, professional resume in just 3 straightforward steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition text-left relative">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold mb-5">
                <AtomIcon className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Step 1
              </span>
              <h4 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                Pick Theme & Colors
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Start by choosing a color palette that aligns with your industry
                and career level to give your resume a clean, uniform look.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition text-left relative">
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-bold mb-5">
                <Edit className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">
                Step 2
              </span>
              <h4 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                Fill In Details with AI
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enter your work history, skills, and education. Let our AI writer
                instantly refine and elevate your summaries and achievements.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition text-left relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold mb-5">
                <Share2 className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Step 3
              </span>
              <h4 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                Download & Share
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Export a crisp PDF ready for applications, or share a live web
                link with recruiters and hiring managers in a single click.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section
          id="features"
          className="scroll-mt-24 py-16 px-6 mx-auto max-w-7xl bg-white border-y border-slate-200/60 rounded-3xl my-8"
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Features
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Everything You Need to Get Hired
            </h3>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Designed from the ground up to give candidates an unfair advantage in the hiring process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <Bot className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                AI Resume Writer
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Generate compelling job descriptions and executive summaries tailored to your target job titles with Google Gemini.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-lg bg-violet-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <Eye className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Live Real-Time Preview
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Watch your resume take shape with every keystroke. What you see is exactly what employers and hiring managers receive.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <FileCheck className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                ATS-Optimized Formatting
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Clean typography and semantic layout designed to pass through Applicant Tracking Systems (ATS) without getting dropped.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-lg bg-pink-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <Palette className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Custom Accent Themes
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Personalize your header, icons, and timeline accents with curated modern color themes matching your personal brand.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <Share2 className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                1-Click Export & Share
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Download pixel-perfect PDFs ready for email attachments or share a secure web link directly with recruiters.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Cloud Storage & Autosave
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your resumes are securely synced to MongoDB Atlas. Access and update your saved resumes anywhere, anytime.
              </p>
            </div>
          </div>
        </section>

        {/* TEMPLATES SECTION */}
        <section
          id="templates"
          className="scroll-mt-24 py-16 px-6 mx-auto max-w-7xl text-center"
        >
          <div className="mb-12 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Modern Styles
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Curated Resume Styles
            </h3>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Pick from professionally designed aesthetics proven to capture recruiter attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Template Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                    Popular
                  </span>
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-600" />
                    <span className="w-3 h-3 rounded-full bg-slate-800" />
                    <span className="w-3 h-3 rounded-full bg-slate-300" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Modern Tech & Engineering
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Clean hierarchy with emphasis on skills, projects, and impact metrics.
                </p>
              </div>

              <div className="p-6 space-y-3 flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Two-column modular skill tags</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Project GitHub & live demo links</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>ATS-compliant bullet formatting</span>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={ctaLink}
                  className="w-full block text-center py-2.5 px-4 rounded-xl bg-blue-50 text-blue-700 font-medium hover:bg-blue-600 hover:text-white transition shadow-sm"
                >
                  Use This Style
                </Link>
              </div>
            </div>

            {/* Template Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700">
                    Executive
                  </span>
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-violet-600" />
                    <span className="w-3 h-3 rounded-full bg-indigo-900" />
                    <span className="w-3 h-3 rounded-full bg-slate-300" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Executive & Management
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Highlights leadership achievements, team growth, and key metrics.
                </p>
              </div>

              <div className="p-6 space-y-3 flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Executive summary banner</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Chronological role timeline</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Leadership & credential focus</span>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={ctaLink}
                  className="w-full block text-center py-2.5 px-4 rounded-xl bg-violet-50 text-violet-700 font-medium hover:bg-violet-600 hover:text-white transition shadow-sm"
                >
                  Use This Style
                </Link>
              </div>
            </div>

            {/* Template Card 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    Creative
                  </span>
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-600" />
                    <span className="w-3 h-3 rounded-full bg-teal-800" />
                    <span className="w-3 h-3 rounded-full bg-slate-300" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Creative & Product
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Modern, spacious layout ideal for UI/UX, product, and marketing.
                </p>
              </div>

              <div className="p-6 space-y-3 flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Portfolio & showcase highlights</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Modern typography accents</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Clean whitespace & readability</span>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={ctaLink}
                  className="w-full block text-center py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-600 hover:text-white transition shadow-sm"
                >
                  Use This Style
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="py-16 px-6 mx-auto max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white p-10 sm:p-14 text-center shadow-xl">
            <h3 className="text-3xl sm:text-4xl font-extrabold">
              Ready to Land Your Next Dream Job?
            </h3>
            <p className="mt-4 text-blue-100 max-w-xl mx-auto text-sm sm:text-base">
              Create your professional, AI-powered resume in minutes. No credit card required.
            </p>
            <div className="mt-8">
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-xl shadow-md hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all"
              >
                <ArrowBigUp className="h-5 w-5" />
                <span>Start Building for Free</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white/60 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-xs">
              RC
            </div>
            <span className="font-semibold text-slate-800">ResumeCraft</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/#how-it-works" className="hover:text-blue-600 transition">
              How It Works
            </Link>
            <Link href="/#features" className="hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="/#templates" className="hover:text-blue-600 transition">
              Templates
            </Link>
            {user?.isLoaded && user?.isSignedIn && (
              <Link href="/dashboard" className="hover:text-blue-600 transition">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
