
import { PlanFooter } from "@/components/common/plan-footer";
import { PlanNav } from "@/components/common/plan-nav";
import { getPlan } from "@/lib/services/get-plan";
import { PlanHero } from "@/components/plan/plan-hero";
import { PlanHighlight } from "@/components/plan/plan-highligh";
import { PlanItinerary } from "@/components/plan/plan-itinerary";
import { getPlans } from "@/lib/services/get-plans";

export const generateStaticParams = async () => {
  const plans = await getPlans()
  return plans.map(plan => ({ slug: plan.slug }))
}

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const plan = await getPlan(slug)
  return {
    title: plan.title,
    description: plan.summary,
    openGraph: {
      title: plan.title,
      description: plan.summary,
      images: [plan.heroImageUrl],
    },

  }
}
const PlanPage = async ({ params }) => {
  const { slug } = await params;

  const plan = await getPlan(slug)

  return (
    <div>
      <PlanNav />
      <PlanHero slug={slug} />

      <PlanHighlight slug={slug} />
      <PlanItinerary slug={slug} />
      <PlanFooter />
    </div>)

};

export default PlanPage;