import { useState } from "react";

interface MessageNodeProps {
  node: any;
  level?: number;
  isRoot?: boolean;
  onReply: (parentId: string, op: string, val: number) => void;
}

export default function MessageNode({
  node,
  level = 0,
  isRoot = false,
  onReply,
}: MessageNodeProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyOp, setReplyOp] = useState("+");
  const [replyValue, setReplyValue] = useState(1);

  return (
    <div className="relative">
      {/* Thread Lines */}
      <div
        className="absolute left-0 top-0 h-full border-l border-gray-300"
        style={{ marginLeft: (level - 1) * 28 + 14 }}
      />

      <div
        className="flex items-start gap-2"
        style={{ marginLeft: level * 28 }}
      >
        <div className="px-3 py-2 min-w-36">
          {isRoot ? (
            <p className="text-2xl text-gray-800 underline font-bold">
              {node.operand}
            </p>
          ) : (
            <p className="text-gray-900 font-medium">
              {node.operation} {node.operand} ={" "}
              <span className="font-bold">{node.result}</span>
            </p>
          )}

          {node.children?.length > 0 && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-xs underline cursor-pointer text-blue-500 mt-1"
            >
              {collapsed ? "Expand" : "Collapse"}
            </button>
          )}

          <button
            className="text-xs text-green-600 underline cursor-pointer ml-2"
            onClick={() => setShowReply((p) => !p)}
          >
            Reply
          </button>
          {/* Reply UI */}
          {showReply && (
            <div className="mt-2 flex items-center gap-2">
              <select
                value={replyOp}
                onChange={(e) => setReplyOp(e.target.value)}
                className="border px-1 py-0.5 rounded text-sm"
              >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
              </select>

              <input
                type="number"
                className="border px-2 py-0.5 rounded w-20 text-sm"
                value={replyValue}
                onChange={(e) => setReplyValue(Number(e.target.value))}
              />

              <button
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                onClick={() => {
                  onReply(node._id, replyOp, replyValue);
                  setShowReply(false);
                }}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recursive children */}
      {!collapsed &&
        node.children?.map((child: any) => (
          <MessageNode
            key={child._id}
            node={child}
            level={level + 1}
            onReply={onReply}
          />
        ))}
    </div>
  );
}
