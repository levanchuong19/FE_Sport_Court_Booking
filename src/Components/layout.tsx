import { Outlet } from "react-router-dom";
import Header from "../Pages/header";
import Footer from "../Pages/footer";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
