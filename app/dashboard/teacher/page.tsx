"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Calendar, FileText } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeacherDashboard() {
  const { data: teacherData, isLoading } = useQuery({
    queryKey: ["teacher-dashboard"],
    queryFn: async () => {
      // This would be replaced with actual API call
      return {
        totalClasses: 4,
        totalStudents: 120,
        todayClasses: 3,
        pendingAssignments: 8,
        upcomingClasses: [
          {
            id: 1,
            subject: "Mathematics",
            class: "10-A",
            time: "09:00 AM",
            students: 30,
          },
          {
            id: 2,
            subject: "Physics",
            class: "11-B",
            time: "11:00 AM",
            students: 28,
          },
          {
            id: 3,
            subject: "Mathematics",
            class: "10-B",
            time: "02:00 PM",
            students: 32,
          },
        ],
        recentSubmissions: [
          {
            id: 1,
            student: "Alice Johnson",
            assignment: "Algebra Quiz",
            subject: "Math",
            submittedAt: "2 hours ago",
          },
          {
            id: 2,
            student: "Bob Smith",
            assignment: "Physics Lab Report",
            subject: "Physics",
            submittedAt: "4 hours ago",
          },
          {
            id: 3,
            student: "Carol Davis",
            assignment: "Geometry Problems",
            subject: "Math",
            submittedAt: "6 hours ago",
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
        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your classes, students, and assignments
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Classes"
          value={teacherData?.totalClasses.toString() || "0"}
          description="Active classes assigned"
          icon={BookOpen}
        />
        <StatsCard
          title="Total Students"
          value={teacherData?.totalStudents.toString() || "0"}
          description="Across all classes"
          icon={Users}
        />
        <StatsCard
          title="Today's Classes"
          value={teacherData?.todayClasses.toString() || "0"}
          description="Scheduled for today"
          icon={Calendar}
        />
        <StatsCard
          title="Pending Reviews"
          value={teacherData?.pendingAssignments.toString() || "0"}
          description="Assignments to grade"
          icon={FileText}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
            <CardDescription>Your upcoming classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherData?.upcomingClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{classItem.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    Class {classItem.class} • {classItem.students} students
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{classItem.time}</Badge>
                </div>
              </div>
            ))}
            <Button className="w-full bg-transparent" variant="outline">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest assignment submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherData?.recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                  <AvatarFallback>
                    {submission.student.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{submission.student}</p>
                  <p className="text-sm text-muted-foreground">
                    {submission.assignment} • {submission.subject}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {submission.submittedAt}
                </div>
              </div>
            ))}
            <Button className="w-full bg-transparent" variant="outline">
              View All Submissions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
