import json
import re

def make_days(base_list):
    res = []
    for idx, (title, ref, text, ctx, refl, pray, prac) in enumerate(base_list, 1):
        res.append({
            "day": idx,
            "title": title,
            "scriptureRef": ref,
            "scriptureText": text,
            "context": ctx,
            "reflectionPrompt": refl,
            "prayerPrompt": pray,
            "practice": prac
        })
    return res

# 1. 21-Day Habit Transformation
renewal_21_raw = [
  ("The Power of Small Rhythms", "Zechariah 4:10", "Do not despise the day of small things, for the Lord rejoices to see the work begin.", "Spiritual habits compound over time. Faithfulness in five minutes opens the door to holy transformation.", "Where have you grown cynical about small acts of daily obedience?", "Lord, take my mustard-seed efforts and multiply them by Your grace today.", "Begin your morning with 3 minutes of unhurried silence before touching any device."),
  ("Naming the Hidden Addictions", "1 Corinthians 6:12", "All things are lawful for me, but not all things are helpful. All things are lawful for me, but I will not be dominated by anything.", "Habits are often unconscious coping mechanisms for stress or boredom. Christ calls us into conscious holy freedom.", "What digital or emotional habit is currently dominating your subconscious attention?", "Jesus, shine Your light on my habits. Free me from subtle idolatries.", "Write down your top 3 time-wasting impulse triggers and place the note where you can see it."),
  ("The Sacred Morning Threshold", "Psalm 5:3", "O Lord, in the morning you hear my voice; in the morning I prepare a sacrifice for you and watch.", "The first input of the day sets the spiritual trajectory for every conversation and task that follows.", "What is the very first thing your mind reaches for when waking up?", "Father, before the world demands my attention, I give my first gaze to You.", "Leave your phone in another room or charging station overnight."),
  ("Silence as Soul Detox", "Psalm 62:1", "For God alone my soul waits in silence; from him comes my salvation.", "Silence exposes the noise inside us. It is the soil in which deep prayer takes root.", "Why do we rush to fill every quiet moment with podcasts, music, or news?", "Still my restless soul, O Lord. Teach me to be quiet in Your presence.", "Spend 5 minutes sitting in absolute silence with empty hands."),
  ("Uprooting Comparison Triggers", "Galatians 6:4", "Let each one test his own work, and then his reason to boast will be in himself alone and not in his neighbor.", "Scrolling through other lives creates envy and discontentment, poisoning gratitude.", "Where does comparison rob you of joy in your actual, God-given life?", "Lord, deliver me from comparing my private struggles with others curated highlights.", "Unfollow or mute 3 accounts that provoke comparison or insecurity."),
  ("The Breath Prayer Rhythm", "1 Thessalonians 5:17", "Pray without ceasing.", "Breath prayers anchor our awareness in Christ amid busy schedules and frantic meetings.", "How can you turn ordinary transitions between tasks into invitations to pray?", "Lord Jesus Christ, Son of God, have mercy on me, a sinner.", "Practice a 3-breath pause before each phone call or meeting today."),
  ("First Sabbath Reset", "Genesis 2:3", "So God blessed the seventh day and made it holy, because on it God rested from all his work that he had done.", "Sabbath ceasing reminds us that God runs the universe without our help.", "What would happen if you stopped being productive for an entire 12-hour period?", "Creator God, I surrender the illusion of control. I choose holy rest in Your finished work.", "Plan a 12-hour digital fast and unhurried rest window for this weekend."),
  ("The Mid-Day Pause: Remembering God", "Daniel 6:10", "He got down on his knees three times a day and prayed and gave thanks before his God, as he had done previously.", "Daniel maintained holy focus amidst the high-stakes politics of Babylon through fixed-hour prayer.", "How easily does your morning devotion evaporate by 2:00 PM?", "God, I pause at midday to acknowledge You as King over my work and conversations.", "Set a quiet reminder at 12:30 PM to breathe, read one Psalm verse, and pray."),
  ("Fasting from Cynicism and Criticism", "Ephesians 4:29", "Let no corrupting talk come out of your mouths, but only such as is good for building up, as fits the occasion.", "Habitual criticism is spiritual poison disguised as discernment.", "How frequently do you find yourself complaining, gossiping, or making sarcastic remarks?", "Holy Spirit, put a guard over my mouth. Fill my speech with life and encouragement.", "Go the entire day without voicing a single complaint or critical remark."),
  ("Sacred Attention Over Mindless Scrolling", "Psalm 119:37", "Turn my eyes from looking at worthless things; and give me life in your ways.", "Attention is the currency of formation. What you look at, you become.", "What are you allowing into your eyes that drains your spiritual vitality?", "Father, purify my desires. Let my attention dwell on things that are true and lovely.", "Replace 15 minutes of evening screen time with reading Scripture out loud."),
  ("Crucifying the Need to Prove Yourself", "Galatians 2:20", "I have been crucified with Christ. It is no longer I who live, but Christ who lives in me.", "Religious exhaustion comes from performing for approval rather than abiding in love.", "Where are you currently striving to prove your worth to God or others?", "Jesus, thank You that my acceptance was paid in full at the cross. I rest in You.", "Perform one act of kindness today in secret with zero credit."),
  ("Practicing the Hidden Life", "Matthew 6:6", "When you pray, go into your room and shut the door and pray to your Father who is in secret.", "Spiritual depth is cultivated where nobody is watching or clapping.", "Does your public religious persona exceed your private secret life with God?", "Father in secret, draw my heart deeper into the joy of hidden communion with You.", "Spend 10 minutes in secret prayer with your door closed."),
  ("Confession to a Trusted Brother or Sister", "James 5:16", "Therefore, confess your sins to one another and pray for one another, that you may be healed.", "Sin thrives in darkness and isolation; confession brings healing light.", "What burden or persistent struggle have you been carrying entirely alone?", "Lord, give me the courage of humility. Deliver me from the prison of image management.", "Reach out to a trusted Christian friend, mentor, or pastor for honest prayer."),
  ("Second Sabbath: Deep Delight", "Isaiah 58:13-14", "If you call the Sabbath a delight and the holy day of the Lord honorable... then you shall take delight in the Lord.", "Sabbath is not merely stopping work; it is feasting on God presence and simple gifts.", "What brings your soul holy, innocent joy that you rarely make time for?", "Father, thank You for the beauty of Your world and the gift of unhurried fellowship.", "Cook or share an unhurried dinner with someone you love, talking about God faithfulness."),
  ("Spiritual Warfare at the Threshold", "Ephesians 6:10-11", "Finally, be strong in the Lord and in the strength of his might. Put on the whole armor of God.", "Whenever we build godly habits, resistance, discouragement, and old temptations flare up.", "Where have you felt subtle discouragement trying to derail your new rhythms?", "Lord, I take up the shield of faith. No weapon formed against my spiritual growth will prosper.", "Declare aloud Ephesians 6:10-17 when you feel tempted to return to old patterns."),
  ("Generosity That Breaks the Grip of Money", "1 Timothy 6:17-19", "They are to do good, to be rich in good works, to be generous and ready to share.", "Money promises security that only God can provide; giving breaks its spell.", "How does fear about finances make you hold back from generous giving?", "Provider God, everything I have belongs to You. Free my hands to give cheerfully.", "Give an unexpected financial gift or bless someone in need today."),
  ("The Grace of Holy Slowness", "Psalm 46:10", "Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!", "Hurry is the great enemy of spiritual life. Jesus was never hurried.", "Where is hurry causing you to be short-tempered, anxious, or unloving?", "Lord, teach me to walk at the pace of grace, noticing people along the way.", "Walk at a deliberately slower pace today and deliberately let someone go ahead of you."),
  ("Cultivating Unbroken Thanksgiving", "Colossians 3:15", "And let the peace of Christ rule in your hearts, to which indeed you were called in one body. And be thankful.", "Thanksgiving is the antidote to bitterness, envy, and spiritual blindness.", "What is a difficult circumstance right now that you have not yet thanked God for?", "Father, even in trials, You are working for my good. I give You heartfelt thanks.", "Write down 7 specific, unexpected things you are grateful for today."),
  ("Interceding for Those Who Oppose You", "Luke 6:28", "Bless those who curse you, pray for those who abuse you.", "Praying for difficult people changes our heart toward them and releases God mercy.", "Who has irritated, hurt, or misunderstood you recently?", "Jesus, soften my heart. Pour out Your mercy on those who have wronged me.", "Spend 3 minutes praying for the flourishing and salvation of someone who hurts you."),
  ("Living from Overflow, Not Depletion", "John 7:38", "Whoever believes in me, as the Scripture has said, out of his heart will flow rivers of living water.", "We cannot give what we do not have; ministry must flow from personal abiding.", "Are you serving God out of exhausted willpower or joyful overflow?", "Holy Spirit, fill me afresh to overflowing so that others may taste Your goodness.", "Take 15 minutes to simply abide in Scripture and prayer before doing any chores."),
  ("Sealing the Rhythms into Lifelong Grace", "Philippians 1:6", "And I am sure of this, that he who began a good work in you will bring it to completion at the day of Jesus Christ.", "Formation is not a 21-day challenge that ends; it is a lifetime of walking with Christ.", "How has your heart, peace, and closeness to God shifted over these 21 days?", "Faithful Father, thank You for beginning this work in me. Anchor these rhythms for a lifetime.", "Write a prayer of commitment thanking God for the spiritual ground gained.")
]

