import { Route, Routes } from "react-router";

import OrdersPage from "./pages/OrdersPage";
import OrderPage from "./pages/OrderPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
      <Route path="/orders/:orderId" element={<OrderPage />} />
    </Routes>
  );
}

export default App;
