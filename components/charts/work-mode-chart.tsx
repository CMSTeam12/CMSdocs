"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Student } from "@/lib/data"
import { ChartWrapper } from "./chart-wrapper"

interface WorkModeChartProps {
  students: Student[]
}

export function WorkModeChart({ students }: WorkModeChartProps) {
  // Count work mode preferences
  const countWorkModePreferences = () => {
    const counts: Record<string, number> = {}

    students.forEach((student) => {
      const pref = student.workModePreference || "Not Specified"
      counts[pref] = (counts[pref] || 0) + 1
    })

    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }

  const data = countWorkModePreferences()
  const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b", "#6366f1"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Mode Preferences</CardTitle>
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
                  innerRadius={60}
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
