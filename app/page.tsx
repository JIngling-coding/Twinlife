import type { Metadata } from "next"
import { MainLayout } from "@/components/main-layout"
import { EmptyContent } from "@/components/empty-content"

export const metadata: Metadata = {
  title: "首页 - 双生世界：人生管理系统",
  description: "双生世界人生管理系统的首页",
}

export default function Home() {
  return (
    <MainLayout>
      <EmptyContent />
    </MainLayout>
  )
}

