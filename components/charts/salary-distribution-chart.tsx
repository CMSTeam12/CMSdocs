"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Student } from "@/lib/data"
import { ChartWrapper } from "./chart-wrapper"

interface SalaryDistributionChartProps {
  students: Student[]
}

export function SalaryDistributionChart({ students }: SalaryDistributionChartProps) {
  // Create salary distribution data
  const createSalaryDistribution = () => {
    const validSalaries = students
      .map((s) => s.expectedSalary)
      .filter((salary) => salary > 0)
      .sort((a, b) => a - b)

    if (validSalaries.length === 0) return []

    const min = Math.floor(validSalaries[0] / 10000) * 10000
    const max = Math.ceil(validSalaries[validSalaries.length - 1] / 10000) * 10000
    const step = 10000

    const ranges: Record<string, number> = {}

    for (let i = min; i < max; i += step) {
      ranges[`${i}-${i + step}`] = 0
    }

    validSalaries.forEach((salary) => {
      const rangeStart = Math.floor(salary / step) * step
      const rangeKey = `${rangeStart}-${rangeStart + step}`
      ranges[rangeKey] = (ranges[rangeKey] || 0) + 1
    })

    return Object.entries(ranges).map(([name, count]) => ({
      range: name,
      count,
    }))
  }

  const data = createSalaryDistribution()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expected Salary Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip formatter={(value) => [value, "Students"]} />
                <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>
      </CardContent>
    </Card>
  )
}
