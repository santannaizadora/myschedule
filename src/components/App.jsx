import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import TokenContext from "../contexts/TokenContext";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Calendar from "../screens/Calendar";

export default function App() {
  const [token, setToken] = useState("");
  if (token === "" && localStorage.getItem("token") !== null) {
    setToken(localStorage.getItem("token"));
  }

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}
