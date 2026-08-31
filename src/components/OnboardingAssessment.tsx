import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Heart,
  Users,
  Compass,
  Check,
} from "lucide-react";
import { AssessmentAnswers, UserProfile, FormationIndicators } from "../types";

interface OnboardingAssessmentProps {
  onComplete: (answers: AssessmentAnswers, indicators: FormationIndicators, growthArea: string) => void;
  onCancel: () => void;
}

export const OnboardingAssessment: React.FC<OnboardingAssessmentProps> = ({
  onComplete,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  const [answers, setAnswers] = useState<AssessmentAnswers>({
    relationshipStatus: "Growing follower of Jesus",
    scriptureConfidence: "Moderate — I know stories, but struggle with depth",
    scriptureFrequency: "A couple times a week",
    prayerFrequency: "Mostly when in need or at meals",
    strongestArea: "Service & compassion for others",
    stuckArea: "Consistency in daily prayer and reading",
    growthDesire: "Deep, unhurried peace and intimacy with God",
    currentSeason: "Full and busy (work/family balance)",
    currentWeight: "Worry about future outcomes and staying consistent",
    supportNeeded: "A simple, manageable 5-minute daily formation rhythm",
    churchBelonging: "Yes, attend regularly",
    hasSmallGroup: "Yes, but we rarely share deep struggles",
    hasMentor: "No, but I wish I had one",
    selectedGoals: ["Build a sustainable prayer life", "Grow closer to Jesus daily", "Handle anxiety and stress"],
  });

  const toggleGoal = (goal: string) => {
    if (answers.selectedGoals.includes(goal)) {
      if (answers.selectedGoals.length > 1) {
        setAnswers({
          ...answers,
          selectedGoals: answers.selectedGoals.filter((g) => g !== goal),
        });
      }
    } else {
      if (answers.selectedGoals.length < 3) {
        setAnswers({
          ...answers,
          selectedGoals: [...answers.selectedGoals, goal],
        });
      }
    }
  };

  const handleFinish = () => {
    let scriptureScore = 5;
    if (answers.scriptureFrequency.includes("Daily") || answers.scriptureFrequency.includes("Almost every")) scriptureScore = 8;
    else if (answers.scriptureFrequency.includes("A couple")) scriptureScore = 6;
    else scriptureScore = 3;

    let prayerScore = 4;
    if (answers.prayerFrequency.includes("Throughout the day")) prayerScore = 8;
    else if (answers.prayerFrequency.includes("Dedicated daily")) prayerScore = 7;
    else prayerScore = 4;

    let communityScore = 4;
    if (answers.hasSmallGroup.includes("Yes") && answers.hasMentor.includes("Yes")) communityScore = 8;
    else if (answers.churchBelonging.includes("Yes")) communityScore = 5;
    else communityScore = 3;

    const indicators: FormationIndicators = {
      scripture: scriptureScore,
      prayer: prayerScore,
      community: communityScore,
      scriptureApplication: 4,
      spiritualDisciplines: 5,
      service: 7,
      discipleship: 3,
    };

    let growthArea = "Prayer & Consistency";
    if (answers.selectedGoals.includes("Build a sustainable prayer life")) {
      growthArea = "Daily Prayer Rhythm";
    } else if (answers.selectedGoals.includes("Learn biblical forgiveness")) {
      growthArea = "Biblical Forgiveness";
    } else if (answers.selectedGoals.includes("Know the Bible better")) {
      growthArea = "Scripture Roots";
    }

    onComplete(answers, indicators, growthArea);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Top Header & Step Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onCancel}
              className="text-xs sm:text-sm font-semibold text-white/50 hover:text-white uppercase tracking-wider transition-colors"
            >
              Back to Home
            </button>
            <span className="text-xs sm:text-sm font-mono font-bold text-[#c5a368]">
              Step {currentStep} of {totalSteps}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#c5a368] transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* STEP 1: Spiritual Foundation */}
          {currentStep === 1 && (
            <div className="space-y-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368] bg-[#181818] border border-[#c5a368]/30 px-3 py-1 rounded-lg">
                  Spiritual Foundation
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mt-3 mb-2">
                  Let's discover where you are in your walk with Christ.
                </h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  There are no right or wrong answers. Honest reflection is the foundation of genuine spiritual formation.
                </p>
              </div>

              {/* Question 1 */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                  How would you describe your current relationship with Jesus?
                </label>
                <div className="space-y-2.5">
                  {[
                    "Seeking & exploring Christianity",
                    "New follower finding my footing",
                    "Growing follower of Jesus",
                    "Seasoned believer desiring deeper maturity",
                    "Experiencing a spiritually dry or questioning season",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers({ ...answers, relationshipStatus: option })}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-center justify-between ${
                        answers.relationshipStatus === option
                          ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-semibold ring-1 ring-[#c5a368]"
                          : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
                      }`}
                    >
                      <span>{option}</span>
                      {answers.relationshipStatus === option && (
                        <Check className="w-5 h-5 text-[#c5a368]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                  How often do you currently open and read Scripture?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Almost every day",
                    "A couple times a week",
                    "Once a week at church",
                    "Rarely or only when in crisis",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers({ ...answers, scriptureFrequency: option })}
                      className={`p-4 rounded-xl border text-sm sm:text-base text-left transition-all ${
                        answers.scriptureFrequency === option
                          ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-semibold ring-1 ring-[#c5a368]"
                          : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Spiritual Formation & Growth */}
          {currentStep === 2 && (
            <div className="space-y-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368] bg-[#181818] border border-[#c5a368]/30 px-3 py-1 rounded-lg">
                  Spiritual Formation
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mt-3 mb-2">
                  Where is your heart right now?
                </h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  Identifying where you feel fruitful and where you feel stuck helps us tailor your daily rhythms.
                </p>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                  What area of your faith feels strongest today?
                </label>
                <div className="space-y-2.5">
                  {[
                    "Service & compassion for others",
                    "Theological curiosity and study",
                    "Gratitude and worship",
                    "Faithfulness in trials",
                    "Loving and encouraging friends",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers({ ...answers, strongestArea: option })}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-center justify-between ${
                        answers.strongestArea === option
                          ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-semibold ring-1 ring-[#c5a368]"
                          : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
                      }`}
                    >
                      <span>{option}</span>
                      {answers.strongestArea === option && (
                        <Check className="w-5 h-5 text-[#c5a368]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                  Where do you feel most stuck or frustrated?
                </label>
                <div className="space-y-2.5">
                  {[
                    "Consistency in daily prayer and reading",
                    "Carrying hurt and struggling to forgive",
                    "Dealing with recurring temptation or habits",
                    "Feeling like God is silent or distant",
                    "Loneliness and lack of authentic Christian friends",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers({ ...answers, stuckArea: option })}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-center justify-between ${
                        answers.stuckArea === option
                          ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-semibold ring-1 ring-[#c5a368]"
                          : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
                      }`}
                    >
                      <span>{option}</span>
                      {answers.stuckArea === option && (
                        <Check className="w-5 h-5 text-[#c5a368]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Life & Season */}
          {currentStep === 3 && (
            <div className="space-y-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368] bg-[#181818] border border-[#c5a368]/30 px-3 py-1 rounded-lg">
                  Life & Season
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mt-3 mb-2">
                  What is currently shaping your days?
                </h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  Discipleship doesn't happen in a vacuum—it happens inside the real demands of your schedule and emotions.
                </p>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                  What season are you currently walking through?
                </label>
                <div className="space-y-2.5">
                  {[
                    "Full and busy (work/family balance)",
                    "A major life transition (move, new job, grief)",
                    "Waiting and searching for direction",
                    "Quiet and restful space",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers({ ...answers, currentSeason: option })}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-center justify-between ${
                        answers.currentSeason === option
                          ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-semibold ring-1 ring-[#c5a368]"
                          : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
                      }`}
                    >
                      <span>{option}</span>
                      {answers.currentSeason === option && (
                        <Check className="w-5 h-5 text-[#c5a368]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                  What is currently weighing heaviest on your mind?
                </label>
                <div className="space-y-2.5">
                  {[
                    "Worry about future outcomes and staying consistent",
                    "A strained relationship or unresolved conflict",
                    "Financial or career stress",
                    "Spiritual dryness or feeling disconnected from God",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers({ ...answers, currentWeight: option })}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-center justify-between ${
                        answers.currentWeight === option
                          ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-semibold ring-1 ring-[#c5a368]"
                          : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
                      }`}
                    >
                      <span>{option}</span>
                      {answers.currentWeight === option && (
                        <Check className="w-5 h-5 text-[#c5a368]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Community & Support */}
          {currentStep === 4 && (
            <div className="space-y-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368] bg-[#181818] border border-[#c5a368]/30 px-3 py-1 rounded-lg">
                  Community & Connection
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mt-3 mb-2">
                  Who is walking beside you?
                </h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  Christian discipleship is deeply personal, but never meant to be done alone.
                </p>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                  Do you currently belong to a local church?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Yes, actively involved",
                    "Attend on Sundays, but not connected",
                    "Searching for a healthy church",
                    "Taking a break after church hurt",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers({ ...answers, churchBelonging: option })}
                      className={`p-4 rounded-xl border text-sm sm:text-base text-left transition-all ${
                        answers.churchBelonging === option
                          ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-semibold ring-1 ring-[#c5a368]"
                          : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                  Are you part of a small group or home group?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Yes, and we share openly",
                    "Yes, but we rarely share deep struggles",
                    "No, but I want to join one",
                    "No, and I'm not sure about it",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers({ ...answers, hasSmallGroup: option })}
                      className={`p-4 rounded-xl border text-sm sm:text-base text-left transition-all ${
                        answers.hasSmallGroup === option
                          ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-semibold ring-1 ring-[#c5a368]"
                          : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-white mb-3">
                  Do you have a mentor or disciple walking with you?
                </label>
                <div className="space-y-2.5">
                  {[
                    "Yes, someone regularly mentors me",
                    "No, but I am praying for someone to walk alongside me",
                    "I would love to learn how to mentor someone else",
                    "No, I feel isolated right now",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers({ ...answers, hasMentor: option })}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-center justify-between ${
                        answers.hasMentor === option
                          ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-semibold ring-1 ring-[#c5a368]"
                          : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
                      }`}
                    >
                      <span>{option}</span>
                      {answers.hasMentor === option && (
                        <Check className="w-5 h-5 text-[#c5a368]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Growth Goals */}
          {currentStep === 5 && (
            <div className="space-y-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#c5a368] bg-[#181818] border border-[#c5a368]/30 px-3 py-1 rounded-lg">
                  Your Growth Goals
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mt-3 mb-2">
                  What do you want God to grow in you?
                </h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  Select 2 to 3 areas you want to focus on for your first personalized pathway:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Build a sustainable prayer life",
                  "Know the Bible better",
                  "Grow closer to Jesus daily",
                  "Learn biblical forgiveness",
                  "Handle anxiety and stress",
                  "Walk through grief or suffering",
                  "Break the content consumption cycle",
                  "Strengthen relationships & marriage",
                  "Discover my purpose & gifts",
                  "Learn to disciple others",
                  "Overcome recurring sin & temptation",
                  "Rebuild faith after church hurt",
                ].map((goal) => {
                  const isSelected = answers.selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`p-4 rounded-xl border text-sm sm:text-base text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-[#c5a368] bg-[#1a1a1a] text-[#c5a368] font-bold ring-1 ring-[#c5a368]"
                          : "border-white/10 bg-[#151515] hover:bg-[#1f1f1f] text-white/80"
                      }`}
                    >
                      <span>{goal}</span>
                      {isSelected && <Check className="w-5 h-5 text-[#c5a368]" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs sm:text-sm text-white/50 text-center">
                Selected {answers.selectedGoals.length} of 3 (maximum 3 for focused formation)
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-5 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white text-sm sm:text-base font-medium flex items-center space-x-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-7 py-3 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black text-sm sm:text-base font-semibold flex items-center space-x-2 shadow-sm transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-8 py-3.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black text-sm sm:text-base font-bold flex items-center space-x-2 shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="w-5 h-5 text-black" />
                <span>Generate My Formation Map</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
