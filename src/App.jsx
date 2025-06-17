import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";

const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/orders" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
