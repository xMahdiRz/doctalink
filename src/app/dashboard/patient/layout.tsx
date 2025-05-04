import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/SideBar";
import React from "react";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex    bg-[#FAFBFC] m-2">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col bg-white rounded-xl  overflow-hidden border ">
          <Header />
          <main className="flex-1 overflow-y-auto ">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}