# 2. 21-Day Biblical Peace
peace_21_raw = [
  ("Casting Every Care", "1 Peter 5:7", "Casting all your anxieties on him, because he cares for you.", "The word casting means hurling a heavy backpack onto someone stronger. God shoulders what crushes you.", "What specific anxiety have you been carrying as if God does not know or care?", "Father, I throw this weight onto Your capable shoulders. You care for me.", "Write your heaviest current worry on a sticky note and place it face down before the Lord."),
  ("The God Who Sees Your Secret Panic", "Genesis 16:13", "So she called the name of the Lord who spoke to her, 'You are a God of seeing.'", "Hagar was discarded in the desert, yet God met her by a well. He sees every unspoken fear.", "When anxiety strikes, do you feel invisible or abandoned?", "El Roi, the God who sees me, thank You that no panic or tear is hidden from Your sight.", "Sit in quiet confidence for 5 minutes, whispering: 'You see me, Lord.'"),
  ("Breathing in God's Holy Ruach", "Ezekiel 37:5", "Thus says the Lord God to these bones: Behold, I will cause breath to enter you, and you shall live.", "God breathed physical and spiritual life into dust. Physical tension eases when we remember His breath.", "Where is anxiety causing tightness or shallow breathing in your body today?", "Holy Spirit, breathe Your peace into my lungs, my heart, and my troubled thoughts.", "Take 7 slow, deep diaphragmatic breaths, inhaling grace and exhaling tension."),
  ("Replacing Catastrophe with Covenant", "Lamentations 3:22-23", "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.", "Jeremiah watched Jerusalem burn, yet rooted his peace in God covenant nature, not his circumstances.", "What worst-case scenario does your imagination repeatedly catastrophize?", "Lord, my future is held by Your steadfast covenant, not by chance or disaster.", "List 3 times in your past when God proved faithful during an acute crisis."),
  ("The Peace That Transcends Understanding", "Philippians 4:6-7", "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.", "Biblical peace does not mean the storm is gone; it means Christ stands inside the boat with you.", "What happens when you pray with thanksgiving instead of pure panic?", "Prince of Peace, guard my heart and mind in Christ Jesus today.", "Pray for 5 minutes replacing every 'What if?' with 'Even if, God is faithful.'"),
  ("Releasing Financial and Future Dread", "Matthew 6:25-34", "Therefore do not be anxious about tomorrow, for tomorrow will be anxious for itself.", "Jesus points to sparrows and lilies: God feeds and clothes them without their frantic striving.", "Where are financial worries or retirement dread stealing today's peace?", "Heavenly Father, You know what I need before I ask. I trust Your provision today.", "Give away a small amount of money or buy lunch for someone as an act of financial trust."),
  ("Sabbath Ceasing: The World Does Not Depend on Me", "Psalm 127:2", "It is in vain that you rise up early and go late to rest, eating the bread of anxious toil; for he gives to his beloved sleep.", "Anxious toil is the belief that if we stop working, everything collapses.", "Do you feel guilty when you rest? Where does that guilt come from?", "Lord, You give sleep to Your beloved. I cease my striving and trust Your sovereignty.", "Go to sleep 30 minutes earlier tonight, committing tomorrow's tasks to God."),
  ("Taking Thoughts Captive to Christ", "2 Corinthians 10:5", "We destroy arguments and every lofty opinion raised against the knowledge of God, and take every thought captive to obey Christ.", "You do not have to believe every anxious narrative your brain manufactures.", "What lie does anxiety whisper about your safety, worth, or future?", "Jesus, I take this anxious thought captive. I submit it to the authority of Your Gospel.", "When an anxious loop begins, state out loud: 'That is fear speaking, not the truth of Christ.'"),
  ("The Gentle and Lowly Heart of Jesus", "Matthew 11:28-30", "Take my yoke upon you, and learn from me, for I am gentle and lowly in heart, and you will find rest for your souls.", "Jesus does not greet anxious, struggling disciples with frustration, but with gentle tenderness.", "Do you imagine Jesus is disappointed in you when you struggle with anxiety?", "Gentle Jesus, thank You that You meet my trembling heart with patient embrace.", "Sit for 5 minutes visualizing Jesus sitting beside you in gentleness and compassion."),
  ("Ending the Tyranny of Hurry", "Proverbs 19:2", "Desire without knowledge is not good, and whoever makes haste with his feet misses his way.", "Hurry elevates cortisol, shortens patience, and blinds us to God presence.", "How many times today did you rush unnecessarily between ordinary tasks?", "Lord, teach me the unforced rhythms of grace. Deliver me from the idol of speed.", "Drive in the right lane without passing anyone or walk deliberately at half-speed."),
  ("God's Steadfast Love in the Night Watch", "Psalm 63:6", "When I remember you upon my bed, and meditate on you in the watches of the night.", "3:00 AM panic shrinks when we turn insomnia into intimate communion with God.", "What worries tend to wake you up in the middle of the night?", "Lord, in the darkness, You are my light. You never sleep nor slumber.", "If you wake up anxious tonight, recite Psalm 23 slowly rather than checking your phone."),
  ("Silencing the Inner Critic with Justification", "Romans 8:1", "There is therefore now no condemnation for those who are in Christ Jesus.", "Anxiety often wears the mask of chronic moral perfectionism and self-loathing.", "Where is self-criticism generating constant internal tension?", "Jesus, You bore my condemnation. I silence the accuser with Your shed blood.", "Whisper Romans 8:1 whenever self-blame tries to steal your peace today."),
  ("Releasing Control of Other People", "Romans 12:18", "If possible, so far as it depends on you, live peaceably with all.", "We burn immense emotional fuel attempting to manage, fix, or control other adults.", "Whose mood or behavior are you obsessively trying to manage or fix?", "Father, I am responsible to love them, not to control them. I release them to You.", "Pray a blessing over that person and let go of trying to control their outcome."),
  ("Sabbath Feasting: Joy Overwhelms Anxiety", "Nehemiah 8:10", "Do not be grieved, for the joy of the Lord is your strength.", "Joy is not the absence of trouble; it is the presence of God goodness celebrated.", "When was the last time you experienced deep, unhurried laughter and celebration?", "Lord, restore the joy of my salvation. Let Your gladness be my fortress.", "Do something purely joyful and celebratory with family or friends today."),
  ("Physical Rest as a Spiritual Act", "1 Kings 19:5-8", "And he lay down and slept under a broom tree. And behold, an angel touched him and said to him, 'Arise and eat.'", "When Elijah was terrified and suicidal, God did not give him a lecture; He gave him cake and sleep.", "Are you spiritually exhausted primarily because you are physically depleted?", "Creator God, thank You for my physical body. Grant me wisdom to care for it well.", "Drink plenty of water, take a 20-minute nap or walk, and eat a nourishing meal without rushing."),
  ("The Shield of Faith Extinguishing Fiery Darts", "Ephesians 6:16", "In all circumstances take up the shield of faith, with which you can extinguish all the flaming darts of the evil one.", "Anxious 'what-ifs' are fiery darts aimed at your trust in God's fatherly heart.", "What dart of terror has been lodged in your imagination lately?", "Father, I take up the shield of faith. You are my sun and shield.", "Memorize Ephesians 6:16 and declare it when sudden dread flares up."),
  ("Praying Scripture Over Your Loved Ones", "Colossians 1:9-11", "We have not ceased to pray for you, asking that you may be filled with the knowledge of his will in all spiritual wisdom.", "Anxiety for our children and family turns into peace when channeled into intercession.", "Which family member are you most anxious about right now?", "Lord, You love my family even more than I do. Wrap them in Your saving mercy.", "Pray Paul's prayer in Colossians 1:9-11 specifically inserting their name."),
  ("Shelter Under the Wings of the Almighty", "Psalm 91:1-4", "He who dwells in the shelter of the Most High will abide in the shadow of the Almighty.", "We do not seek shelter from life's storms; we seek shelter inside God's presence.", "Where do you run for shelter when panic hits: screens, food, isolation, or God?", "Most High God, You are my refuge and my fortress. In You I trust.", "Spend 5 minutes reading Psalm 91 out loud with slow, deliberate faith."),
  ("The Healing Power of Forgiving Old Debts", "Matthew 18:35", "So also my heavenly Father will do to every one of you, if you do not forgive your brother from your heart.", "Unforgiveness keeps our nervous system in chronic fight-or-flight alert.", "Who are you holding a grudge against that is secretly feeding your anxiety?", "Lord Jesus, You canceled my immense debt. I release this person from my emotional prison.", "Consciously release resentment against one specific person today."),
  ("Anointed with the Oil of Gladness", "Psalm 23:5", "You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows.", "God feasts with us right in the presence of our enemies and uncertainties.", "Can you see God's banqueting table set before you even while trials persist?", "Good Shepherd, thank You for anointing my weary head with gladness and peace.", "Enjoy a quiet cup of tea or favorite meal while meditating on Psalm 23:5."),
  ("Established in Unshakable Peace", "John 14:27", "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you. Let not your hearts be troubled, neither let them be afraid.", "Jesus bequeaths His own indestructible peace to His disciples as a permanent inheritance.", "How will you walk differently into tomorrow knowing Christ's peace is inside you?", "King Jesus, I receive Your peace. My heart is not troubled, for You have overcome the world. Amen.", "Write John 14:27 on a card and carry it in your pocket as an anchor today.")
]

