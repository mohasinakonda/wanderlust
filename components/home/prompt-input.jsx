import { SubmitButton } from "@/components/common/submit-button";
import { generatePlanFromPrompt } from "@/lib/services/gemini";
import { Bot } from "lucide-react";

export const PromptInput = () => {

  return (
    <div className="w-full max-w-3xl mb-24 relative group z-20">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-100 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500" />
      <form action={generatePlanFromPrompt} className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex items-start p-3 transition-all focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500">
        <div className="p-4 pt-5">
          <Bot className="w-7 h-7 text-emerald-600" />
        </div>
        <textarea
          name="prompt"
          className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-lg text-slate-900 placeholder:text-slate-400 py-4 px-3 resize-none h-[140px] leading-relaxed"
          placeholder="e.g. A romantic 4-day trip to Paris in Spring, focusing on art museums and hidden cafes..."
          defaultValue={""}
        />
        <div className="p-2 pt-3">
          <SubmitButton />
        </div>
      </form>
      {/* Quick Suggestion Tags */}
      <div className="flex justify-center gap-3 mt-4 text-xs font-medium text-slate-500">
        <span className="hover:text-emerald-600 cursor-pointer transition-colors">
          ✨ 3 Days in Tokyo
        </span>
        <span className="w-1 h-1 bg-slate-300 rounded-full mt-2" />
        <span className="hover:text-emerald-600 cursor-pointer transition-colors">
          🍷 Wine tasting in Tuscany
        </span>
        <span className="w-1 h-1 bg-slate-300 rounded-full mt-2" />
        <span className="hover:text-emerald-600 cursor-pointer transition-colors">
          🏔️ Hiking in Patagonia
        </span>
      </div>
    </div>
  )
}