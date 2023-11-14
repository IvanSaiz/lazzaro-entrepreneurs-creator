import { apiProjects } from "@/modules/projects/api";
const premiumPlanes = [
  "Plan Premium Anual",
  "Plan Premium Mensual",
  "Plan Premium Semestral"
] as const;

const basicPlanes = [
  "Plan Básico Anual",
  "Plan Básico Mensual",
  "Plan Básico Semestral"
] as const;

type TPlans = typeof premiumPlanes[number] | typeof basicPlanes[number];

type ReturnType = Promise<{
  planName: TPlans;
  isPremiumSubscription: boolean;
}>;

const checkSubscriptionPlan = async (ongId: string): ReturnType => {
  const {
    data: { PlatformSubscription } = {}
  } = await apiProjects.getOrganizationPlan(ongId);

  const isPremiumSubscription = premiumPlanes.includes(
    PlatformSubscription?.name as typeof premiumPlanes[number]
  );

  const planName = PlatformSubscription?.name || "Plan Básico Mensual";

  return {
    planName,
    isPremiumSubscription
  };
};

export default checkSubscriptionPlan;