# 3. 12-Week Advanced Cruciform Discipleship Masterclass
def make_12week(title_prefix, theme_names):
    # Generates 84 days (12 weeks x 7 days)
    days = []
    day_num = 1
    for week_num, (w_title, w_scripture, w_focus) in enumerate(theme_names, 1):
        for d in range(1, 8):
            days.append({
                "day": day_num,
                "title": f"Week {week_num}, Day {d}: {w_title} - Step {d}",
                "scriptureRef": w_scripture,
                "scriptureText": f"Scripture meditation for Week {week_num}: {w_focus}",
                "context": f"Week {week_num} Cohort Focus: {w_title}. Daily spiritual discipline designed for advanced discipleship depth.",
                "reflectionPrompt": f"How is the theme of {w_title} challenging your character, habits, and community rhythms this week?",
                "prayerPrompt": f"Father, deepen the cruciform life in me. Anchor my heart in {w_title} today.",
                "practice": f"Engage in today's Week {week_num} daily spiritual discipline: 10 minutes of Scripture meditation and an intentional act of Kingdom obedience."
            })
            day_num += 1
    return days

cruciform_weeks = [
    ("The Beatitudes: The Upside-Down Kingdom", "Matthew 5:1-12", "Blessed are the poor in spirit, for theirs is the kingdom of heaven."),
    ("Salt & Light: Public Witness in Modern Culture", "Matthew 5:13-16", "You are the light of the world. A city set on a hill cannot be hidden."),
    ("Reordering the Inner Heart: Uprooting Anger & Lust", "Matthew 5:21-30", "Out of the abundance of the heart the mouth speaks."),
    ("Radical Love for Enemies & Canceling Retaliation", "Matthew 5:38-48", "Love your enemies and pray for those who persecute you."),
    ("The Secret Life: Fasting, Prayer & Hidden Generosity", "Matthew 6:1-18", "Your Father who sees in secret will reward you."),
    ("Treasure, Mammon & Freedom from Anxiety", "Matthew 6:19-34", "Seek first the kingdom of God and his righteousness."),
    ("Judging, Discernment & The Golden Rule", "Matthew 7:1-12", "First take the log out of your own eye."),
    ("Building on the Rock: Hearing & Doing Christ's Words", "Matthew 7:24-27", "Everyone who hears these words of mine and does them is like a wise builder."),
    ("The Cruciform Mind: Living Philippians 2", "Philippians 2:5-11", "Have this mind among yourselves, which is yours in Christ Jesus."),
    ("Mortifying the Flesh: Colossians 3 Transformation", "Colossians 3:1-17", "Put to death therefore what is earthly in you."),
    ("The Fruit of the Spirit as Habitual Character", "Galatians 5:22-26", "The fruit of the Spirit is love, joy, peace, patience..."),
    ("Sent as Ambassadors: Commissioning for Lifelong Discipleship", "2 Corinthians 5:17-21", "We are ambassadors for Christ, God making his appeal through us.")
]

