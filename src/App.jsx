import { Route, Routes } from "react-router";

import Orders from "./pages/Orders";
import Order from "./pages/Order";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Orders />} />
      <Route path="/orders/:orderId" element={<Order />} />
    </Routes>
  );
}

export default App;
