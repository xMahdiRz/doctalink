// src/app/dashboard/patient/layout.tsx

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/SideBar";
import React from "react";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] ">
      <div className="flex flex-1 p-2 h-screen">
        <Sidebar />
        <main className="flex-1  overflow-y-auto    ">
          <div className="bg-white rounded-xl   ">
          <Header />
          {children}
          </div>
        </main>
      </div>
    </div>
  );
}