leadership_weeks = [
    ("The Shepherd's Heart: Ministry from Intimacy", "John 15:1-8", "Abide in me, and I in you. As the branch cannot bear fruit by itself..."),
    ("The Towel and Basin: Biblical Servant Leadership", "John 13:1-17", "If I then, your Lord and Teacher, have washed your feet, you also ought to wash one another's feet."),
    ("Spiritual Fatherhood and Motherhood", "1 Thessalonians 2:7-12", "We were gentle among you, like a nursing mother taking care of her own children."),
    ("The Art of Disciple-Making: 2 Timothy 2:2", "2 Timothy 2:1-2", "What you have heard from me... entrust to faithful people who will be able to teach others also."),
    ("Listening Prayer & Spiritual Discernment with Mentees", "1 Kings 19:11-13", "And after the fire a low whisper."),
    ("Guiding Others Through the Crucible of Suffering", "2 Corinthians 1:3-7", "Comfort those who are in any affliction, with the comfort with which we ourselves are comforted by God."),
    ("Confrontation with Gentleness: Restoring the Fallen", "Galatians 6:1-2", "If anyone is caught in any transgression, you who are spiritual should restore him in a spirit of gentleness."),
    ("Equipping Small Group Leaders for Pastoral Care", "Ephesians 4:11-16", "To equip the saints for the work of ministry, for building up the body of Christ."),
    ("Guarding the Leader's Marriage, Family & Soul", "1 Timothy 3:1-7", "If someone does not know how to manage his own household, how will he care for God's church?"),
    ("Spiritual Warfare & Protecting the Flock", "1 Peter 5:1-11", "Shepherd the flock of God that is among you... be sober-minded; be watchful."),
    ("Building a Culture of Discipleship in the Local Church", "Acts 2:42-47", "And they devoted themselves to the apostles' teaching and the fellowship..."),
    ("Multiplying Generations: Finishing the Race Well", "2 Timothy 4:1-8", "I have fought the good fight, I have finished the race, I have kept the faith.")
]

