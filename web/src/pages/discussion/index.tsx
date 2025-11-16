import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import MessageNode from "../../components/MessageNode";

interface Message {
  _id: string;
  operation: string;
  operand: number;
  result: number;
}

interface Discussion {
  _id: string;
  start: number;
  messages: Message[];
}

export default function DiscussionPage() {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscussion() {
      try {
        const res = await api.get(`/discussions/${id}`);
        setDiscussion(res);
      } catch (error) {
        console.error("Error fetching discussion", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDiscussion();
  }, [id]);

  function handleReply(parentId: string, operation: string, operand: number) {
    console.log(parentId, operation, operand);
  }

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!discussion)
    return (
      <p className="text-center mt-10 text-red-500">Discussion not found.</p>
    );

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Discussion #{discussion._id}</h1>

      <div className="bg-white border rounded-lg p-4 shadow">
        <p className="text-lg mb-3">
          Start: <span className="font-semibold">{discussion.start}</span>
        </p>

        <div className="space-y-2">
          {discussion.messages.map((root) => (
            <MessageNode onReply={handleReply} key={root._id} node={root} />
          ))}
        </div>
      </div>
    </div>
  );
}
