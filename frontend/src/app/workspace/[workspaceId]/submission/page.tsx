"use client";

const generators = [
  { key: "readme", label: "Generate README" },
  { key: "devpost", label: "Generate Devpost" },
  { key: "pitch", label: "Generate Pitch Script" },
  { key: "slides", label: "Generate Slides Outline" },
];

export default function SubmissionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Submission Generator</h1>

      <div className="flex flex-wrap gap-3">
        {generators.map((g) => (
          <button
            key={g.key}
            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition"
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Output area */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 min-h-[400px]">
        <textarea
          placeholder="Generated content will appear here. You can edit it before copying."
          className="w-full h-full min-h-[350px] bg-transparent resize-none outline-none"
        />
      </div>
    </div>
  );
}
