/**
 * FORMIYA - Domain Type Definitions
 * "Don't just consume faith. Be formed by it."
 */

export type DiscipleshipLevel =
  | "Seeking"
  | "Rooted"
  | "Following"
  | "Forming"
  | "Serving"
  | "Discipling";

export type BibleTranslation = "ESV" | "NIV" | "CSB" | "NASB" | "NLT" | "KJV";

export type SubscriptionTier = "free" | "plus" | "pro" | "church";
export type UserTier = SubscriptionTier;

export interface FormationIndicators {
  scripture: number; // 1-10
  prayer: number;
  community: number;
  scriptureApplication: number;
  spiritualDisciplines: number;
  service: number;
  discipleship: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: SubscriptionTier;
  discipleshipLevel: DiscipleshipLevel;
  primaryGrowthArea: string;
  bibleTranslation: BibleTranslation;
  churchName?: string;
  isPastorOrLeader?: boolean;
  onboarded: boolean;
  createdAt: string;
  indicators: FormationIndicators;
  streakDays: number;
  completedPracticesCount: number;
  reflectionsCount: number;
  journeysCompletedCount: number;
  encouragedCount: number;
  memorySettings: {
    rememberGoals: boolean;
    rememberJourney: boolean;
    rememberBibleTranslation: boolean;
    allowHeartMirror: boolean;
  };
  privacySettings?: {
    localOnlyStorage: boolean;
    incognitoMode: boolean;
    anonymizeChurchMetrics: boolean;
    allowHeartMirror: boolean;
    ephemeralAiOnly: boolean;
  };
}

export interface AssessmentAnswers {
  relationshipStatus: string;
  scriptureConfidence: string;
  scriptureFrequency: string;
  prayerFrequency: string;
  strongestArea: string;
  stuckArea: string;
  growthDesire: string;
  currentSeason: string;
  currentWeight: string;
  supportNeeded: string;
  churchBelonging: string;
  hasSmallGroup: string;
  hasMentor: string;
  selectedGoals: string[];
}

export interface DailyFormationSession {
  id: string;
  date: string;
  title: string;
  scripturePassage: {
    reference: string;
    text: string;
    translation: string;
  };
  understand: {
    context: string;
    keyInsight: string;
    originalWord?: {
      word: string;
      meaning: string;
    };
  };
  reflect: {
    prompt: string;
    questions: string[];
    userReflection?: string;
  };
  pray: {
    scriptureAnchor: string;
    prayerPrompt: string;
  };
  practice: {
    title: string;
    action: string;
    estimatedMinutes: number;
  };
  eveningReflection?: {
    status?: "practiced" | "struggled" | "forgot" | "unexpected";
    note?: string;
    followUpAnswer?: string;
    completedAt?: string;
  };
}

export interface FormationJourney {
  id: string;
  title: string;
  tagline: string;
  durationDays: number;
  category: "Beginner" | "Prayer" | "Suffering" | "Habits" | "Character" | "Advanced";
  tierRequired: SubscriptionTier;
  overview: string;
  learningOutcomes: string[];
  days: {
    day: number;
    title: string;
    scriptureRef: string;
    scriptureText: string;
    context: string;
    reflectionPrompt: string;
    prayerPrompt: string;
    practice: string;
  }[];
}

export interface HeartMirrorTheme {
  id: string;
  title: string;
  progression: string[];
  explanation: string;
  scripture: string;
  suggestedPractice: string;
  prayer: string;
  dateDetected: string;
  isDismissed?: boolean;
}

export interface PainPathway {
  id: string;
  slug: string;
  title: string;
  category: "Spiritual Crisis" | "Emotions & Heart" | "Relationships" | "Growth & Purpose";
  shortDescription: string;
  keyScripture: string;
  scriptureText: string;
  rootReality: string;
  coreLie: string;
  gospelTruth: string;
  actionableRhythms: string[];
  recommendedJourneyId: string;
}

export interface SmallGroup {
  id: string;
  name: string;
  type: "Men's" | "Women's" | "Young Adults" | "Marriage" | "Discipleship" | "Church General";
  leaderName: string;
  memberCount: number;
  meetingDay: string;
  currentCurriculum: {
    week: number;
    totalWeeks: number;
    topic: string;
    scripture: string;
    openingQuestion: string;
    leaderNotes: string;
    discussionQuestions: string[];
    prayerFocus: string;
    weeklyChallenge: string;
  };
  members: {
    name: string;
    avatar: string;
    role: "Leader" | "Co-Leader" | "Member";
    sharedReflectionsCount: number;
  }[];
}

export interface SermonPackage {
  id: string;
  title: string;
  preacher: string;
  scripture: string;
  date: string;
  summary: string;
  themes: string[];
  fiveDayFollowUp: {
    day: number;
    focus: string;
    scripture: string;
    practice: string;
  }[];
  smallGroupDiscussion: {
    icebreaker: string;
    coreQuestions: string[];
    closingPrayer: string;
  };
  familyDiscussion: {
    kidQuestion: string;
    familyActivity: string;
  };
  weeklyPractice: string;
}

export interface FamilyDiscipleshipSession {
  id: string;
  title: string;
  ageBracket: "Ages 4–7" | "Ages 8–12" | "Teens" | "Adults";
  storyHook: string;
  scripture: string;
  scriptureText: string;
  talkPrompts: string[];
  handsOnActivity: string;
  bedtimePrayer: string;
}

export interface MentorPairing {
  id: string;
  mentorName: string;
  discipleName: string;
  currentGoal: string;
  meetingCadence: string;
  nextMeetingDate: string;
  sharedScripture: string;
  discussionPrompts: string[];
  actionItems: { task: string; completed: boolean }[];
  pastNotes: { date: string; summary: string }[];
}

export interface ChurchAnalytics {
  totalMembers: number;
  activeThisWeekPercent: number;
  topGrowthAreas: { area: string; percent: number }[];
  topStruggles: { struggle: string; count: number }[];
  journeyCompletions: { journeyName: string; count: number }[];
  smallGroupCount: number;
  dailyPracticeCompletionRate: number;
}

export interface CompanionMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  scriptureCitation?: string;
  suggestedAction?: string;
  isCrisis?: boolean;
}
