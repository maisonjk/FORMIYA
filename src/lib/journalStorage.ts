import { JournalEntry } from "../types";

const JOURNAL_STORAGE_KEY = "formiya_encrypted_journal";
const SALT = "formiya_sacred_cipher_v1_";

// Simple client-side reversible XOR + Base64 encryption
export function encryptString(text: string): string {
  try {
    const salted = SALT + text;
    let result = "";
    for (let i = 0; i < salted.length; i++) {
      result += String.fromCharCode(salted.charCodeAt(i) ^ (73 + (i % 7)));
    }
    return btoa(encodeURIComponent(result));
  } catch (e) {
    return btoa(encodeURIComponent(text));
  }
}

export function decryptString(cipher: string): string {
  try {
    const raw = decodeURIComponent(atob(cipher));
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      result += String.fromCharCode(raw.charCodeAt(i) ^ (73 + (i % 7)));
    }
    if (result.startsWith(SALT)) {
      return result.substring(SALT.length);
    }
    return result;
  } catch (e) {
    return cipher;
  }
}

const INITIAL_SEED_ENTRIES: JournalEntry[] = [
  {
    id: "entry_seed_1",
    title: "Abiding Through the Afternoon Rush",
    date: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
    scriptureReference: "John 15:4-5",
    content: "Felt very rushed today balancing deadlines. When I sat for 3 minutes during lunch, I realized how much I operate out of self-sufficiency. Jesus' reminder that 'apart from me you can do nothing' was such a relief.",
    category: "Reflection",
    encrypted: true,
  },
  {
    "id": "entry_seed_2",
    "title": "Surrendering My Desire to Control Outcomes",
    "date": new Date(Date.now() - 86400000 * 4).toISOString().split("T")[0],
    "scriptureReference": "Psalm 46:10",
    "content": "Spent time in silence letting my hands rest open. I am releasing my anxiety about the family situation. God is on the throne, not me.",
    "category": "Prayer",
    "encrypted": true,
  },
  {
    "id": "entry_seed_3",
    "title": "Confessing Hidden Irritation and Impatience",
    "date": new Date(Date.now() - 86400000 * 7).toISOString().split("T")[0],
    "scriptureReference": "Colossians 3:12-13",
    "content": "Noticed how quickly I snap when interrupted. Praying for the Spirit's patience and remembering how gently the Lord bears with my slow progress.",
    "category": "Confession",
    "encrypted": true,
  }
];

export function getStoredJournalEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(JOURRED_KEY());
    if (!raw) {
      saveAllJournalEntries(INITIAL_SEED_ENTRIES);
      return INITIAL_SEED_ENTRIES;
    }
    const decrypted = decryptString(raw);
    const parsed = JSON.parse(decrypted);
    return Array.isArray(parsed) ? parsed : INITIAL_SEED_ENTRIES;
  } catch (e) {
    console.error("Failed to load encrypted journal:", e);
    return INITIAL_SEED_ENTRIES;
  }
}

function JOURRED_KEY(): string {
  return JOURNAL_STORAGE_KEY;
}

export function saveAllJournalEntries(entries: JournalEntry[]): void {
  try {
    const json = JSON.stringify(entries);
    const encrypted = encryptString(json);
    localStorage.setItem(JOURNAL_STORAGE_KEY, encrypted);
  } catch (e) {
    console.error("Failed to save encrypted journal:", e);
  }
}

export function addJournalEntry(entry: Omit<JournalEntry, "id" | "date" | "encrypted"> & { date?: string }): JournalEntry {
  const current = getStoredJournalEntries();
  const newEntry: JournalEntry = {
    ...entry,
    id: `entry_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    date: entry.date || new Date().toISOString().split("T")[0],
    encrypted: true,
  };
  const updated = [newEntry, ...current];
  saveAllJournalEntries(updated);
  return newEntry;
}

export function removeJournalEntry(id: string): JournalEntry[] {
  const current = getStoredJournalEntries();
  const updated = current.filter((e) => e.id !== id);
  saveAllJournalEntries(updated);
  return updated;
}
