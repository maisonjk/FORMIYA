import React, { useState } from "react";
import {
  Users,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Share2,
  Plus,
  Send,
  RotateCw,
} from "lucide-react";
import Markdown from "react-markdown";
import { SEED_SMALL_GROUPS, SEED_MENTOR_PAIRING } from "../data/canonicalData";
import { SmallGroup, MentorPairing, UserProfile } from "../types";

interface SmallGroupsViewProps {
  userProfile: UserProfile;
  onOpenCompanion: (prompt: string) => void;
}

export const SmallGroupsView: React.FC<SmallGroupsViewProps> = ({
  userProfile,
  onOpenCompanion,
}) => {
  const [activeTab, setActiveTab] = useState<"group" | "mentor" | "curriculum_builder">("group");
  const [group, setGroup] = useState<SmallGroup>(SEED_SMALL_GROUPS[0]);
  const [mentor, setMentor] = useState<MentorPairing>(SEED_MENTOR_PAIRING);

  // Curriculum Builder Generator state
  const [curriculumTopic, setCurriculumTopic] = useState<string>("Authentic Community and Vulnerability");
  const [curriculumPassage, setCurriculumPassage] = useState<string>("Hebrews 10:24-25");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedGuide, setGeneratedGuide] = useState<string>(`
### Small Group Leader Discussion Guide

**Theme:** Authentic Community & Carrying Burdens
**Primary Scripture:** Hebrews 10:24-25 — *"And let us consider how to stir up one another to love and good works..."*

**1. Icebreaker & Arrival (10 mins):**
- "On a scale of 1 to 10, how rested or hurried does your soul feel this week? Why?"

**2. Scripture Deep-Dive (20 mins):**
- Read Hebrews 10:19-25 together.
- Notice the phrase *"stir up one another"*. What does it look like in real life to lovingly provoke someone toward Christlike love rather than judgment?
- What cultural habits make regular Christian fellowship difficult in our modern pace of life?

**3. Honest Heart Application (20 mins):**
- What is one area where you are carrying a hidden burden alone right now?
- How can our small group actively pray for and support you this week?

**4. Group Prayer Rhythm (10 mins):**
- Break into pairs of 2-3 members. Pray specifically for the honest requests shared.

**Leader Challenge:** Send an encouraging mid-week check-in text to one group member by Thursday.
  `);

  const handleGenerateCurriculum = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/group-curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: curriculumTopic,
          passage: curriculumPassage,
        }),
      });

      if (!res.ok) throw new Error("Failed to generate curriculum");
      const data = await res.json();
      if (data.guide) {
        setGeneratedGuide(data.guide);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      {/* Header Banner */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-3">
            <Users className="w-4 h-4" />
            <span>Relational Discipleship</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Community & Mentorship
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-2 max-w-xl leading-relaxed">
            Spiritual formation cannot happen in isolation. Connect with your church small group, prayer partners, and discipleship mentors.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: "group", label: "My Small Group" },
            { id: "mentor", label: "1-on-1 Mentor" },
            { id: "curriculum_builder", label: "Curriculum Builder" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[#c5a368] text-black font-bold"
                  : "bg-[#181818] border border-white/10 text-white/80 hover:bg-[#222]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Small Group View */}
      {activeTab === "group" && (
        <div className="space-y-8">
          <div className="bg-[#111111] border border-white/15 rounded-2xl p-6 sm:p-9 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368]">
                  Active Community
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  {group.name}
                </h2>
                <p className="text-sm sm:text-base text-white/60 mt-1">
                  Led by {group.leaderName} • Meets {group.meetingDay}
                </p>
              </div>

              <span className="text-xs sm:text-sm font-semibold text-white/80 bg-[#181818] border border-white/10 px-3.5 py-2 rounded-xl self-start sm:self-auto">
                {group.members.length} Members Connected
              </span>
            </div>

            {/* Current Shared Journey / Study */}
            <div className="bg-[#151515] border border-[#c5a368]/30 rounded-2xl p-6 space-y-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#c5a368] block">
                Current Shared Rhythm: Week {group.currentCurriculum.week} of {group.currentCurriculum.totalWeeks}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                {group.currentCurriculum.topic} ({group.currentCurriculum.scripture})
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                {group.currentCurriculum.openingQuestion}
              </p>
            </div>

            {/* Group Members List */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white uppercase tracking-wider mb-4">
                Group Members & Shared Reflections
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-[#181818] border border-white/10 rounded-xl p-4 sm:p-5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-base">
                        {member.name}
                      </span>
                      <span className="text-xs font-bold text-[#c5a368] bg-[#111111] px-2.5 py-1 rounded-md border border-[#c5a368]/20">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/60">
                      Shared Reflections: <strong className="text-white/80">{member.sharedReflectionsCount}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 1-on-1 Mentor Pairing */}
      {activeTab === "mentor" && (
        <div className="bg-[#111111] border border-white/15 rounded-2xl p-6 sm:p-9 shadow-sm space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368]">
                Discipleship Pairing
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                Your Discipleship Mentor: {mentor.mentorName}
              </h2>
              <p className="text-sm sm:text-base text-white/60 mt-1">
                Cadence: {mentor.meetingCadence} • Next Check-In: {mentor.nextMeetingDate}
              </p>
            </div>

            <button
              onClick={() => onOpenCompanion("Help me prepare 3 honest questions for my upcoming discipleship meeting with my mentor.")}
              className="px-5 py-2.5 rounded-xl bg-[#181818] border border-[#c5a368]/40 hover:bg-[#222] text-[#c5a368] font-semibold text-xs sm:text-sm flex items-center space-x-2 transition-colors self-start sm:self-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>Prepare Meeting with AI</span>
            </button>
          </div>

          {/* Current Focus Area */}
          <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#c5a368] block">
              1-on-1 Focus Area:
            </span>
            <p className="text-base sm:text-lg text-white font-medium">
              {mentor.currentGoal}
            </p>
          </div>

          {/* Shared Discussion Prompts */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-white uppercase tracking-wider">
              Discussion Topics For Your Next Meeting
            </h3>
            <div className="space-y-3">
              {mentor.discussionPrompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className="bg-[#181818] border border-white/10 rounded-xl p-4 sm:p-5 flex items-start space-x-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#c5a368] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed">
                    {prompt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: AI Small Group Curriculum Builder */}
      {activeTab === "curriculum_builder" && (
        <div className="bg-[#111111] border border-white/15 rounded-2xl p-6 sm:p-9 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs font-semibold px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Discussion Guide Generator</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Instant Leader Guides & Scripture Studies
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-1 leading-relaxed">
              Equip your small group leaders in seconds with high-impact discussion questions, icebreakers, and prayer focus.
            </p>
          </div>

          {/* Generator Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#151515] p-5 sm:p-6 rounded-2xl border border-white/10">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-2">
                Study Topic or Sermon Theme
              </label>
              <input
                type="text"
                value={curriculumTopic}
                onChange={(e) => setCurriculumTopic(e.target.value)}
                placeholder="e.g. Forgiveness, Sabbath, Anxious Striving"
                className="w-full p-3 rounded-xl border border-white/10 bg-[#1c1c1c] text-sm text-white focus:outline-none focus:border-[#c5a368]"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-2">
                Scripture Passage Reference
              </label>
              <input
                type="text"
                value={curriculumPassage}
                onChange={(e) => setCurriculumPassage(e.target.value)}
                placeholder="e.g. Matthew 6:25-34 or Romans 8:1-4"
                className="w-full p-3 rounded-xl border border-white/10 bg-[#1c1c1c] text-sm text-white focus:outline-none focus:border-[#c5a368]"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                onClick={handleGenerateCurriculum}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 transition-all shadow-sm disabled:opacity-60"
              >
                <Sparkles className="w-5 h-5" />
                <span>{isGenerating ? "Crafting Discussion Guide..." : "Generate Small Group Leader Guide"}</span>
              </button>
            </div>
          </div>

          {/* Output Display */}
          <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-[#c5a368] uppercase font-bold tracking-wider">
                Generated Leader Curriculum
              </span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(generatedGuide);
                  alert("Copied discussion guide to clipboard!");
                }}
                className="text-xs text-white/60 hover:text-white flex items-center space-x-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy to Clipboard</span>
              </button>
            </div>

            <div className="prose-formation text-white/90 text-sm sm:text-base leading-relaxed">
              <Markdown>{generatedGuide}</Markdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
