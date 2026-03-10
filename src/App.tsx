import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./components/dashboard-layout"
import DashboardPage from "./pages/dashboard"
import CategoriesPage from "./pages/categories"
import ExpensesPage from "./pages/expenses"
import SettingsPage from "./pages/settings"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import {useAuth} from "./context/authContext"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/register" />;
  }

  return children;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}



function App() {
    return (
     <BrowserRouter>
      <Routes>
      {/* Public */}
      <Route path="/register" element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      } />

      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />

      {/* Protected */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      
    </Routes>
    </BrowserRouter>
    )
}

export default App;