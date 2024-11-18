import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBarMain from "./components/NavBar/NavBarMain";
import DashBoard from "./components/DashBoard/DashBoard";
// import CardTemplates from "./components/CardTemplates/CardTemplates";
// import HomePage from "./pages/Home/HomePage";
// import DashBoard from "./components/DashBoard/DashBoard";
// import Landingpnpm install @toolpad/core
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route cho trang Landingpage */}
        {/* <Route path="/" element={<Landingpage />} /> */}
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/" element={<SignUp />} /> */}
        {/* <Route
          path="/"
          element={
            <CardTemplates
              title={"Project mannager"}
              srcImage={"https://picsum.photos/200/300?random=10"}
            />
          }
        /> */}
        <Route path="/" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
