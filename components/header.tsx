"use client"

import { ChevronLeft, Settings, User } from "lucide-react"
import { useSidebarStore } from "@/store/sidebar"

export default function Header() {
  const { isExpanded, toggle } = useSidebarStore()

  return (
    <header className="flex h-14 items-center border-b bg-white px-4">
      <div className="flex items-center">
        <button onClick={toggle} className="rounded-full p-1 hover:bg-gray-100">
          <ChevronLeft
            className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${!isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        {/* 调大网站标题 */}
        <h1 className="ml-3 font-semibold text-2xl tracking-wide text-black">双生世界: 人生管理系统</h1>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <Settings className="mr-1 h-5 w-5" />
          <span>普通模式</span>
        </button>
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <User className="mr-1 h-5 w-5" />
          <span>用户</span>
        </button>
      </div>
    </header>
  )
}

