import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
  Flame,
  Send,
  Check,
  RotateCcw,
  Share2,
  Type,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { DailyFormationSession, UserProfile } from "../types";

interface DailyFormationViewProps {
  session: DailyFormationSession;
  userProfile: UserProfile;
  onSaveReflection: (sessionId: string, reflectionText: string) => void;
  onSaveEveningStatus: (sessionId: string, status: "practiced" | "struggled" | "forgot" | "unexpected", note: string) => void;
  onOpenNextStep: () => void;
  onNavigate: (view: string) => void;
}

export const DailyFormationView: React.FC<DailyFormationViewProps> = ({
  session,
  userProfile,
  onSaveReflection,
  onSaveEveningStatus,
  onOpenNextStep,
  onNavigate,
}) => {
  const [reflectionInput, setReflectionInput] = useState<string>("");
  const [isSavedReflection, setIsSavedReflection] = useState<boolean>(false);
  const [practiceCompleted, setPracticeCompleted] = useState<boolean>(
    session.eveningReflection?.status === "practiced"
  );
  const [eveningStatus, setEveningStatus] = useState<
    "practiced" | "struggled" | "forgot" | "unexpected" | null
  >(session.eveningReflection?.status || null);
  const [eveningNote, setEveningNote] = useState<string>(
    session.eveningReflection?.note || ""
  );
  const [eveningSaved, setEveningSaved] = useState<boolean>(
    !!session.eveningReflection?.status
  );

  // Reader Mode Font Scale: 'normal' (18px/22px), 'large' (22px/26px), 'xlarge' (26px/32px)
  const [readerSize, setReaderSize] = useState<"normal" | "large" | "xlarge">("normal");

  const handleSaveReflection = () => {
    if (!reflectionInput.trim()) return;
    onSaveReflection(session.id, reflectionInput);
    setIsSavedReflection(true);
    setTimeout(() => setIsSavedReflection(false), 3000);
  };

  const handleCompletePractice = () => {
    setPracticeCompleted(!practiceCompleted);
    if (!practiceCompleted) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#c5a368", "#d8b67b", "#ffffff"],
      });

      // Synchronize formation streak to localStorage (unless incognito mode is active)
      try {
        if (!userProfile.privacySettings?.incognitoMode) {
          const todayStr = new Date().toISOString().split("T")[0];
          const lastDate = localStorage.getItem("formed_streak_last_date");
          if (lastDate !== todayStr) {
            const cur = parseInt(localStorage.getItem("formed_streak_count") || String(userProfile.streakDays || 5), 10);
            const newStreak = cur + 1;
            localStorage.setItem("formed_streak_count", newStreak.toString());
            localStorage.setItem("formed_streak_last_date", todayStr);
            const savedLongest = parseInt(localStorage.getItem("formed_streak_longest") || "12", 10);
            localStorage.setItem("formed_streak_longest", Math.max(newStreak, savedLongest).toString());
            const hist = JSON.parse(localStorage.getItem("formed_streak_history") || "[]");
            if (!hist.includes(todayStr)) {
              hist.push(todayStr);
              localStorage.setItem("formed_streak_history", JSON.stringify(hist));
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSaveEvening = (status: "practiced" | "struggled" | "forgot" | "unexpected") => {
    setEveningStatus(status);
    onSaveEveningStatus(session.id, status, eveningNote);
    setEveningSaved(true);
  };

  const scriptureSizeClasses = {
    normal: "text-xl sm:text-2xl leading-relaxed sm:leading-loose",
    large: "text-2xl sm:text-3xl leading-relaxed sm:leading-loose",
    xlarge: "text-3xl sm:text-4xl leading-relaxed sm:leading-loose",
  }[readerSize];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 text-white">
      {/* 1. Header Greeting & Next Faithful Step Hero */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-white/60 uppercase tracking-widest mb-2">
              <span>{session.date}</span>
              <span>•</span>
              <span className="text-[#c5a368] font-bold">5–10 Min Daily Formation</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              Good morning, {userProfile.name}.
            </h1>
            <p className="text-base sm:text-lg text-white/80 mt-2 font-normal">
              "Let's take the next faithful step together."
            </p>
          </div>

          <button
            onClick={onOpenNextStep}
            className="self-start md:self-center px-5 py-3 rounded-xl bg-[#181818] border border-[#c5a368]/50 hover:bg-[#222] text-[#c5a368] font-semibold text-sm flex items-center space-x-2.5 transition-all shadow-sm"
          >
            <HelpCircle className="w-5 h-5 text-[#c5a368]" />
            <span>I Don't Know What To Do Next</span>
          </button>
        </div>
      </div>

      {/* 2. Today's Scripture Reading */}
      <section className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#181818] border border-white/10 text-[#c5a368] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368]">
                Today's Scripture
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                {session.scripturePassage.reference}
              </h2>
            </div>
          </div>

          {/* Reader Controls: Translation & Text Size Switcher */}
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <span className="text-xs sm:text-sm font-mono font-semibold px-3 py-1.5 bg-[#181818] rounded-lg border border-white/10 text-white/80">
              {session.scripturePassage.translation}
            </span>

            <div className="flex items-center bg-[#181818] border border-white/10 rounded-lg p-1 text-xs">
              <span className="text-white/40 px-2 flex items-center">
                <Type className="w-3.5 h-3.5 mr-1" />
                <span>Text:</span>
              </span>
              <button
                onClick={() => setReaderSize("normal")}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  readerSize === "normal"
                    ? "bg-[#c5a368] text-black font-bold"
                    : "text-white/70 hover:text-white"
                }`}
                title="Standard Text Size"
              >
                A
              </button>
              <button
                onClick={() => setReaderSize("large")}
                className={`px-2.5 py-1 rounded font-medium text-sm transition-colors ${
                  readerSize === "large"
                    ? "bg-[#c5a368] text-black font-bold"
                    : "text-white/70 hover:text-white"
                }`}
                title="Large Text Size"
              >
                A+
              </button>
              <button
                onClick={() => setReaderSize("xlarge")}
                className={`px-2.5 py-1 rounded font-bold text-base transition-colors ${
                  readerSize === "xlarge"
                    ? "bg-[#c5a368] text-black font-bold"
                    : "text-white/70 hover:text-white"
                }`}
                title="Extra Large Reader"
              >
                A++
              </button>
            </div>
          </div>
        </div>

        {/* The Scripture Passage Text */}
        <blockquote className={`font-serif ${scriptureSizeClasses} text-white/95 italic pl-5 border-l-3 border-[#c5a368] py-2 my-6 tracking-normal`}>
          "{session.scripturePassage.text}"
        </blockquote>
      </section>

      {/* 3. Understand (Context & Original Word) */}
      <section className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center space-x-2.5 border-b border-white/10 pb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c5a368]" />
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
            Understand Biblical Context
          </h3>
        </div>

        <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
          {session.understand.context}
        </p>

        <div className="bg-[#181818] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#c5a368] block">
              Core Insight:
            </span>
            <p className="text-sm sm:text-base text-white/90 font-medium">
              {session.understand.keyInsight}
            </p>
          </div>
          {session.understand.originalWord && (
            <div className="bg-[#111111] border border-white/15 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap self-stretch sm:self-auto shadow-xs">
              <span className="font-bold text-[#c5a368] text-base">
                {session.understand.originalWord.word}
              </span>
              <p className="text-xs sm:text-sm text-white/60">
                {session.understand.originalWord.meaning}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Reflect (Notepad + Questions) */}
      <section className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center space-x-2.5 border-b border-white/10 pb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c5a368]" />
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
            Reflect & Examine
          </h3>
        </div>

        <p className="font-serif text-lg sm:text-xl text-white font-medium leading-relaxed">
          {session.reflect.prompt}
        </p>

        <ul className="space-y-3 text-sm sm:text-base text-white/80 pl-5 list-disc marker:text-[#c5a368]">
          {session.reflect.questions.map((q, idx) => (
            <li key={idx} className="leading-relaxed">{q}</li>
          ))}
        </ul>

        {/* Reflection Input */}
        <div className="pt-3 space-y-3">
          <textarea
            value={reflectionInput}
            onChange={(e) => setReflectionInput(e.target.value)}
            placeholder="Write your honest thoughts, doubts, prayers, or quiet confessions here (saved securely and privately)..."
            rows={4}
            className="w-full p-4 sm:p-5 rounded-xl border border-white/10 bg-[#181818] text-base text-white focus:outline-none focus:ring-1 focus:ring-[#c5a368] focus:border-[#c5a368] transition-all placeholder:text-white/40 leading-relaxed"
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-white/50">
              <ShieldCheck className="w-4 h-4 text-[#c5a368]" />
              <span>
                {userProfile.privacySettings?.incognitoMode
                  ? "Incognito Mode: Reflections will not be stored permanently"
                  : "Protected by Pastoral Privacy Covenant • Client-side device storage only"}
              </span>
            </div>
            <button
              onClick={handleSaveReflection}
              disabled={!reflectionInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] disabled:opacity-40 text-black font-semibold text-sm flex items-center justify-center space-x-2 transition-all shadow-sm self-end sm:self-auto"
            >
              {isSavedReflection ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved Reflection</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Save Reflection</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Pray (Scripture-Anchored Prayer) */}
      <section className="bg-[#151515] border border-[#c5a368]/40 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#c5a368]">
            Scripture-Grounded Prayer
          </span>
        </div>
        <p className="font-serif text-lg sm:text-xl lg:text-2xl text-white leading-relaxed italic">
          "{session.pray.prayerPrompt}"
        </p>
      </section>

      {/* 6. Today's Concrete Practice */}
      <section className="bg-[#111111] border-2 border-[#c5a368] rounded-2xl p-6 sm:p-9 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#c5a368]">
              Today's Real-World Practice
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
              {session.practice.title}
            </h3>
          </div>
          <span className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-white/80 bg-[#181818] px-3.5 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto">
            <Clock className="w-4 h-4 text-[#c5a368]" />
            <span>~{session.practice.estimatedMinutes} min</span>
          </span>
        </div>

        <p className="text-base sm:text-lg text-white/80 leading-relaxed">
          {session.practice.action}
        </p>

        <div className="pt-3">
          <button
            onClick={handleCompletePractice}
            className={`w-full py-4 rounded-xl font-semibold text-sm sm:text-base uppercase tracking-wider transition-all flex items-center justify-center space-x-2.5 shadow-sm ${
              practiceCompleted
                ? "bg-[#181818] text-[#c5a368] border border-[#c5a368]/60"
                : "bg-[#c5a368] text-black hover:bg-[#d8b67b]"
            }`}
          >
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>
              {practiceCompleted
                ? "Practice Completed Today!"
                : "Mark Practice as Completed"}
            </span>
          </button>
        </div>
      </section>

      {/* 7. Evening Check-In: "What happened today?" */}
      <section className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/50">
              Evening Check-In
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mt-0.5">
              What happened today?
            </h3>
          </div>
          {eveningSaved && (
            <span className="text-xs sm:text-sm font-semibold text-[#c5a368] bg-[#181818] border border-[#c5a368]/30 px-3 py-1.5 rounded-lg">
              Logged
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base text-white/70">
          Spiritual formation is about honesty. There is zero shame whether you practiced, struggled, or forgot.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: "practiced", label: "I practiced it" },
            { key: "struggled", label: "I struggled" },
            { key: "forgot", label: "I forgot" },
            { key: "unexpected", label: "Something unexpected" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleSaveEvening(opt.key as any)}
              className={`p-3.5 rounded-xl border text-sm sm:text-base font-medium transition-all text-center ${
                eveningStatus === opt.key
                  ? "border-[#c5a368] bg-[#1a1a1a] font-bold text-[#c5a368] ring-1 ring-[#c5a368]"
                  : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {eveningStatus && (
          <div className="pt-3 space-y-2">
            <label className="text-sm font-semibold text-white/80 block">
              Optional evening note / what you learned:
            </label>
            <input
              type="text"
              value={eveningNote}
              onChange={(e) => setEveningNote(e.target.value)}
              placeholder="e.g. Tried the 3-breath pause before my meeting; felt immediate calm..."
              className="w-full p-3.5 rounded-xl border border-white/10 bg-[#181818] text-sm sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#c5a368]"
            />
          </div>
        )}
      </section>
    </div>
  );
};
