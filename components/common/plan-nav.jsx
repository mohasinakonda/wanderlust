import { Map, Share2 } from "lucide-react"
import { ShareButton } from "../share-btn"

export const PlanNav = () => {

  return <nav className="absolute top-0 left-0 right-0 z-50 w-full py-6 px-6 lg:px-12 flex justify-between items-center text-white">
    <a href="./index.html">
      <div className="flex items-center gap-2">
        <Map className="w-6 h-6" />
        <span className="text-lg font-medium tracking-tight">Wanderlust</span>
      </div>
    </a>
    <div className="flex items-center gap-4">
      <ShareButton />
    </div>
  </nav>

}