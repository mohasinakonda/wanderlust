import { getBaseUrl } from "./get-plan";

export const getPlans = async () => {
  try {
    const baseUrl = process.env.BASE_URL
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      throw new Error("Failed to fetch plans");
    }
    const data = await response.json();
    return data.plans;
  } catch (e) {
    console.error(e);
    return [];
  }

}