"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Clock, DollarSign, TrendingUp, Users, Package } from "lucide-react"  
import { StatCard } from "../StatCard"
import { CategoryChart, OrdersChart, TrafficChart } from "../Chart/Chart"
import { RecentOrders } from "../RecentOrder/Recent-orders"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Orders"
          value="2,543"
          change="+12.5% from last month"
          changeType="positive"
          icon={ShoppingCart}
          iconColor="bg-primary"
          delay={0}
        />
        <StatCard
          title="Pending Orders"
          value="48"
          change="12 require attention"
          changeType="neutral"
          icon={Clock}
          iconColor="bg-warning"
          delay={0.05}
        />
        <StatCard
          title="Total Revenue"
          value="$124,500"
          change="+18.2% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-success"
          delay={0.1}
        />
        <StatCard
          title="Avg. Order Value"
          value="$48.95"
          change="+5.4% increase"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-chart-5"
          delay={0.15}
        />
        <StatCard
          title="Total Customers"
          value="1,847"
          change="+89 this week"
          changeType="positive"
          icon={Users}
          iconColor="bg-chart-3"
          delay={0.2}
        />
        <StatCard
          title="Products"
          value="156"
          change="8 low in stock"
          changeType="neutral"
          icon={Package}
          iconColor="bg-chart-4"
          delay={0.25}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrdersChart />
        <TrafficChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <CategoryChart />
      </div>
    </div>
  )
}
