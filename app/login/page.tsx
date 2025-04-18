"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { fetchStudentData } from "@/lib/data"
import { useAuth } from "@/lib/auth-context"
import { Loader2, Lock, User } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

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
    <div className="min-h-screen flex flex-col">
      {/* Header with theme toggle */}
      <header className="w-full p-4 flex justify-end bg-white dark:bg-gray-950 border-b">
        <ModeToggle />
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="w-full max-w-md">
          {/* SLU Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/slu-logo.png"
              alt="Saint Louis University"
              width={400}
              height={100}
              priority
              className="h-auto"
            />
          </div>

          <Card className="border-2 shadow-lg">
            {/* CMS Logo */}
            <CardHeader className="flex flex-col items-center pb-2 pt-6">
              <div className="bg-white dark:bg-gray-800 rounded-full p-4 mb-4">
                <Image
                  src="/images/cms-logo-new.jpeg"
                  alt="Career Management Services"
                  width={220}
                  height={80}
                  className="h-auto"
                />
              </div>
              <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-400">Career Portal Login</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Access your personalized career dashboard</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading || dataLoading}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Students: Your first name + last name (e.g., JohnDoe)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading || dataLoading}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Default password: 123456 | Staff: admin/admin123</p>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white"
                  disabled={isLoading || dataLoading}
                >
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

            <CardFooter className="flex flex-col space-y-2 border-t pt-4">
              <div className="text-xs text-center w-full text-gray-500">
                Need help? Contact the IT Help Desk at <span className="font-medium">helpdesk@cms.edu</span>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Saint Louis University Career Management Services. All rights reserved.
          </div>
        </div>
      </main>
    </div>
  )
}
