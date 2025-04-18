"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Student } from "./data"

export type UserRole = "student" | "staff"

export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  studentId?: string // Only for students
}

interface AuthContextType {
  user: AuthUser | null
  login: (username: string, password: string, students: Student[]) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string, students: Student[]): Promise<boolean> => {
    // For career services staff
    if (username.toLowerCase() === "admin" && password === "admin123") {
      const staffUser: AuthUser = {
        id: "staff-1",
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        role: "staff",
      }
      setUser(staffUser)
      localStorage.setItem("user", JSON.stringify(staffUser))
      return true
    }

    // For students
    // Username format is firstName + lastName (case insensitive)
    const student = students.find((s) => {
      const studentUsername = (s.firstName + s.lastName).toLowerCase().replace(/\s+/g, "")
      return studentUsername === username.toLowerCase().replace(/\s+/g, "")
    })

    if (student && password === "123456") {
      const studentUser: AuthUser = {
        id: `student-${student.id}`,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        role: "student",
        studentId: student.id,
      }
      setUser(studentUser)
      localStorage.setItem("user", JSON.stringify(studentUser))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
