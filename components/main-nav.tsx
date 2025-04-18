"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4 lg:space-x-6 mr-4">
          <Link href="/" className="font-bold text-xl">
            Career Portal
          </Link>
        </div>
        <div className="flex items-center space-x-1">
          <Link href="/" passHref>
            <Button variant={pathname === "/" ? "default" : "ghost"} className="text-sm font-medium transition-colors">
              Student Dashboard
            </Button>
          </Link>
          <Link href="/career-services" passHref>
            <Button
              variant={pathname === "/career-services" ? "default" : "ghost"}
              className="text-sm font-medium transition-colors"
            >
              Career Services
            </Button>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
