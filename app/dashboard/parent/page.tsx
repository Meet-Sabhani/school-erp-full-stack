"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, DollarSign, Calendar, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function ParentDashboard() {
  const { data: parentData, isLoading } = useQuery({
    queryKey: ["parent-dashboard"],
    queryFn: async () => {
      // This would be replaced with actual API call
      return {
        totalChildren: 2,
        pendingFees: 1500,
        attendanceRate: 92,
        upcomingEventsCount: 3,
        children: [
          {
            id: 1,
            name: "Emma Johnson",
            class: "10-A",
            rollNumber: "2024001",
            avatar: "/placeholder.svg?height=40&width=40",
            attendance: 95,
            pendingFees: 800,
            recentGrades: [
              { subject: "Mathematics", grade: "A", score: 92 },
              { subject: "Physics", grade: "B+", score: 87 },
              { subject: "Chemistry", grade: "A-", score: 89 },
            ],
          },
          {
            id: 2,
            name: "James Johnson",
            class: "8-B",
            rollNumber: "2024002",
            avatar: "/placeholder.svg?height=40&width=40",
            attendance: 88,
            pendingFees: 700,
            recentGrades: [
              { subject: "English", grade: "A", score: 94 },
              { subject: "History", grade: "B", score: 82 },
              { subject: "Geography", grade: "B+", score: 85 },
            ],
          },
        ],
        upcomingEvents: [
          {
            id: 1,
            title: "Parent-Teacher Meeting",
            date: "2024-01-15",
            type: "meeting",
          },
          {
            id: 2,
            title: "Annual Sports Day",
            date: "2024-01-20",
            type: "event",
          },
          {
            id: 3,
            title: "Science Fair",
            date: "2024-01-25",
            type: "competition",
          },
        ],
      };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your children&apos;s academic progress and school activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Children"
          value={parentData?.totalChildren.toString() || "0"}
          description="Enrolled in school"
          icon={GraduationCap}
        />
        <StatsCard
          title="Pending Fees"
          value={`$${parentData?.pendingFees.toLocaleString() || "0"}`}
          description="Total outstanding"
          icon={DollarSign}
        />
        <StatsCard
          title="Avg Attendance"
          value={`${parentData?.attendanceRate || 0}%`}
          description="This month"
          icon={Calendar}
        />
        <StatsCard
          title="Upcoming Events"
          value={parentData?.upcomingEventsCount.toString() || "0"}
          description="This month"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {parentData?.children.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={child.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{child.name}</CardTitle>
                    <CardDescription>
                      Class {child.class} • Roll No: {child.rollNumber}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Attendance</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={child.attendance} className="flex-1" />
                      <span className="text-sm font-medium">
                        {child.attendance}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Pending Fees</p>
                    <p className="text-lg font-semibold text-red-600">
                      ${child.pendingFees}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Recent Grades</p>
                  <div className="space-y-2">
                    {child.recentGrades.map((grade, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">{grade.subject}</span>
                        <Badge variant="outline">{grade.grade}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Pay Fees
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>School events and important dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {parentData?.upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <Badge variant="outline" className="capitalize">
                  {event.type}
                </Badge>
              </div>
            ))}
            <Button className="w-full bg-transparent" variant="outline">
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
