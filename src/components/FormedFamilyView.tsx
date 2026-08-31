import React, { useState } from "react";
import {
  Heart,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Users,
  Smile,
  Zap,
  Coffee,
  RotateCw,
  Send,
} from "lucide-react";
import Markdown from "react-markdown";
import confetti from "canvas-confetti";

export const FormedFamilyView: React.FC = () => {
  const [selectedAgeTier, setSelectedAgeTier] = useState<"kids_4_7" | "tweens_8_12" | "teens_13_18">("kids_4_7");
  const [customTopic, setCustomTopic] = useState<string>("Sharing and Generosity");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activityDone, setActivityDone] = useState<boolean>(false);

  const [lessonContent, setLessonContent] = useState<string>(`
### The Lunch that Fed 5,000 (John 6:1-14)

**The Story Hook (Read aloud with excitement):**
"Imagine you are at a massive picnic with five thousand hungry people, and nobody packed any snacks except ONE little boy who had five small pieces of bread and two little fish. What do you think he did?"

**Sensory Activity (The Bread Basket):**
- Take a single slice of bread or a snack cracker.
- Break it into small pieces and have each family member share a piece while saying something kind to each other.
- Explain: *"When we give what little we have to Jesus, He multiplies it to bless others!"*

**Short Memory Verse:**
*"God loves a cheerful giver."* — 2 Corinthians 9:7

**Bedtime Prayer:**
*"Dear Jesus, thank You for giving us food and family. Help our hands to be open and generous tomorrow. Amen."*
  `);

  const handleGenerateCustom = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/family-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: customTopic,
          ageGroup:
            selectedAgeTier === "kids_4_7"
              ? "Ages 4-7"
              : selectedAgeTier === "tweens_8_12"
              ? "Ages 8-12"
              : "Teens 13-18",
        }),
      });

      if (!res.ok) throw new Error("Failed to generate family lesson");
      const data = await res.json();
      if (data.lesson) {
        setLessonContent(data.lesson);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCompleteActivity = () => {
    setActivityDone(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#c5a368", "#d8b67b", "#ffffff"],
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      {/* Header Banner */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs">
        <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-3">
          <Heart className="w-4 h-4" />
          <span>Family Discipleship</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
          FORMIYA Family
        </h1>
        <p className="text-base sm:text-lg text-white/80 max-w-2xl mt-2 leading-relaxed">
          Simple, age-appropriate discipleship moments that fit around dinner tables, bedtime routines, and car rides.
        </p>
      </div>

      {/* Age Group Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          {
            id: "kids_4_7",
            label: "Ages 4–7 (Early Years)",
            desc: "Object lessons, story hooks, short bedtime prayers",
            icon: Smile,
          },
          {
            id: "tweens_8_12",
            label: "Ages 8–12 (Tweens)",
            desc: "Dinner table debates, character challenges, Bible memory",
            icon: Zap,
          },
          {
            id: "teens_13_18",
            label: "Teens (13–18)",
            desc: "Faith ownership, identity anchors, cultural questions",
            icon: Coffee,
          },
        ].map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedAgeTier === tier.id;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedAgeTier(tier.id as any)}
              className={`p-6 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "border-[#c5a368] bg-[#181818] shadow-sm ring-1 ring-[#c5a368]"
                  : "border-white/10 bg-[#111111] hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-6 h-6 ${isSelected ? "text-[#c5a368]" : "text-white/40"}`} />
                {isSelected && (
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c5a368] bg-[#151515] border border-[#c5a368]/30 px-2.5 py-1 rounded-md">
                    Active
                  </span>
                )}
              </div>
              <h3 className="font-serif font-normal text-lg sm:text-xl text-white mb-1.5">
                {tier.label}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                {tier.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* AI Lesson Generator Row */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
          Generate Custom Family Moment
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="e.g. Forgiving a sibling, handling fear, bedtime thankfulness..."
            className="flex-1 p-3.5 rounded-xl border border-white/10 bg-[#181818] text-sm sm:text-base text-white focus:outline-none focus:border-[#c5a368] placeholder:text-white/40"
          />
          <button
            onClick={handleGenerateCustom}
            disabled={isGenerating || !customTopic}
            className="px-6 py-3.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 transition-all disabled:opacity-50 whitespace-nowrap"
          >
            <RotateCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isGenerating ? "animate-spin" : ""}`} />
            <span>{isGenerating ? "Generating..." : "Create Moment"}</span>
          </button>
        </div>
      </div>

      {/* Lesson Reader Card */}
      <div className="bg-[#111111] border border-white/15 rounded-2xl p-6 sm:p-9 shadow-sm space-y-7">
        <div className="border-b border-white/10 pb-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368]">
              Tonight's 5-Minute Moment
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
              Family Connection Guide
            </h2>
          </div>

          <span className="text-xs sm:text-sm font-semibold bg-[#181818] border border-white/10 text-white/80 px-3 py-1.5 rounded-lg">
            ~5 Minutes
          </span>
        </div>

        <div className="prose-formation text-white/90 text-base sm:text-lg leading-relaxed bg-[#151515] p-6 sm:p-8 rounded-2xl border border-white/10">
          <Markdown>{lessonContent}</Markdown>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-white/50">
            {activityDone ? "Activity marked as done tonight!" : "Mark after family dinner or bedtime"}
          </span>

          <button
            onClick={handleCompleteActivity}
            className={`px-7 py-3 rounded-xl font-semibold text-sm sm:text-base uppercase tracking-wider transition-all flex items-center justify-center space-x-2.5 shadow-sm ${
              activityDone
                ? "bg-[#181818] text-[#c5a368] border border-[#c5a368]/50"
                : "bg-[#c5a368] text-black hover:bg-[#d8b67b]"
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{activityDone ? "Family Activity Completed!" : "Complete Activity Tonight"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
