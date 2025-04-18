"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type Student, getCertificationSuggestions } from "@/lib/data"
import { ChartWrapper } from "./chart-wrapper"

interface CertificationMatchChartProps {
  student: Student
}

export function CertificationMatchChart({ student }: CertificationMatchChartProps) {
  const certSuggestions = getCertificationSuggestions(student)

  // Prepare data for the chart
  const chartData = certSuggestions.slice(0, 6).map((cert) => ({
    name: cert.name.length > 25 ? cert.name.substring(0, 22) + "..." : cert.name,
    matchScore: Math.round(cert.matchScore * 100),
    fullName: cert.name,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certification Match Analysis</CardTitle>
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
                <Tooltip
                  formatter={(value, name, props) => [`${value}%`, "Match Score"]}
                  labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label}
                />
                <Legend />
                <Bar dataKey="matchScore" name="Match Score (%)" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>
      </CardContent>
    </Card>
  )
}