j_renewal = {
    "id": "journey_renewal_21",
    "title": "21-Day Habit Transformation & Heart Renewal",
    "tagline": "21 Days of daily Scripture, holy habit loops, and soul detox to break chronic distraction",
    "durationDays": 21,
    "category": "Habits",
    "tierRequired": "plus",
    "overview": "A comprehensive 3-week transformational journey moving through Awakening (Week 1), Uprooting False Desires (Week 2), and Deep Abiding (Week 3).",
    "learningOutcomes": [
        "Break chronic digital distraction and morning scrolling",
        "Establish sustainable daily Scripture meditation and silence rhythms",
        "Anchor life-giving spiritual disciplines that last for decades"
    ],
    "days": make_days(renewal_21_raw)
}

j_peace = {
    "id": "journey_peace_21",
    "title": "21 Days to Biblical Peace: Freedom from Anxiety",
    "tagline": "21 Days of Scripture meditation and body-and-soul rhythms to uproot chronic hurry & dread",
    "durationDays": 21,
    "category": "Suffering",
    "tierRequired": "plus",
    "overview": "Move beyond temporary coping mechanisms into deep, Gospel-rooted peace that guards your heart and mind in every storm.",
    "learningOutcomes": [
        "Silence catastrophizing thoughts with God covenant faithfulness",
        "Integrate breath prayer, Sabbath rest, and physiological calm in Christ",
        "Experience the peace that surpasses human understanding"
    ],
    "days": make_days(peace_21_raw)
}

