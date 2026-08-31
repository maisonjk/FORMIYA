import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { OnboardingAssessment } from "./components/OnboardingAssessment";
import { FormationProfileView } from "./components/FormationProfileView";
import { DailyFormationView } from "./components/DailyFormationView";
import { HeartMirrorView } from "./components/HeartMirrorView";
import { PainToFormationView } from "./components/PainToFormationView";
import { FormationJourneysView } from "./components/FormationJourneysView";
import { SermonTransformView } from "./components/SermonTransformView";
import { FormedFamilyView } from "./components/FormedFamilyView";
import { ChurchLeadershipView } from "./components/ChurchLeadershipView";
import { SmallGroupsView } from "./components/SmallGroupsView";
import { AICompanionModal } from "./components/AICompanionModal";
import { NextStepModal } from "./components/NextStepModal";
import { PricingModal } from "./components/PricingModal";
import { SettingsModal } from "./components/SettingsModal";
import { BottomNav } from "./components/BottomNav";

import {
  UserProfile,
  DailyFormationSession,
  HeartMirrorTheme,
  PainPathway,
  AssessmentAnswers,
  FormationIndicators,
  UserTier,
} from "./types";
import {
  INITIAL_USER_PROFILE,
  CANONICAL_DAILY_SESSIONS,
  INITIAL_HEART_MIRROR_THEMES,
} from "./data/canonicalData";

