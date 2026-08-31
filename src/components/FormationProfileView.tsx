import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Calendar,
  Award,
  RotateCcw,
  Plus,
  Check,
  Trophy,
  ShieldCheck,
  Zap,
  Lock,
  EyeOff,
  HardDrive,
  UserCheck,
  Settings,
} from "lucide-react";
import confetti from "canvas-confetti";
import { UserProfile, DiscipleshipLevel } from "../types";

interface FormationProfileViewProps {
  userProfile: UserProfile;
  onStartJourney: (journeyId: string) => void;
  onNavigate: (view: string) => void;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  onOpenSettings?: () => void;
}

const DISCIPLESHIP_LEVELS: { level: DiscipleshipLevel; num: number; desc: string }[] = [
  { level: "Seeking", num: 1, desc: "Exploring Christianity, asking questions, seeking truth." },
  { level: "Rooted", num: 2, desc: "Learning core biblical foundations, Gospel assurance, and Scripture basics." },
  { level: "Following", num: 3, desc: "Building sustainable daily prayer and meditation rhythms." },
  { level: "Forming", num: 4, desc: "Cultivating Christlike character, humility, and deeper emotional health." },
  { level: "Serving", num: 5, desc: "Actively using spiritual gifts, hospitality, and generosity for others." },
  { level: "Discipling", num: 6, desc: "Walking alongside another believer and helping them follow Jesus." },
];

const STREAK_MILESTONES = [
  { days: 3, title: "Seedling Habit", desc: "First 3 consistent days in the Word", icon: "🌱" },
  { days: 7, title: "Rooted Week", desc: "A full week of intentional presence", icon: "🌿" },
  { days: 14, title: "Formed Rhythm", desc: "Two weeks of regular discipleship", icon: "💧" },
  { days: 30, title: "Transformed Heart", desc: "A month of holy transformation", icon: "🏺" },
  { days: 50, title: "Lifelong Disciple", desc: "Enduring steadfastness in Christ", icon: "🔥" },
];

