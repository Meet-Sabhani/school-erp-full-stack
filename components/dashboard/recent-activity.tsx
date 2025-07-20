import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: "John Smith",
    action: "added new student",
    time: "2 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "updated fee structure",
    time: "5 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    user: "Mike Davis",
    action: "uploaded exam results",
    time: "10 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    user: "Emily Brown",
    action: "marked attendance",
    time: "15 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    user: "David Wilson",
    action: "created new class",
    time: "20 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.avatar || "/placeholder.svg"} />
            <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}
