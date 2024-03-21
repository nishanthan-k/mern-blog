import { Outlet } from "react-router-dom";
import FooterComp from "./components/FooterComp";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <FooterComp />
    </div>
  );
};

export default Layout;
