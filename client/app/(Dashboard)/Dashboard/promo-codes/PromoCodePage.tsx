"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Ticket,
  Users,
  User,
  Globe,
  Calendar,
  Percent,
  DollarSign,
  Copy,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" 

const promoCodesData = [
  {
    id: 1,
    code: "SUMMER25",
    type: "percentage",
    value: 25,
    minOrder: 50,
    maxDiscount: 100,
    usageLimit: 1000,
    usedCount: 456,
    expiryDate: "2024-08-31",
    status: "active",
    visibility: "public",
    assignedTo: null,
  },
  {
    id: 2,
    code: "NEWUSER10",
    type: "percentage",
    value: 10,
    minOrder: 0,
    maxDiscount: 50,
    usageLimit: null,
    usedCount: 1234,
    expiryDate: "2024-12-31",
    status: "active",
    visibility: "public",
    assignedTo: null,
  },
  {
    id: 3,
    code: "VIP50OFF",
    type: "fixed",
    value: 50,
    minOrder: 200,
    maxDiscount: null,
    usageLimit: 1,
    usedCount: 0,
    expiryDate: "2024-07-15",
    status: "active",
    visibility: "private",
    assignedTo: { name: "John Doe", email: "john@example.com" },
  },
  {
    id: 4,
    code: "FLASH15",
    type: "percentage",
    value: 15,
    minOrder: 30,
    maxDiscount: 75,
    usageLimit: 500,
    usedCount: 500,
    expiryDate: "2024-06-01",
    status: "expired",
    visibility: "public",
    assignedTo: null,
  },
  {
    id: 5,
    code: "LOYAL20",
    type: "percentage",
    value: 20,
    minOrder: 100,
    maxDiscount: 150,
    usageLimit: 1,
    usedCount: 1,
    expiryDate: "2024-09-30",
    status: "inactive",
    visibility: "private",
    assignedTo: { name: "Jane Smith", email: "jane@example.com" },
  },
  {
    id: 6,
    code: "FREESHIP",
    type: "fixed",
    value: 10,
    minOrder: 50,
    maxDiscount: null,
    usageLimit: null,
    usedCount: 789,
    expiryDate: null,
    status: "active",
    visibility: "public",
    assignedTo: null,
  },
]

const statusColors = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-border",
  expired: "bg-destructive/10 text-destructive border-destructive/20",
}

const defaultNewPromo = {
  code: "",
  type: "percentage" as "percentage" | "fixed",
  value: 0,
  minOrder: 0,
  maxDiscount: null as number | null,
  usageLimit: null as number | null,
  expiryDate: "",
  status: "active",
  visibility: "public" as "public" | "private",
  assignedTo: null as { name: string; email: string } | null,
}

