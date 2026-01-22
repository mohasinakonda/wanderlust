import { getPlan } from "@/lib/services/get-plan"
import DynamicIcon from "../common/dynamic-icon"

export const PlanHero = async ({ slug }) => {
  const plan = await getPlan(slug)
  return (
    <header className="relative w-full h-[85vh] min-h-[600px] overflow-hidden group">
      {/* Background Image */}
      <img
        src={plan.heroImageUrl}
        alt="Paris Landscape"
        className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 ease-in-out duration-700"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-black/30" />
      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16 flex flex-col items-start gap-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-medium drop-shadow-lg">
          <DynamicIcon name="clock" className="w-3.5 h-3.5" />
          <span>{plan.days} Days</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl drop-shadow-lg font-medium text-white tracking-tight leading-[1.1]">
          {plan.title}
        </h1>
        <p className="text-lg text-gray-50 max-w-2xl drop-shadow-lg font-normal leading-relaxed">
          {plan.summary}
        </p>
      </div>
    </header>
  )
}