import { useState } from "react";
import { useAuthStore } from "../../../services/store";
import { api } from "../../../services/api";

export default function Login() {
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const user = await api.post("/auth/login", { email, password });
    setUser(user);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mx-auto my-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleLogin}
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
    </div>
  );
}
