import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/board/:id" element={<BoardPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
