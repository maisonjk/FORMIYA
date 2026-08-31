import React, { useState } from "react";
import {
  X,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  BookOpen,
  Sparkles,
  Lock,
  Download,
  EyeOff,
  UserCheck,
  FileText,
  AlertTriangle,
  HardDrive,
  Info,
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
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<"general" | "privacy" | "data">("privacy");
  const [showCharter, setShowCharter] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const translations: BibleTranslation[] = ["ESV", "NIV", "CSB", "NASB", "NLT", "KJV"];

  const privacy = userProfile.privacySettings || {
    localOnlyStorage: true,
    incognitoMode: false,
    anonymizeChurchMetrics: true,
    allowHeartMirror: userProfile.memorySettings.allowHeartMirror,
    ephemeralAiOnly: true,
  };

  const updatePrivacy = (partial: Partial<typeof privacy>) => {
    const updatedPrivacy = { ...privacy, ...partial };
    onUpdateProfile({
      privacySettings: updatedPrivacy,
      memorySettings: {
        ...userProfile.memorySettings,
        allowHeartMirror: updatedPrivacy.allowHeartMirror,
      },
    });
  };

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
      privacyAssurance: "Exported directly from client-side storage. No server storage maintained.",
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `formiya_discipleship_archive_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportNotice("Discipleship archive downloaded securely to your device.");
    setTimeout(() => setExportNotice(null), 4000);
  };

  const handlePurgeAllLocalStorage = () => {
    if (window.confirm("Purge all local discipleship data (streaks, reflections, local preferences) from this browser? This action cannot be undone.")) {
      localStorage.removeItem("formed_streak_count");
      localStorage.removeItem("formed_streak_longest");
      localStorage.removeItem("formed_streak_last_date");
      localStorage.removeItem("formed_streak_history");
      localStorage.removeItem("formed_user_profile");
      onResetData();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-white/15 rounded-3xl w-full max-w-2xl p-6 sm:p-9 shadow-2xl space-y-7 max-h-[92vh] overflow-y-auto text-white">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Privacy & Preferences
              </h2>
              <p className="text-xs sm:text-sm text-white/60">
                End-to-end privacy, local storage sovereignty, and discipleship settings.
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
            onClick={() => setActiveTab("privacy")}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
              activeTab === "privacy"
                ? "bg-[#c5a368] text-black font-bold shadow-xs"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy & Shield</span>
          </button>
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
            <span>Data Sovereignty</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: PRIVACY & SHIELD */}
        {/* ========================================================================= */}
        {activeTab === "privacy" && (
          <div className="space-y-6">
            {/* Privacy Shield Status Banner */}
            <div className="bg-radial from-[#1e1a14] to-[#141414] border border-[#c5a368]/50 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-[#c5a368]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Pastoral Confidentiality Covenant Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                Your private confessions, raw prayers, and streak history are protected by design. We do not sell data, use tracking cookies, or train public AI models on your private devotionals.
              </p>
            </div>

            {/* Privacy Toggles List */}
            <div className="space-y-4">
              {/* 1. Local-Only Storage */}
              <div className="bg-[#151515] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-[#c5a368]" />
                    <span className="font-semibold text-white text-sm sm:text-base">
                      Local-First Device Storage
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Keep your formation streak, daily check-ins, and journal drafts stored solely on this browser’s local storage rather than in a cloud database.
                  </p>
                </div>
                <button
                  onClick={() => updatePrivacy({ localOnlyStorage: !privacy.localOnlyStorage })}
                  className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${
                    privacy.localOnlyStorage ? "bg-[#c5a368]" : "bg-[#252525]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform ${
                      privacy.localOnlyStorage ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* 2. Pastoral Privacy Wall (Anonymize Church Metrics) */}
              <div className="bg-[#151515] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-[#c5a368]" />
                    <span className="font-semibold text-white text-sm sm:text-base">
                      Pastoral Privacy Wall (Anonymized Metrics)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Pastors and small group leaders only see aggregate cohort statistics. Your personal name and specific prayer reflections remain 100% private.
                  </p>
                </div>
                <button
                  onClick={() => updatePrivacy({ anonymizeChurchMetrics: !privacy.anonymizeChurchMetrics })}
                  className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${
                    privacy.anonymizeChurchMetrics ? "bg-[#c5a368]" : "bg-[#252525]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform ${
                      privacy.anonymizeChurchMetrics ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* 3. Incognito Formation / Ghost Mode */}
              <div className="bg-[#151515] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center space-x-2">
                    <EyeOff className="w-4 h-4 text-[#c5a368]" />
                    <span className="font-semibold text-white text-sm sm:text-base">
                      Incognito Formation Mode
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Temporarily disable streak tracking and journal history recording (ideal when using a shared library or family computer).
                  </p>
                </div>
                <button
                  onClick={() => updatePrivacy({ incognitoMode: !privacy.incognitoMode })}
                  className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${
                    privacy.incognitoMode ? "bg-[#c5a368]" : "bg-[#252525]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform ${
                      privacy.incognitoMode ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* 4. Heart Mirror Intelligence Opt-In */}
              <div className="bg-[#151515] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#c5a368]" />
                    <span className="font-semibold text-white text-sm sm:text-base">
                      Heart Mirror Reflection Scanning
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Allow client-side intelligence to gently scan your personal reflections for recurring spiritual themes and emotional loops.
                  </p>
                </div>
                <button
                  onClick={() => updatePrivacy({ allowHeartMirror: !privacy.allowHeartMirror })}
                  className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${
                    privacy.allowHeartMirror ? "bg-[#c5a368]" : "bg-[#252525]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform ${
                      privacy.allowHeartMirror ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Privacy Charter Modal Link */}
            <div className="pt-2">
              <button
                onClick={() => setShowCharter(!showCharter)}
                className="text-xs sm:text-sm text-[#c5a368] hover:underline flex items-center space-x-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>{showCharter ? "Hide Discipleship Privacy Covenant" : "Read Full Discipleship Privacy Covenant (5 Core Guarantees)"}</span>
              </button>

              {showCharter && (
                <div className="mt-4 bg-[#181818] border border-white/10 rounded-2xl p-5 space-y-3 text-xs sm:text-sm text-white/80 leading-relaxed">
                  <h4 className="font-serif text-base text-[#c5a368] font-medium">
                    The FORMIYA Pastoral Confidentiality Covenant
                  </h4>
                  <ul className="space-y-2 list-disc list-inside text-white/70">
                    <li><strong>1. No Data Monetization:</strong> We will never sell, rent, or monetize your spiritual reflections or usage data.</li>
                    <li><strong>2. Client-Side Encryption & Storage:</strong> Streak records and prayer journals live on your local device.</li>
                    <li><strong>3. Ephemeral AI:</strong> Theological prompts and companion interactions are stateless; your confessions are never used to train public language models.</li>
                    <li><strong>4. Pastoral Wall:</strong> Church metrics are permanently de-identified from individual members.</li>
                    <li><strong>5. Total Data Portability:</strong> You can export or erase all personal data at any time with one click.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: GENERAL & BIBLE PREFERENCES */}
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
        {/* TAB 3: DATA SOVEREIGNTY & EXPORT / PURGE */}
        {/* ========================================================================= */}
        {activeTab === "data" && (
          <div className="space-y-6">
            <div className="bg-[#151515] border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center space-x-2 text-white">
                <Download className="w-5 h-5 text-[#c5a368]" />
                <h3 className="font-serif text-lg text-white">Export Discipleship Archive</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Download an offline backup of your formation streaks, growth scores, and discipleship history in standard JSON format.
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
                <span>Wipe All Local Storage Data</span>
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
