import { Outlet } from "@remix-run/react";

export default function DashboardLayout() {
  return (
    <div id="dashboard-layout">
      Dashboard layout
      <Outlet />
    </div>
  );
}
