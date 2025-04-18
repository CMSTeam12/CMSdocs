"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { fetchStudentData, getSkillsCount, type Student } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { ProtectedRoute } from "@/components/protected-route"

// Add imports for the charts at the top of the file
import { SkillsDistributionChart } from "@/components/charts/skills-distribution-chart"
import { WorkModeChart } from "@/components/charts/work-mode-chart"
import { LocationBarChart } from "@/components/charts/location-bar-chart"
import { SalaryDistributionChart } from "@/components/charts/salary-distribution-chart"

export default function CareerServicesDashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [majorFilter, setMajorFilter] = useState("all")
  const [jobLevelFilter, setJobLevelFilter] = useState("all")

  useEffect(() => {
    async function loadData() {
      const data = await fetchStudentData()
      setStudents(data)
      setFilteredStudents(data)
      setLoading(false)
    }

    loadData()
  }, [])

  useEffect(() => {
    let result = students

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (student) =>
          student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply major filter
    if (majorFilter !== "all") {
      result = result.filter((student) => student.major === majorFilter)
    }

    // Apply job level filter
    if (jobLevelFilter !== "all") {
      result = result.filter((student) => student.jobLevel === jobLevelFilter)
    }

    setFilteredStudents(result)
  }, [searchTerm, majorFilter, jobLevelFilter, students])

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["staff"]}>
        <div className="flex min-h-screen flex-col">
          <MainNav />
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Career Services Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  // Get unique majors and job levels for filters
  const majors = Array.from(new Set(students.map((s) => s.major))).filter(Boolean)
  const jobLevels = Array.from(new Set(students.map((s) => s.jobLevel))).filter(Boolean)

  // Calculate skills distribution
  const skillsCount = getSkillsCount(students)
  const sortedSkills = Object.entries(skillsCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  // Calculate work mode preferences
  const workModePrefs: { [key: string]: number } = {}
  students.forEach((student) => {
    const pref = student.workModePreference || "Not Specified"
    workModePrefs[pref] = (workModePrefs[pref] || 0) + 1
  })

  // Calculate job search status
  const jobSearchStatus: { [key: string]: number } = {}
  students.forEach((student) => {
    const status = student.jobSearchStatus || "Not Specified"
    jobSearchStatus[status] = (jobSearchStatus[status] || 0) + 1
  })

  // Calculate location preferences
  const locationPrefs: { [key: string]: number } = {}
  students.forEach((student) => {
    if (student.preferredLocation1) {
      locationPrefs[student.preferredLocation1] = (locationPrefs[student.preferredLocation1] || 0) + 1
    }
    if (student.preferredLocation2) {
      locationPrefs[student.preferredLocation2] = (locationPrefs[student.preferredLocation2] || 0) + 1
    }
    if (student.preferredLocation3) {
      locationPrefs[student.preferredLocation3] = (locationPrefs[student.preferredLocation3] || 0) + 1
    }
  })

  const topLocations = Object.entries(locationPrefs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <ProtectedRoute allowedRoles={["staff"]}>
      <div className="flex min-h-screen flex-col">
        <MainNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Career Services Dashboard</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students.length}</div>
                <p className="text-xs text-muted-foreground">{filteredStudents.length} currently filtered</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sortedSkills.slice(0, 5).map(([skill, count]) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm">{skill.replace(/_/g, " ")}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">{count}</span>
                        <Progress value={(count / students.length) * 100} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topLocations.map(([location, count]) => (
                    <div key={location} className="flex items-center justify-between">
                      <span className="text-sm">{location}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">{count}</span>
                        <Progress value={(count / (students.length * 3)) * 100} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <SkillsDistributionChart students={students} />
            <WorkModeChart students={students} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Student Filters</CardTitle>
                <CardDescription>Filter students by name, major, and job level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name or email"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Select value={majorFilter} onValueChange={setMajorFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Major" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Majors</SelectItem>
                        {majors.map((major) => (
                          <SelectItem key={major} value={major}>
                            {major}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={jobLevelFilter} onValueChange={setJobLevelFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Job Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Job Levels</SelectItem>
                        {jobLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Mode Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(workModePrefs).map(([pref, count]) => (
                    <div key={pref} className="flex items-center justify-between">
                      <span className="text-sm">{pref}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">{count}</span>
                        <Progress value={(count / students.length) * 100} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="students">
            <TabsList>
              <TabsTrigger value="students">Student List</TabsTrigger>
              <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                  <CardDescription>{filteredStudents.length} students found</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Major</TableHead>
                        <TableHead>Job Level</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Skills</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.slice(0, 10).map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.firstName} {student.lastName}
                          </TableCell>
                          <TableCell>{student.major}</TableCell>
                          <TableCell>{student.jobLevel}</TableCell>
                          <TableCell>{student.yearsOfExperience} years</TableCell>
                          <TableCell>{student.jobSearchStatus}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(student.skillsMap)
                                .filter(([_, hasSkill]) => hasSkill)
                                .slice(0, 3)
                                .map(([skill]) => (
                                  <Badge key={skill} variant="outline" className="text-xs">
                                    {skill.replace(/_/g, " ")}
                                  </Badge>
                                ))}
                              {Object.values(student.skillsMap).filter(Boolean).length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{Object.values(student.skillsMap).filter(Boolean).length - 3} more
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filteredStudents.length > 10 && (
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      Showing 10 of {filteredStudents.length} students
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Distribution</CardTitle>
                  <CardDescription>Analysis of student skills across the program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Programming Languages</h3>
                      <div className="space-y-2">
                        {["C++", "Java", "Python", "JavaScript", "R_Language"].map((skill) => (
                          <div key={skill} className="flex items-center justify-between">
                            <span className="text-sm">{skill.replace(/_/g, " ")}</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-2">
                                {skillsCount[skill]} ({Math.round((skillsCount[skill] / students.length) * 100)}%)
                              </span>
                              <Progress value={(skillsCount[skill] / students.length) * 100} className="w-40 h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Cloud & DevOps</h3>
                      <div className="space-y-2">
                        {["Cloud_DevOps", "GIT"].map((skill) => (
                          <div key={skill} className="flex items-center justify-between">
                            <span className="text-sm">{skill.replace(/_/g, " ")}</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-2">
                                {skillsCount[skill]} ({Math.round((skillsCount[skill] / students.length) * 100)}%)
                              </span>
                              <Progress value={(skillsCount[skill] / students.length) * 100} className="w-40 h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Data & Analytics</h3>
                      <div className="space-y-2">
                        {["Data_Science", "Big_Data", "Data_Analytics_Visualization"].map((skill) => (
                          <div key={skill} className="flex items-center justify-between">
                            <span className="text-sm">{skill.replace(/_/g, " ")}</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-2">
                                {skillsCount[skill]} ({Math.round((skillsCount[skill] / students.length) * 100)}%)
                              </span>
                              <Progress value={(skillsCount[skill] / students.length) * 100} className="w-40 h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Security</h3>
                      <div className="space-y-2">
                        {["Cybersecurity", "IT_Security_Compliance", "Networking_Security"].map((skill) => (
                          <div key={skill} className="flex items-center justify-between">
                            <span className="text-sm">{skill.replace(/_/g, " ")}</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-2">
                                {skillsCount[skill]} ({Math.round((skillsCount[skill] / students.length) * 100)}%)
                              </span>
                              <Progress value={(skillsCount[skill] / students.length) * 100} className="w-40 h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <LocationBarChart students={students} />
                <SalaryDistributionChart students={students} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
