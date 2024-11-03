import { BrowserRouter, Route, Routes } from "react-router-dom";
//  import Landingpage from "./pages/Landingpage";
// import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route cho trang Landingpage */}
        {/* <Route path="/" element={<Landingpage />} /> */}
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}


export default AppRoutes;
