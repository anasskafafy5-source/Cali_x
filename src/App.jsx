import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SideProvider } from "./context/SidebarContext";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import MemberDetails from "./pages/MemberDetails";
import CaptainsPage from "./pages/CaptainsPage";
import CaptainDetails from "./pages/CaptainDetails";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <SideProvider>
                <AppLayout />
              </SideProvider>
            }
          >
            <Route index element={<Navigate replace to={"/dashboard"} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/members/:id" element={<MemberDetails />} />
            <Route path="/captains" element={<CaptainsPage />} />
            <Route path="/captains/:id" element={<CaptainDetails />} />
            <Route path="/payments" element={<Transactions />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          top: 24,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#1f2937",
            border: "1px solid #fed7aa",
            borderRadius: "14px",
            padding: "14px 18px",
            fontSize: "15px",
            fontWeight: "500",
            direction: "rtl",
            boxShadow: "0 10px 30px rgba(249,115,22,0.15)",
          },

          success: {
            iconTheme: {
              primary: "#f97316",
              secondary: "#fff",
            },
            style: {
              borderLeft: "5px solid #f97316",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
            style: {
              borderLeft: "5px solid #ef4444",
            },
          },

          loading: {
            iconTheme: {
              primary: "#f97316",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
