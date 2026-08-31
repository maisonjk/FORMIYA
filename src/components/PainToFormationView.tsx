import React, { useState } from "react";
import {
  Flame,
  ArrowRight,
  Sparkles,
  BookOpen,
  Heart,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  X,
} from "lucide-react";
import { PAIN_PATHWAYS } from "../data/canonicalData";
import { PainPathway } from "../types";

interface PainToFormationViewProps {
  onSelectPathway?: (pathway: PainPathway) => void;
  onStartJourney?: (journeyId: string) => void;
}

export const PainToFormationView: React.FC<PainToFormationViewProps> = ({
  onSelectPathway,
  onStartJourney,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePathway, setActivePathway] = useState<PainPathway | null>(null);

  const categories = [
    "All",
    "Spiritual Crisis",
    "Emotions & Heart",
    "Relationships",
    "Growth & Purpose",
  ];

  const filtered =
    selectedCategory === "All"
      ? PAIN_PATHWAYS
      : PAIN_PATHWAYS.filter((p) => p.category === selectedCategory);

  const handleStartPathway = (pathway: PainPathway) => {
    if (onSelectPathway) {
      onSelectPathway(pathway);
    } else if (onStartJourney && pathway.recommendedJourneyId) {
      onStartJourney(pathway.recommendedJourneyId);
    }
    setActivePathway(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full">
          <Flame className="w-4 h-4 text-[#c5a368]" />
          <span>Real Struggles, Gospel Formed</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
          What Are You Walking Through?
        </h1>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed">
          God does not waste your pain. Every trial, dryness, and season of doubt is an invitation to deeper formation.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-[#c5a368] text-black font-bold shadow-xs"
                : "bg-[#141414] border border-white/10 text-white/70 hover:bg-[#1f1f1f] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Pathways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePathway(item)}
            className="bg-[#111111] border border-white/10 hover:border-[#c5a368]/50 rounded-2xl p-6 sm:p-7 shadow-xs cursor-pointer transition-all hover:bg-[#151515] flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c5a368] bg-[#181818] border border-[#c5a368]/20 px-3 py-1 rounded-md">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-white/40">
                  {item.keyScripture}
                </span>
              </div>

              <h2 className="font-serif text-2xl font-normal text-white group-hover:text-[#c5a368] transition-colors">
                "{item.title}"
              </h2>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                {item.shortDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-white/50 group-hover:text-[#c5a368] transition-colors">
              <span className="font-medium">Explore Biblical Pathway</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Pathway Detail Modal */}
      {activePathway && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111111] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl space-y-7 my-8 max-h-[90vh] overflow-y-auto text-white">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c5a368] bg-[#181818] border border-[#c5a368]/30 px-3 py-1 rounded-md">
                  {activePathway.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-2">
                  "{activePathway.title}"
                </h3>
              </div>
              <button
                onClick={() => setActivePathway(null)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              {activePathway.shortDescription}
            </p>

            {/* Root Reality & Core Lie */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#151515] border border-red-500/20 p-5 rounded-2xl space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                  The Enemy's Lie:
                </span>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  {activePathway.coreLie}
                </p>
              </div>
              <div className="bg-[#151515] border border-[#c5a368]/30 p-5 rounded-2xl space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c5a368] block">
                  The Gospel Truth:
                </span>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  {activePathway.gospelTruth}
                </p>
              </div>
            </div>

            {/* Scripture Anchor */}
            <div className="bg-[#151515] border-l-3 border-[#c5a368] p-6 rounded-r-2xl space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368] block">
                Anchor Scripture ({activePathway.keyScripture})
              </span>
              <p className="font-serif text-lg sm:text-xl text-white/95 italic leading-relaxed">
                "{activePathway.scriptureText}"
              </p>
            </div>

            {/* Actionable Rhythms */}
            {activePathway.actionableRhythms && activePathway.actionableRhythms.length > 0 && (
              <div className="bg-[#181818] border border-[#c5a368]/30 rounded-2xl p-6 space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#c5a368] block">
                  Actionable Formation Rhythms:
                </span>
                <ul className="space-y-2">
                  {activePathway.actionableRhythms.map((rhythm, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-sm sm:text-base text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-1" />
                      <span>{rhythm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setActivePathway(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium text-white/70"
              >
                Close
              </button>
              <button
                onClick={() => handleStartPathway(activePathway)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm flex items-center justify-center space-x-2"
              >
                <span>Start Recommended Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
