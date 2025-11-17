import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import MessageNode from "../../components/MessageNode";
import type { User } from "../../services/store";

export interface Discussion {
  _id: string;
  start: number;
  createdAt: string;
  messages?: any[];
  userId?: User;
}

export default function Discussions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchDiscussion = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);
      setError(null);
      const res = await api.get(`/discussions/${id}`);
      setDiscussion(res);
    } catch (err: any) {
      console.error("Error fetching discussion", err);
      setError(err.message || "Failed to load discussion");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDiscussion();
  }, [id]);

  const handleReply = async (
    parentId: string | null,
    operation: string,
    operand: number
  ) => {
    try {
      setSubmitting(true);
      await api.post("/messages", {
        discussionId: id,
        parentId,
        operation,
        operand,
      });

      await fetchDiscussion(true);
    } catch (err: any) {
      console.error("Error sending reply", err);
      alert(err.message || "Failed to send reply");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !discussion) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error ? "Error Loading Discussion" : "Discussion Not Found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The discussion you're looking for doesn't exist."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => fetchDiscussion()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Try Again
            </button>
            <Link
              to="/"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white rounded-lg transition-colors shadow-sm hover:shadow-md border border-gray-200"
              title="Go back"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Discussion Thread
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Started{" "}
                {new Date(discussion.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <button
            onClick={() => fetchDiscussion(true)}
            disabled={refreshing}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh discussion"
          >
            <svg
              className={`w-5 h-5 text-gray-700 ${
                refreshing ? "animate-spin" : ""
              }`}
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
            <span className="text-sm font-medium text-gray-700">
              {refreshing ? "Refreshing..." : "Refresh"}
            </span>
          </button>
        </div>

        {submitting && (
          <div className="flex items-center gap-2 text-sm text-indigo-600 my-4">
            <svg
              className="w-4 h-4 animate-spin"
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
            <span>Submitting reply...</span>
          </div>
        )}

        {/* Discussion Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-opacity duration-300">
          <MessageNode
            node={{
              _id: null,
              operand: discussion.start,
              createdAt: discussion.createdAt,
              children: discussion.messages,
              userId: discussion.userId,
            }}
            onReply={handleReply}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
          >
            ← Back to all discussions
          </Link>
        </div>
      </div>
    </div>
  );
}
