import React from "react";
import {
  Compass,
  BookOpen,
  HeartHandshake,
  Users,
  Home,
  Layers,
  Flame,
  Shield,
  CreditCard,
  Settings,
  Baby,
  BookMarked,
} from "lucide-react";
import { UserProfile, SubscriptionTier } from "../types";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userProfile?: UserProfile;
  userTier?: SubscriptionTier;
  onOpenNextStep?: () => void;
  onOpenPricing: () => void;
  onOpenSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  userProfile,
  userTier = "plus",
  onOpenNextStep,
  onOpenPricing,
  onOpenSettings,
}) => {
  const tier = userProfile?.tier || userTier;

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 transition-all text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate("landing")}
              className="flex items-center text-left focus:outline-none group"
            >
              <span className="font-display font-bold text-xl tracking-[0.18em] text-white uppercase leading-tight group-hover:text-[#c5a368] transition-colors">
                FORMIYA
              </span>
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

              <button
                onClick={() => onNavigate("journal")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  currentView === "journal"
                    ? "bg-[#181818] text-[#c5a368] border border-[#c5a368]/30 font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <BookMarked className="w-4 h-4 text-[#c5a368]" />
                <span>Journal</span>
              </button>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Hub Dropdown / Buttons for Pro & Church Tools */}
            <div className="hidden md:flex items-center space-x-1">
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
            </div>

            {/* Tier / Upgrade Badge */}
            <button
              onClick={onOpenPricing}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1 ${
                tier === "pro"
                  ? "bg-[#c5a368] text-black"
                  : "bg-[#1a1a1a] text-[#c5a368] border border-[#c5a368]/30"
              }`}
            >
              <span>{tier.toUpperCase()}</span>
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              title="Settings"
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
        </div>
      </div>
    </header>
  );
};
