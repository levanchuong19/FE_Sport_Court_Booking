import { useState } from "react";
import type { Court } from "../../Model/court";
import StaffSidebar from "./StaffSidebar";
import StaffCourtTab from "./StaffCourtTab";
import StaffBookingTab from "./StaffBookingTab";
import type { Slot } from "../../Model/slot";

type TabKey = "overview" | "court" | "booking";

export default function DashboardStaff() {
  const [tab, setTab] = useState<TabKey>("overview");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StaffSidebar tab={tab} setTab={setTab} />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard Nhân viên</h1>
        {tab === "overview" && (
          <div className="text-lg">
            Chào mừng bạn đến với dashboard quản lý của nhân viên!
          </div>
        )}
        {tab === "court" && (
          <StaffCourtTab
            onDetail={(record: Court) => {
              /* TODO: điều hướng sang trang chi tiết sân nếu có */
            }}
          />
        )}
        {tab === "booking" && (
          <StaffBookingTab
            onDetail={(record: Slot) => {
              /* TODO: điều hướng sang trang chi tiết booking nếu có */
            }}
          />
        )}
      </main>
    </div>
  );
}
