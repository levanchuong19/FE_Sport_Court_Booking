import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/home";
import Layout from "./Components/layout";
import BookingManagement from "./Pages/dashboard/BookingManagement";
import DashboardLayout from "./Components/dashboardLayout";
import Dashboard from "./Pages/dashboard/dashboard";
import CourtManagement from "./Pages/dashboard/CourtManagement";
import UserManagement from "./Pages/dashboard/UserManagement";
import Statistic from "./Pages/dashboard/Statistic";
import Login from "./Pages/login";
import Register from "./Pages/register";
import BookingPage from "./Pages/bookingPage";
import ConfirmBooking from "./Pages/confirmBooking";
import GuidePage from "./Pages/guidePage";
import CourtBooking from "./Pages/courtBooking";
import RegisterPartner from "./Pages/registerPartner";

function App() {
  const router = createBrowserRouter([
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "/booking/:id", element: <BookingPage /> },
        { path: "confirm-booking/:id", element: <ConfirmBooking /> },
        { path: "guide", element: <GuidePage /> },
        { path: "court", element: <CourtBooking /> },
        { path: "registerPartner", element: <RegisterPartner /> },
      ],
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "/dashboard/booking", element: <BookingManagement /> },
        { path: "/dashboard/court", element: <CourtManagement /> },
        { path: "/dashboard/user", element: <UserManagement /> },
        { path: "/dashboard/statistic", element: <Statistic /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
