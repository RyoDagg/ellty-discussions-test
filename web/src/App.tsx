import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";

import Home from "./pages/home";
import Discussions from "./pages/discussion";
import { useEffect } from "react";
import { api } from "./services/api";
import { useAuthStore } from "./services/store";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

function App() {
  const { setUser, user } = useAuthStore();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await api.get("/auth/me");
        setUser(user);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discussion/:id" element={<Discussions />} />
        {!user && <Route path="/auth/login" element={<Login />} />}
        {!user && <Route path="/auth/register" element={<Register />} />}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
export default App;
