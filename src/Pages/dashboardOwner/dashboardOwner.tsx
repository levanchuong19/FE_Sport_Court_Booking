import { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerLocationTab from "./OwnerLocationTab";
import OwnerCourtTab from "./OwnerCourtTab";
import OwnerBookingTab from "./OwnerBookingTab";
import OwnerStaffTab from "./OwnerStaffTab";
import { useNavigate } from "react-router-dom";
import type { BusinessLocation } from "../../Model/businessLocation";
import type { Court } from "../../Model/court";
import type { Slot } from "../../Model/slot";

type TabKey = "overview" | "location" | "court" | "booking" | "staff";

export default function DashboardOwner() {
  const [tab, setTab] = useState<TabKey>("overview");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar tab={tab} setTab={setTab} />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard Chủ Sân</h1>
        {tab === "overview" && (
          <div className="text-lg">
            Chào mừng bạn đến với dashboard quản lý của chủ sân!
          </div>
        )}
        {tab === "location" && (
          <OwnerLocationTab
            onDetail={(record: BusinessLocation) =>
              navigate(`/businessLocation/${record.id}`)
            }
          />
        )}
        {tab === "court" && (
          <OwnerCourtTab
            onDetail={(record: Court) => {
              /* TODO: điều hướng sang trang chi tiết sân nếu có */
            }}

            
          />
        )}
        {tab === "booking" && (
          <OwnerBookingTab
            onDetail={(record: Slot) => {
              /* TODO: điều hướng sang trang chi tiết booking nếu có */
            }}
          />
        )}
        {tab === "staff" && <OwnerStaffTab />}
      </main>
    </div>
  );
}
