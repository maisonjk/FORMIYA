import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  BookOpen,
  RotateCw,
  Info,
} from "lucide-react";
import { HeartMirrorTheme, UserProfile } from "../types";

interface HeartMirrorViewProps {
  themes: HeartMirrorTheme[];
  userProfile: UserProfile;
  onDismissTheme: (themeId: string) => void;
  onExploreTheme: (theme: HeartMirrorTheme) => void;
  onRunScan: () => Promise<void>;
}

export const HeartMirrorView: React.FC<HeartMirrorViewProps> = ({
  themes,
  userProfile,
  onDismissTheme,
  onExploreTheme,
  onRunScan,
}) => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"active" | "all">("active");

  const visibleThemes = themes.filter((t) => !t.isDismissed || activeTab === "all");

  const handleScan = async () => {
    setIsScanning(true);
    try {
      await onRunScan();
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      {/* Header Banner */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-3">
            <Compass className="w-4 h-4" />
            <span>Signature Feature</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Heart Mirror
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-2 max-w-xl leading-relaxed">
            With your explicit permission, FORMIYA reviews your journals over time to gently identify recurring emotional patterns and provide Gospel-centered practices.
          </p>
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning}
          className="px-6 py-3.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm sm:text-base flex items-center space-x-2.5 transition-all shadow-sm disabled:opacity-60 whitespace-nowrap self-start md:self-auto"
        >
          <RotateCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isScanning ? "animate-spin" : ""}`} />
          <span>{isScanning ? "Analyzing Reflections..." : "Scan Reflection Patterns"}</span>
        </button>
      </div>

      {/* Non-Clinical Trust Notice */}
      <div className="bg-[#151515] border border-white/10 rounded-2xl p-5 flex items-start space-x-3.5 text-sm sm:text-base text-white/80">
        <Info className="w-5 h-5 text-[#c5a368] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Theological & Privacy Guardrail:</strong> Heart Mirror never diagnoses mental health disorders or assigns spiritual labels. Insights are observational invitations to explore root emotions with Scripture and community.
        </p>
      </div>

      {/* Themes List */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
          Identified Reflection Themes ({visibleThemes.length})
        </h2>

        {visibleThemes.length === 0 ? (
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-12 text-center">
            <Compass className="w-14 h-14 text-white/30 mx-auto mb-4" />
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-2">
              No active patterns detected
            </h3>
            <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto mb-6 leading-relaxed">
              Keep logging your daily reflections. As you write, Heart Mirror will identify recurring themes to help you grow.
            </p>
            <button
              onClick={handleScan}
              className="px-6 py-2.5 rounded-xl bg-[#c5a368] text-black text-sm font-semibold"
            >
              Run Reflection Scan
            </button>
          </div>
        ) : (
          <div className="space-y-7">
            {visibleThemes.map((theme) => (
              <div
                key={theme.id}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs space-y-7 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368]">
                      Detected {theme.dateDetected}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                      {theme.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => onDismissTheme(theme.id)}
                    className="text-sm text-white/50 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                    title="Dismiss this insight"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 4-Step Pattern Progression */}
                <div>
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#c5a368] block mb-3">
                    Observed Emotional Loop:
                  </label>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {theme.progression.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="px-4 py-2 rounded-xl bg-[#181818] border border-white/15 text-white text-sm sm:text-base font-medium">
                          {step}
                        </span>
                        {idx < theme.progression.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-[#c5a368]" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Gentle Explanation */}
                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
                  {theme.explanation}
                </p>

                {/* Scripture Anchor */}
                <div className="bg-[#151515] border-l-3 border-[#c5a368] p-5 sm:p-6 rounded-r-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c5a368] block mb-1.5">
                    Gospel Truth & Scripture
                  </span>
                  <p className="font-serif text-base sm:text-xl text-white/95 italic leading-relaxed">
                    "{theme.scripture}"
                  </p>
                </div>

                {/* Practice & Prayer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="bg-[#181818] border border-[#c5a368]/30 rounded-2xl p-5 sm:p-6 space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-[#c5a368] block uppercase tracking-wider">
                      Action to Break the Loop:
                    </span>
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                      {theme.suggestedPractice}
                    </p>
                  </div>

                  <div className="bg-[#151515] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-[#c5a368] block uppercase tracking-wider">
                      Anchor Prayer:
                    </span>
                    <p className="font-serif text-sm sm:text-base text-white/90 italic leading-relaxed">
                      "{theme.prayer}"
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                  <button
                    onClick={() => onDismissTheme(theme.id)}
                    className="text-xs sm:text-sm text-white/50 hover:text-white font-medium"
                  >
                    Dismiss this insight
                  </button>

                  <button
                    onClick={() => onExploreTheme(theme)}
                    className="px-5 py-2.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm flex items-center justify-center space-x-2 transition-all shadow-xs self-end sm:self-auto"
                  >
                    <span>Explore with AI Companion</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
