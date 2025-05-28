import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/home';
import Layout from './Components/layout';
import Dashboard from './Pages/dashboard';
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
      element: <Dashboard />,
    },

  ]); 

  return  <RouterProvider router={router} />
}

export default App