export default function App() {
  // Local storage / Initial state setup
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("formed_user_profile");
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [currentView, setCurrentView] = useState<string>("landing");
  const [dailySession, setDailySession] = useState<DailyFormationSession>(
    CANONICAL_DAILY_SESSIONS[0]
  );
  const [heartThemes, setHeartThemes] = useState<HeartMirrorTheme[]>(
    INITIAL_HEART_MIRROR_THEMES
  );
  const [activeJourneyId, setActiveJourneyId] = useState<string>("journey_prayer");

  // Modals state
  const [isCompanionOpen, setIsCompanionOpen] = useState<boolean>(false);
  const [companionInitialPrompt, setCompanionInitialPrompt] = useState<string | undefined>(undefined);
  const [isNextStepOpen, setIsNextStepOpen] = useState<boolean>(false);
  const [isPricingOpen, setIsPricingOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Reset Data
  const handleResetData = () => {
    localStorage.removeItem("formed_user_profile");
    setUserProfile(INITIAL_USER_PROFILE);
    setCurrentView("assessment");
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  // Sync profile to localStorage
  useEffect(() => {
    localStorage.setItem("formed_user_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  // Handle Assessment Completion
  const handleAssessmentComplete = (
    answers: AssessmentAnswers,
    indicators: FormationIndicators,
    growthArea: string
  ) => {
    setUserProfile((prev) => ({
      ...prev,
      onboarded: true,
      indicators,
      primaryGrowthArea: growthArea,
    }));
    setCurrentView("profile");
  };

  // Save Daily Reflection Note
  const handleSaveReflection = (sessionId: string, reflectionText: string) => {
    setDailySession((prev) => ({
      ...prev,
      reflect: {
        ...prev.reflect,
        userReflection: reflectionText,
      },
    }));
  };

  // Save Evening Status
  const handleSaveEveningStatus = (
    sessionId: string,
    status: "practiced" | "struggled" | "forgot" | "unexpected",
    note: string
  ) => {
    setDailySession((prev) => ({
      ...prev,
      eveningReflection: {
        status,
        note,
        completedAt: new Date().toISOString(),
      },
    }));
  };

  // Dismiss Heart Mirror Theme
  const handleDismissTheme = (themeId: string) => {
    setHeartThemes((prev) =>
      prev.map((t) => (t.id === themeId ? { ...t, isDismissed: true } : t))
    );
  };

  // Explore Theme via Companion
  const handleExploreTheme = (theme: HeartMirrorTheme) => {
    setCompanionInitialPrompt(
      `I want to understand and pray through this pattern: "${theme.title}". How can I practice ${theme.suggestedPractice} in light of ${theme.scripture}?`
    );
    setIsCompanionOpen(true);
  };

  // Run Real-time Heart Mirror AI Scan
  const handleRunHeartMirrorScan = async () => {
    try {
      const res = await fetch("/api/heart-mirror", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reflections: [
            dailySession.reflect.userReflection ||
              "I felt defensive when my colleague questioned my project timeline today. I shut down and withdrew from the conversation, feeling bitter for the rest of the day.",
          ],
        }),
      });

      if (res.ok) {
        const newTheme: HeartMirrorTheme = await res.json();
        setHeartThemes((prev) => [newTheme, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Start Journey handler
  const handleStartJourney = (journeyId: string) => {
    setActiveJourneyId(journeyId);
    setCurrentView("journeys");
  };

  // Change Tier
  const handleSelectTier = (tier: UserTier) => {
    setUserProfile((prev) => ({ ...prev, tier }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#ffffff] flex flex-col font-sans selection:bg-[#c5a368] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === "companion") {
            setCompanionInitialPrompt(undefined);
            setIsCompanionOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        userProfile={userProfile}
        onOpenCompanion={() => {
          setCompanionInitialPrompt(undefined);
          setIsCompanionOpen(true);
        }}
        onOpenNextStep={() => setIsNextStepOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1 pb-24 sm:pb-28">
        {currentView === "landing" && (
          <LandingPage
            onStartAssessment={() => setCurrentView("assessment")}
            onExploreApp={(view) => setCurrentView(view || "daily")}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {currentView === "assessment" && (
          <OnboardingAssessment
            onComplete={handleAssessmentComplete}
            onCancel={() => setCurrentView("landing")}
          />
        )}

        {(currentView === "profile" || currentView === "progress") && (
          <FormationProfileView
            userProfile={userProfile}
            onStartJourney={handleStartJourney}
            onNavigate={(view) => setCurrentView(view)}
            onUpdateProfile={handleUpdateProfile}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {currentView === "daily" && (
          <DailyFormationView
            session={dailySession}
            userProfile={userProfile}
            onSaveReflection={handleSaveReflection}
            onSaveEveningStatus={handleSaveEveningStatus}
            onOpenNextStep={() => setIsNextStepOpen(true)}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}

        {currentView === "mirror" && (
          <HeartMirrorView
            themes={heartThemes}
            userProfile={userProfile}
            onDismissTheme={handleDismissTheme}
            onExploreTheme={handleExploreTheme}
            onRunScan={handleRunHeartMirrorScan}
          />
        )}

        {currentView === "pain" && (
          <PainToFormationView
            onSelectPathway={(pathway: PainPathway) => {
              handleStartJourney(pathway.recommendedJourneyId);
            }}
            onStartJourney={handleStartJourney}
          />
        )}

        {currentView === "journeys" && (
          <FormationJourneysView
            userProfile={userProfile}
            activeJourneyId={activeJourneyId}
            onSelectJourney={(id) => setActiveJourneyId(id)}
            onOpenPricing={() => setIsPricingOpen(true)}
            onCompleteDay={(jId, day) => {
              console.log(`Completed day ${day} for journey ${jId}`);
            }}
          />
        )}

        {currentView === "groups" && (
          <SmallGroupsView
            userProfile={userProfile}
            onOpenCompanion={(prompt) => {
              setCompanionInitialPrompt(prompt);
              setIsCompanionOpen(true);
            }}
          />
        )}

        {currentView === "sermons" && <SermonTransformView />}

        {currentView === "family" && <FormedFamilyView />}

        {currentView === "church" && <ChurchLeadershipView />}
      </main>

      {/* Persistent App Bottom Buttons Navigation Bar */}
      <BottomNav
        currentView={currentView}
        onNavigate={(view) => {
          if (view === "companion") {
            setCompanionInitialPrompt(undefined);
            setIsCompanionOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        onOpenNextStep={() => setIsNextStepOpen(true)}
        onOpenCompanion={() => {
          setCompanionInitialPrompt(undefined);
          setIsCompanionOpen(true);
        }}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        userProfile={userProfile}
      />

      {/* Global AI Companion Modal */}
      <AICompanionModal
        isOpen={isCompanionOpen}
        onClose={() => setIsCompanionOpen(false)}
        userProfile={userProfile}
        initialPrompt={companionInitialPrompt}
      />

      {/* Global Next Step Guidance Modal */}
      <NextStepModal
        isOpen={isNextStepOpen}
        onClose={() => setIsNextStepOpen(false)}
        userProfile={userProfile}
      />

      {/* Global Pricing & Upgrades Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        currentTier={userProfile.tier}
        onSelectTier={handleSelectTier}
      />

      {/* Global Settings & Privacy Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        onResetData={handleResetData}
      />
    </div>
  );
}
