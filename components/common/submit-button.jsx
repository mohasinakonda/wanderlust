'use client'
import { ArrowRight } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

export const SubmitButton = () => {
  const { pending } = useFormStatus()
  return <button disabled={pending} className="bg-slate-900 text-white p-3.5 rounded-xl hover:bg-emerald-600 transition-all duration-300 shadow-md group-focus-within:bg-emerald-600 hover:shadow-lg">
    {pending ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
  </button>
}