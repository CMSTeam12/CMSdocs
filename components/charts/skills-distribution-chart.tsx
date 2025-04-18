"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Student } from "@/lib/data"
import { ChartWrapper } from "./chart-wrapper"

interface SkillsDistributionChartProps {
  students: Student[]
}

export function SkillsDistributionChart({ students }: SkillsDistributionChartProps) {
  // Count skills by category
  const countSkillsByCategory = () => {
    const categories = {
      programming: ["C++", "Java", "Python", "JavaScript", "R_Language"],
      data: ["Data_Science", "Big_Data", "Data_Analytics_Visualization", "Database_Management"],
      cloud: ["Cloud_DevOps", "GIT"],
      security: ["Cybersecurity", "IT_Security_Compliance", "Networking_Security"],
      business: ["Business_Analyst", "Project_Management_and_Collaboration_Tools"],
    }

    const counts = {
      programming: 0,
      data: 0,
      cloud: 0,
      security: 0,
      business: 0,
    }

    students.forEach((student) => {
      Object.entries(categories).forEach(([category, skills]) => {
        skills.forEach((skill) => {
          if (student.skillsMap[skill]) {
            counts[category as keyof typeof counts]++
          }
        })
      })
    })

    return [
      { name: "Programming", value: counts.programming },
      { name: "Data Science", value: counts.data },
      { name: "Cloud & DevOps", value: counts.cloud },
      { name: "Security", value: counts.security },
      { name: "Business", value: counts.business },
    ]
  }

  const data = countSkillsByCategory()
  const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Count"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>
      </CardContent>
    </Card>
  )
}
