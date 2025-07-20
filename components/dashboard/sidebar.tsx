"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  DollarSign,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ChevronUp,
  BookOpen,
  UserCheck,
  ClipboardList,
} from "lucide-react"
import { signOut } from "next-auth/react"

const roleMenuItems = {
  super_admin: [
    { title: "Dashboard", url: "/dashboard/super-admin", icon: LayoutDashboard },
    { title: "User Management", url: "/dashboard/super-admin/users", icon: Users },
    { title: "School Management", url: "/dashboard/super-admin/schools", icon: GraduationCap },
    { title: "Analytics", url: "/dashboard/super-admin/analytics", icon: BarChart3 },
    { title: "Settings", url: "/dashboard/super-admin/settings", icon: Settings },
  ],
  principal: [
    { title: "Dashboard", url: "/dashboard/principal", icon: LayoutDashboard },
    { title: "Students", url: "/dashboard/principal/students", icon: GraduationCap },
    { title: "Teachers", url: "/dashboard/principal/teachers", icon: Users },
    { title: "Fees", url: "/dashboard/principal/fees", icon: DollarSign },
    { title: "Attendance", url: "/dashboard/principal/attendance", icon: Calendar },
    { title: "Results", url: "/dashboard/principal/results", icon: FileText },
    { title: "Analytics", url: "/dashboard/principal/analytics", icon: BarChart3 },
  ],
  vice_principal: [
    { title: "Dashboard", url: "/dashboard/vice-principal", icon: LayoutDashboard },
    { title: "Students", url: "/dashboard/vice-principal/students", icon: GraduationCap },
    { title: "Teachers", url: "/dashboard/vice-principal/teachers", icon: Users },
    { title: "Attendance", url: "/dashboard/vice-principal/attendance", icon: Calendar },
    { title: "Results", url: "/dashboard/vice-principal/results", icon: FileText },
  ],
  teacher: [
    { title: "Dashboard", url: "/dashboard/teacher", icon: LayoutDashboard },
    { title: "My Classes", url: "/dashboard/teacher/classes", icon: BookOpen },
    { title: "Students", url: "/dashboard/teacher/students", icon: GraduationCap },
    { title: "Attendance", url: "/dashboard/teacher/attendance", icon: UserCheck },
    { title: "Results", url: "/dashboard/teacher/results", icon: FileText },
    { title: "Assignments", url: "/dashboard/teacher/assignments", icon: ClipboardList },
  ],
  parent: [
    { title: "Dashboard", url: "/dashboard/parent", icon: LayoutDashboard },
    { title: "My Children", url: "/dashboard/parent/children", icon: GraduationCap },
    { title: "Fees", url: "/dashboard/parent/fees", icon: DollarSign },
    { title: "Attendance", url: "/dashboard/parent/attendance", icon: Calendar },
    { title: "Results", url: "/dashboard/parent/results", icon: FileText },
  ],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  if (!session?.user?.role) return null

  const menuItems = roleMenuItems[session.user.role as keyof typeof roleMenuItems] || []

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">EduManage</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={session.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{session.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{session.user.name}</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
