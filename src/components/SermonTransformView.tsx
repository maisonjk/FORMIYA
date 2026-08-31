import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Users,
  Heart,
  Flame,
  ArrowRight,
  Download,
  Share2,
  Copy,
  Check,
  RotateCw,
} from "lucide-react";
import Markdown from "react-markdown";

export const SermonTransformView: React.FC = () => {
  const [sermonTitle, setSermonTitle] = useState<string>("The Cost and Joy of Forgiveness");
  const [scripturePassage, setScripturePassage] = useState<string>("Matthew 18:21-35");
  const [sermonNotes, setSermonNotes] = useState<string>(
    "Pastor John preached on the Unmerciful Servant. Main points: 1) Forgiveness is not excusing evil, but canceling an unpayable debt. 2) We cannot withhold what we have freely received from Christ. 3) Bitter resentment eats the soul from the inside out."
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"daily" | "group" | "family" | "challenge">("daily");
  const [copied, setCopied] = useState<boolean>(false);

  // Initial rich sample output or generated output
  const [output, setOutput] = useState<{
    daily: string;
    group: string;
    family: string;
    challenge: string;
  }>({
    daily: `### 5-Day Daily Discipleship Follow-Up

**Day 1: The Size of the Debt (Matthew 18:21-27)**
- **Scripture Context:** Ten thousand talents represented billions of dollars—an impossible sum. Jesus emphasizes the astronomical grace God has shown us.
- **Reflection:** Have you minimized God's forgiveness in your own life lately?
- **Prayer:** *"Father, thank You for erasing a debt I could never pay. Soften my heart to remember Your mercy."*
- **Practice:** Write down three specific ways God has shown you mercy this month.

**Day 2: The Trap of Demanding Repayment (Matthew 18:28-30)**
- **Scripture Context:** The servant choked a fellow servant over a hundred denarii (~100 days of wages).
- **Reflection:** Who are you currently holding an emotional debt over?
- **Practice:** Release one petty irritation today without retaliating or making a sarcastic remark.

**Day 3: The Danger of Bitter Prison (Matthew 18:31-35)**
- **Practice:** Spend 5 minutes in silence surrendering a past hurt into Jesus' hands.

**Day 4: Forgiveness as a Daily Rhythm (Colossians 3:12-14)**
- **Practice:** Bless someone who has annoyed or wronged you by praying specifically for their flourishing.

**Day 5: Walking in Freedom (Romans 12:17-21)**
- **Practice:** Initiate peace or send an unprovoked word of kindness.`,

    group: `### Small Group Discussion Guide

**Icebreaker (10 mins):**
- Share a time when you received a gift or second chance you clearly didn't deserve.

**Scripture Deep Dive (20 mins):**
- Read Matthew 18:21-35 out loud together.
- Why do you think Peter asked about forgiving "seven times"? What was culturally expected vs. what Jesus demanded?
- What is the difference between forgiving someone and maintaining healthy boundaries with an unrepentant person?

**Honest Application (20 mins):**
- In what situations is forgiveness hardest for you: when the offender doesn't apologize, when the hurt is ongoing, or when it comes from family?
- What does it look like for our small group to bear one another's burdens in this area?

**Group Prayer:**
- Pray silently by name for the person you struggle to forgive. Close with a prayer of collective thanksgiving for Christ's blood on the cross.`,

    family: `### Family Discipleship Session (Ages 6–14)

**The Big Idea:** "We forgive because Jesus forgave us first!"
**Memory Verse:** "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you." — Ephesians 4:32

**Hands-on Activity (The Erased Chalkboard):**
1. Take a chalkboard or whiteboard.
2. Have each family member write a word representing a mistake (e.g. yelling, not sharing).
3. Spray water or wipe it completely clean. Explain: *"This is what Jesus did with our sins. When we forgive our brother or sister, we wipe the board clean!"*

**Bedtime Prayer:**
*"Dear God, thank You for wiping our mistakes clean through Jesus. Help us to share that same kindness with each other tomorrow. Amen."*`,

    challenge: `### Weekly Congregation Practice Challenge

**The 'Unpayable Debt' Reflection:**
Before Sunday, identify one grudge, lingering bitter feeling, or silent tension you have been harboring. 

1. Write the grievance on a piece of paper.
2. Pray: *"Jesus, You absorbed my sins on the cross. By Your grace, I release this debt to You."*
3. Safely shred or discard the paper as a physical declaration of forgiveness in Christ.`,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/sermon-transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: sermonTitle,
          passage: scripturePassage,
          notes: sermonNotes,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to transform sermon");
      }

      const data = await res.json();
      if (data.daily && data.group && data.family && data.challenge) {
        setOutput(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = output[activeTab];
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      {/* Header */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs">
        <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Pastor & Church Leadership Engine</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
          Sermon to Discipleship Engine
        </h1>
        <p className="text-base sm:text-lg text-white/80 max-w-2xl mt-2 leading-relaxed">
          Don't let sermons end on Sunday. Instantly transform your preaching notes into a 5-day daily discipleship plan, small group questions, and family discussion moments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
          <h3 className="font-serif text-2xl font-normal text-white">
            Input Sermon Information
          </h3>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider block">
              Sermon Title
            </label>
            <input
              type="text"
              value={sermonTitle}
              onChange={(e) => setSermonTitle(e.target.value)}
              placeholder="e.g. Walking in Grace"
              className="w-full p-3.5 rounded-xl border border-white/10 bg-[#181818] text-sm sm:text-base text-white focus:outline-none focus:border-[#c5a368] placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider block">
              Primary Scripture Passage
            </label>
            <input
              type="text"
              value={scripturePassage}
              onChange={(e) => setScripturePassage(e.target.value)}
              placeholder="e.g. Matthew 18:21-35"
              className="w-full p-3.5 rounded-xl border border-white/10 bg-[#181818] text-sm sm:text-base text-white focus:outline-none focus:border-[#c5a368] placeholder:text-white/40 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider block">
              Sermon Notes or Transcript Excerpt
            </label>
            <textarea
              value={sermonNotes}
              onChange={(e) => setSermonNotes(e.target.value)}
              rows={6}
              placeholder="Paste main points, illustrations, or key takeaways..."
              className="w-full p-3.5 rounded-xl border border-white/10 bg-[#181818] text-sm sm:text-base text-white focus:outline-none focus:border-[#c5a368] placeholder:text-white/40 leading-relaxed"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !sermonTitle}
            className="w-full py-4 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm sm:text-base flex items-center justify-center space-x-2.5 shadow-sm transition-all disabled:opacity-60"
          >
            <RotateCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isGenerating ? "animate-spin" : ""}`} />
            <span>{isGenerating ? "Synthesizing Discipleship..." : "Generate 5-Day Formation Plan"}</span>
          </button>
        </div>

        {/* Right: Generated Output Display */}
        <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-4">
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
              {[
                { id: "daily", label: "5-Day Rhythm" },
                { id: "group", label: "Small Group Guide" },
                { id: "family", label: "Family Moment" },
                { id: "challenge", label: "Sunday Challenge" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[#c5a368] text-black"
                      : "bg-[#181818] border border-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-[#181818] border border-white/10 hover:bg-[#222] text-xs sm:text-sm font-medium text-white/80 flex items-center space-x-2 transition-colors self-end sm:self-auto"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#c5a368]" />
                  <span className="text-[#c5a368]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>

          {/* Reader-Friendly Markdown Output Viewport */}
          <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[600px] text-base leading-relaxed">
            <div className="prose-formation text-white/90">
              <Markdown>{output[activeTab]}</Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
