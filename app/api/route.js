import { connectDB } from "@/lib/connect-db"
import { Plan } from "@/lib/db-model"
import { NextResponse } from "next/server"

export const GET = async () => {
  await connectDB()
  // get all collections
  const plans = await Plan.find()
  return NextResponse.json({ plans })
}

