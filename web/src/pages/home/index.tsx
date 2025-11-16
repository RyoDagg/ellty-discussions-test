import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import DiscussionForm from "../../components/DiscussionForm";

interface Discussion {
  _id: string;
  start: number;
  createdAt: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    async function fetchDiscussions() {
      try {
        const res = await api.get("/discussions");
        setDiscussions(res);
      } catch (err) {
        console.error("Error fetching listing", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDiscussions();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Discussions</h1>
      <DiscussionForm />

      {discussions.length === 0 ? (
        <p className="text-gray-500">No discussions yet.</p>
      ) : (
        <div className="space-y-3">
          {discussions.map((d) => (
            <Link
              to={`/discussion/${d._id}`}
              key={d._id}
              className="block border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <p className="text-lg font-medium">Start: {d.start}</p>
              <p className="text-sm text-gray-500">
                {new Date(d.createdAt).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
