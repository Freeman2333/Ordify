import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";

import ErrorBoundary from "./components/ErrorBoundary";
import { centerScreen } from "../styles/sharedClasses";

const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className={centerScreen}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route element={<MainLayout />}>
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrderPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
