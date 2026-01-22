'use server'
import { GoogleGenAI } from "@google/genai";
import { createApi } from "unsplash-js";
import { Plan } from "../db-model";
import { redirect } from "next/navigation";
import { connectDB } from "../connect-db";
import { isRedirectError } from "next/dist/client/components/redirect";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";


// get photo from unsplash
const unsplash = createApi({ accessKey: process.env.UNSPLASH_API_KEY });
const getPhoto = async (query) => {
  const response = await unsplash.search.getPhotos({ query, perPage: 1 })

  return response?.response?.results[0]?.urls?.regular ?? ''
}

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

const parseJson = (text) => {
  if (!text) return null;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  const jsonText = text.slice(start, end + 1);
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    return null;
  }
};

const callGemini = async (payload) => {

  if (!process.env.GEMINI_API_KEY) {
    toast.error("Missing GEMINI_API_KEY in environment variables.");
  }
  const contents = payload?.contents ?? payload;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: "You are a travel planner. Create a compact plan in JSON only.",
      },
    });
    return response.text;
  } catch (e) {
    toast.error(e.message)

  }

};

export const isTravelPrompt = async (prompt) => {

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a travel classifier. Read the prompt and respond in pure JSON.
            Schema:
            {
              "isTravelRelated": boolean,
              "destination": string,
              "days": number
            }
            Rules:
            - destination is a city/country/region when travel related.
            - days is an integer if user mentions duration, else 0.
            - Return only JSON.
            Prompt: ${prompt}`,
          },
        ],
      },
    ],
  };

  const responseText = await callGemini(payload);

  const parsed = parseJson(responseText);
  if (!parsed) {

    return { isTravelRelated: false, destination: "", days: 0 };
  }

  return {
    isTravelRelated: Boolean(parsed.isTravelRelated),
    destination: parsed.destination || "",
    days: Number(parsed.days || 0),
  };
};

export const generatePlanFromPrompt = async (formData) => {
  const prompt = formData.get("prompt");
  await connectDB()

  const isTravelRelated = await isTravelPrompt(prompt);

  if (!isTravelRelated.isTravelRelated) {
    toast.error('Please provide a travel related prompt.')
    return
  }
  const slug = (`${isTravelRelated.destination}-tour-${isTravelRelated.days}-days`).toLowerCase()

  const plan = await Plan.findOne({ slug })
  if (plan) {

    redirect(`/plan/${slug}`)

  }
  const normalizeDestination = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are an AI travel planner. Create a compact plan in JSON only.
  Schema:
  {
    "destination": string,
    "days": number,
    "title": string,
    imageQuery: string,
    "summary": string,
    "highlightsTitle": string,
    "highlightsDescription": string,
    "highlights": [
      { "title": string, "description": string, "icon": string, "color": string, "rating": number }
    ],
    "travelTips": [
      { "title": string, "description": string, "icon": string, "color": string }
    ],
    "budget": string,
    "itinerary": [
      {
        "day": number,
        "title": string,
        "subtitle": string,
        "imageQuery": string,
        "schedule": [
          { "time": string, "title": string, "note": string }
        ]
      }
    ]
  }
  Constraints:
  - it should be kind of key attractions and highlights length 3.
  - travelTips length 3. last one should be estimated budget
  - itinerary length must equal "days".
  - times should be like "09:00 AM".
  - Keep descriptions short and actionable.
  - Icon name should be from lucide-react library.
  - Return only JSON.
  Prompt: ${prompt}`,
          },
        ],
      },
    ],
  };
  try {
    const response = await callGemini(payload);
    const parsed = parseJson(response);


    if (!parsed) {
      toast.error("Gemini response could not be parsed.");
    }
    const photo = await getPhoto(parsed.imageQuery)

    const itinerary = await Promise.all(
      (parsed.itinerary || []).map(async (item) => ({
        ...item,
        imageUrl: await getPhoto(item.imageQuery),
      }))
    );
    const data = {
      prompt,
      destination: parsed.destination,
      destinationNormalized: normalizeDestination(parsed.destination),
      days: Number(parsed.days),
      title: parsed.title,
      summary: parsed.summary,
      highlightsTitle: parsed.highlightsTitle,
      highlightsDescription: parsed.highlightsDescription,
      highlights: parsed.highlights || [],
      travelTips: parsed.travelTips || [],
      budget: parsed.budget || "",
      itinerary,
      heroImageUrl: photo,
      slug,
    }
    await Plan.create(data)
    revalidatePath('/')
    redirect(`/plan/${slug}`)

  } catch (e) {
    if (isRedirectError(e)) {
      throw e
    }
    toast.error(e.message)
  }


};
