import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  // Auth protection component
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    if (
      token &&
      (pathname === "/" || pathname === "/signin" || pathname === "/signup")
    ) {
      window.location.href = "/dashboard";
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp updateToken={updateToken} />} />
        <Route path="/signin" element={<SignIn updateToken={updateToken} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard token={token} logout={() => updateToken(null)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send"
          element={
            <ProtectedRoute>
              <Send token={token} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
