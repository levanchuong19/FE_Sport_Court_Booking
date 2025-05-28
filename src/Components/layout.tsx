import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

function Layout() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "10px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
