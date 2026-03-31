import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Dashboard from "./dashboard/Dashboard.jsx";
import { loadUser } from "./redux/actions/auth";
import MainLayout from "./MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import Profie from "./pages/Profie.jsx";
import { Signup } from "./pages/signup.jsx";
function App() {
  const { loading, user, error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, success]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute auth={user?.auth} loading={loading} role={"admin"}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute auth={user?.auth} loading={loading}>
              <MainLayout>
                <Profie />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
