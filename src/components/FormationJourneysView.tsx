import React, { useState } from "react";
import {
  Layers,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Lock,
  ArrowLeft,
  Send,
  Check,
  Type,
} from "lucide-react";
import confetti from "canvas-confetti";
import { FormationJourney, UserProfile } from "../types";
import { FORMATION_JOURNEYS } from "../data/canonicalData";

interface FormationJourneysViewProps {
  userProfile: UserProfile;
  activeJourneyId: string;
  onSelectJourney: (journeyId: string) => void;
  onOpenPricing: () => void;
  onCompleteDay: (journeyId: string, day: number) => void;
}

export const FormationJourneysView: React.FC<FormationJourneysViewProps> = ({
  userProfile,
  activeJourneyId,
  onSelectJourney,
  onOpenPricing,
  onCompleteDay,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeDayNum, setActiveDayNum] = useState<number>(1);
  const [journalNote, setJournalNote] = useState<string>("");
  const [savedDay, setSavedDay] = useState<boolean>(false);

  const categories = ["All", "Beginner", "Prayer", "Suffering", "Habits", "Character", "Advanced"];

  const currentJourney =
    FORMATION_JOURNEYS.find((j) => j.id === activeJourneyId) ||
    FORMATION_JOURNEYS[0];

  const currentDayData =
    currentJourney.days.find((d) => d.day === activeDayNum) ||
    currentJourney.days[0];

  const handleFinishDay = () => {
    onCompleteDay(currentJourney.id, activeDayNum);
    setSavedDay(true);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.75 },
      colors: ["#c5a368", "#d8b67b", "#ffffff"],
    });
    setTimeout(() => setSavedDay(false), 2500);
  };

  const filteredJourneys = FORMATION_JOURNEYS.filter(
    (j) => selectedCategory === "All" || j.category === selectedCategory
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      {/* Header */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-3">
            <Layers className="w-4 h-4" />
            <span>Structured Discipleship Pathways</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Formation Journeys
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-2 max-w-xl leading-relaxed">
            Step-by-step pathways designed to walk you from understanding into daily spiritual practice.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar self-stretch md:self-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#c5a368] text-black"
                  : "bg-[#151515] border border-white/10 text-white/80 hover:bg-[#202020]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Selected Journey Reader / Practice Interface */}
      <div className="bg-[#111111] border border-white/15 rounded-2xl p-6 sm:p-9 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368] bg-[#181818] border border-[#c5a368]/30 px-3 py-1 rounded-lg">
              Currently Practicing • {currentJourney.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mt-2.5">
              {currentJourney.title}
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-1">
              {currentJourney.tagline}
            </p>
          </div>

          {/* Day Selector Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            {currentJourney.days.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDayNum(d.day)}
                className={`w-10 h-10 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all flex items-center justify-center ${
                  activeDayNum === d.day
                    ? "bg-[#c5a368] text-black shadow-xs ring-2 ring-[#c5a368]/30"
                    : "bg-[#181818] border border-white/10 text-white/80 hover:bg-[#222]"
                }`}
              >
                D{d.day}
              </button>
            ))}
          </div>
        </div>

        {/* Day Content */}
        {currentDayData && (
          <div className="space-y-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs sm:text-sm font-bold font-mono uppercase text-[#c5a368]">
                  Day {currentDayData.day} of {currentJourney.durationDays}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-0.5">
                  {currentDayData.title}
                </h3>
              </div>
              <span className="text-xs sm:text-sm font-mono font-medium text-white/80 bg-[#181818] px-3.5 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto">
                {currentDayData.scriptureRef}
              </span>
            </div>

            {/* Scripture Quote */}
            <div className="bg-[#151515] border-l-3 border-[#c5a368] p-6 rounded-r-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368] block mb-2">
                Scripture Reading
              </span>
              <p className="font-serif text-lg sm:text-xl lg:text-2xl text-white/95 italic leading-relaxed sm:leading-loose">
                "{currentDayData.scriptureText}"
              </p>
            </div>

            {/* Context & Explanation */}
            <div className="space-y-2 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider">
                Context & Meaning
              </h4>
              <p>{currentDayData.context}</p>
            </div>

            {/* Reflection & Prayer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 space-y-2.5">
                <span className="text-xs sm:text-sm font-bold text-[#c5a368] block uppercase tracking-wider">
                  Today's Reflection Question:
                </span>
                <p className="font-serif text-base sm:text-lg text-white/90 leading-relaxed">
                  "{currentDayData.reflectionPrompt}"
                </p>
              </div>

              <div className="bg-[#181818] border border-[#c5a368]/30 rounded-2xl p-6 space-y-2.5">
                <span className="text-xs sm:text-sm font-bold text-[#c5a368] block uppercase tracking-wider">
                  Conversational Prayer:
                </span>
                <p className="font-serif text-base sm:text-lg text-white/90 italic leading-relaxed">
                  "{currentDayData.prayerPrompt}"
                </p>
              </div>
            </div>

            {/* Concrete Daily Practice */}
            <div className="bg-[#111111] border-2 border-[#c5a368] rounded-2xl p-6 sm:p-7 space-y-2.5">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#c5a368]">
                Concrete Action For Today:
              </span>
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                {currentDayData.practice}
              </p>
            </div>

            {/* Journal Reflection Box */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-white/90 block">
                Your Day {currentDayData.day} Journal:
              </label>
              <textarea
                value={journalNote}
                onChange={(e) => setJournalNote(e.target.value)}
                placeholder="Record what God revealed to you through this passage or practice..."
                rows={3}
                className="w-full p-4 rounded-xl border border-white/10 bg-[#181818] text-sm sm:text-base text-white focus:outline-none focus:border-[#c5a368] placeholder:text-white/40 leading-relaxed"
              />
            </div>

            {/* Complete Day CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs sm:text-sm text-white/50">
                {savedDay ? "Day marked as completed!" : "Progress saved to your profile"}
              </span>

              <button
                onClick={handleFinishDay}
                className="px-7 py-3 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm sm:text-base flex items-center justify-center space-x-2.5 shadow-sm transition-all self-end sm:self-auto"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Complete Day {currentDayData.day} Practice</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Catalog Grid of Available Journeys */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
          Explore All Journeys ({filteredJourneys.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJourneys.map((journey) => {
            const isLocked =
              (journey.tierRequired === "plus" || journey.tierRequired === "pro") &&
              userProfile.tier === "free";

            return (
              <div
                key={journey.id}
                className={`bg-[#111111] border rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all shadow-xs ${
                  journey.id === activeJourneyId
                    ? "border-[#c5a368] ring-1 ring-[#c5a368]"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#c5a368] bg-[#181818] border border-[#c5a368]/30 px-2.5 py-1 rounded-md">
                      {journey.durationDays} Days • {journey.category}
                    </span>
                    {isLocked ? (
                      <span className="flex items-center space-x-1.5 text-xs font-semibold text-white/50 bg-[#151515] px-2.5 py-1 rounded-md border border-white/10">
                        <Lock className="w-3.5 h-3.5 text-[#c5a368]" />
                        <span>{journey.tierRequired.toUpperCase()}</span>
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[#c5a368] bg-[#181818] px-2.5 py-1 rounded-md border border-[#c5a368]/20">
                        Available
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-white mb-1.5">
                    {journey.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/50 mb-3 italic">
                    {journey.tagline}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed mb-6 font-normal">
                    {journey.overview}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  {isLocked ? (
                    <button
                      onClick={onOpenPricing}
                      className="w-full py-2.5 rounded-xl bg-[#181818] border border-white/10 hover:bg-[#202020] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#c5a368]" />
                      <span>Unlock with {journey.tierRequired.toUpperCase()}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectJourney(journey.id)}
                      className={`w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
                        journey.id === activeJourneyId
                          ? "bg-[#c5a368] text-black font-bold"
                          : "bg-[#181818] border border-[#c5a368]/40 text-[#c5a368] hover:bg-[#222]"
                      }`}
                    >
                      <span>{journey.id === activeJourneyId ? "Continue Journey" : "Start This Journey"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
