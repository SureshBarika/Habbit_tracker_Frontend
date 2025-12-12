import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Login from "./components/LoginCard/Login.jsx";
import Register from "./components/RegisterCard/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import {UserContext} from "./context/userDetails.js"

export function App() {
  return (
    <UserContext.Provider value="">
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
    </UserContext.Provider>
  );
}
