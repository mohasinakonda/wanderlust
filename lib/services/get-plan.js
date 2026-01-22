import { notFound } from "next/navigation";

export const getPlan = async (slug) => {
  const baseUrl = process.env.BASE_URL
  const response = await fetch(`${baseUrl}/${slug}`, { cache: "no-store" });
  if (!response.ok) {
    notFound()
  }
  const data = await response.json();
  return data.plan;
};