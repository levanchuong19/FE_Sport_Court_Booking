import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/home';
import Layout from './Components/layout';
import BookingManagement from './Pages/dashboard/BookingManagement';
import DashboardLayout from './Components/dashboardLayout';
import Dashboard from './Pages/dashboard/dashboard';
import CourtManagement from './Pages/dashboard/CourtManagement';
import UserManagement from './Pages/dashboard/UserManagement';
import Statistic from './Pages/dashboard/Statistic';
import BookingPage from './Pages/bookingPage';
import ConfirmBooking from './Pages/confirmBooking';
import GuidePage from './Pages/GuidePage';

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout/>,
      children: [
        {path:"", element: <Home/>}, 
        {path:"booking", element: <BookingPage/>}, 
        {path:"confirm-booking", element: <ConfirmBooking/>}, 
        {path:"guide", element: <GuidePage/>}, 
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {path:"", element: <Dashboard/>},
        {path:"/dashboard/booking", element: <BookingManagement/>}, 
        {path:"/dashboard/court", element: <CourtManagement/>}, 
        {path:"/dashboard/user", element: <UserManagement/>}, 
        {path:"/dashboard/statistic", element: <Statistic/>}, 
      ],
    },
  ]); 

  return  <RouterProvider router={router} />
}

export default App
