import { Navigate, Route, Routes } from "react-router";

import OrdersPage from "./pages/OrdersPage";
import OrderPage from "./pages/OrderPage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/orders" replace />} />
      <Route element={<MainLayout />}>
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
