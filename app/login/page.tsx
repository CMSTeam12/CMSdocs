"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { fetchStudentData } from "@/lib/data"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [students, setStudents] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const router = useRouter()
  const { user, login } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        router.push("/")
      } else {
        router.push("/career-services")
      }
    }
  }, [user, router])

  // Load student data for authentication
  useEffect(() => {
    async function loadData() {
      const data = await fetchStudentData()
      setStudents(data)
      setDataLoading(false)
    }
    loadData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(username, password, students)
      if (success) {
        // Redirect happens automatically via the useEffect above
      } else {
        setError("Invalid username or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Career Services Portal</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading || dataLoading}
              />
              <p className="text-xs text-muted-foreground">For students: Your first name + last name (e.g., JohnDoe)</p>
              <p className="text-xs text-muted-foreground">For staff: admin</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading || dataLoading}
              />
              <p className="text-xs text-muted-foreground">For students: 123456 | For staff: admin123</p>
            </div>
            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading || dataLoading}>
              {isLoading || dataLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center w-full text-muted-foreground">
            Student Career Services Portal &copy; {new Date().getFullYear()}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
