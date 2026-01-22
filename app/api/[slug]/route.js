import { connectDB } from "@/lib/connect-db"
import { Plan } from "@/lib/db-model"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
  await connectDB()
  const { slug } = await params
  const plan = await Plan.findOne({ slug })
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 })
  }
  return NextResponse.json({ plan })
}