"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { fetchStudentData, getJobSuggestions, getCertificationSuggestions, type Student } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"
import { Check, X } from "lucide-react"

export default function StudentDashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  useEffect(() => {
    async function loadData() {
      const data = await fetchStudentData()
      setStudents(data)
      if (data.length > 0) {
        setSelectedStudent(data[0])
      }
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <MainNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[200px]" />
            <Skeleton className="h-[200px]" />
            <Skeleton className="h-[200px]" />
          </div>
        </div>
      </div>
    )
  }

  if (!selectedStudent) {
    return <div>No student data available</div>
  }

  const jobSuggestions = getJobSuggestions(selectedStudent)
  const certSuggestions = getCertificationSuggestions(selectedStudent)

  // Count the skills the student has
  const skillCount = Object.values(selectedStudent.skillsMap).filter(Boolean).length
  const totalSkills = Object.keys(selectedStudent.skillsMap).length

  // Format skills for display
  const studentSkills = Object.entries(selectedStudent.skillsMap)
    .filter(([_, hasSkill]) => hasSkill)
    .map(([skill]) => skill.replace(/_/g, " "))

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Education</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.educationLevel} in {selectedStudent.major}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.yearsOfExperience} years</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Job Level</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.jobLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.jobSearchStatus}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Skills Progress</p>
                    <p className="text-sm text-muted-foreground">
                      {skillCount}/{totalSkills}
                    </p>
                  </div>
                  <Progress className="mt-2" value={(skillCount / totalSkills) * 100} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {studentSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Work Mode</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.workModePreference}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Relocate</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.willingToRelocate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Expected Salary</p>
                    <p className="text-sm text-muted-foreground">${selectedStudent.expectedSalary.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mentorship</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.openToMentorship}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Preferred Locations</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedStudent.preferredLocation1 && (
                      <Badge variant="outline">{selectedStudent.preferredLocation1}</Badge>
                    )}
                    {selectedStudent.preferredLocation2 && (
                      <Badge variant="outline">{selectedStudent.preferredLocation2}</Badge>
                    )}
                    {selectedStudent.preferredLocation3 && (
                      <Badge variant="outline">{selectedStudent.preferredLocation3}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs">
          <TabsList>
            <TabsTrigger value="jobs">Job Suggestions</TabsTrigger>
            <TabsTrigger value="certifications">Certification Suggestions</TabsTrigger>
            <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {jobSuggestions.slice(0, 6).map((job) => (
                <Card key={job.title}>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>Labor Code: {job.laborCode}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">{job.description}</p>
                      <div>
                        <p className="text-sm font-medium mb-2">Match Score: {Math.round(job.matchScore * 100)}%</p>
                        <Progress value={job.matchScore * 100} />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Required Skills:</p>
                        <ul className="text-sm space-y-1">
                          {job.skills.map((skill) => (
                            <li key={skill} className="flex items-center">
                              {selectedStudent.skillsMap[skill] ? (
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                              ) : (
                                <X className="mr-2 h-4 w-4 text-red-500" />
                              )}
                              {skill.replace(/_/g, " ")}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {certSuggestions.slice(0, 6).map((cert) => (
                <Card key={cert.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">{cert.description}</p>
                      <div>
                        <p className="text-sm font-medium mb-2">Match Score: {Math.round(cert.matchScore * 100)}%</p>
                        <Progress value={cert.matchScore * 100} />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Related Skills:</p>
                        <ul className="text-sm space-y-1">
                          {cert.skills.map((skill) => (
                            <li key={skill} className="flex items-center">
                              {selectedStudent.skillsMap[skill] ? (
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                              ) : (
                                <X className="mr-2 h-4 w-4 text-red-500" />
                              )}
                              {skill.replace(/_/g, " ")}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>Your current skills and areas for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Programming Languages</h3>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {selectedStudent.skillsMap["C++"] ? (
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-2 h-4 w-4 text-red-500" />
                          )}
                          <span>C++</span>
                        </div>
                        <Badge variant={selectedStudent.skillsMap["C++"] ? "default" : "outline"}>
                          {selectedStudent.skillsMap["C++"] ? "Acquired" : "Missing"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {selectedStudent.skillsMap["Java"] ? (
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-2 h-4 w-4 text-red-500" />
                          )}
                          <span>Java</span>
                        </div>
                        <Badge variant={selectedStudent.skillsMap["Java"] ? "default" : "outline"}>
                          {selectedStudent.skillsMap["Java"] ? "Acquired" : "Missing"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {selectedStudent.skillsMap["Python"] ? (
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-2 h-4 w-4 text-red-500" />
                          )}
                          <span>Python</span>
                        </div>
                        <Badge variant={selectedStudent.skillsMap["Python"] ? "default" : "outline"}>
                          {selectedStudent.skillsMap["Python"] ? "Acquired" : "Missing"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {selectedStudent.skillsMap["JavaScript"] ? (
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-2 h-4 w-4 text-red-500" />
                          )}
                          <span>JavaScript</span>
                        </div>
                        <Badge variant={selectedStudent.skillsMap["JavaScript"] ? "default" : "outline"}>
                          {selectedStudent.skillsMap["JavaScript"] ? "Acquired" : "Missing"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {selectedStudent.skillsMap["R_Language"] ? (
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-2 h-4 w-4 text-red-500" />
                          )}
                          <span>R Language</span>
                        </div>
                        <Badge variant={selectedStudent.skillsMap["R_Language"] ? "default" : "outline"}>
                          {selectedStudent.skillsMap["R_Language"] ? "Acquired" : "Missing"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Cloud & DevOps</h3>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {selectedStudent.skillsMap["Cloud_DevOps"] ? (
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-2 h-4 w-4 text-red-500" />
                          )}
                          <span>Cloud DevOps</span>
                        </div>
                        <Badge variant={selectedStudent.skillsMap["Cloud_DevOps"] ? "default" : "outline"}>
                          {selectedStudent.skillsMap["Cloud_DevOps"] ? "Acquired" : "Missing"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {selectedStudent.skillsMap["GIT"] ? (
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-2 h-4 w-4 text-red-500" />
                          )}
                          <span>GIT</span>
                        </div>
                        <Badge variant={selectedStudent.skillsMap["GIT"] ? "default" : "outline"}>
                          {selectedStudent.skillsMap["GIT"] ? "Acquired" : "Missing"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Security</h3>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {selectedStudent.skillsMap["Cybersecurity"] ? (
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-2 h-4 w-4 text-red-500" />
                          )}
                          <span>Cybersecurity</span>
                        </div>
                        <Badge variant={selectedStudent.skillsMap["Cybersecurity"] ? "default" : "outline"}>
                          {selectedStudent.skillsMap["Cybersecurity"] ? "Acquired" : "Missing"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {selectedStudent.skillsMap["IT_Security_Compliance"] ? (
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="mr-2 h-4 w-4 text-red-500" />
                          )}
                          <span>IT Security Compliance</span>
                        </div>
                        <Badge variant={selectedStudent.skillsMap["IT_Security_Compliance"] ? "default" : "outline"}>
                          {selectedStudent.skillsMap["IT_Security_Compliance"] ? "Acquired" : "Missing"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
