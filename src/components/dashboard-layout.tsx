import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar"

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <Outlet />
      </main>
    </>
  )
}
