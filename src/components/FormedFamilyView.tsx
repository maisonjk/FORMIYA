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
  Plus,
  Trash2,
  UserCheck,
  Award,
} from "lucide-react";
import Markdown from "react-markdown";
import confetti from "canvas-confetti";
import { FamilyMemberAccount } from "../types";

const INITIAL_FAMILY_MEMBERS: FamilyMemberAccount[] = [
  {
    id: "fam_1",
    name: "Sarah (Mom)",
    relationship: "Parent",
    ageGroup: "adult",
    streakDays: 14,
    lastActive: "Today",
  },
  {
    id: "fam_2",
    name: "David (Dad)",
    relationship: "Parent",
    ageGroup: "adult",
    streakDays: 9,
    lastActive: "Today",
  },
  {
    id: "fam_3",
    name: "Caleb (Age 6)",
    relationship: "Child",
    ageGroup: "kids_4_7",
    streakDays: 5,
    lastActive: "Yesterday",
  },
  {
    id: "fam_4",
    name: "Maya (Age 10)",
    relationship: "Tween",
    ageGroup: "tweens_8_12",
    streakDays: 7,
    lastActive: "Today",
  },
];

export const FormedFamilyView: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMemberAccount[]>(() => {
    const saved = localStorage.getItem("formiya_family_members");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return INITIAL_FAMILY_MEMBERS;
  });

  const [activeMemberId, setActiveMemberId] = useState<string>(familyMembers[2]?.id || familyMembers[0]?.id || "fam_1");
  const [selectedAgeTier, setSelectedAgeTier] = useState<"kids_4_7" | "tweens_8_12" | "teens_13_18">("kids_4_7");
  const [customTopic, setCustomTopic] = useState<string>("Sharing and Generosity");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activityDone, setActivityDone] = useState<boolean>(false);
  const [isAddingMember, setIsAddingMember] = useState<boolean>(false);
  const [newMemberName, setNewMemberName] = useState<string>("");
  const [newMemberRole, setNewMemberRole] = useState<string>("Child");
  const [newMemberAgeGroup, setNewMemberAgeGroup] = useState<FamilyMemberAccount["ageGroup"]>("kids_4_7");
  const [memberWarning, setMemberWarning] = useState<string | null>(null);

  const saveMembers = (updated: FamilyMemberAccount[]) => {
    setFamilyMembers(updated);
    localStorage.setItem("formiya_family_members", JSON.stringify(updated));
  };

  const handleSelectMember = (member: FamilyMemberAccount) => {
    setActiveMemberId(member.id);
    if (member.ageGroup === "kids_4_7" || member.ageGroup === "tweens_8_12" || member.ageGroup === "teens_13_18") {
      setSelectedAgeTier(member.ageGroup);
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || familyMembers.length >= 6) return;

    const newAcc: FamilyMemberAccount = {
      id: `fam_${Date.now()}`,
      name: newMemberName.trim(),
      relationship: newMemberRole,
      ageGroup: newMemberAgeGroup,
      streakDays: 1,
      lastActive: "Today",
    };

    const updated = [...familyMembers, newAcc];
    saveMembers(updated);
    setActiveMemberId(newAcc.id);
    if (newAcc.ageGroup !== "adult") {
      setSelectedAgeTier(newAcc.ageGroup);
    }
    setNewMemberName("");
    setIsAddingMember(false);
  };

  const handleRemoveMember = (id: string) => {
    if (familyMembers.length <= 1) {
      setMemberWarning("At least one family account must remain.");
      setTimeout(() => setMemberWarning(null), 3000);
      return;
    }
    const updated = familyMembers.filter((m) => m.id !== id);
    saveMembers(updated);
    if (activeMemberId === id) {
      setActiveMemberId(updated[0].id);
    }
  };

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
    // increment active family member streak
    const updated = familyMembers.map((m) =>
      m.id === activeMemberId ? { ...m, streakDays: m.streakDays + 1, lastActive: "Today" } : m
    );
    saveMembers(updated);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#c5a368", "#d8b67b", "#ffffff"],
    });
  };

  const activeMember = familyMembers.find((m) => m.id === activeMemberId) || familyMembers[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      {/* Header Banner */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-3">
            <Heart className="w-4 h-4" />
            <span>Family Discipleship Platform</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            FORMIYA Family
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mt-2 leading-relaxed">
            Simple, age-appropriate discipleship moments that fit around dinner tables, bedtime routines, and car rides.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-4 py-2.5 rounded-xl bg-[#181818] border border-[#c5a368]/40 text-xs text-[#c5a368] font-semibold">
            {familyMembers.length} / 6 Family Accounts Active
          </div>
        </div>
      </div>

      {/* Up to 6 Family Member Accounts Manager */}
      <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#c5a368]" />
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-white">
                Family Member Accounts ({familyMembers.length}/6)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Switch profiles to tailor age-specific discipleship moments and track each family member's formation streak.
            </p>
          </div>

          {familyMembers.length < 6 && (
            <button
              onClick={() => setIsAddingMember(!isAddingMember)}
              className="px-4 py-2 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#c5a368]/40 text-xs sm:text-sm text-[#c5a368] font-semibold flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Family Member</span>
            </button>
          )}
        </div>

        {memberWarning && (
          <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-xl text-xs text-amber-300">
            {memberWarning}
          </div>
        )}

        {/* Add Member Form */}
        {isAddingMember && (
          <form
            onSubmit={handleAddMember}
            className="p-5 rounded-xl bg-[#181818] border border-white/15 space-y-4"
          >
            <h4 className="font-serif text-base text-white">Add New Family Member (Up to 6)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Elijah (Age 15)"
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-[#121212] text-sm text-white focus:outline-none focus:border-[#c5a368]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase mb-1">
                  Relationship
                </label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-[#121212] text-sm text-white focus:outline-none focus:border-[#c5a368]"
                >
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                  <option value="Tween">Tween</option>
                  <option value="Teen">Teen</option>
                  <option value="Spouse">Spouse</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase mb-1">
                  Age Tier Experience
                </label>
                <select
                  value={newMemberAgeGroup}
                  onChange={(e) => setNewMemberAgeGroup(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-[#121212] text-sm text-white focus:outline-none focus:border-[#c5a368]"
                >
                  <option value="kids_4_7">Ages 4–7 (Early Childhood)</option>
                  <option value="tweens_8_12">Ages 8–12 (Tweens)</option>
                  <option value="teens_13_18">Teens (13–18)</option>
                  <option value="adult">Adult (Parent)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingMember(false)}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold text-white/70"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#c5a368] text-black text-xs font-semibold shadow-xs"
              >
                Save Family Account
              </button>
            </div>
          </form>
        )}

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {familyMembers.map((member) => {
            const isSelected = activeMemberId === member.id;
            return (
              <div
                key={member.id}
                onClick={() => handleSelectMember(member)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                  isSelected
                    ? "bg-[#1c1812] border-[#c5a368] ring-1 ring-[#c5a368] shadow-sm"
                    : "bg-[#161616] border-white/10 hover:bg-[#1a1a1a]"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white text-sm">
                      {member.name}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold bg-[#c5a368] text-black px-1.5 py-0.2 rounded uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60">
                    {member.relationship} • {member.ageGroup.replace("_", " ").toUpperCase()}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-[#c5a368] pt-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{member.streakDays} Day Family Streak</span>
                  </div>
                </div>

                {familyMembers.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveMember(member.id);
                    }}
                    className="text-white/30 hover:text-red-400 p-1"
                    title="Remove member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
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
                    Active Tier
                  </span>
                )}
              </div>
              <h3 className="font-serif font-normal text-lg sm:text-xl text-white mb-1.5">
                {tier.label}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {tier.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Custom Family Moment Generator Row */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
          Generate Custom Family Moment for {activeMember.name}
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
              Tonight's 5-Minute Family Moment ({activeMember.name})
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
          <span className="text-xs sm:text-sm text-white/70">
            {activityDone
              ? `Activity marked done tonight for ${activeMember.name}!`
              : `Mark after family dinner or bedtime with ${activeMember.name}`}
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
