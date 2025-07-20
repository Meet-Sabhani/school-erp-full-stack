"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, DollarSign, TrendingUp } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"

export default function SuperAdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["super-admin-stats"],
    queryFn: async () => {
      // This would be replaced with actual API call
      return {
        totalUsers: 1250,
        totalStudents: 850,
        totalRevenue: 125000,
        growthRate: 12.5,
      }
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of all schools and system-wide metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers.toLocaleString() || "0"}
          description="+20.1% from last month"
          icon={Users}
        />
        <StatsCard
          title="Total Students"
          value={stats?.totalStudents.toLocaleString() || "0"}
          description="+15.3% from last month"
          icon={GraduationCap}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue.toLocaleString() || "0"}`}
          description="+12.5% from last month"
          icon={DollarSign}
        />
        <StatsCard
          title="Growth Rate"
          value={`${stats?.growthRate || 0}%`}
          description="+2.1% from last month"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AnalyticsChart />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
