import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Page not found.
      </p>
      <Link
        href="/dashboard"
        className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}
