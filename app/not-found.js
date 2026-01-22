import Link from "next/link"

const NotFound = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="fixed inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ecfdf5_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-emerald-50 to-transparent" />

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-16">
        <div className="relative w-full max-w-3xl rounded-3xl border border-emerald-100/60 bg-white/70 p-10 shadow-xl backdrop-blur">
          <div className="absolute -right-10 -top-10 hidden h-32 w-32 rounded-full bg-emerald-100/70 blur-2xl md:block" />
          <div className="absolute -bottom-12 -left-10 hidden h-32 w-32 rounded-full bg-teal-100/70 blur-2xl md:block" />

          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                className="h-12 w-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M10 54L54 10" />
                <path d="M14 38l12 12 24-24" />
                <path d="M22 22h20v20H22z" />
                <path d="M32 10v8" />
                <path d="M54 32h-8" />
              </svg>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
                404 - Off the Map
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                This route isn&apos;t on the itinerary
              </h1>
              <p className="text-base text-slate-600">
                The page you&apos;re looking for may have been moved, renamed, or
                never existed. Let&apos;s get you back to your next adventure.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Return to Home
              </Link>

            </div>


          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFound