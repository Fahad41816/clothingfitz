"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Eye,
  Edit,
  Copy,
  Send,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/hooks/use-toast"
// import { Toaster } from "@/components/ui/toaster"
import Link from "next/link";
import Image from "next/image";

const invoicesData = [
  {
    id: "INV-ABC123",
    customer: { name: "John Doe", email: "john@example.com" },
    items: [
      {
        name: "Premium Cotton T-Shirt",
        color: "Navy",
        sizes: [{ size: "L", quantity: 2, extraCharge: 0 }],
        price: 29.99,
        image: "/custom-blue-t-shirt.jpg",
      },
      {
        name: "Snapback Hat",
        color: "Black",
        sizes: [],
        quantity: 1,
        price: 34.99,
        image: "/snapback-hat-navy.jpg",
      },
    ],
    subtotal: 94.97,
    discount: 0,
    discountType: null,
    total: 94.97,
    status: "paid",
    createdAt: "2024-06-15 10:30 AM",
    paidAt: "2024-06-15 11:45 AM",
    paymentMethod: "Stripe",
  },
  {
    id: "INV-DEF456",
    customer: { name: "Jane Smith", email: "jane@example.com" },
    items: [
      {
        name: "Premium Hoodie",
        color: "White",
        sizes: [{ size: "XL", quantity: 1, extraCharge: 3 }],
        price: 54.99,
        image: "/premium-white-hoodie.jpg",
      },
    ],
    subtotal: 57.99,
    discount: 10,
    discountType: "percentage",
    total: 52.19,
    status: "pending",
    createdAt: "2024-06-14 3:20 PM",
    paidAt: null,
    paymentMethod: null,
  },
  {
    id: "INV-GHI789",
    customer: { name: "Mike Johnson", email: "mike@example.com" },
    items: [
      {
        name: "Dad Hat",
        color: "Beige",
        sizes: [],
        quantity: 3,
        price: 24.99,
        image: "/embroidered-baseball-cap.jpg",
      },
    ],
    subtotal: 74.97,
    discount: 0,
    discountType: null,
    total: 74.97,
    status: "expired",
    createdAt: "2024-06-01 9:00 AM",
    paidAt: null,
    paymentMethod: null,
  },
  {
    id: "INV-JKL012",
    customer: { name: "Sarah Wilson", email: "sarah@example.com" },
    items: [
      {
        name: "Crewneck Sweatshirt",
        color: "Gray",
        sizes: [{ size: "M", quantity: 2, extraCharge: 0 }],
        price: 44.99,
        image: "/custom-gray-sweatshirt.jpg",
      },
      {
        name: "Premium Cotton T-Shirt",
        color: "Black",
        sizes: [{ size: "M", quantity: 1, extraCharge: 0 }],
        price: 29.99,
        image: "/premium-black-t-shirt.jpg",
      },
    ],
    subtotal: 119.97,
    discount: 12.0,
    discountType: "fixed",
    total: 107.97,
    status: "paid",
    createdAt: "2024-06-13 1:15 PM",
    paidAt: "2024-06-13 2:30 PM",
    paymentMethod: "Stripe",
  },
  {
    id: "INV-MNO345",
    customer: { name: "Chris Brown", email: "chris@example.com" },
    items: [
      {
        name: "Snapback Hat",
        color: "Navy",
        sizes: [],
        quantity: 2,
        price: 34.99,
        image: "/snapback-hat-navy.jpg",
      },
    ],
    subtotal: 69.98,
    discount: 0,
    discountType: null,
    total: 69.98,
    status: "pending",
    createdAt: "2024-06-12 4:45 PM",
    paidAt: null,
    paymentMethod: null,
  },
];

