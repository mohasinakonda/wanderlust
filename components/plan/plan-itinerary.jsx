import { getPlan } from "@/lib/services/get-plan"

export const PlanItinerary = async ({ slug }) => {
  const plan = await getPlan(slug)
  return (
    <section className="bg-emerald-950 py-24 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-emerald-400 font-medium tracking-wide uppercase text-xs mb-3 block">
              Travel Plan
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium text-white tracking-tight">
              Your {plan.days}-Day <br />
              {plan.destination} Itinerary
            </h2>
          </div>
        </div>
        {/* Cards Container (2x2 Grid for 4 Days) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Day 1 Card */}
          {plan.itinerary.map(itinerary => <div key={itinerary.day} className="group relative rounded-3xl overflow-hidden bg-emerald-900/50 border border-emerald-800/50 hover:border-emerald-700 transition-all duration-300">
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img
                src={itinerary.imageUrl}
                alt="Eiffel Tower"
                className="w-full h-full object-cover group-hover:scale-105 duration-700 opacity-90"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">
                Day {itinerary.day}: {itinerary.title}
              </h3>
              {/* Timeline */}
              <div className="space-y-4 mb-6">
                {itinerary.schedule.map(item => <div key={item.time} className="flex gap-4">
                  <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                    {item.time}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="text-emerald-200/60 text-xs">
                      {item.note}
                    </p>
                  </div>
                </div>)}

              </div>
            </div>
          </div>)}

        </div>
      </div>
    </section>
  )
}