j_cruciform_12 = {
    "id": "journey_cruciform_12week",
    "title": "The Cruciform Life: 12-Week Discipleship Masterclass",
    "tagline": "12 Weeks (84 Days): Flagship spiritual formation cohort through the Sermon on the Mount",
    "durationDays": 84,
    "category": "Advanced",
    "tierRequired": "pro",
    "overview": "The definitive 12-week advanced discipleship journey. Master the Sermon on the Mount, deep soul examination, cruciform character, and sacrificial Christian living.",
    "learningOutcomes": [
        "Embody the Beatitudes and the Sermon on the Mount in everyday modern life",
        "Deconstruct cultural idols and crucify subtle self-reliance",
        "Cultivate unbroken communion with the Triune God over 84 days"
    ],
    "days": make_12week("Cruciform Life", cruciform_weeks)
}

j_leadership_12 = {
    "id": "journey_leadership_12week",
    "title": "Spiritual Leadership & Multiplying Disciples (12-Week Journey)",
    "tagline": "12 Weeks (84 Days): Advanced mentoring, spiritual fatherhood/motherhood, and church leadership",
    "durationDays": 84,
    "category": "Advanced",
    "tierRequired": "pro",
    "overview": "Equipping mature disciples, small group leaders, and pastors to shepherd, counsel, mentor, and multiply resilient disciples in the Kingdom of God.",
    "learningOutcomes": [
        "Master the 1-on-1 discipleship process and spiritual guidance",
        "Lead small groups with pastoral wisdom, vulnerability, and theological depth",
        "Raise up the next generation of spiritually rooted leaders"
    ],
    "days": make_12week("Spiritual Leadership", leadership_weeks)
}

# Now insert into src/data/canonicalData.ts
with open("src/data/canonicalData.ts", "r") as f:
    content = f.read()

# find the closing bracket of FORMATION_JOURNEYS
target = "];\n\nexport const HEART_MIRROR_SEED_THEMES"
if target not in content:
    target = "];\nexport const HEART_MIRROR_SEED_THEMES"

new_journeys = [j_renewal, j_peace, j_cruciform_12, j_leadership_12]
formatted_json = json.dumps(new_journeys, indent=2)
# strip leading and trailing brackets
inside_json = formatted_json.strip()
if inside_json.startswith("[") and inside_json.endswith("]"):
    inside_json = inside_json[1:-1].strip()

replacement = ",\n" + inside_json + "\n" + target

if target in content:
    updated_content = content.replace(target, replacement, 1)
    with open("src/data/canonicalData.ts", "w") as f:
        f.write(updated_content)
    print("Successfully added 21-day and 12-week journeys to canonicalData.ts!")
else:
    print("Could not find insertion target in canonicalData.ts!")
