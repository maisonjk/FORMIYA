import React, { useState } from "react";
import {
  X,
  Settings,
  CheckCircle2,
  Trash2,
  Download,
  HardDrive,
} from "lucide-react";
import { UserProfile, BibleTranslation } from "../types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  onResetData,
}) => {
  const [activeTab, setActiveTab] = useState<"general" | "data">("general");
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [confirmPurge, setConfirmPurge] = useState(false);

  if (!isOpen) return null;

  const translations: BibleTranslation[] = ["ESV", "NIV", "CSB", "NASB", "NLT", "KJV"];

  // Export Data Archive
  const handleExportData = () => {
    const exportData = {
      userProfile: {
        name: userProfile.name,
        email: userProfile.email,
        discipleshipLevel: userProfile.discipleshipLevel,
        primaryGrowthArea: userProfile.primaryGrowthArea,
        bibleTranslation: userProfile.bibleTranslation,
        streakDays: parseInt(localStorage.getItem("formed_streak_count") || "5", 10),
        longestStreak: parseInt(localStorage.getItem("formed_streak_longest") || "12", 10),
        streakHistory: JSON.parse(localStorage.getItem("formed_streak_history") || "[]"),
      },
      exportTimestamp: new Date().toISOString(),
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `formiya_discipleship_archive_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportNotice("Discipleship archive downloaded to your device.");
    setTimeout(() => setExportNotice(null), 4000);
  };

  const handlePurgeAllLocalStorage = () => {
    if (!confirmPurge) {
      setConfirmPurge(true);
      return;
    }
    localStorage.removeItem("formed_streak_count");
    localStorage.removeItem("formed_streak_longest");
    localStorage.removeItem("formed_streak_last_date");
    localStorage.removeItem("formed_streak_history");
    localStorage.removeItem("formed_user_profile");
    onResetData();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-white/15 rounded-3xl w-full max-w-2xl p-6 sm:p-9 shadow-2xl space-y-7 max-h-[92vh] overflow-y-auto text-white">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Settings & Preferences
              </h2>
              <p className="text-xs sm:text-sm text-white/60">
                Manage your profile, Scripture translation, and device storage.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 bg-[#161616] p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab("general")}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
              activeTab === "general"
                ? "bg-[#c5a368] text-black font-bold shadow-xs"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>General & Bible</span>
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
              activeTab === "data"
                ? "bg-[#c5a368] text-black font-bold shadow-xs"
                : "text-white/70 hover:text-white"
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>Data & Storage</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: GENERAL & BIBLE PREFERENCES */}
        {/* ========================================================================= */}
        {activeTab === "general" && (
          <div className="space-y-6">
            {/* Preferred Name */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider block">
                Preferred Name
              </label>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => onUpdateProfile({ name: e.target.value })}
                className="w-full p-3.5 rounded-xl border border-white/10 bg-[#181818] text-sm sm:text-base text-white focus:outline-none focus:border-[#c5a368]"
              />
            </div>

            {/* Bible Translation Preference */}
            <div className="space-y-2.5">
              <label className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider block">
                Preferred Scripture Translation
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {translations.map((trans) => (
                  <button
                    key={trans}
                    onClick={() => onUpdateProfile({ bibleTranslation: trans })}
                    className={`p-3 rounded-xl border text-sm font-mono font-medium transition-all ${
                      userProfile.bibleTranslation === trans
                        ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-bold ring-1 ring-[#c5a368]"
                        : "border-white/10 bg-[#151515] text-white/70 hover:bg-[#1f1f1f]"
                    }`}
                  >
                    {trans}
                  </button>
                ))}
              </div>
            </div>

            {/* Church Affiliation */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider block">
                Local Church Community
              </label>
              <input
                type="text"
                value={userProfile.churchName || ""}
                onChange={(e) => onUpdateProfile({ churchName: e.target.value })}
                placeholder="e.g. Grace Fellowship Church"
                className="w-full p-3.5 rounded-xl border border-white/10 bg-[#181818] text-sm sm:text-base text-white focus:outline-none focus:border-[#c5a368]"
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DATA & STORAGE EXPORT / PURGE */}
        {/* ========================================================================= */}
        {activeTab === "data" && (
          <div className="space-y-6">
            <div className="bg-[#151515] border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center space-x-2 text-white">
                <Download className="w-5 h-5 text-[#c5a368]" />
                <h3 className="font-serif text-lg text-white">Export Discipleship Archive</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Download a copy of your formation streaks, growth scores, and discipleship history in standard JSON format.
              </p>
              <button
                onClick={handleExportData}
                className="px-5 py-3 rounded-xl bg-[#1d1d1d] border border-[#c5a368]/40 hover:bg-[#252525] text-[#c5a368] text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export My Data (.JSON)</span>
              </button>

              {exportNotice && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{exportNotice}</span>
                </div>
              )}
            </div>

            {/* Data Purge Section */}
            <div className="bg-[#1a1212] border border-red-900/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center space-x-2 text-red-400">
                <Trash2 className="w-5 h-5" />
                <h3 className="font-serif text-lg text-red-300">Purge Device Local Storage</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                Erase all formation streaks, logged check-in dates, and saved preferences stored in this browser.
              </p>
              <button
                onClick={handlePurgeAllLocalStorage}
                className="px-5 py-3 rounded-xl bg-red-950/60 border border-red-800/50 hover:bg-red-900/60 text-red-200 text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{confirmPurge ? "Click Again to Confirm Data Wipe" : "Wipe All Local Storage Data"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm transition-colors"
          >
            Done & Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
