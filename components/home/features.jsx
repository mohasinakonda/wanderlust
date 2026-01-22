import { Plan } from "@/lib/db-model"
import { Clock } from "lucide-react";
import Link from "next/link";

export const Features = async () => {
  const plans = await Plan.find({}).sort({ createdAt: -1 }).limit(3)
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-[fadeIn_0.8s_ease-out_0.5s_forwards]">
      {/* Card 1: Paris (Matches previous specific request) */}
      {plans.map(plan => <Link key={plan._id} href={`/plan/${plan.slug}`} className="group relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer">
        <img
          src={plan.heroImageUrl}
          alt={plan.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />{plan.days} Days
          </div>
        </div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="text-2xl font-medium text-white tracking-tight leading-tight mb-1 group-hover:text-emerald-200 transition-colors">
            {plan.title}
          </h3>
          <p className="text-white/70 text-sm line-clamp-2">
            {plan.summary}
          </p>
        </div>
      </Link>)}

    </div>
  )
}