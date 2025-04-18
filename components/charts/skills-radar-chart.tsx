"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Student } from "@/lib/data"
import { ChartWrapper } from "./chart-wrapper"

interface SkillsRadarChartProps {
  student: Student
}

export function SkillsRadarChart({ student }: SkillsRadarChartProps) {
  // Define skill categories
  const categories = {
    programming: ["C++", "Java", "Python", "JavaScript", "R_Language"],
    data: ["Data_Science", "Big_Data", "Data_Analytics_Visualization", "Database_Management"],
    cloud: ["Cloud_DevOps", "GIT"],
    security: ["Cybersecurity", "IT_Security_Compliance", "Networking_Security"],
    business: ["Business_Analyst", "Project_Management_and_Collaboration_Tools"],
  }

  // Calculate scores for each category
  const calculateCategoryScore = (skills: string[]) => {
    const hasSkills = skills.filter((skill) => student.skillsMap[skill]).length
    return (hasSkills / skills.length) * 100
  }

  const chartData = [
    { subject: "Programming", A: calculateCategoryScore(categories.programming) },
    { subject: "Data Science", A: calculateCategoryScore(categories.data) },
    { subject: "Cloud & DevOps", A: calculateCategoryScore(categories.cloud) },
    { subject: "Security", A: calculateCategoryScore(categories.security) },
    { subject: "Business", A: calculateCategoryScore(categories.business) },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Skills Proficiency" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>
      </CardContent>
    </Card>
  )
}
