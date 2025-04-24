"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Student } from "@/lib/data"
import { ChartWrapper } from "./chart-wrapper"

interface SalaryDistributionChartProps {
  students: Student[]
}

export function SalaryDistributionChart({ students }: SalaryDistributionChartProps) {
  // Create salary ranges
  const salaryRanges = [
    { range: "< $50k", min: 0, max: 50000, count: 0 },
    { range: "$50k-$75k", min: 50000, max: 75000, count: 0 },
    { range: "$75k-$100k", min: 75000, max: 100000, count: 0 },
    { range: "$100k-$125k", min: 100000, max: 125000, count: 0 },
    { range: "$125k-$150k", min: 125000, max: 150000, count: 0 },
    { range: "> $150k", min: 150000, max: Number.POSITIVE_INFINITY, count: 0 },
  ]

  // Count students in each salary range
  students.forEach((student) => {
    const salary = student.expectedSalary
    const range = salaryRanges.find((r) => salary >= r.min && salary < r.max)
    if (range) {
      range.count++
    }
  })

  // Prepare data for the chart
  const chartData = salaryRanges.map((range) => ({
    name: range.range,
    count: range.count,
    percentage: Math.round((range.count / students.length) * 100),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expected Salary Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value, name, props) => [`${value} (${props.payload.percentage}%)`, "Number of Students"]}
                />
                <Legend />
                <Bar dataKey="count" name="Students" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>
      </CardContent>
    </Card>
  )
}
