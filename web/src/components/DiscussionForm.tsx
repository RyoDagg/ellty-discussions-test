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
    <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Start New Discussion
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="any"
          placeholder="Enter start value"
          value={startValue}
          onChange={(e) => setStartValue(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {submitting ? "Creating..." : "Create Discussion"}
        </button>
      </form>
    </div>
  );
}
