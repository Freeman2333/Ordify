import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen max-w-3xl mx-auto">
      <Outlet />
    </div>
  );
};

export default MainLayout;
