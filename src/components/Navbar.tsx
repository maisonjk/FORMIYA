import React from "react";
import {
  Compass,
  BookOpen,
  HeartHandshake,
  Users,
  Sparkles,
  Home,
  Layers,
  Flame,
  Shield,
  CreditCard,
  Settings,
  HelpCircle,
  Church,
  Baby,
} from "lucide-react";
import { UserProfile, SubscriptionTier } from "../types";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userProfile?: UserProfile;
  userTier?: SubscriptionTier;
  onOpenCompanion?: () => void;
  onOpenNextStep: () => void;
  onOpenPricing: () => void;
  onOpenSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  userProfile,
  userTier = "plus",
  onOpenCompanion,
  onOpenNextStep,
  onOpenPricing,
  onOpenSettings,
}) => {
  const tier = userProfile?.tier || userTier;
  const isPaid = tier !== "free";

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 transition-all text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate("landing")}
              className="flex items-center space-x-3 text-left focus:outline-none group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#c5a368] text-black flex items-center justify-center font-display font-bold text-lg tracking-wider shadow-sm group-hover:bg-[#d8b67b] transition-colors">
                F
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-[0.15em] text-white uppercase leading-tight">
                  FORMIYA <span className="text-[#c5a368]">.</span>
                </span>
                <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-semibold hidden sm:inline-block">
                  Spiritual Formation Platform
                </span>
              </div>
            </button>

            {/* Primary Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => onNavigate("daily")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  currentView === "daily"
                    ? "bg-[#181818] text-[#c5a368] border border-[#c5a368]/30 font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Today</span>
              </button>

              <button
                onClick={() => onNavigate("journeys")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  currentView === "journeys"
                    ? "bg-[#181818] text-[#c5a368] border border-[#c5a368]/30 font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Journeys</span>
              </button>

              <button
                onClick={() => onNavigate("pain")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  currentView === "pain"
                    ? "bg-[#181818] text-[#c5a368] border border-[#c5a368]/30 font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Flame className="w-4 h-4 text-[#c5a368]" />
                <span>What You're Walking Through</span>
              </button>

              <button
                onClick={() => (onOpenCompanion ? onOpenCompanion() : onNavigate("companion"))}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  currentView === "companion"
                    ? "bg-[#181818] text-[#c5a368] border border-[#c5a368]/30 font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#c5a368]" />
                <span>AI Companion</span>
              </button>

              <button
                onClick={() => onNavigate("mirror")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  currentView === "mirror"
                    ? "bg-[#181818] text-[#c5a368] border border-[#c5a368]/30 font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Heart Mirror</span>
              </button>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* The Central "I Don't Know What To Do Next" Button */}
            <button
              onClick={onOpenNextStep}
              className="bg-[#c5a368] hover:bg-[#d8b67b] text-black px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center space-x-1.5"
              title="Get a clear, unhurried, faithful next step based on your current state"
            >
              <HelpCircle className="w-4 h-4 text-black" />
              <span className="font-semibold whitespace-nowrap">What Should I Do Next?</span>
            </button>

            {/* Quick Hub Dropdown / Buttons for Pro & Church Tools */}
            <div className="hidden md:flex items-center space-x-1 border-l border-white/10 pl-3">
              <button
                onClick={() => onNavigate("groups")}
                className={`p-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors ${
                  currentView === "groups" ? "bg-[#181818] text-[#c5a368] border border-white/10" : ""
                }`}
                title="Small Groups Platform"
              >
                <Users className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("sermons")}
                className={`p-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors ${
                  currentView === "sermons" ? "bg-[#181818] text-[#c5a368] border border-white/10" : ""
                }`}
                title="Sermon to Discipleship Engine"
              >
                <BookOpen className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("family")}
                className={`p-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors ${
                  currentView === "family" ? "bg-[#181818] text-[#c5a368] border border-white/10" : ""
                }`}
                title="Family Discipleship"
              >
                <Baby className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("church")}
                className={`p-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors ${
                  currentView === "church" ? "bg-[#181818] text-[#c5a368] border border-white/10" : ""
                }`}
                title="Church Portal & Analytics"
              >
                <Church className="w-4 h-4" />
              </button>
            </div>

            {/* Tier / Upgrade Badge */}
            <button
              onClick={onOpenPricing}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1 ${
                tier === "pro"
                  ? "bg-[#c5a368] text-black"
                  : tier === "plus"
                  ? "bg-[#1a1a1a] text-[#c5a368] border border-[#c5a368]/30"
                  : tier === "church"
                  ? "bg-[#c5a368] text-black"
                  : "bg-[#181818] text-white/50 hover:bg-white/10 border border-white/10"
              }`}
            >
              <span>{tier.toUpperCase()}</span>
            </button>

            {/* Settings & Memory */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              title="Settings, AI Memory & Privacy"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Profile Avatar / Map */}
            <button
              onClick={() => onNavigate("profile")}
              className="flex items-center space-x-2 pl-1 group"
              title="View Your Formation Map"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#c5a368]/40 bg-[#181818] flex items-center justify-center">
                {userProfile?.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name || "User"}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="font-semibold text-xs text-[#c5a368]">
                    {userProfile?.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Header Quick Actions */}
        <div className="lg:hidden flex items-center justify-between py-2 border-t border-white/10 text-xs">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1 bg-[#181818] border border-white/10 px-2.5 py-1 rounded-full text-white/70 text-[11px]">
              <Flame className="w-3 h-3 text-[#c5a368]" />
              <span>{userProfile?.streakDays || 1} Day Streak</span>
            </span>
            <span className="text-[11px] text-white/40 font-serif">
              {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>

          <button
            onClick={() => (onOpenCompanion ? onOpenCompanion() : onNavigate("companion"))}
            className="flex items-center space-x-1.5 bg-[#181818] border border-[#c5a368]/40 text-[#c5a368] px-2.5 py-1 rounded-full text-[11px] font-semibold hover:bg-white/5 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>AI Companion</span>
          </button>
        </div>
      </div>
    </header>
  );
};
