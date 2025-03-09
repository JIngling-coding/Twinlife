"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  User,
  Coffee,
  Zap,
  PlayCircle,
  HeartPulse,
  BookOpen,
  RotateCcw,
  Lightbulb,
  Building2,
  Settings,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface SidebarProps {
  isOpen: boolean
}

interface NavItem {
  name: string
  href: string
  icon: LucideIcon
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { name: "首页", href: "/", icon: Home },
    { name: "人生管理", href: "/life", icon: User },
    { name: "生活管理", href: "/daily", icon: Coffee },
    { name: "能量管理", href: "/energy", icon: Zap },
    { name: "行动管理", href: "/action", icon: PlayCircle },
    { name: "情感实验", href: "/emotion", icon: HeartPulse },
    { name: "知识管理", href: "/knowledge", icon: BookOpen },
    { name: "复盘管理", href: "/review", icon: RotateCcw },
    { name: "创造管理", href: "/creation", icon: Lightbulb },
  ]

  const companyItems: NavItem[] = [
    { name: "个人设置", href: "/profile", icon: User },
    { name: "公司管理", href: "/company", icon: Building2 },
    { name: "系统设置", href: "/settings", icon: Settings },
  ]

  if (!isOpen) {
    return (
      <aside className="flex w-16 flex-col justify-between border-r bg-background">
        <nav className="flex flex-col items-center gap-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              title={item.name}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mb-4 flex flex-col items-center gap-4 pt-4">
          <Separator className="w-8" />
          {companyItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              title={item.name}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}
        </div>
      </aside>
    )
  }

  return (
    <aside className="flex w-52 flex-col justify-between border-r bg-background">
      <nav className="flex flex-col gap-1 py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mb-4 flex flex-col gap-1 px-2 pt-2">
        <Separator className="my-2" />
        {companyItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}

