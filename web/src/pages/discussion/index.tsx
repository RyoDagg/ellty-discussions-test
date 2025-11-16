import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import MessageNode from "../../components/MessageNode";

export default function Discussions() {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscussion() {
      try {
        const res = await api.get(`/discussions/${id}`);
        setDiscussion(res);
      } catch (err) {
        console.error("Error fetching discussion", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDiscussion();
  }, [id]);

  const handleReply = async (
    parentId: string,
    operation: string,
    operand: number
  ) => {
    try {
      await api.post("/messages", {
        discussionId: id,
        parentId,
        operation,
        operand,
      });

      const updated = await api.get(`/discussions/${id}`);
      setDiscussion(updated);
    } catch (err) {
      console.error("Error sending reply", err);
      alert("Failed to send reply");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!discussion) return <p className="p-4">Not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">
        Discussion starting number: {discussion.start}
      </h1>

      {discussion.messages.map((message: any) => (
        <MessageNode
          key={message._id}
          node={message}
          isRoot={true}
          onReply={handleReply}
        />
      ))}
    </div>
  );
}
