import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/home";
import Layout from "./Components/layout";
import BookingManagement from "./Pages/dashboard/BookingManagement";
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
import DetailCourt from "./Pages/detailCourt";
import BusinessLocationPage from "./Pages/businessLocation";
import BusinessLocationDetail from "./Pages/businessLocationDetail";
import SearchPage from "./Pages/search";
import DashboardGuard from "./Components/dashboardRouter";
import Profile from "./Pages/profile";

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
        { path: "detail-court/:id", element: <DetailCourt /> },
        { path: "registerPartner", element: <RegisterPartner /> },
        { path: "profile", element: <Profile /> },
        { path: "businessLocation", element: <BusinessLocationPage /> },
        { path: "businessLocation/:id", element: <BusinessLocationDetail /> },
        { path: "search", element: <SearchPage /> }
      ],
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "dashboard",
      element: <DashboardGuard />,
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
