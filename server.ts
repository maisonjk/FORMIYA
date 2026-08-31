import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialize Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Core Theological System Prompt & Safety Directives
const THEOLOGICAL_SYSTEM_PROMPT = `
You are FORMIYA AI — a biblically grounded, humble, warm, and spiritually mature Christian Discipleship Assistant.
Your core purpose is spiritual formation: moving users from knowing about Jesus to becoming like Jesus and practicing following Him daily.

CRITICAL THEOLOGICAL RULES:
1. SCRIPTURE FIRST: Scripture is authoritative. Never fabricate verses, invent quotations, or misattribute book/chapter/verse citations.
2. NO DIVINE CLAIM: You are an AI tool, NEVER divine authority. Never say "God told me", "God is telling you to...", "God wants you to leave your spouse/church", or "This is definitely God's will for you".
3. ORTHODOX & HUMBLE: Use phrases like "Scripture teaches...", "A common Christian perspective is...", "Christians across traditions hold different views here...". Be intellectually honest and acknowledge when something is debated.
4. FORMATION OVER CONSUMPTION: Always culminate in practical real-world discipleship: a prayer prompt, a reflection question, or a concrete faithful action today.
5. NO SHAME: Never guilt-trip or shame. Speak with grace, truth, and steadfast encouragement.
6. CRISIS SAFETY: If user mentions self-harm, suicide, domestic violence, child abuse, or acute crisis, state gently: "This is bigger than an AI conversation. God cares deeply for you and wants you to have real human support right now." Provide immediate emergency contacts (988 suicide & crisis lifeline, 1-800-799-SAFE) and urge them to connect with a trusted pastor, counselor, or emergency service.
`;

// Helper: Check crisis keywords
function checkCrisisTrigger(text: string): boolean {
  const lower = text.toLowerCase();
  const triggers = [
    "kill myself",
    "suicide",
    "end my life",
    "hurt myself",
    "abuse my child",
    "beat me",
    "hit me",
    "domestic violence",
    "want to die",
  ];
  return triggers.some((t) => lower.includes(t));
}

