import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-6xl font-bold tracking-tight">Pilot</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Your AI copilot for hackathons. Go from idea to submission in record
          time.
        </p>
        <p className="text-gray-500 dark:text-gray-500 max-w-xl mx-auto">
          AI-powered project planning, real-time task tracking, and automatic
          submission generation — all in one platform built for hackathon speed.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition"
          >
            Start a Hackathon
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
