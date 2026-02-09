import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./globals.css"
import DashboardLayout from "./components/dashboard-layout"
import DashboardPage from "./pages/dashboard"
import CategoriesPage from "./pages/categories"
import ExpensesPage from "./pages/expenses"
import SettingsPage from "./pages/settings"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
