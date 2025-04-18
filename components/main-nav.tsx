"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/lib/auth-context"
import { LogOut, User } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4 lg:space-x-6 mr-4">
          <Link href="/" className="font-bold text-xl">
            Career Portal
          </Link>
        </div>
        <div className="flex items-center space-x-1">
          {user?.role === "student" && (
            <Link href="/" passHref>
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                className="text-sm font-medium transition-colors"
              >
                Student Dashboard
              </Button>
            </Link>
          )}
          {user?.role === "staff" && (
            <>
              <Link href="/" passHref>
                <Button
                  variant={pathname === "/" ? "default" : "ghost"}
                  className="text-sm font-medium transition-colors"
                >
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
            </>
          )}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="text-sm text-muted-foreground flex items-center">
              <User className="h-4 w-4 mr-1" />
              {user?.firstName} {user?.lastName}
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
