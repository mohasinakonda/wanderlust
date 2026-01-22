import mongoose from "mongoose";

const HighlightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    icon: String,
    color: String,
    rating: Number,
  },
  { _id: false }
);

const TipSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    icon: String,
    color: String,
  },
  { _id: false }
);

const ItineraryItemSchema = new mongoose.Schema(
  {
    time: String,
    title: String,
    note: String,
  },
  { _id: false }
);

const ItineraryDaySchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    subtitle: String,
    imageQuery: String,
    imageUrl: String,
    schedule: [ItineraryItemSchema],
  },
  { _id: false }
);

const PlanSchema = new mongoose.Schema(
  {

    destination: { type: String, required: true },
    destinationNormalized: { type: String, required: true },
    days: { type: Number, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    highlightsTitle: { type: String, required: true },
    highlightsDescription: { type: String, required: true },
    highlights: [HighlightSchema],
    travelTips: [TipSchema],
    budget: String,
    itinerary: [ItineraryDaySchema],
    heroImageUrl: String,
  },
  { timestamps: true }
);

export const Plan = mongoose.models.plansC || mongoose.model("plansC", PlanSchema);
