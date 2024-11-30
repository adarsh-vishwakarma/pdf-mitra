import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";
function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
