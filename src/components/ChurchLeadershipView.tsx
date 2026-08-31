import React, { useState } from "react";
import {
  Church,
  Users,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
  Download,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { SEED_CHURCH_ANALYTICS } from "../data/canonicalData";

export const ChurchLeadershipView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "groups" | "sermons">("overview");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      {/* Header Banner */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-3">
            <Church className="w-4 h-4" />
            <span>Church Leadership & Pastoral Portal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Grace Fellowship Church
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-2">
            {SEED_CHURCH_ANALYTICS.totalMembers} Active Congregants • {SEED_CHURCH_ANALYTICS.smallGroupCount} Discipleship Small Groups
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-[#c5a368] text-black font-bold"
                : "bg-[#181818] border border-white/10 text-white/80 hover:bg-[#222]"
            }`}
          >
            Spiritual Health Trends
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "groups"
                ? "bg-[#c5a368] text-black font-bold"
                : "bg-[#181818] border border-white/10 text-white/80 hover:bg-[#222]"
            }`}
          >
            Small Groups
          </button>
        </div>
      </div>

      {/* Privacy Guardrail Banner */}
      <div className="bg-[#151515] border border-white/10 rounded-2xl p-5 flex items-start space-x-3.5 text-sm sm:text-base text-white/80">
        <ShieldCheck className="w-5 h-5 text-[#c5a368] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Privacy Protection Standard:</strong> All congregational metrics are aggregated and strictly anonymized. Pastors and staff never have access to private journal entries or individual struggle logs.
        </p>
      </div>

      {/* Top High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-xs">
          <span className="text-xs sm:text-sm text-white/50 uppercase tracking-wider font-semibold block mb-1">
            Active Disciples
          </span>
          <p className="font-serif text-3xl sm:text-4xl text-white font-normal">
            {SEED_CHURCH_ANALYTICS.totalMembers}
          </p>
          <span className="text-xs sm:text-sm text-[#c5a368] mt-2 block font-medium">
            ↑ {SEED_CHURCH_ANALYTICS.activeThisWeekPercent}% active this week
          </span>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-xs">
          <span className="text-xs sm:text-sm text-white/50 uppercase tracking-wider font-semibold block mb-1">
            Small Groups
          </span>
          <p className="font-serif text-3xl sm:text-4xl text-white font-normal">
            {SEED_CHURCH_ANALYTICS.smallGroupCount}
          </p>
          <span className="text-xs sm:text-sm text-white/60 mt-2 block font-medium">
            88% weekly attendance
          </span>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-xs">
          <span className="text-xs sm:text-sm text-white/50 uppercase tracking-wider font-semibold block mb-1">
            Top Growth Area
          </span>
          <p className="font-serif text-2xl text-white font-normal truncate">
            {SEED_CHURCH_ANALYTICS.topGrowthAreas[0]?.area}
          </p>
          <span className="text-xs sm:text-sm text-[#c5a368] mt-2 block font-medium">
            {SEED_CHURCH_ANALYTICS.topGrowthAreas[0]?.percent}% of congregation
          </span>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-xs">
          <span className="text-xs sm:text-sm text-white/50 uppercase tracking-wider font-semibold block mb-1">
            Practice Completion Rate
          </span>
          <p className="font-serif text-3xl sm:text-4xl text-white font-normal">
            {SEED_CHURCH_ANALYTICS.dailyPracticeCompletionRate}%
          </p>
          <span className="text-xs sm:text-sm text-white/60 mt-2 block font-medium">
            Daily spiritual habits
          </span>
        </div>
      </div>

      {/* Aggregate Spiritual Struggle Patterns */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs space-y-6">
        <div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#c5a368]">
            Congregational Pulse
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
            Anonymized Spiritual & Life Struggles
          </h2>
          <p className="text-sm sm:text-base text-white/60 mt-1 leading-relaxed">
            Pastoral planning insights to help shape upcoming preaching series and care ministries.
          </p>
        </div>

        <div className="space-y-5">
          {SEED_CHURCH_ANALYTICS.topStruggles.map((struggle) => (
            <div key={struggle.struggle} className="space-y-2">
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span className="font-semibold text-white">{struggle.struggle}</span>
                <span className="font-mono text-sm font-bold text-[#c5a368]">
                  {struggle.count} members ({Math.round((struggle.count / SEED_CHURCH_ANALYTICS.totalMembers) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#181818] h-3 rounded-full overflow-hidden border border-white/10">
                <div
                  className="bg-[#c5a368] h-full rounded-full transition-all"
                  style={{ width: `${(struggle.count / SEED_CHURCH_ANALYTICS.totalMembers) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
