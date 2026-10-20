import React, { useState, useEffect } from "react";
import {
  Lock,
  Plus,
  Search,
  BookOpen,
  Calendar,
  Trash2,
  Download,
  Copy,
  Check,
  Tag,
  ShieldCheck,
  Send,
  X,
  Sparkles,
} from "lucide-react";
import { JournalEntry, UserProfile } from "../types";
import {
  getStoredJournalEntries,
  addJournalEntry,
  removeJournalEntry,
} from "../lib/journalStorage";

interface ReflectionJournalViewProps {
  userProfile: UserProfile;
  onNavigate?: (view: string) => void;
}

export const ReflectionJournalView: React.FC<ReflectionJournalViewProps> = ({
  userProfile,
  onNavigate,
}) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Entry Form State
  const [newTitle, setNewTitle] = useState<string>("");
  const [newScripture, setNewScripture] = useState<string>("");
  const [newCategory, setNewCategory] = useState<JournalEntry["category"]>("Reflection");
  const [newContent, setNewContent] = useState<string>("");

  useEffect(() => {
    setEntries(getStoredJournalEntries());
  }, []);

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const created = addJournalEntry({
      title: newTitle.trim() || `Reflection on ${new Date().toLocaleDateString()}`,
      scriptureReference: newScripture.trim() || undefined,
      category: newCategory,
      content: newContent.trim(),
    });

    setEntries(getStoredJournalEntries());
    setNewTitle("");
    setNewScripture("");
    setNewContent("");
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    const updated = removeJournalEntry(id);
    setEntries(updated);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(entries, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `formiya_encrypted_journal_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const categories = ["All", "Reflection", "Prayer", "Confession", "Gratitude", "Lament"];

  const filteredEntries = entries.filter((entry) => {
    const matchesCat =
      selectedCategory === "All" || entry.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      entry.title.toLowerCase().includes(q) ||
      entry.content.toLowerCase().includes(q) ||
      (entry.scriptureReference && entry.scriptureReference.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  const categoryColors: Record<JournalEntry["category"], string> = {
    Reflection: "bg-[#1f1a14] text-[#c5a368] border-[#c5a368]/30",
    Prayer: "bg-blue-950/40 text-blue-300 border-blue-800/40",
    Confession: "bg-rose-950/40 text-rose-300 border-rose-800/40",
    Gratitude: "bg-emerald-950/40 text-emerald-300 border-emerald-800/40",
    Lament: "bg-purple-950/40 text-purple-300 border-purple-800/40",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-white">
      {/* Header Banner */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-9 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Private Encrypted Reflection Journal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Reflection Journal
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-2 max-w-xl leading-relaxed">
            Your sacred space to record prayers, confessions, quiet revelations, and honest thoughts before God.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#181818] border border-white/10">
              <Lock className="w-3 h-3 text-[#c5a368]" />
              <span>Client-Side Encrypted Storage</span>
            </span>
            <span>•</span>
            <span>{entries.length} Total Entries</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAdding(true)}
            className="px-5 py-3 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm flex items-center space-x-2 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Reflection</span>
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-3 rounded-xl bg-[#181818] hover:bg-[#222222] border border-white/15 text-white/80 hover:text-white text-sm font-semibold flex items-center space-x-2 transition-colors"
            title="Download offline backup of your journal"
          >
            <Download className="w-4 h-4 text-[#c5a368]" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* New Entry Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/15 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-5 h-5 text-[#c5a368]" />
                <h3 className="font-serif text-2xl text-white">New Journal Entry</h3>
              </div>
              <button
                onClick={() => setIsAdding(false)}
                className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEntry} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                  Entry Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Learning to Wait on God's Timing"
                  className="w-full p-3.5 rounded-xl border border-white/10 bg-[#181818] text-sm text-white focus:outline-none focus:border-[#c5a368]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-3.5 rounded-xl border border-white/10 bg-[#181818] text-sm text-white focus:outline-none focus:border-[#c5a368]"
                  >
                    <option value="Reflection">Reflection</option>
                    <option value="Prayer">Prayer</option>
                    <option value="Confession">Confession</option>
                    <option value="Gratitude">Gratitude</option>
                    <option value="Lament">Lament</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                    Scripture Anchor (Optional)
                  </label>
                  <input
                    type="text"
                    value={newScripture}
                    onChange={(e) => setNewScripture(e.target.value)}
                    placeholder="e.g. Psalm 23:1-3"
                    className="w-full p-3.5 rounded-xl border border-white/10 bg-[#181818] text-sm text-white focus:outline-none focus:border-[#c5a368]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                  Your Honest Reflection & Prayer
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={6}
                  placeholder="Pour out your honest thoughts, prayers, struggles, or quiet insights here..."
                  className="w-full p-4 rounded-xl border border-white/10 bg-[#181818] text-sm sm:text-base text-white focus:outline-none focus:border-[#c5a368] leading-relaxed"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-white/50 flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-[#c5a368]" />
                  <span>Will be encrypted on this device</span>
                </span>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm shadow-md"
                  >
                    Save Encrypted Entry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reflections, scripture, thoughts..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-[#141414] text-sm text-white focus:outline-none focus:border-[#c5a368] placeholder:text-white/40"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#c5a368] text-black"
                  : "bg-[#141414] border border-white/10 text-white/80 hover:bg-[#1f1f1f]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Journal Entries List */}
      {filteredEntries.length === 0 ? (
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-12 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-[#c5a368]/40 mx-auto" />
          <h3 className="font-serif text-2xl text-white">No reflections found</h3>
          <p className="text-sm text-white/60 max-w-md mx-auto">
            {searchQuery
              ? `No journal entries match "${searchQuery}". Try a different search term or category.`
              : "You haven't added any reflections in this category yet. Click below to write your first entry."}
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="px-5 py-2.5 rounded-xl bg-[#c5a368] text-black font-semibold text-sm inline-flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Reflection</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-[#121212] border border-white/10 hover:border-[#c5a368]/30 rounded-2xl p-6 sm:p-7 space-y-4 transition-all shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                      categoryColors[entry.category] || "bg-[#181818] text-white"
                    }`}
                  >
                    {entry.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                    {entry.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3 text-xs text-white/50">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#c5a368]" />
                    <span>{entry.date}</span>
                  </span>
                  {entry.encrypted && (
                    <span className="inline-flex items-center space-x-1 text-[#c5a368]" title="Encrypted on device">
                      <Lock className="w-3 h-3" />
                      <span>Encrypted</span>
                    </span>
                  )}
                </div>
              </div>

              {entry.scriptureReference && (
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#c5a368] bg-[#1a1712] border border-[#c5a368]/20 px-3 py-1 rounded-lg">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{entry.scriptureReference}</span>
                </div>
              )}

              <p className="text-sm sm:text-base text-white/85 leading-relaxed whitespace-pre-wrap font-normal">
                {entry.content}
              </p>

              <div className="pt-2 flex items-center justify-end space-x-2 border-t border-white/5">
                <button
                  onClick={() => handleCopy(entry.id, entry.content)}
                  className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors text-xs flex items-center space-x-1"
                  title="Copy reflection to clipboard"
                >
                  {copiedId === entry.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-950/20 transition-colors text-xs flex items-center space-x-1"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
