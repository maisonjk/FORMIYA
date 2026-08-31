import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  X,
  Compass,
  Heart,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { UserProfile } from "../types";

interface NextStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
}

interface NextStepResult {
  title: string;
  category: string;
  duration: string;
  scriptureAnchor: string;
  action: string;
  whyThisStep: string;
  breathPrayer?: string;
}

export const NextStepModal: React.FC<NextStepModalProps> = ({
  isOpen,
  onClose,
  userProfile,
}) => {
  const [selectedFeeling, setSelectedFeeling] = useState<string>("Overwhelmed & anxious");
  const [availableTime, setAvailableTime] = useState<string>("3-5 minutes");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<NextStepResult | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGenerateNextStep = async () => {
    setIsLoading(true);
    setCompleted(false);

    try {
      const res = await fetch("/api/next-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feeling: selectedFeeling,
          availableTime,
          growthArea: userProfile.primaryGrowthArea,
          discipleshipLevel: userProfile.discipleshipLevel,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get next step from server");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        title: "A 3-Minute Breath of Surrender",
        category: "Peace & Centering",
        duration: "3 minutes",
        scriptureAnchor: "Philippians 4:6-7",
        action: "Set your phone down face-down. Take 3 deep breaths. On each exhale, say quietly: 'Lord, I release what I cannot control into Your hands.'",
        whyThisStep: "When feeling overwhelmed, intellectual problem-solving only increases fatigue. You need somatic and spiritual stillness before God first.",
        breathPrayer: "Inhale: 'The Lord is near.' Exhale: 'I will not be anxious.'",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    setCompleted(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#c5a368", "#d8b67b", "#ffffff"],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111111] border border-white/15 rounded-3xl max-w-xl w-full p-6 sm:p-9 shadow-2xl space-y-7 my-8 max-h-[90vh] overflow-y-auto text-white">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#c5a368]/30 flex items-center justify-center text-[#c5a368]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368]">
                Right Here, Right Now
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                "What Should I Do Next?"
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!result ? (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-white/90 block mb-2.5">
                How does your heart feel right now?
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  "Overwhelmed & anxious",
                  "Guilty / Distant from God",
                  "Distracted & hurried",
                  "Grieving or hurting",
                  "Spiritually dry / bored",
                  "Ready to pray & listen",
                ].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFeeling(f)}
                    className={`p-3.5 rounded-xl border text-sm font-medium transition-all text-left ${
                      selectedFeeling === f
                        ? "border-[#c5a368] bg-[#181818] text-[#c5a368] font-bold ring-1 ring-[#c5a368]"
                        : "border-white/10 bg-[#151515] text-white/80 hover:bg-[#1a1a1a]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-white/90 block mb-2.5">
                How much unhurried time do you have?
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {["1-2 minutes", "3-5 minutes", "10-15 minutes"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setAvailableTime(t)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all text-center ${
                      availableTime === t
                        ? "border-[#c5a368] bg-[#181818] text-[#c5a368] font-bold ring-1 ring-[#c5a368]"
                        : "border-white/10 bg-[#151515] text-white/80 hover:bg-[#1a1a1a]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateNextStep}
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-base flex items-center justify-center space-x-2.5 shadow-sm transition-all disabled:opacity-60"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isLoading ? "Listening..." : "Give Me My Next Faithful Step"}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c5a368] bg-[#181818] border border-[#c5a368]/30 px-3 py-1 rounded-md">
                {result.category} • ~{result.duration}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-2">
                {result.title}
              </h3>
            </div>

            {/* Why This Step */}
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              {result.whyThisStep}
            </p>

            {/* Concrete Action Card */}
            <div className="bg-[#151515] border-2 border-[#c5a368] rounded-2xl p-6 space-y-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#c5a368] block">
                Do This Right Now:
              </span>
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                {result.action}
              </p>
            </div>

            {/* Scripture Anchor */}
            <div className="bg-[#181818] border border-white/10 rounded-2xl p-5 space-y-1">
              <span className="text-xs font-mono text-[#c5a368] font-bold block">
                {result.scriptureAnchor}
              </span>
              {result.breathPrayer && (
                <p className="font-serif text-sm sm:text-base text-white/90 italic">
                  "{result.breathPrayer}"
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setResult(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/10 bg-[#181818] hover:bg-[#222] text-sm text-white/80 font-medium"
              >
                Try Different State
              </button>

              <button
                onClick={handleComplete}
                className={`flex-1 py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 transition-all ${
                  completed
                    ? "bg-[#181818] text-[#c5a368] border border-[#c5a368]/50"
                    : "bg-[#c5a368] text-black hover:bg-[#d8b67b]"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{completed ? "Completed Step!" : "I Took This Step"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
