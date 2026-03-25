"use client";

export default function FilesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Files & Assets</h1>
        <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition">
          Upload File
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* File cards rendered here */}
        <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 flex items-center justify-center text-gray-400 min-h-[150px]">
          No files yet
        </div>
      </div>
    </div>
  );
}
