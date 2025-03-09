"use client"

import { useState, type ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen flex-col">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  )
}

