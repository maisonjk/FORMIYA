import React from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  BookOpen,
  CheckCircle2,
  Users,
  Compass,
  Flame,
  Church,
  Quote,
  Clock,
  Layers,
  HelpCircle,
} from "lucide-react";

interface LandingPageProps {
  onStartAssessment: () => void;
  onExploreApp: (view?: string) => void;
  onOpenPricing: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onExploreApp,
  onOpenPricing,
}) => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#ffffff] selection:bg-[#c5a368] selection:text-black">
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Subtle Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 px-4 py-1.5 rounded-full text-xs font-semibold text-[#c5a368] mb-8 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#c5a368] animate-pulse"></span>
            <span className="tracking-wider uppercase text-[11px]">A Category-Defining Spiritual Formation Platform</span>
          </div>

          {/* Headline with high typographic contrast */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.1] mb-6">
            Don't just consume faith. <br />
            <span className="italic text-[#c5a368]">Be formed by it.</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/70 leading-relaxed mb-10 font-normal">
            Personalized Christian discipleship that helps you move from knowing Scripture to living it—one faithful, unhurried step at a time.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2.5 group"
            >
              <span>Start Your Discovery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onExploreApp("daily")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#111111] hover:bg-[#181818] text-white border border-white/20 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
            >
              <span>Explore Platform</span>
            </button>
          </div>

          {/* Key Trust Micro-Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-white/50 font-medium">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#c5a368]" />
              <span>Scripture-Grounded First</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#c5a368]" />
              <span>Zero Guilt / Shame Streaks</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#c5a368]" />
              <span>Human & Church Centered</span>
            </span>
          </div>
        </div>

        {/* Subtle Decorative Background Glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-radial from-[#c5a368]/20 to-transparent blur-3xl" />
        </div>
      </section>

      {/* 2. The Core Problem vs. The Solution */}
      <section className="py-20 sm:py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#c5a368] font-semibold mb-3">
              The Real Problem
            </h2>
            <p className="font-serif text-3xl sm:text-4xl font-normal text-white leading-snug">
              You know more sermons than ever. <br />
              <span className="text-white/50 font-normal italic">
                Are you actually becoming more like Jesus?
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* The Consumption Trap */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] text-white/60 flex items-center justify-center font-bold text-sm mb-6 border border-white/10">
                  ✕
                </div>
                <h3 className="font-serif text-2xl font-normal text-white mb-4">
                  The Content Consumption Trap
                </h3>
                <ul className="space-y-3.5 text-white/70 text-sm sm:text-base">
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#c5a368] font-bold mt-0.5">•</span>
                    <span>Reading daily devotionals without knowing what concrete action to take next.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#c5a368] font-bold mt-0.5">•</span>
                    <span>Listening to inspiring Sunday sermons but forgetting the application by Tuesday.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#c5a368] font-bold mt-0.5">•</span>
                    <span>Quitting year-long reading plans and feeling subtle guilt or spiritual shame.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#c5a368] font-bold mt-0.5">•</span>
                    <span>Experiencing dry prayer seasons with no personalized guidance or mentor walking beside you.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/40 italic">
                Result: An abundance of spiritual information, but little lasting transformation.
              </div>
            </div>

            {/* The FORMIYA Way */}
            <div className="bg-[#151515] border border-[#c5a368]/30 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a368]/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#c5a368] text-black flex items-center justify-center font-bold text-sm mb-6 shadow-sm">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-normal text-white mb-4">
                  The FORMIYA Discipleship System
                </h3>
                <ul className="space-y-3.5 text-white/85 text-sm sm:text-base">
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#c5a368] font-bold mt-0.5">•</span>
                    <span><strong>Personalized 5-10 minute daily rhythms:</strong> Scripture, contextual insight, reflection, prayer, and one tangible practice.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#c5a368] font-bold mt-0.5">•</span>
                    <span><strong>Pain-to-Formation pathways:</strong> Address loneliness, doubt, forgiveness, and grief with biblical anchors.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#c5a368] font-bold mt-0.5">•</span>
                    <span><strong>Heart Mirror:</strong> Safely discover recurring patterns in your reflections without clinical labeling.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#c5a368] font-bold mt-0.5">•</span>
                    <span><strong>Human connection:</strong> Integrated small groups, mentor pairing, and sermon-to-practice tools.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-[#c5a368] font-semibold">
                The Goal: Helping you move from knowing about Jesus to walking like Jesus in everyday life.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 7-Stage Formation Engine Loop */}
      <section className="py-20 sm:py-24 bg-[#050505] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#c5a368] font-semibold mb-3">
              The Formation Engine
            </h2>
            <p className="font-serif text-3xl sm:text-4xl font-normal text-white">
              How True Transformation Happens
            </p>
            <p className="mt-3 text-base text-white/60">
              Every pathway and daily session moves you through a repeatable, life-giving rhythm:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { step: "01", title: "Scripture", desc: "Verified Bible passage in historical context" },
              { step: "02", title: "Understand", desc: "Theological depth & original word insights" },
              { step: "03", title: "Reflect", desc: "1-3 penetrating personal questions" },
              { step: "04", title: "Pray", desc: "Scripture-anchored conversational prayer" },
              { step: "05", title: "Practice", desc: "One concrete real-world action today" },
              { step: "06", title: "Evening Check", desc: "Safe review: I practiced, struggled, or forgot" },
              { step: "07", title: "Community", desc: "Share faithful steps with mentors & groups" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#111111] border border-white/10 rounded-xl p-5 text-center flex flex-col justify-between hover:border-[#c5a368]/50 transition-colors shadow-xs"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#c5a368] uppercase tracking-widest block mb-2">
                    Step {item.step}
                  </span>
                  <h4 className="font-serif font-medium text-base text-white mb-2">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-white/50 leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Product Highlights & Interactive Features */}
      <section className="py-20 sm:py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#c5a368] font-semibold mb-3">
              Core Platform Features
            </h2>
            <p className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Engineered for Spiritual Depth & Simplicity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: The "I Don't Know What To Do Next" Engine */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#c5a368]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/10 text-[#c5a368] flex items-center justify-center mb-6">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-white mb-3">
                  "What Should I Do Next?"
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  Whenever you feel stuck, confused, or dry, tap one button. FORMIYA evaluates your current journey, recent reflections, and emotional state to offer ONE calm, faithful next step.
                </p>
              </div>
              <button
                onClick={() => onExploreApp("daily")}
                className="text-xs font-semibold text-[#c5a368] hover:text-[#d8b67b] flex items-center space-x-1 mt-4"
              >
                <span>Try the Next-Step Engine</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Feature 2: Heart Mirror */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#c5a368]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/10 text-[#c5a368] flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-white mb-3">
                  Heart Mirror Reflection
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  With your explicit consent, FORMIYA reviews your journals over time to gently map emotional loops (e.g. Rejection → Insecurity → Withdrawal → Resentment) and suggests gospel-anchored practices.
                </p>
              </div>
              <button
                onClick={() => onExploreApp("mirror")}
                className="text-xs font-semibold text-[#c5a368] hover:text-[#d8b67b] flex items-center space-x-1 mt-4"
              >
                <span>Explore Heart Mirror</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Feature 3: Pain-to-Formation */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#c5a368]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/10 text-[#c5a368] flex items-center justify-center mb-6">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-white mb-3">
                  What You're Walking Through
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  20 curated real-life struggles—from "I feel far from God" and "I can't forgive" to "Recovering from church hurt" and "Navigating doubt"—turning pain into structured discipleship pathways.
                </p>
              </div>
              <button
                onClick={() => onExploreApp("pain")}
                className="text-xs font-semibold text-[#c5a368] hover:text-[#d8b67b] flex items-center space-x-1 mt-4"
              >
                <span>Browse Pathways</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Feature 4: Sermon to Discipleship */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#c5a368]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/10 text-[#c5a368] flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-white mb-3">
                  Sermon → Discipleship
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  Turn one Sunday sermon into a complete 5-day daily follow-up guide, small group study questions, family conversation prompts, and a weekly practice challenge.
                </p>
              </div>
              <button
                onClick={() => onExploreApp("sermons")}
                className="text-xs font-semibold text-[#c5a368] hover:text-[#d8b67b] flex items-center space-x-1 mt-4"
              >
                <span>See Sermon Engine</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Feature 5: Formiya Family */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#c5a368]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/10 text-[#c5a368] flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-white mb-3">
                  FORMIYA Family
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  Age-specific discipleship experiences for Ages 4–7, Ages 8–12, and Teens. Simple story hooks, hands-on family activities, and memorable bedtime prayers.
                </p>
              </div>
              <button
                onClick={() => onExploreApp("family")}
                className="text-xs font-semibold text-[#c5a368] hover:text-[#d8b67b] flex items-center space-x-1 mt-4"
              >
                <span>View Family Experience</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Feature 6: Church Portal */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#c5a368]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/10 text-[#c5a368] flex items-center justify-center mb-6">
                  <Church className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-white mb-3">
                  FORMIYA for Churches
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  Pastors see privacy-preserving aggregate spiritual health metrics: top growth areas, active journey engagement, and collective discipline trends without compromising member privacy.
                </p>
              </div>
              <button
                onClick={() => onExploreApp("church")}
                className="text-xs font-semibold text-[#c5a368] hover:text-[#d8b67b] flex items-center space-x-1 mt-4"
              >
                <span>Explore Church Dashboard</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trust & Theological Safety Guardrails */}
      <section className="py-20 sm:py-24 bg-[#050505] text-white border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c5a368] font-semibold mb-2 block">
              Theological Integrity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Scripture-Grounded. Human-Centered.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/60">
              We hold strict theological safety commitments so you and your church can trust every prompt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
              <h4 className="font-serif font-medium text-lg text-white mb-2 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#c5a368]" />
                <span>Scripture Is Authoritative</span>
              </h4>
              <p className="text-sm text-white/65 leading-relaxed">
                AI is a tool, never divine revelation. We never say "God told me" or make personal prophetic claims. Every answer is grounded in verified biblical citations.
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
              <h4 className="font-serif font-medium text-lg text-white mb-2 flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#c5a368]" />
                <span>AI Assists; Humans Disciple</span>
              </h4>
              <p className="text-sm text-white/65 leading-relaxed">
                AI cannot replace pastors, mentors, counselors, or local church community. We build intentional on-ramps to trusted human relationships.
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
              <h4 className="font-serif font-medium text-lg text-white mb-2 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-[#c5a368]" />
                <span>No Shame Gamification</span>
              </h4>
              <p className="text-sm text-white/65 leading-relaxed">
                You will never see "You failed your God streak." When life happens and days are missed, we greet you with grace: "Welcome back. Let's take one faithful step today."
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
              <h4 className="font-serif font-medium text-lg text-white mb-2 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[#c5a368]" />
                <span>Your Spiritual Life Is Private</span>
              </h4>
              <p className="text-sm text-white/65 leading-relaxed">
                Your private journal reflections are yours. We do not sell your spiritual data, use it for advertising, or expose it to church leaders without your consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pricing Overview */}
      <section className="py-20 sm:py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#c5a368] font-semibold mb-3">
              Simple, Transparent Pricing
            </h2>
            <p className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Invest in What Lasts
            </p>
            <p className="mt-3 text-base text-white/60">
              Free forever for foundational discipleship. Upgrade for deep personalized formation journeys and church tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {/* Free */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  Free Plan
                </span>
                <div className="mt-4 mb-6">
                  <span className="font-serif text-4xl font-medium text-white">$0</span>
                  <span className="text-xs text-white/40 ml-1">/ forever</span>
                </div>
                <ul className="space-y-2.5 text-xs text-white/65 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>Daily Formation Session</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>7-Day 'Come Back to God' Journey</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>Basic Prayer & Reflection Journal</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>Spiritual Formation Assessment</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartAssessment}
                className="w-full py-2.5 rounded-lg bg-[#181818] hover:bg-[#222] text-white border border-white/10 font-semibold text-xs transition-colors uppercase tracking-wider"
              >
                Get Started Free
              </button>
            </div>

            {/* Plus */}
            <div className="bg-[#151515] border-2 border-[#c5a368] rounded-2xl p-6 flex flex-col justify-between relative shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c5a368] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a368]">
                  FORMIYA Plus
                </span>
                <div className="mt-4 mb-6">
                  <span className="font-serif text-4xl font-medium text-white">$9.99</span>
                  <span className="text-xs text-white/40 ml-1">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-white/75 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span className="text-white font-semibold">Everything in Free</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>All 14 & 21-day journeys</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span><strong>Heart Mirror</strong> Pattern Discovery</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>Personalized Formation Map</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>Unlimited AI Companion Q&A</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onOpenPricing}
                className="w-full py-2.5 rounded-lg bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-xs shadow-md transition-colors uppercase tracking-wider"
              >
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Pro */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a368]">
                  FORMIYA Pro
                </span>
                <div className="mt-4 mb-6">
                  <span className="font-serif text-4xl font-medium text-white">$19.99</span>
                  <span className="text-xs text-white/40 ml-1">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-white/65 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span className="text-white font-semibold">Everything in Plus</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>FORMIYA Family (All age tiers)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>Small Group Leader Tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>Mentor ↔ Disciple Hub</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>12-Week Advanced Journeys</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onOpenPricing}
                className="w-full py-2.5 rounded-lg bg-[#181818] hover:bg-[#222] text-white border border-white/10 font-semibold text-xs transition-colors uppercase tracking-wider"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Church */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a368]">
                  For Churches
                </span>
                <div className="mt-4 mb-6">
                  <span className="font-serif text-4xl font-medium text-white">$299</span>
                  <span className="text-xs text-white/40 ml-1">/ mo starter</span>
                </div>
                <ul className="space-y-2.5 text-xs text-white/65 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>Full Congregation Access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span><strong>Sermon → Discipleship Engine</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>Privacy-Preserving Analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>Custom Church Curriculum</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onExploreApp("church")}
                className="w-full py-2.5 rounded-lg bg-[#181818] hover:bg-[#222] text-[#c5a368] border border-[#c5a368]/30 font-semibold text-xs transition-colors uppercase tracking-wider"
              >
                Schedule Church Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-24 bg-[#050505] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-6">
            Your next faithful step starts here.
          </h2>
          <p className="text-base sm:text-lg text-white/60 mb-8">
            Take 3 minutes to discover where you are in your walk with Christ and receive your personalized formation map.
          </p>
          <button
            onClick={onStartAssessment}
            className="px-8 py-4 rounded-lg bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all inline-flex items-center space-x-2"
          >
            <span>Begin Free Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000000] text-white/50 py-12 border-t border-white/10 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded bg-[#c5a368] text-black flex items-center justify-center font-display font-bold text-sm">
              F
            </div>
            <span className="font-display font-bold tracking-[0.2em] text-white uppercase text-sm">
              FORMIYA <span className="text-[#c5a368]">.</span>
            </span>
          </div>
          <p className="text-center sm:text-left text-white/40">
            "Don't just consume faith. Be formed by it." © {new Date().getFullYear()} FORMIYA Platform. All rights reserved.
          </p>
          <div className="flex space-x-6 text-white/60">
            <button onClick={() => onExploreApp("daily")} className="hover:text-[#c5a368]">Daily Practice</button>
            <button onClick={onOpenPricing} className="hover:text-[#c5a368]">Pricing</button>
            <button onClick={() => onExploreApp("church")} className="hover:text-[#c5a368]">For Churches</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
