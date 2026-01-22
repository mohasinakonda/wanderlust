import { Footer } from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { PromptInput } from "@/components/home/prompt-input";
import { connectDB } from "@/lib/connect-db";


export const metadata = {
  title: "Wanderlust",
  description: "Home page",
}
export default async function Home() {
  await connectDB()


  return (
    <div className="relative">
      <Navbar />
      <div
        className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ecfdf5_100%)]"
      ></div>

      <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 relative w-full max-w-7xl mx-auto">
        {/* Hero Text */}
        <Hero />
        {/* AI Prompt Field */}
        <PromptInput />
        {/* Featured/Recent Cards */}
        <Features />
      </main>
      <Footer />
    </div>
  );
}
