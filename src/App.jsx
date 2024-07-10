import { useState } from "react";
import Home from "./pages/Home";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";
import Login from "./pages/Login";
import AuthLayout from "./components/AuthLayout";
import MainLayout from "./components/MainLayout";
import Register from "./pages/Register";
import { useUserContext } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import { useTheme } from "./contexts/ThemeProvider";

function App() {
  const { theme } = useTheme();
  return (
    <div
      className={theme === "light" ? "light-theme-custom" : "dark-theme-custom"}
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/profile" element={<MainLayout />}>
          <Route index element={<Profile />} />
        </Route>
        <Route
          path="/task"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TaskList />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
