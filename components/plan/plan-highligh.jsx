import { getPlan } from "@/lib/services/get-plan"
import DynamicIcon from "../common/dynamic-icon"

export const PlanHighlight = async ({ slug }) => {
  const plan = await getPlan(slug)
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">

        <div className="max-w-2xl">
          <span className="text-emerald-600 font-medium tracking-wide uppercase text-xs mb-3 block">
            Destination Highlights
          </span>
          <h2 className="text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight mb-6">
            Essentials for your <br />
            {plan.destination} Journey
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            {plan.highlightsDescription}
          </p>
        </div>
      </div>
      {/* Grid Features (Mapped from Attractions, Tips, Food) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {/* Feature 1: Key Attraction */}
        {plan.highlights.map(highlight => <div key={highlight.title} className="group">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-50 mb-6 group-hover:bg-emerald-100 transition-colors">
            <DynamicIcon
              name={highlight.icon || "landmark"}
              className="text-emerald-600 w-6 h-6"
            />
          </div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-medium text-slate-900 tracking-tight">
              {highlight.title}
            </h3>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
              {highlight.rating} ★
            </span>
          </div>
          <p className="text-lg text-slate-500 leading-relaxed">
            {highlight.description}
          </p>
        </div>)}

        {/* Feature 4: Food Experience */}
        {plan.travelTips.map(tip => <div key={tip.title} className="group">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-purple-50 mb-6 group-hover:bg-purple-100 transition-colors">
            <DynamicIcon
              name={tip.icon || "croissant"}
              className="text-purple-500 w-6 h-6"
            />
          </div>
          <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">
            {tip.title}
          </h3>
          <p className="text-lg text-slate-500 leading-relaxed">
            {tip.description}
          </p>
        </div>)}

      </div>
    </section>
  )
}