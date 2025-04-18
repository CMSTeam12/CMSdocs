"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartWrapper } from "./chart-wrapper"

// Mock data for skills progress over time
const mockSkillsProgressData = [
  { month: "Jan", programming: 20, data: 15, cloud: 10, security: 5 },
  { month: "Feb", programming: 30, data: 25, cloud: 15, security: 10 },
  { month: "Mar", programming: 40, data: 30, cloud: 25, security: 20 },
  { month: "Apr", programming: 50, data: 40, cloud: 35, security: 30 },
  { month: "May", programming: 65, data: 50, cloud: 45, security: 40 },
  { month: "Jun", programming: 75, data: 60, cloud: 55, security: 50 },
]

export function SkillsProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Progress Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockSkillsProgressData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="programming" stroke="#3b82f6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="data" stroke="#10b981" />
                <Line type="monotone" dataKey="cloud" stroke="#8b5cf6" />
                <Line type="monotone" dataKey="security" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>
      </CardContent>
    </Card>
  )
}
