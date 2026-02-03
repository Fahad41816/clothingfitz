"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  UserPlus,
  MoreHorizontal,
  Shield,
  UserCog,
  User,
  Ban,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    orders: 45,
    totalSpent: "$2,340.00",
    joinedAt: "Jan 15, 2024",
    avatar: "/generic-person-avatar.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    orders: 23,
    totalSpent: "$890.00",
    joinedAt: "Feb 20, 2024",
    avatar: "/jane-smith-avatar.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "operator",
    status: "in-progress",
    orders: 12,
    totalSpent: "$450.00",
    joinedAt: "Mar 10, 2024",
    avatar: "/mike-johnson-avatar.jpg",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "user",
    status: "blocked",
    orders: 8,
    totalSpent: "$320.00",
    joinedAt: "Apr 5, 2024",
    avatar: "/sarah-wilson-avatar.jpg",
  },
  {
    id: 5,
    name: "Chris Brown",
    email: "chris@example.com",
    role: "user",
    status: "deactive",
    orders: 0,
    totalSpent: "$0.00",
    joinedAt: "Apr 22, 2024",
    avatar: "/chris-brown-avatar.jpg",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "operator",
    status: "active",
    orders: 67,
    totalSpent: "$3,120.00",
    joinedAt: "Dec 1, 2023",
    avatar: "/emily-davis-avatar.jpg",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert@example.com",
    role: "user",
    status: "active",
    orders: 15,
    totalSpent: "$620.00",
    joinedAt: "May 15, 2024",
    avatar: "/robert-taylor-avatar.jpg",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    role: "user",
    status: "in-progress",
    orders: 5,
    totalSpent: "$180.00",
    joinedAt: "Jun 1, 2024",
    avatar: "/lisa-anderson-avatar.jpg",
  },
]

const roleColors = {
  admin: "bg-primary/10 text-primary border-primary/20",
  operator: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  user: "bg-secondary text-secondary-foreground border-border",
}

const statusColors = {
  active: "bg-success/10 text-success border-success/20",
  "in-progress": "bg-warning/10 text-warning border-warning/20",
  blocked: "bg-destructive/10 text-destructive border-destructive/20",
  deactive: "bg-muted text-muted-foreground border-border",
}

const statusIcons = {
  active: CheckCircle,
  "in-progress": Clock,
  blocked: Ban,
  deactive: User,
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [users, setUsers] = useState(usersData)
  const [selectedUser, setSelectedUser] = useState<(typeof usersData)[0] | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage all users, roles, and permissions</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-0"
                />
              </div>

              {/* Role Filter */}
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-secondary border-0">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-secondary border-0">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="deactive">Deactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-foreground">Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Orders</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Spent</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {paginatedUsers.map((user, index) => {
                      const StatusIcon = statusIcons[user.status as keyof typeof statusIcons]
                      return (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className={roleColors[user.role as keyof typeof roleColors]}>
                              {user.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
                              {user.role === "operator" && <UserCog className="w-3 h-3 mr-1" />}
                              {user.role === "user" && <User className="w-3 h-3 mr-1" />}
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className={statusColors[user.status as keyof typeof statusColors]}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-foreground">{user.orders}</td>
                          <td className="py-4 px-4 font-medium text-foreground">{user.totalSpent}</td>
                          <td className="py-4 px-4 text-muted-foreground">{user.joinedAt}</td>
                          <td className="py-4 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-lg">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleRoleChange(user.id, "admin")}>
                                  <Shield className="w-4 h-4 mr-2" />
                                  Make Admin
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleRoleChange(user.id, "operator")}>
                                  <UserCog className="w-4 h-4 mr-2" />
                                  Make Operator
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleRoleChange(user.id, "user")}>
                                  <User className="w-4 h-4 mr-2" />
                                  Make User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                  <CheckCircle className="w-4 h-4 mr-2 text-success" />
                                  Set Active
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(user.id, "in-progress")}>
                                  <Clock className="w-4 h-4 mr-2 text-warning" />
                                  Set In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(user.id, "blocked")}>
                                  <Ban className="w-4 h-4 mr-2 text-destructive" />
                                  Block User
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(user.id, "deactive")}>
                                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                                  Deactivate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-primary text-primary-foreground" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