const statusColors: Record<string, string> = {
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  expired: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusIcons: Record<string, typeof CheckCircle> = {
  paid: CheckCircle,
  pending: Clock,
  expired: XCircle,
};

export default function InvoicesPage() {
  //   const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [invoices, setInvoices] = useState(invoicesData);
  const [selectedInvoice, setSelectedInvoice] = useState<
    (typeof invoicesData)[0] | null
  >(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // toast({
    //   title: "Copied!",
    //   description: "Invoice ID copied to clipboard.",
    // });
  };

  const resendInvoice = (invoice: (typeof invoicesData)[0]) => {
    // toast({
    //   title: "Invoice resent",
    //   description: `Payment link sent to ${invoice.customer.email}`,
    // });
  };

  const updateInvoiceStatus = (invoiceId: string, status: string) => {
    setInvoices(
      invoices.map((inv) => (inv.id === invoiceId ? { ...inv, status } : inv))
    );
    // toast({
    //   title: "Status updated",
    //   description: `Invoice ${invoiceId} marked as ${status}`,
    // });
  };

  const invoiceStats = {
    total: invoices.length,
    paid: invoices.filter((s) => s.status === "paid").length,
    pending: invoices.filter((s) => s.status === "pending").length,
    totalRevenue: invoices
      .filter((s) => s.status === "paid")
      .reduce((sum, s) => sum + s.total, 0),
  };

  return (
    <div className="space-y-6">
      {/* <Toaster /> */}

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Invoice Management
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage all customer invoices
          </p>
        </div>
        <Link href="/dashboard/invoices/create">
          <Button className="bg-primary hover:bg-primary/90">
            <CreditCard className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Total Invoices",
            value: invoiceStats.total,
            icon: CreditCard,
            color: "bg-primary",
          },
          {
            label: "Paid",
            value: invoiceStats.paid,
            icon: CheckCircle,
            color: "bg-success",
          },
          {
            label: "Pending",
            value: invoiceStats.pending,
            icon: Clock,
            color: "bg-warning",
          },
          {
            label: "Revenue",
            value: `$${invoiceStats.totalRevenue.toFixed(2)}`,
            icon: CreditCard,
            color: "bg-chart-5",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border-0 shadow-lg shadow-primary/5">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${stat.color}/10`}>
                  <stat.icon
                    className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`}
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by invoice ID, customer name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-0"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-secondary border-0">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invoices Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-foreground">
              Invoices ({filteredInvoices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Invoice ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Items
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Discount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Total
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Created
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {paginatedInvoices.map((invoice, index) => {
                      const StatusIcon = statusIcons[invoice.status];
                      return (
                        <motion.tr
                          key={invoice.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-medium text-foreground">
                                {invoice.id}
                              </span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="w-6 h-6"
                                onClick={() => copyToClipboard(invoice.id)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-medium text-foreground">
                              {invoice.customer.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {invoice.customer.email}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-muted-foreground">
                              {invoice.items.length} item(s)
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {invoice.discount > 0 ? (
                              <Badge
                                variant="outline"
                                className="bg-success/10 text-success border-success/20"
                              >
                                {invoice.discountType === "percentage"
                                  ? `${invoice.discount}%`
                                  : `$${invoice.discount.toFixed(2)}`}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-semibold text-foreground">
                              ${invoice.total.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              variant="outline"
                              className={statusColors[invoice.status]}
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {invoice.status.charAt(0).toUpperCase() +
                                invoice.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-muted-foreground">
                              {invoice.createdAt}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-1">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="w-8 h-8"
                                  >
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedInvoice(invoice);
                                      setIsViewDialogOpen(true);
                                    }}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedInvoice(invoice);
                                      setIsEditDialogOpen(true);
                                    }}
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Invoice
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {invoice.status === "pending" && (
                                    <>
                                      <DropdownMenuItem
                                        onClick={() => resendInvoice(invoice)}
                                      >
                                        <Send className="w-4 h-4 mr-2" />
                                        Resend Link
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          updateInvoiceStatus(
                                            invoice.id,
                                            "paid"
                                          )
                                        }
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Mark as Paid
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          updateInvoiceStatus(
                                            invoice.id,
                                            "expired"
                                          )
                                        }
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Mark as Expired
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {invoice.status === "expired" && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        updateInvoiceStatus(
                                          invoice.id,
                                          "pending"
                                        )
                                      }
                                    >
                                      <Clock className="w-4 h-4 mr-2" />
                                      Reactivate
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredInvoices.length
                  )}{" "}
                  of {filteredInvoices.length}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? "bg-primary" : ""}
                      >
                        {page}
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* View Invoice Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Invoice {selectedInvoice?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={`${
                    statusColors[selectedInvoice.status]
                  } text-sm px-3 py-1`}
                >
                  {(() => {
                    const StatusIcon = statusIcons[selectedInvoice.status];
                    return <StatusIcon className="w-4 h-4 mr-2" />;
                  })()}
                  {selectedInvoice.status.charAt(0).toUpperCase() +
                    selectedInvoice.status.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created: {selectedInvoice.createdAt}
                </span>
              </div>

              <Separator />

              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium text-foreground">
                      {selectedInvoice.customer.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">
                      {selectedInvoice.customer.email}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Items */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  Invoice Items
                </h3>
                <div className="space-y-3">
                  {selectedInvoice.items.map((item: any, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl bg-secondary"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {item.name}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.color}
                          </Badge>
                          {item.sizes && item.sizes.length > 0 ? (
                            item.sizes.map((s: any, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {s.size}: {s.quantity}
                                {s.extraCharge > 0 && ` (+$${s.extraCharge})`}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Qty: {item.quantity}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="font-semibold text-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    ${selectedInvoice.subtotal.toFixed(2)}
                  </span>
                </div>
                {selectedInvoice.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Discount{" "}
                      {selectedInvoice.discountType === "percentage"
                        ? `(${selectedInvoice.discount}%)`
                        : "(Fixed)"}
                    </span>
                    <span className="text-success">
                      -$
                      {selectedInvoice.discountType === "percentage"
                        ? (
                            (selectedInvoice.subtotal *
                              selectedInvoice.discount) /
                            100
                          ).toFixed(2)
                        : selectedInvoice.discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">
                    ${selectedInvoice.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Info */}
              {selectedInvoice.status === "paid" && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Payment Method</p>
                        <p className="font-medium text-foreground">
                          {selectedInvoice.paymentMethod || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Paid At</p>
                        <p className="font-medium text-foreground">
                          {selectedInvoice.paidAt || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Invoice Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-primary" />
              Edit Invoice {selectedInvoice?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input defaultValue={selectedInvoice.customer.name} />
              </div>
              <div className="space-y-2">
                <Label>Customer Email</Label>
                <Input defaultValue={selectedInvoice.customer.email} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={selectedInvoice.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                // toast({
                //   title: "Invoice updated",
                //   description: "Changes have been saved successfully.",
                // });
                setIsEditDialogOpen(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
