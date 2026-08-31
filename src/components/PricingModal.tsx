import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { UserTier } from "../types";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: UserTier;
  onSelectTier: (tier: UserTier) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  currentTier,
  onSelectTier,
}) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  if (!isOpen) return null;

  const handleUpgrade = (tier: UserTier) => {
    onSelectTier(tier);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#c5a368", "#d8b67b", "#ffffff"],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111111] border border-white/15 rounded-3xl w-full max-w-5xl p-6 sm:p-10 shadow-2xl my-8 relative max-h-[92vh] overflow-y-auto text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 bg-[#181818] border border-[#c5a368]/30 text-[#c5a368] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Honest, Transparent Discipleship</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Invest in What Lasts
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-2">
            No manipulative guilt or fake urgency. 100% money-back guarantee.
          </p>

          {/* Billing cycle toggle */}
          <div className="inline-flex items-center bg-[#151515] border border-white/10 rounded-xl p-1 mt-6">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#c5a368] text-black font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                billingCycle === "yearly"
                  ? "bg-[#c5a368] text-black font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span>Yearly</span>
              <span className="bg-[#111111] text-[#c5a368] text-[10px] px-1.5 py-0.5 rounded font-bold">
                Save 30%
              </span>
            </button>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FREE */}
          <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                  Free Discipleship
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  Daily Rhythm
                </h3>
                <div className="mt-3 flex items-baseline space-x-1">
                  <span className="font-serif text-4xl font-normal text-white">$0</span>
                  <span className="text-xs text-white/50">forever free</span>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-white/80 py-4 border-t border-white/10">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>5-10 min Daily Scripture, Context & Practice</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>3 Free Core Formation Journeys</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>"What Should I Do Next?" 3-minute button</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>Private Encrypted Journal</span>
                </li>
              </ul>
            </div>

            <button
              disabled={currentTier === "free"}
              onClick={() => handleUpgrade("free")}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors mt-6 ${
                currentTier === "free"
                  ? "bg-[#1f1f1f] text-white/40 border border-white/5"
                  : "bg-[#181818] border border-white/20 text-white hover:bg-white/10"
              }`}
            >
              {currentTier === "free" ? "Current Plan" : "Select Free Plan"}
            </button>
          </div>

          {/* PLUS / PERSONAL GROWTH */}
          <div className="bg-[#181818] border-2 border-[#c5a368] rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative shadow-lg">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#c5a368] text-black text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
              Most Popular
            </div>

            <div>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c5a368]">
                  Personal Growth
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  FORMIYA Plus
                </h3>
                <div className="mt-3 flex items-baseline space-x-1">
                  <span className="font-serif text-4xl font-normal text-white">
                    {billingCycle === "yearly" ? "$7.99" : "$11.99"}
                  </span>
                  <span className="text-xs text-white/50">/month</span>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-white/90 py-4 border-t border-white/10">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span><strong>Heart Mirror:</strong> Pattern identification</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>Full library of 25+ Formation Journeys</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>Unlimited Scripture AI Companion conversations</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>Pain-to-Formation deep-dive modules</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade("plus")}
              className="w-full py-3.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] text-black font-semibold text-sm transition-all mt-6 shadow-sm flex items-center justify-center space-x-2"
            >
              <span>{currentTier === "plus" ? "Current Plan" : "Upgrade to Plus"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* FAMILY & CHURCH */}
          <div className="bg-[#151515] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                  Family & Community
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  FORMIYA Pro
                </h3>
                <div className="mt-3 flex items-baseline space-x-1">
                  <span className="font-serif text-4xl font-normal text-white">
                    {billingCycle === "yearly" ? "$14.99" : "$19.99"}
                  </span>
                  <span className="text-xs text-white/50">/month</span>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-white/80 py-4 border-t border-white/10">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>Up to 6 family member accounts</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span><strong>FORMIYA Family:</strong> Age-tiered moments</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>Sermon to Discipleship Generator</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a368] shrink-0 mt-0.5" />
                  <span>Small group curriculum & leader guides</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade("pro")}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors mt-6 ${
                currentTier === "pro"
                  ? "bg-[#1f1f1f] text-white/40 border border-white/5"
                  : "bg-[#181818] border border-white/20 text-white hover:bg-white/10"
              }`}
            >
              {currentTier === "pro" ? "Current Plan" : "Upgrade to Pro"}
            </button>
          </div>
        </div>

        {/* Footer Trust Notice */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs sm:text-sm text-white/50 flex items-center justify-center">
          <span>Cancel anytime with 1-click</span>
        </div>
      </div>
    </div>
  );
};
