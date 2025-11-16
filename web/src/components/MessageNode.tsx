import { useState } from "react";
import type { User } from "../services/store";
import { useAuthStore } from "../services/store";

interface MessageNode {
  _id: string;
  parentId?: string | null;
  operation?: string;
  operand: number;
  result?: number;
  createdAt: string;
  userId?: User;
  children?: MessageNode[];
}
interface MessageNodeProps {
  node: MessageNode;
  level?: number;
  isRoot?: boolean;
  onReply: (parentId: string, op: string, val: number) => void;
}

export default function MessageNode({
  node,
  level = 0,
  onReply,
}: MessageNodeProps) {
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyOp, setReplyOp] = useState("+");
  const [replyValue, setReplyValue] = useState(1);

  return (
    <div className="relative py-3">
      {/* Thread Lines */}
      {level > 0 && (
        <div
          className="absolute left-0 top-0 h-full border-l-2 border-indigo-200"
          style={{ marginLeft: (level - 1) * 32 + 15 }}
        />
      )}

      <div
        className="flex items-start gap-3"
        style={{ marginLeft: level * 32 }}
      >
        <div
          className={`px-4 py-3 min-w-56 rounded-lg shadow-sm transition-all ${
            level === 0
              ? "bg-indigo-50/50 border-2 border-indigo-200"
              : "bg-white border border-gray-200 hover:shadow-md hover:border-indigo-300"
          }`}
        >
          {/* User info and timestamp */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {node.userId?.username ? (
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                  @{node.userId.username}
                </span>
              ) : (
                <span className="text-xs italic text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  anonymous
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400">
              {new Date(node.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Content */}
          {level === 0 ? (
            <div className="mb-2">
              <p className="text-3xl text-indigo-900 font-bold">
                {node.operand}
              </p>
              <p className="text-xs text-gray-500 mt-1">Starting value</p>
            </div>
          ) : (
            <div className="mb-2">
              <p className="text-gray-900 font-medium text-base">
                <span className="text-indigo-600 font-semibold">
                  {node.operation}
                </span>{" "}
                <span className="text-gray-700">{node.operand}</span> ={" "}
                <span className="text-indigo-700 font-bold text-lg">
                  {node.result}
                </span>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
            {node.children && node.children.length > 0 && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors px-2 py-1 rounded hover:bg-blue-50"
              >
                {collapsed ? "▶ Expand" : "▼ Collapse"} ({node.children.length})
              </button>
            )}

            {user && (
              <button
                className="text-xs font-medium text-green-600 hover:text-green-700 hover:underline transition-colors px-2 py-1 rounded hover:bg-green-50"
                onClick={() => setShowReply((p) => !p)}
              >
                {showReply ? "✕ Cancel" : "💬 Reply"}
              </button>
            )}
          </div>

          {/* Reply UI */}
          {showReply && user && (
            <div className="mt-3 pt-3 border-t border-gray-200 bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={replyOp}
                  onChange={(e) => setReplyOp(e.target.value)}
                  className="border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="*">&times;</option>
                  <option value="/">÷</option>
                </select>

                <input
                  type="number"
                  className="border border-gray-300 px-3 py-1.5 rounded-md w-24 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={replyValue}
                  onChange={(e) => setReplyValue(Number(e.target.value))}
                  placeholder="Value"
                />

                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors shadow-sm hover:shadow"
                  onClick={() => {
                    onReply(node._id, replyOp, replyValue);
                    setShowReply(false);
                    setReplyValue(1);
                  }}
                >
                  Send
                </button>
              </div>
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