export const FormationProfileView: React.FC<FormationProfileViewProps> = ({
  userProfile,
  onStartJourney,
  onNavigate,
  onUpdateProfile,
  onOpenSettings,
}) => {
  const { indicators } = userProfile;
  const isIncognito = userProfile.privacySettings?.incognitoMode;

  // Local Storage Keys
  const STREAK_KEY = "formed_streak_count";
  const LONGEST_STREAK_KEY = "formed_streak_longest";
  const LAST_DATE_KEY = "formed_streak_last_date";
  const HISTORY_KEY = "formed_streak_history";

  const getTodayDateString = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Formation Streak State initialized from localStorage
  const [streakCount, setStreakCount] = useState<number>(() => {
    const saved = localStorage.getItem(STREAK_KEY);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return userProfile.streakDays || 5;
  });

  const [longestStreak, setLongestStreak] = useState<number>(() => {
    const saved = localStorage.getItem(LONGEST_STREAK_KEY);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return Math.max(streakCount, 12);
  });

  const [lastLoggedDate, setLastLoggedDate] = useState<string>(() => {
    return localStorage.getItem(LAST_DATE_KEY) || getTodayDateString();
  });

  const [streakHistory, setStreakHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Generate recent dummy history if none
    const today = new Date();
    const days: string[] = [];
    for (let i = 4; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  });

  const [justCheckedIn, setJustCheckedIn] = useState<boolean>(false);
  const todayString = getTodayDateString();
  const isTodayCompleted = lastLoggedDate === todayString || streakHistory.includes(todayString);

  // Sync to local storage whenever streak changes
  useEffect(() => {
    localStorage.setItem(STREAK_KEY, streakCount.toString());
    localStorage.setItem(LONGEST_STREAK_KEY, longestStreak.toString());
    localStorage.setItem(LAST_DATE_KEY, lastLoggedDate);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(streakHistory));
    
    // Also notify parent if profile update handler exists
    if (onUpdateProfile && userProfile.streakDays !== streakCount) {
      onUpdateProfile({ streakDays: streakCount });
    }
  }, [streakCount, longestStreak, lastLoggedDate, streakHistory]);

  const handleCheckInToday = () => {
    if (!isTodayCompleted) {
      const newStreak = streakCount + 1;
      const newLongest = Math.max(newStreak, longestStreak);
      const newHistory = [...new Set([...streakHistory, todayString])];

      setStreakCount(newStreak);
      setLongestStreak(newLongest);
      setLastLoggedDate(todayString);
      setStreakHistory(newHistory);
      setJustCheckedIn(true);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#c5a368", "#f3e8cb", "#ffffff", "#ffd700"],
      });

      setTimeout(() => setJustCheckedIn(false), 4000);
    } else {
      // Toggle or show feedback
      setJustCheckedIn(true);
      setTimeout(() => setJustCheckedIn(false), 2000);
    }
  };

  const handleManualIncrement = () => {
    const newStreak = streakCount + 1;
    const newLongest = Math.max(newStreak, longestStreak);
    setStreakCount(newStreak);
    setLongestStreak(newLongest);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#c5a368", "#d8b67b"],
    });
  };

  const handleResetStreak = () => {
    if (window.confirm("Would you like to reset your active streak to 1 day? (Your longest streak will remain preserved)")) {
      setStreakCount(1);
      setLastLoggedDate(todayString);
      setStreakHistory([todayString]);
    }
  };

  // Find next milestone
  const nextMilestone = STREAK_MILESTONES.find((m) => m.days > streakCount) || {
    days: streakCount + 10,
    title: "Enduring Consistency",
    desc: "Every day abiding in Christ",
    icon: "👑",
  };
  const prevMilestoneDays = STREAK_MILESTONES.slice().reverse().find((m) => m.days <= streakCount)?.days || 0;
  const milestoneProgress = Math.min(
    100,
    Math.round(((streakCount - prevMilestoneDays) / (nextMilestone.days - prevMilestoneDays)) * 100)
  );

  // Generate 7-day rolling window for weekly visualizer
  const getWeeklyDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = d.getDate();
      const isToday = dateStr === todayString;
      const isCompleted = streakHistory.includes(dateStr) || (isToday && isTodayCompleted);
      days.push({ dateStr, dayName, dayNumber, isToday, isCompleted });
    }
    return days;
  };

  const weeklyDays = getWeeklyDays();

  const indicatorList = [
    { label: "Scripture", score: indicators.scripture, desc: "Frequency & depth in the Word" },
    { label: "Prayer", score: indicators.prayer, desc: "Conversational intimacy with God" },
    { label: "Community", score: indicators.community, desc: "Authentic local church & group connections" },
    { label: "Scripture Application", score: indicators.scriptureApplication, desc: "Practicing what is heard" },
    { label: "Spiritual Disciplines", score: indicators.spiritualDisciplines, desc: "Silence, Sabbath, gratitude" },
    { label: "Service", score: indicators.service, desc: "Loving others tangibly & generously" },
    { label: "Discipleship", score: indicators.discipleship, desc: "Investing in another person's growth" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      {/* Header Banner */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Personalized Discipleship Map</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            {userProfile.name}'s Formation Profile
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-2 leading-relaxed">
            Current Focus: <span className="font-semibold text-white">{userProfile.primaryGrowthArea}</span> • Stage:{" "}
            <span className="font-semibold text-[#c5a368]">{userProfile.discipleshipLevel}</span>
          </p>
        </div>

        <button
          onClick={() => onNavigate("daily")}
          className="px-6 py-3.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm sm:text-base flex items-center space-x-2.5 shadow-sm transition-all whitespace-nowrap self-start md:self-auto"
        >
          <span>Today's Formation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* FORMATION STREAK COUNTER HERO CARD (PERSISTENT VIA LOCAL STORAGE) */}
      {/* ========================================================================= */}
      <div className="bg-radial from-[#1e1a14] via-[#121212] to-[#0d0d0d] border border-[#c5a368]/40 rounded-3xl p-6 sm:p-9 shadow-lg space-y-8 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#c5a368]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Counter Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-[#1b1915] border border-[#c5a368]/40 text-[#c5a368] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-[#c5a368] fill-[#c5a368]" />
              <span>Daily Consistency Rhythm</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
              Formation Streak
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
              Cultivating a quiet daily rhythm of Scripture, listening prayer, and heart alignment. Persisted locally to help you stay faithful.
            </p>
          </div>

          {/* Big Streak Metric Display */}
          <div className="bg-[#161616]/90 border border-white/10 rounded-2xl p-5 sm:p-6 flex items-center space-x-5 shrink-0 self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#221c13] border border-[#c5a368]/50 flex items-center justify-center shadow-inner relative">
              <Flame className="w-9 h-9 sm:w-11 sm:h-11 text-[#c5a368] fill-[#c5a368] animate-pulse" />
              {isTodayCompleted && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  {streakCount}
                </span>
                <span className="text-base sm:text-lg font-medium text-[#c5a368]">
                  {streakCount === 1 ? "Day" : "Days"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/60 font-normal">
                {isTodayCompleted ? "Active today • Saved in storage" : "Ready for today's check-in"}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Streak Stats & Milestone Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Stat 1: Current Streak Status */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1d1d1d] border border-white/10 flex items-center justify-center text-[#c5a368]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-white/50 block font-medium">Current Streak</span>
              <span className="font-serif text-lg sm:text-xl text-white font-normal">
                {streakCount} Consecutive {streakCount === 1 ? "Day" : "Days"}
              </span>
            </div>
          </div>

          {/* Stat 2: Longest Streak */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1d1d1d] border border-white/10 flex items-center justify-center text-[#c5a368]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-white/50 block font-medium">Longest Record</span>
              <span className="font-serif text-lg sm:text-xl text-white font-normal">
                {longestStreak} Days Streak
              </span>
            </div>
          </div>

          {/* Stat 3: Next Milestone */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1d1d1d] border border-white/10 flex items-center justify-center text-xl">
              <span>{nextMilestone.icon}</span>
            </div>
            <div>
              <span className="text-xs text-white/50 block font-medium">Next Milestone</span>
              <span className="font-serif text-lg sm:text-xl text-white font-normal">
                {nextMilestone.title} ({nextMilestone.days}d)
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-semibold text-white/90 flex items-center space-x-1.5">
              <span>Milestone Progress:</span>
              <span className="text-[#c5a368]">{nextMilestone.title}</span>
            </span>
            <span className="font-mono text-[#c5a368] font-bold">
              {streakCount} / {nextMilestone.days} Days ({milestoneProgress}%)
            </span>
          </div>
          <div className="w-full bg-[#1e1e1e] h-3 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-[#c5a368] h-full rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${milestoneProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-white/50">
            <span>{nextMilestone.desc}</span>
            <span>{Math.max(0, nextMilestone.days - streakCount)} days remaining</span>
          </div>
        </div>

        {/* 7-Day Consistency Week Strip */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#c5a368]" />
              <span>Past 7 Days Consistency</span>
            </span>
            <span className="text-xs text-white/40 font-mono">
              Today: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {weeklyDays.map((day, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between space-y-2 ${
                  day.isToday
                    ? day.isCompleted
                      ? "bg-[#221c13] border-[#c5a368] ring-1 ring-[#c5a368]"
                      : "bg-[#181818] border-[#c5a368]/60"
                    : day.isCompleted
                    ? "bg-[#161616] border-white/15"
                    : "bg-[#101010] border-white/5 opacity-60"
                }`}
              >
                <span className="text-[11px] sm:text-xs font-semibold text-white/60 uppercase">
                  {day.dayName}
                </span>

                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    day.isCompleted
                      ? "bg-[#c5a368] text-black shadow-xs"
                      : day.isToday
                      ? "bg-[#262626] text-[#c5a368] border border-[#c5a368]/40"
                      : "bg-[#1c1c1c] text-white/30"
                  }`}
                >
                  {day.isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : day.dayNumber}
                </div>

                <span className="text-[10px] text-white/40 font-medium truncate max-w-full">
                  {day.isToday ? "Today" : day.isCompleted ? "Done" : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCheckInToday}
              className={`px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 transition-all shadow-md ${
                isTodayCompleted
                  ? "bg-[#1c1a14] border border-[#c5a368]/60 text-[#c5a368] hover:bg-[#252219]"
                  : "bg-[#c5a368] hover:bg-[#d8b67b] text-black"
              }`}
            >
              {isTodayCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368]" />
                  <span>{justCheckedIn ? "Streak Updated & Saved!" : "Formation Completed Today"}</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4" />
                  <span>Log Today's Formation</span>
                </>
              )}
            </button>

            <button
              onClick={handleManualIncrement}
              title="Add a formation session to streak"
              className="p-3.5 rounded-xl bg-[#161616] border border-white/10 hover:border-[#c5a368]/40 text-white/70 hover:text-white transition-colors flex items-center justify-center text-xs"
            >
              <Plus className="w-4 h-4 mr-1 text-[#c5a368]" />
              <span>+1 Day</span>
            </button>
          </div>

          <button
            onClick={handleResetStreak}
            className="text-xs text-white/40 hover:text-white/70 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors self-end sm:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Active Streak</span>
          </button>
        </div>

        {/* Theological Grounding Note */}
        <div className="bg-[#141414] border-l-2 border-[#c5a368] p-4 rounded-r-xl">
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed italic">
            <strong className="text-[#c5a368] not-italic font-semibold">Theology of Rhythm:</strong> Discipleship is not about earning God's affection through unbroken performance; it is about cultivating daily attentiveness to His presence. <span className="text-white/90">"His mercies are new every morning."</span> (Lam. 3:22–23)
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRIVACY SHIELD & DATA SOVEREIGNTY STATUS CARD */}
      {/* ========================================================================= */}
      <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a1712] border border-[#c5a368]/30 flex items-center justify-center text-[#c5a368]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-xl font-normal text-white">
                  Privacy-Safe Discipleship
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                  Active Shield
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/60">
                Zero ad tracking • End-to-end device storage • Pastoral privacy protected
              </p>
            </div>
          </div>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] hover:bg-[#222222] border border-white/10 text-xs sm:text-sm font-semibold text-white/80 hover:text-white flex items-center space-x-2 transition-colors self-start sm:self-auto"
            >
              <Settings className="w-4 h-4 text-[#c5a368]" />
              <span>Privacy & Storage Settings</span>
            </button>
          )}
        </div>

        {/* 3 Privacy Pillar Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="bg-[#161616] border border-white/5 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#c5a368]">
              <HardDrive className="w-3.5 h-3.5" />
              <span>Local Device Storage</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Streaks and reflections are saved locally in your browser, not in a commercial cloud tracking database.
            </p>
          </div>

          <div className="bg-[#161616] border border-white/5 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#c5a368]">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Pastoral Confidentiality Wall</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Pastors and small group leaders only see anonymized community health metrics. Your prayers stay private.
            </p>
          </div>

          <div className="bg-[#161616] border border-white/5 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#c5a368]">
              <Lock className="w-3.5 h-3.5" />
              <span>No AI Model Training</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Your intimate prayers and confessions are ephemeral and never used to train public language models.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Focus Card */}
      <div className="bg-[#151515] border border-[#c5a368]/40 rounded-2xl p-6 sm:p-9 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#c5a368]">
              Your Next Growth Area
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Cultivating Consistent Prayer & Contemplation
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              Based on your initial discovery reflection, you desire to transition from transactional prayer lists to quiet, listening presence with God.
            </p>
          </div>

          <button
            onClick={() => onStartJourney("journey_prayer")}
            className="px-6 py-3.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm sm:text-base flex items-center space-x-2.5 transition-all shadow-sm whitespace-nowrap self-stretch md:self-auto justify-center"
          >
            <span>Start 14-Day Prayer Rhythm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* The 6 Discipleship Stages */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs space-y-6">
        <div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#c5a368]">
            The Discipleship Roadmap
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
            Stages of Spiritual Maturation
          </h3>
          <p className="text-sm sm:text-base text-white/60 mt-1 leading-relaxed">
            Spiritual growth is not a linear climb, but an organic deepening into Christ.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DISCIPLESHIP_LEVELS.map((stage) => {
            const isCurrent = stage.level === userProfile.discipleshipLevel;
            return (
              <div
                key={stage.level}
                className={`p-5 rounded-2xl border transition-all ${
                  isCurrent
                    ? "bg-[#181818] border-[#c5a368] ring-1 ring-[#c5a368]"
                    : "bg-[#141414] border-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-white/50">
                    STAGE 0{stage.num}
                  </span>
                  {isCurrent && (
                    <span className="text-xs font-bold text-[#c5a368] bg-[#1a1a1a] border border-[#c5a368]/30 px-2 py-0.5 rounded">
                      Current
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-xl font-normal text-white mb-2">
                  {stage.level}
                </h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7 Holistic Indicator Bars */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs space-y-6">
        <div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#c5a368]">
            Diagnostic Health
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
            7 Holistic Discipleship Indicators
          </h3>
          <p className="text-sm sm:text-base text-white/60 mt-1 leading-relaxed">
            These metrics guide your weekly practice recommendations.
          </p>
        </div>

        <div className="space-y-5">
          {indicatorList.map((ind) => (
            <div key={ind.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm sm:text-base">
                <div>
                  <span className="font-semibold text-white">{ind.label}</span>
                  <span className="text-xs sm:text-sm text-white/50 ml-2">
                    — {ind.desc}
                  </span>
                </div>
                <span className="font-mono text-sm font-bold text-[#c5a368]">
                  {ind.score}/10
                </span>
              </div>
              <div className="w-full bg-[#181818] h-3 rounded-full overflow-hidden border border-white/10">
                <div
                  className="bg-[#c5a368] h-full rounded-full transition-all duration-500"
                  style={{ width: `${ind.score * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
