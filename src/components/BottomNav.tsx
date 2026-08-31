import React, { useState } from "react";
import {
  Home,
  Compass,
  Layers,
  Sparkles,
  Users,
  HelpCircle,
  BookOpen,
  Baby,
  Church,
  Flame,
  User,
  Settings,
  X,
  CreditCard,
} from "lucide-react";
import { UserProfile } from "../types";

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenNextStep: () => void;
  onOpenCompanion: () => void;
  onOpenPricing: () => void;
  onOpenSettings: () => void;
  userProfile?: UserProfile;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenNextStep,
  onOpenCompanion,
  onOpenPricing,
  onOpenSettings,
  userProfile,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const mainTabs = [
    {
      id: "daily",
      label: "Today",
      icon: Home,
      view: "daily",
    },
    {
      id: "journeys",
      label: "Journeys",
      icon: Layers,
      view: "journeys",
    },
    // Center action handled separately
    {
      id: "mirror",
      label: "Mirror",
      icon: Compass,
      view: "mirror",
    },
    {
      id: "more",
      label: "More",
      icon: Users,
      action: "more",
    },
  ];

  const handleTabClick = (tab: typeof mainTabs[0]) => {
    if (tab.action === "more") {
      setIsMoreMenuOpen((prev) => !prev);
    } else if (tab.view) {
      setIsMoreMenuOpen(false);
      onNavigate(tab.view);
    }
  };

  const moreItems = [
    {
      id: "pain",
      label: "What You're Walking Through",
      desc: "Biblical pathways for anxiety, grief & burnout",
      icon: Flame,
      view: "pain",
    },
    {
      id: "groups",
      label: "Small Groups & Mentorship",
      desc: "Community discussions and discipleship pairings",
      icon: Users,
      view: "groups",
    },
    {
      id: "sermons",
      label: "Sermon to Discipleship",
      desc: "Transform Sunday sermons into 5-day daily rhythms",
      icon: BookOpen,
      view: "sermons",
    },
    {
      id: "family",
      label: "FORMIYA Family",
      desc: "Age-tiered 5-minute discipleship moments",
      icon: Baby,
      view: "family",
    },
    {
      id: "church",
      label: "Church Leadership Portal",
      desc: "Aggregated, anonymized spiritual health insights",
      icon: Church,
      view: "church",
    },
    {
      id: "profile",
      label: "Formation Profile & Roadmap",
      desc: "Your 6-stage discipleship growth indicators",
      icon: User,
      view: "profile",
    },
  ];

  return (
    <>
      {/* "More" Bottom Sheet / Menu Overlay */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/75 backdrop-blur-xs flex flex-col justify-end transition-opacity">
          {/* Backdrop click */}
          <div
            className="flex-1 w-full"
            onClick={() => setIsMoreMenuOpen(false)}
          />

          <div className="bg-[#111111] border-t border-white/15 rounded-t-3xl p-5 sm:p-6 pb-26 shadow-2xl max-w-lg mx-auto w-full space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c5a368]" />
                <h3 className="font-serif text-xl font-normal text-white">
                  More Features & Modules
                </h3>
              </div>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-1">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isSelected = currentView === item.view;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsMoreMenuOpen(false);
                      onNavigate(item.view);
                    }}
                    className={`flex items-start space-x-3.5 p-3.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? "bg-[#181818] border border-[#c5a368]/50"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-[#c5a368] text-black"
                          : "bg-[#181818] text-[#c5a368] border border-white/10"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-white block">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm text-white/70 line-clamp-1 mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions Row in Sheet */}
            <div className="pt-3.5 border-t border-white/10 grid grid-cols-3 gap-2.5 text-center">
              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenCompanion();
                }}
                className="p-3 rounded-xl bg-[#181818] border border-white/10 text-white/90 hover:text-white hover:border-[#c5a368]/50 flex flex-col items-center space-y-1.5 transition-colors"
              >
                <Sparkles className="w-5 h-5 text-[#c5a368]" />
                <span className="text-xs font-semibold">AI Companion</span>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenPricing();
                }}
                className="p-3 rounded-xl bg-[#181818] border border-white/10 text-white/90 hover:text-white hover:border-[#c5a368]/50 flex flex-col items-center space-y-1.5 transition-colors"
              >
                <CreditCard className="w-5 h-5 text-[#c5a368]" />
                <span className="text-xs font-semibold">Membership</span>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenSettings();
                }}
                className="p-3 rounded-xl bg-[#181818] border border-white/10 text-white/90 hover:text-white hover:border-[#c5a368]/50 flex flex-col items-center space-y-1.5 transition-colors"
              >
                <Settings className="w-5 h-5 text-[#c5a368]" />
                <span className="text-xs font-semibold">Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating / Docked Bottom App Bar */}
      <nav
        id="app-bottom-buttons"
        aria-label="App Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/15 transition-all safe-area-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.7)]"
      >
        <div className="max-w-md md:max-w-xl mx-auto px-4 sm:px-6 h-17 sm:h-19 flex items-center justify-between relative">
          {/* Tab 1: Today */}
          <button
            id="btn-nav-today"
            onClick={() => handleTabClick(mainTabs[0])}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all ${
              currentView === "daily"
                ? "text-[#c5a368]"
                : "text-white/50 hover:text-white/90"
            }`}
          >
            <Home
              className={`w-5 h-5 transition-transform ${
                currentView === "daily" ? "scale-110" : ""
              }`}
            />
            <span
              className={`text-xs tracking-wide mt-1 font-medium ${
                currentView === "daily" ? "font-bold text-[#c5a368]" : ""
              }`}
            >
              Today
            </span>
            {currentView === "daily" && (
              <span className="w-1.5 h-1.5 bg-[#c5a368] rounded-full mt-0.5" />
            )}
          </button>

          {/* Tab 2: Journeys */}
          <button
            id="btn-nav-journeys"
            onClick={() => handleTabClick(mainTabs[1])}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all ${
              currentView === "journeys"
                ? "text-[#c5a368]"
                : "text-white/50 hover:text-white/90"
            }`}
          >
            <Layers
              className={`w-5 h-5 transition-transform ${
                currentView === "journeys" ? "scale-110" : ""
              }`}
            />
            <span
              className={`text-xs tracking-wide mt-1 font-medium ${
                currentView === "journeys" ? "font-bold text-[#c5a368]" : ""
              }`}
            >
              Journeys
            </span>
            {currentView === "journeys" && (
              <span className="w-1.5 h-1.5 bg-[#c5a368] rounded-full mt-0.5" />
            )}
          </button>

          {/* Center Prominent Action Button: "What Should I Do Next?" */}
          <div className="flex-1 flex justify-center -mt-6 sm:-mt-7 relative px-1">
            <button
              id="btn-nav-next-step"
              onClick={onOpenNextStep}
              className="group relative flex flex-col items-center focus:outline-none"
              title="What should I do right now?"
            >
              {/* Outer Golden Glow Ring */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#c5a368] via-[#e5c994] to-[#a88748] p-0.5 shadow-[0_0_22px_rgba(197,163,104,0.45)] group-hover:shadow-[0_0_30px_rgba(197,163,104,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <div className="w-full h-full rounded-full bg-[#0e0e0e] flex flex-col items-center justify-center group-hover:bg-[#161616] transition-colors border border-[#c5a368]/30">
                  <HelpCircle className="w-6 h-6 text-[#c5a368] group-hover:text-white transition-colors" />
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#c5a368] tracking-wider uppercase mt-1 whitespace-nowrap drop-shadow">
                Next Step
              </span>
            </button>
          </div>

          {/* Tab 3: Mirror */}
          <button
            id="btn-nav-mirror"
            onClick={() => handleTabClick(mainTabs[2])}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all ${
              currentView === "mirror"
                ? "text-[#c5a368]"
                : "text-white/50 hover:text-white/90"
            }`}
          >
            <Compass
              className={`w-5 h-5 transition-transform ${
                currentView === "mirror" ? "scale-110" : ""
              }`}
            />
            <span
              className={`text-xs tracking-wide mt-1 font-medium ${
                currentView === "mirror" ? "font-bold text-[#c5a368]" : ""
              }`}
            >
              Mirror
            </span>
            {currentView === "mirror" && (
              <span className="w-1.5 h-1.5 bg-[#c5a368] rounded-full mt-0.5" />
            )}
          </button>

          {/* Tab 4: More / Community */}
          <button
            id="btn-nav-more"
            onClick={() => handleTabClick(mainTabs[3])}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all ${
              isMoreMenuOpen ||
              ["pain", "groups", "sermons", "family", "church", "profile"].includes(
                currentView
              )
                ? "text-[#c5a368]"
                : "text-white/50 hover:text-white/90"
            }`}
          >
            <Users
              className={`w-5 h-5 transition-transform ${
                isMoreMenuOpen ||
                ["pain", "groups", "sermons", "family", "church", "profile"].includes(
                  currentView
                )
                  ? "scale-110"
                  : ""
              }`}
            />
            <span
              className={`text-xs tracking-wide mt-1 font-medium ${
                isMoreMenuOpen ||
                ["pain", "groups", "sermons", "family", "church", "profile"].includes(
                  currentView
                )
                  ? "font-bold text-[#c5a368]"
                  : ""
              }`}
            >
              More
            </span>
            {(isMoreMenuOpen ||
              ["pain", "groups", "sermons", "family", "church", "profile"].includes(
                currentView
              )) && (
              <span className="w-1.5 h-1.5 bg-[#c5a368] rounded-full mt-0.5" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
