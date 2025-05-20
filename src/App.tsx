import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/home';
import Layout from './Components/layout';
import DashboardLayout from './Components/dashboard-layout';
import DashboardPage from './Pages/DashboardPage';
import CourtsPage from './Pages/CourtsPage';
import BookingsPage from './Pages/BookingsPage';
import UsersPage from './Pages/UsersPage';
import ReportsPage from './Pages/ReportsPage';
import SettingsPage from './Pages/SettingsPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout/>,
      children: [
        {path:"", element: <Home/>}, 
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "courts", element: <CourtsPage /> },
        { path: "bookings", element: <BookingsPage /> },
        { path: "users", element: <UsersPage /> },
        { path: "reports", element: <ReportsPage /> },
        { path: "settings", element: <SettingsPage /> },
      ],
    },
  ]); 

  return  <RouterProvider router={router} />
}

export default App
