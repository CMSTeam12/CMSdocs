"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type Student, getJobSuggestions } from "@/lib/data"
import { ChartWrapper } from "./chart-wrapper"

interface JobMatchChartProps {
  student: Student
}

export function JobMatchChart({ student }: JobMatchChartProps) {
  const jobSuggestions = getJobSuggestions(student)

  // Prepare data for the chart
  const chartData = jobSuggestions.slice(0, 6).map((job) => ({
    name: job.title,
    matchScore: Math.round(job.matchScore * 100),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Match Analysis</CardTitle>
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
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}%`, "Match Score"]} />
                <Legend />
                <Bar dataKey="matchScore" name="Match Score (%)" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>
      </CardContent>
    </Card>
  )
}
