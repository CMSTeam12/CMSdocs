"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Student } from "@/lib/data"
import { ChartWrapper } from "./chart-wrapper"

interface LocationBarChartProps {
  students: Student[]
}

export function LocationBarChart({ students }: LocationBarChartProps) {
  // Count location preferences
  const countLocationPreferences = () => {
    const counts: Record<string, number> = {}

    students.forEach((student) => {
      if (student.preferredLocation1) {
        counts[student.preferredLocation1] = (counts[student.preferredLocation1] || 0) + 1
      }
      if (student.preferredLocation2) {
        counts[student.preferredLocation2] = (counts[student.preferredLocation2] || 0) + 1
      }
      if (student.preferredLocation3) {
        counts[student.preferredLocation3] = (counts[student.preferredLocation3] || 0) + 1
      }
    })

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }))
  }

  const data = countLocationPreferences()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Location Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
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
                <Tooltip formatter={(value) => [value, "Count"]} />
                <Legend />
                <Bar dataKey="value" name="Preferences" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>
      </CardContent>
    </Card>
  )
}