// 1. Companion / Discipleship Conversation Endpoint
app.post("/api/companion", async (req, res) => {
  try {
    const { message, conversationHistory = [], userContext = {} } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    if (checkCrisisTrigger(message)) {
      return res.json({
        isCrisis: true,
        scripture: "Psalm 34:18 — 'The Lord is near to the brokenhearted and saves the crushed in spirit.'",
        text: `**This is bigger than an AI conversation.**\n\nYour life is precious to God and you do not have to carry this burden alone. Please reach out right now to someone who can help:\n\n- **Suicide & Crisis Lifeline**: Call or text **988** (available 24/7, free and confidential)\n- **National Domestic Violence Hotline**: Call **1-800-799-7233** or text "START" to **88788**\n- **Immediate Pastoral Care**: Please reach out directly to your local church pastor or a trusted licensed counselor.\n\nWe encourage you to pause here and speak to someone who can walk with you in person.`,
        suggestedNextStep: "Contact a trusted human caregiver or hotline immediately.",
      });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback biblically-grounded thoughtful response
      return res.json({
        text: `Scripture reminds us in James 1:22 to "be doers of the word, and not hearers only." Whatever season or challenge you are walking through, God invites you to bring your honest heart to Him. Consider pausing for one minute right now in quiet prayer, asking the Holy Spirit for guidance and courage to take the next faithful step.`,
        scripture: "Philippians 4:6-7 — 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.'",
        context: "Paul wrote these words while imprisoned in Rome, illustrating that peace is rooted in Christ rather than external circumstances.",
        application: "Take five minutes today to sit in stillness, releasing your primary burden to God.",
        suggestedNextStep: "Reflect on where you need God's peace today and share it in prayer.",
      });
    }

    const historyFormatted = conversationHistory
      .map(
        (c: { role: string; content: string }) =>
          `${c.role === "user" ? "Seeker/Disciple" : "FORMIYA Companion"}: ${c.content}`
      )
      .join("\n");

    const prompt = `
User Context:
- Current Discipleship Level: ${userContext.level || "Following"}
- Primary Growth Area: ${userContext.growthArea || "Prayer & Scripture"}
- Current Struggle / Season: ${userContext.currentStruggle || "Consistency & Peace"}
- Preferred Bible Translation: ${userContext.bibleTranslation || "ESV"}

Recent Conversation:
${historyFormatted}

User's New Message:
"${message}"

Provide a structured, beautifully formatted markdown response following the FORMIYA Answer Philosophy:
1. **WHAT SCRIPTURE SAYS**: Cite 1-2 accurate, verified Bible passages with book, chapter, verse.
2. **CONTEXT & MEANING**: Give brief historical/literary context and careful explanation in a warm, humble tone.
3. **HOW THIS APPLIES**: Practical, real-world reflection.
4. **YOUR NEXT FAITHFUL STEP**: Exactly ONE concrete, doable action the user can practice in real life today.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: THEOLOGICAL_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return res.json({
      text: response.text,
      isCrisis: false,
    });
  } catch (error: any) {
    console.error("Companion API Error:", error);
    return res.status(500).json({
      error: "Unable to process discipleship request at this moment.",
      fallback: "Scripture reminds us in Proverbs 3:5-6: 'Trust in the Lord with all your heart, and do not lean on your own understanding.'",
    });
  }
});

// 2. "I Don't Know What To Do Next" Holistic Guidance Engine
app.post("/api/next-step", async (req, res) => {
  try {
    const { userProfile, recentReflections, currentJourney, completedPractices } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        title: "Be Still Before God",
        scripture: "Psalm 46:10 — 'Be still, and know that I am God.'",
        whyThisStep: "When uncertain or overwhelmed, the most faithful posture is not rushing into more activity, but centering your heart in God's presence.",
        action: "Set a timer for 3 minutes. Put your phone away, sit comfortably, breathe deeply, and pray: 'Lord, You are God, and I am Yours.'",
        reflectionQuestion: "What is the primary anxiety you need to release into God's hands today?",
      });
    }

    const prompt = `
The user clicked the central FORMIYA button: "I DON'T KNOW WHAT TO DO NEXT".
Evaluate their formation context and recommend ONE clear, faithful, un-overwhelming next step.

User Profile:
- Name: ${userProfile?.name || "Friend"}
- Growth Area: ${userProfile?.growthArea || "Spiritual Consistency"}
- Discipleship Level: ${userProfile?.discipleshipLevel || "Following"}
- Current Journey: ${currentJourney?.title || "Foundations of Discipleship"}
- Recent Reflection Themes: ${JSON.stringify(recentReflections || []).slice(0, 500)}
- Completed Practices Count: ${completedPractices?.length || 0}

Respond in JSON format with these exact keys:
{
  "title": "Short title of the step",
  "scripture": "Accurate Bible passage reference and text",
  "whyThisStep": "Compassionate 2-sentence rationale tailored to their state",
  "action": "One concrete 3-5 minute practice they can do right now",
  "reflectionQuestion": "One penetrating question to reflect upon after practicing",
  "prayerPrompt": "A 2-sentence conversational prayer"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: THEOLOGICAL_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        temperature: 0.6,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error) {
    console.error("Next-step API error:", error);
    return res.json({
      title: "Pause and Entrust",
      scripture: "Proverbs 3:5-6 — 'Trust in the Lord with all your heart... and he will make straight your paths.'",
      whyThisStep: "When direction seems cloudy, God invites us to lean into trust rather than pressure ourselves for immediate answers.",
      action: "Write down the single decision or weight on your mind, then pray a prayer of surrender.",
      reflectionQuestion: "What would it look like to trust God with the outcome of this day?",
      prayerPrompt: "Lord Jesus, I do not know every next step, but I know You are with me. Guide my thoughts and actions today.",
    });
  }
});

// 3. Heart Mirror: Reflection Pattern Analysis
app.post("/api/heart-mirror", async (req, res) => {
  try {
    const { reflections } = req.body;

    const ai = getGeminiClient();
    if (!ai || !reflections || reflections.length === 0) {
      return res.json({
        patterns: [
          {
            theme: "Longing for Deeper Consistency",
            progression: ["High Desires", "Daily Distractions", "Self-Criticism", "Renewed Longing"],
            explanation: "You frequently express a deep desire to meet God daily, yet feel interrupted by urgent daily demands.",
            scripture: "Lamentations 3:22-23 — 'The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.'",
            suggestedPractice: "Shift from demanding 30 minutes to celebrating a focused 5-minute morning prayer.",
            prayer: "Father, thank You that Your love is not earned by my streak. Meet me in the small moments today.",
          },
        ],
      });
    }

    const prompt = `
Analyze the following user spiritual reflections over time to identify 1-2 recurring emotional/spiritual patterns.
CRITICAL SAFETY & TONE RULE:
- NEVER diagnose mental health conditions, clinical disorders, or spiritual inadequacy.
- Use gentle, observant language ("You may want to explore whether...", "A recurring thread in your journaling is...").
- Map a 4-stage pattern progression (e.g. Rejection -> Insecurity -> Withdrawal -> Resentment, or Overwhelm -> Self-Reliance -> Exhaustion -> Surrender).

Reflections:
${JSON.stringify(reflections).slice(0, 1500)}

Respond in JSON format with this structure:
{
  "patterns": [
    {
      "theme": "Theme title (e.g. Navigating Fear of Failure)",
      "progression": ["Step 1", "Step 2", "Step 3", "Step 4"],
      "explanation": "Gentle 2-3 sentence observation of what connects these reflections",
      "scripture": "Verified Scripture passage with reference and quote",
      "suggestedPractice": "A tangible spiritual discipline or exercise to break the cycle",
      "prayer": "A Scripture-anchored prayer prompt"
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: THEOLOGICAL_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        temperature: 0.5,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error) {
    console.error("Heart Mirror Error:", error);
    return res.json({
      patterns: [
        {
          theme: "Learning to Rest in Grace",
          progression: ["Heavy Responsibility", "Fatigue", "Distancing", "Grace Realization"],
          explanation: "Your recent reflections suggest you may be carrying burdens that God invites you to lay at His feet.",
          scripture: "Matthew 11:28 — 'Come to me, all who labor and are heavy laden, and I will give you rest.'",
          suggestedPractice: "Take a 10-minute Sabbath walk without headphones today, noticing God's creation.",
          prayer: "Lord Jesus, I surrender my striving. Teach my soul to find true rest in Your finished work.",
        },
      ],
    });
  }
});

// 4. Sermon-to-Discipleship Engine
app.post("/api/sermon-transform", async (req, res) => {
  try {
    const { sermonTitle, preacherName, scriptureReference, sermonNotes } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        summary: `Sermon on ${scriptureReference || "Scripture"}: Living Out Christ's Kingdom in Everyday Life.`,
        keyBiblicalThemes: ["Humility and Servant Leadership", "Daily Reliance on the Holy Spirit", "Loving Neighbors Tangibly"],
        fiveDayFollowUp: [
          { day: 1, focus: "Grounded in Truth", scripture: "Psalm 119:105", practice: "Read the focal passage aloud 3 times." },
          { day: 2, focus: "Examining the Heart", scripture: "Psalm 139:23-24", practice: "Ask God to reveal any blind spots in your attitude." },
          { day: 3, focus: "Reaching Out", scripture: "Galatians 6:2", practice: "Send an encouraging text message to someone in your church." },
          { day: 4, focus: "Practicing Generosity", scripture: "2 Corinthians 9:7", practice: "Perform one anonymous act of kindness." },
          { day: 5, focus: "Sabbath & Gratitude", scripture: "Hebrews 4:9-10", practice: "List 5 ways God showed His faithfulness this week." }
        ],
        smallGroupDiscussion: {
          icebreaker: "What stood out most to you from Sunday's message that you found challenging?",
          coreQuestions: [
            "How does this Scripture confront our culture's view of success?",
            "Where in your weekly routine is it hardest to live out this truth?",
            "How can we as a group pray for and hold each other accountable this week?"
          ],
          closingPrayer: "Father, make us doers of this word and not just listeners on Sunday."
        },
        familyDiscussion: {
          kidQuestion: "What is one kind thing Jesus asks us to do for people around us?",
          familyActivity: "Create a 'Blessing Box' in your living room with written notes of gratitude."
        },
        weeklyPractice: "Identify one relationship where you can practice intentional forgiveness or patience this week."
      });
    }

    const prompt = `
Transform the following Sunday sermon into an actionable, comprehensive 5-day discipleship package for individuals, small groups, and families.

Sermon Info:
- Title: ${sermonTitle || "Sunday Sermon"}
- Preacher / Church: ${preacherName || "Pastor"}
- Scripture Passage: ${scriptureReference || "Passage"}
- Notes / Transcript Summary:
"${sermonNotes || "Focus on faithful discipleship, trusting God, and walking with integrity."}"

Respond in valid JSON with this exact structure:
{
  "summary": "2-3 sentence theological summary of the message",
  "keyBiblicalThemes": ["Theme 1", "Theme 2", "Theme 3"],
  "fiveDayFollowUp": [
    { "day": 1, "focus": "Day 1 Focus Title", "scripture": "Accurate passage citation", "practice": "Concrete 5-minute action" },
    { "day": 2, "focus": "Day 2 Focus Title", "scripture": "Accurate passage citation", "practice": "Concrete 5-minute action" },
    { "day": 3, "focus": "Day 3 Focus Title", "scripture": "Accurate passage citation", "practice": "Concrete 5-minute action" },
    { "day": 4, "focus": "Day 4 Focus Title", "scripture": "Accurate passage citation", "practice": "Concrete 5-minute action" },
    { "day": 5, "focus": "Day 5 Focus Title", "scripture": "Accurate passage citation", "practice": "Concrete 5-minute action" }
  ],
  "smallGroupDiscussion": {
    "icebreaker": "Engaging conversational opening question",
    "coreQuestions": ["Discussion question 1", "Discussion question 2", "Discussion question 3"],
    "closingPrayer": "Prayer guide for group leaders"
  },
  "familyDiscussion": {
    "kidQuestion": "Age-appropriate question for kids",
    "familyActivity": "Practical interactive family activity"
  },
  "weeklyPractice": "One major real-world habit challenge for the week"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: THEOLOGICAL_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        temperature: 0.6,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error) {
    console.error("Sermon transform error:", error);
    return res.status(500).json({ error: "Failed to transform sermon" });
  }
});

// 5. Bible Intelligence Engine: Context, Original Languages & Application
app.post("/api/bible-intel", async (req, res) => {
  try {
    const { passage, question } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        passage: passage || "Romans 12:1-2",
        text: "I appeal to you therefore, brothers, by the mercies of God, to present your bodies as a living sacrifice, holy and acceptable to God, which is your spiritual worship.",
        context: "Paul transitions from profound theological exposition of God's grace in Romans 1-11 to ethical and practical Christian life.",
        keyWords: [
          { word: "Logikos", language: "Greek", meaning: "Rational, spiritual, true to reason" },
          { word: "Metamorphousthe", language: "Greek", meaning: "Be transformed from within" }
        ],
        whatItMeans: "True worship is not confined to a ritual building; it encompasses our total bodily existence, thoughts, and habits surrendered to God.",
        perspectives: "Christians agree on total surrender, though traditions express sacrificial living through diverse disciplines of prayer, simplicity, and service.",
        application: "Before checking your phone tomorrow morning, dedicate your hands, eyes, and words to God as a living offering.",
        nextStep: "Pray: 'Lord, take my eyes, my voice, and my schedule today for Your glory.'"
      });
    }

    const prompt = `
Provide deep, verified biblical intelligence on the following Scripture passage / inquiry:
Passage: "${passage}"
User Question / Focus: "${question || "Help me understand the historical context, theological depth, and practical life application."}"

Structure your response in JSON:
{
  "passage": "Full reference and passage text",
  "context": "Historical, authorial, and literary context (2-3 sentences)",
  "keyWords": [
    { "word": "Original Hebrew/Greek word (transliterated)", "language": "Greek/Hebrew", "meaning": "Depth of meaning" }
  ],
  "whatItMeans": "Clear, orthodox theological explanation",
  "perspectives": "Note differences across Christian traditions if applicable (or omit if consensus)",
  "application": "Concrete real-world application for a modern disciple",
  "nextStep": "One faithful practice or prayer"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: THEOLOGICAL_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        temperature: 0.5,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error) {
    console.error("Bible Intel Error:", error);
    return res.status(500).json({ error: "Failed to fetch Bible intelligence." });
  }
});

