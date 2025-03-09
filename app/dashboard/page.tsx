import type { Metadata } from "next"
import { MainLayout } from "@/components/main-layout"
import { DashboardContent } from "@/components/dashboard-content"

export const metadata: Metadata = {
  title: "仪表板 - 双生世界：人生管理系统",
  description: "双生世界人生管理系统的仪表板",
}

export default function DashboardPage() {
  return (
    <MainLayout>
      <DashboardContent />
    </MainLayout>
  )
}

