import { Outlet } from "@remix-run/react";

export default function DashboardLayout() {
  return (
    <div id="dashboard-layout" className="pt-32">
      Dashboard layout
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
}