// 6. Group Curriculum Generator
app.post("/api/group-guide", async (req, res) => {
  try {
    const { groupType, topic, currentWeek } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        title: `Week ${currentWeek || 1}: ${topic || "Foundations of Faith"}`,
        scriptureFocus: "Colossians 2:6-7",
        icebreaker: "Share one memory of someone who helped you take a step forward in your faith.",
        leaderNotes: "Guide the conversation toward honest vulnerability. Encourage members to listen without fixing.",
        questions: [
          "What does it mean to be 'rooted and built up in Him' in your daily routine?",
          "Where do you feel the strongest pull toward worldly distractions right now?",
          "How can our group support you in this season?"
        ],
        prayerFocus: "Pray for mutual encouragement and steadfastness."
      });
    }

    const prompt = `
Create an engaging, biblically rich Small Group Leader Guide.
Group Type: ${groupType || "General Discipleship"} (e.g. Men's, Women's, Young Adults, Marriage, Discipleship)
Topic: ${topic || "Biblical Forgiveness"}
Week: ${currentWeek || 1}

Output JSON with:
{
  "title": "Topic title",
  "scriptureFocus": "Passage citation & key verse",
  "icebreaker": "Low-pressure, engaging opening question",
  "leaderNotes": "Tips for facilitating discussion and maintaining safe vulnerability",
  "questions": ["Opening question", "Deeper Scripture question", "Personal application question", "Accountability question"],
  "prayerFocus": "Suggested prayer structure for the group"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: THEOLOGICAL_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        temperature: 0.6,
      },
    });

    return res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    console.error("Group Guide Error:", error);
    return res.status(500).json({ error: "Failed to generate group guide" });
  }
});

// 7. Family Discipleship Generator
app.post("/api/family-lesson", async (req, res) => {
  try {
    const { ageBracket, theme } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        theme: theme || "Kindness & Compassion",
        ageBracket: ageBracket || "Ages 8-12",
        storyHook: "Jesus and the Good Samaritan",
        scripture: "Luke 10:33 — 'A Samaritan, as he journeyed, came to where he was, and when he saw him, he had compassion.'",
        talkPrompts: [
          "Why is it sometimes hard to be kind to someone who is different from us?",
          "How has Jesus shown compassion to our family?"
        ],
        handsOnActivity: "Make 'Neighbor Kindness Bags' with simple snacks and a hand-written note.",
        bedtimePrayer: "Jesus, give our family eyes to see people the way You see them. Amen."
      });
    }

    const prompt = `
Generate an engaging, age-appropriate Family Discipleship Session.
Age Bracket: ${ageBracket || "Ages 8-12"} (Ages 4-7 / Ages 8-12 / Teens / Multigenerational)
Theme / Truth: ${theme || "Trusting God with Worries"}

Output JSON:
{
  "theme": "Theme title",
  "ageBracket": "${ageBracket}",
  "storyHook": "Engaging hook or story to capture attention",
  "scripture": "Accurate Bible reference and text",
  "talkPrompts": ["Conversational prompt 1", "Conversational prompt 2"],
  "handsOnActivity": "Memorable, tangible 10-minute family activity",
  "bedtimePrayer": "Short, memorable family prayer"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: THEOLOGICAL_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        temperature: 0.6,
      },
    });

    return res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    console.error("Family Discipleship error:", error);
    return res.status(500).json({ error: "Failed to generate family lesson" });
  }
});

// Vite Middleware for Development / Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FORMIYA Discipleship Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
