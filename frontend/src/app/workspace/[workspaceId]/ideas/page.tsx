"use client";

export default function IdeasPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Idea Generator</h1>

      {/* Input Form */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Theme</label>
          <input
            type="text"
            placeholder="e.g. Climate Tech, Health, Education"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sponsor APIs</label>
          <input
            type="text"
            placeholder="e.g. Twilio, Stripe, OpenAI"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Team Skills</label>
          <input
            type="text"
            placeholder="e.g. React, Python, ML, Design"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
          />
        </div>
        <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition">
          Generate Ideas
        </button>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Idea cards rendered here */}
      </div>
    </div>
  );
}
