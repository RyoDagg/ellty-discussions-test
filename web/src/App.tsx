import "./App.css";

import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";

import Home from "./pages/home";
import Discussions from "./pages/discussion";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discussion/:id" element={<Discussions />} />
      </Routes>
    </div>
  );
}
export default App;
