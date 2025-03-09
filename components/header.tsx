"use client"

import { ChevronLeft, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  return (
    <header className="flex h-14 items-center border-b px-4">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
          <ChevronLeft className={`h-5 w-5 transition-transform duration-200 ${!isSidebarOpen ? "rotate-180" : ""}`} />
          <span className="sr-only">{isSidebarOpen ? "关闭侧边栏" : "打开侧边栏"}</span>
        </Button>
        <h1 className="text-xl font-semibold">双生世界：人生管理系统</h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">普通模式</span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">用户</span>
        </Button>
      </div>
    </header>
  )
}

