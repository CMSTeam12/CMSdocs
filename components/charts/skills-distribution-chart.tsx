"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type Student, getSkillsCount } from "@/lib/data"
import { ChartWrapper } from "./chart-wrapper"

interface SkillsDistributionChartProps {
  students: Student[]
}

export function SkillsDistributionChart({ students }: SkillsDistributionChartProps) {
  // Get skills count
  const skillsCount = getSkillsCount(students)

  // Prepare data for the chart - get top 10 skills
  const chartData = Object.entries(skillsCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill, count]) => ({
      name: skill.replace(/_/g, " "),
      count,
      percentage: Math.round((count / students.length) * 100),
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 100,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip
                  formatter={(value, name, props) => [`${value} (${props.payload.percentage}%)`, "Students with skill"]}
                />
                <Legend />
                <Bar dataKey="count" name="Number of Students" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>
      </CardContent>
    </Card>
  )
}
