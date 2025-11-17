import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../services/store";
import { api } from "../services/api";

export default function DiscussionForm() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [startValue, setStartValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const start = parseFloat(startValue);
    if (isNaN(start)) {
      setError("Please enter a valid number");
      return;
    }

    setSubmitting(true);
    try {
      const discussion = await api.post("/discussions", { start });
      navigate(`/discussion/${discussion._id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create discussion");
      console.error("Error creating discussion", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          Start New Discussion
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="start-value"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Start Value
          </label>
          <input
            id="start-value"
            type="number"
            step="any"
            placeholder="Enter a number to start the discussion"
            value={startValue}
            onChange={(e) => setStartValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={submitting}
          />
        </div>
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <button
          type="submit"
          disabled={submitting || !startValue.trim()}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          {submitting ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Creating...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create Discussion</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