export default function PromoCodesPage() {
//   const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [promoCodes, setPromoCodes] = useState(promoCodesData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState<(typeof promoCodesData)[0] | null>(null)
  const [newPromo, setNewPromo] = useState(defaultNewPromo)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredPromoCodes = promoCodes.filter((promo) => promo.code.toLowerCase().includes(searchQuery.toLowerCase()))

  const totalPages = Math.ceil(filteredPromoCodes.length / itemsPerPage)
  const paginatedPromoCodes = filteredPromoCodes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAddPromo = () => {
    const id = Math.max(...promoCodes.map((p) => p.id)) + 1
    setPromoCodes([
      ...promoCodes,
      {
        ...newPromo,
        id,
        usedCount: 0,
        expiryDate: newPromo.expiryDate || null,
      },
    ])
    setNewPromo(defaultNewPromo)
    setIsAddDialogOpen(false)
    toast({
      title: "Promo code created",
      description: `${newPromo.code} has been created successfully.`,
    })
  }

  const handleEditPromo = () => {
    if (!selectedPromo) return
    setPromoCodes(promoCodes.map((p) => (p.id === selectedPromo.id ? selectedPromo : p)))
    setIsEditDialogOpen(false)
    toast({
      title: "Promo code updated",
      description: `${selectedPromo.code} has been updated successfully.`,
    })
  }

  const handleDeletePromo = (id: number) => {
    const promo = promoCodes.find((p) => p.id === id)
    setPromoCodes(promoCodes.filter((p) => p.id !== id))
    toast({
      title: "Promo code deleted",
      description: `${promo?.code} has been deleted.`,
      variant: "destructive",
    })
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied!",
      description: `${code} copied to clipboard.`,
    })
  }

  const promoStats = {
    total: promoCodes.length,
    active: promoCodes.filter((p) => p.status === "active").length,
    totalUsed: promoCodes.reduce((sum, p) => sum + p.usedCount, 0),
  }

  return (
    <div className="space-y-6">
 {/* <Toaster />  */}

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Promo Code Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage discount codes</p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Promo Code
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10">
              <Ticket className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{promoStats.total}</p>
              <p className="text-sm text-muted-foreground">Total Promo Codes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-success/10">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{promoStats.active}</p>
              <p className="text-sm text-muted-foreground">Active Codes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-chart-3/10">
              <Users className="w-6 h-6 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{promoStats.totalUsed.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Redemptions</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search promo codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-0"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Promo Codes Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-foreground">Promo Codes ({filteredPromoCodes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Code</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Discount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Usage</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Visibility</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Expiry</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {paginatedPromoCodes.map((promo, index) => (
                      <motion.tr
                        key={promo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-foreground bg-secondary px-3 py-1 rounded-lg">
                              {promo.code}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => copyToClipboard(promo.code)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {promo.type === "percentage" ? (
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                <Percent className="w-3 h-3 mr-1" />
                                {promo.value}% OFF
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                <DollarSign className="w-3 h-3 mr-1" />${promo.value} OFF
                              </Badge>
                            )}
                          </div>
                          {promo.minOrder > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">Min. order: ${promo.minOrder}</p>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-foreground">
                            {promo.usedCount}
                            {promo.usageLimit ? ` / ${promo.usageLimit}` : " / ∞"}
                          </div>
                          {promo.usageLimit && (
                            <div className="w-24 h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{
                                  width: `${Math.min((promo.usedCount / promo.usageLimit) * 100, 100)}%`,
                                }}
                              />
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {promo.visibility === "public" ? (
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              <Globe className="w-3 h-3 mr-1" />
                              Public
                            </Badge>
                          ) : (
                            <div>
                              <Badge variant="outline" className="bg-chart-5/10 text-chart-5 border-chart-5/20">
                                <User className="w-3 h-3 mr-1" />
                                Private
                              </Badge>
                              {promo.assignedTo && (
                                <p className="text-xs text-muted-foreground mt-1">{promo.assignedTo.email}</p>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {promo.expiryDate ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {promo.expiryDate}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">No expiry</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className={statusColors[promo.status as keyof typeof statusColors]}>
                            {promo.status === "active" ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            {promo.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-lg">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedPromo(promo)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeletePromo(promo.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredPromoCodes.length)} of {filteredPromoCodes.length} codes
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

      {/* Add Promo Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">Create Promo Code</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Promo Code</Label>
              <Input
                id="code"
                value={newPromo.code}
                onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                placeholder="e.g., SUMMER25"
                className="font-mono uppercase"
              />
            </div>

            <div className="space-y-2">
              <Label>Discount Type</Label>
              <RadioGroup
                value={newPromo.type}
                onValueChange={(value: "percentage" | "fixed") => setNewPromo({ ...newPromo, type: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage" className="flex items-center gap-1">
                    <Percent className="w-4 h-4" />
                    Percentage
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Fixed Amount
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Discount Value</Label>
                <Input
                  id="value"
                  type="number"
                  value={newPromo.value || ""}
                  onChange={(e) => setNewPromo({ ...newPromo, value: Number.parseFloat(e.target.value) || 0 })}
                  placeholder={newPromo.type === "percentage" ? "e.g., 25" : "e.g., 50"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minOrder">Minimum Order ($)</Label>
                <Input
                  id="minOrder"
                  type="number"
                  value={newPromo.minOrder || ""}
                  onChange={(e) => setNewPromo({ ...newPromo, minOrder: Number.parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxDiscount">Max Discount ($)</Label>
                <Input
                  id="maxDiscount"
                  type="number"
                  value={newPromo.maxDiscount || ""}
                  onChange={(e) =>
                    setNewPromo({
                      ...newPromo,
                      maxDiscount: e.target.value ? Number.parseFloat(e.target.value) : null,
                    })
                  }
                  placeholder="No limit"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={newPromo.usageLimit || ""}
                  onChange={(e) =>
                    setNewPromo({
                      ...newPromo,
                      usageLimit: e.target.value ? Number.parseInt(e.target.value) : null,
                    })
                  }
                  placeholder="Unlimited"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={newPromo.expiryDate}
                onChange={(e) => setNewPromo({ ...newPromo, expiryDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup
                value={newPromo.visibility}
                onValueChange={(value: "public" | "private") =>
                  setNewPromo({
                    ...newPromo,
                    visibility: value,
                    assignedTo: value === "public" ? null : newPromo.assignedTo,
                  })
                }
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    Public
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Private (Assign to user)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {newPromo.visibility === "private" && (
              <div className="space-y-4 p-4 rounded-xl bg-secondary">
                <div className="space-y-2">
                  <Label htmlFor="assignedName">User Name</Label>
                  <Input
                    id="assignedName"
                    value={newPromo.assignedTo?.name || ""}
                    onChange={(e) =>
                      setNewPromo({
                        ...newPromo,
                        assignedTo: {
                          ...newPromo.assignedTo,
                          name: e.target.value,
                          email: newPromo.assignedTo?.email || "",
                        },
                      })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedEmail">User Email</Label>
                  <Input
                    id="assignedEmail"
                    type="email"
                    value={newPromo.assignedTo?.email || ""}
                    onChange={(e) =>
                      setNewPromo({
                        ...newPromo,
                        assignedTo: {
                          ...newPromo.assignedTo,
                          email: e.target.value,
                          name: newPromo.assignedTo?.name || "",
                        },
                      })
                    }
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
              <div className="space-y-1">
                <Label>Active Status</Label>
                <p className="text-sm text-muted-foreground">Enable this promo code immediately</p>
              </div>
              <Switch
                checked={newPromo.status === "active"}
                onCheckedChange={(checked) => setNewPromo({ ...newPromo, status: checked ? "active" : "inactive" })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPromo} className="bg-primary text-primary-foreground">
              Create Promo Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Promo Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit Promo Code</DialogTitle>
          </DialogHeader>

          {selectedPromo && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-code">Promo Code</Label>
                <Input
                  id="edit-code"
                  value={selectedPromo.code}
                  onChange={(e) => setSelectedPromo({ ...selectedPromo, code: e.target.value.toUpperCase() })}
                  className="font-mono uppercase"
                />
              </div>

              <div className="space-y-2">
                <Label>Discount Type</Label>
                <RadioGroup
                  value={selectedPromo.type}
                  onValueChange={(value: "percentage" | "fixed") => setSelectedPromo({ ...selectedPromo, type: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="edit-percentage" />
                    <Label htmlFor="edit-percentage" className="flex items-center gap-1">
                      <Percent className="w-4 h-4" />
                      Percentage
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="edit-fixed" />
                    <Label htmlFor="edit-fixed" className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Fixed Amount
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-value">Discount Value</Label>
                  <Input
                    id="edit-value"
                    type="number"
                    value={selectedPromo.value}
                    onChange={(e) =>
                      setSelectedPromo({ ...selectedPromo, value: Number.parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-minOrder">Minimum Order ($)</Label>
                  <Input
                    id="edit-minOrder"
                    type="number"
                    value={selectedPromo.minOrder}
                    onChange={(e) =>
                      setSelectedPromo({ ...selectedPromo, minOrder: Number.parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-expiryDate">Expiry Date</Label>
                <Input
                  id="edit-expiryDate"
                  type="date"
                  value={selectedPromo.expiryDate || ""}
                  onChange={(e) => setSelectedPromo({ ...selectedPromo, expiryDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={selectedPromo.status}
                  onValueChange={(value) => setSelectedPromo({ ...selectedPromo, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPromo} className="bg-primary text-primary-foreground">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
