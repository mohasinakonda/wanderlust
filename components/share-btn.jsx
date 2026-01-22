'use client'
import { Share2 } from "lucide-react"

export const ShareButton = () => {
  // share on facebook with metadata and image
  const handleShare = () => {
    const url = window.location.href
    const title = document.title
    const description = document.querySelector('meta[name="description"]').content
    const image = document.querySelector('meta[property="og:image"]').content
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}&p=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}`
    window.open(facebookUrl, '_blank')
  }
  return <button onClick={handleShare} className="bg-white text-emerald-950 text-sm font-medium px-5 py-2 rounded-full hover:bg-emerald-50 transition-colors flex items-center gap-2">
    <Share2 className="w-4 h-4" />
    Share
  </button>
}