"use client"

import type React from "react"
 
import { motion } from "framer-motion"
import { Sidebar } from "@/components/DashboardElements/SideBar/Sidebar"
import { Header } from "@/components/DashboardElements/DashboardHeaders/Header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[280px] transition-all duration-300">
        <Header />
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="p-6">
          {children}
        </motion.main>
      </div>
    </div>
  )
}
