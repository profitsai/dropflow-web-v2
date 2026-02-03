import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight, BarChart3, AlertCircle, CheckCircle2 } from "lucide-react"

const getStatsForPeriod = (period: string) => {
  // In a real app, this would fetch data from API based on period
  const statsData: Record<string, any[]> = {
    daily: [
      {
        title: "Daily Revenue",
        value: "$2,450.00",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
      },
      {
        title: "Daily Profit",
        value: "$892.00",
        change: "+15.3%",
        trend: "up",
        icon: TrendingUp,
      },
      {
        title: "Orders Today",
        value: "89",
        change: "+23.1%",
        trend: "up",
        icon: ShoppingCart,
      },
    ],
    "3days": [
      {
        title: "3-Day Revenue",
        value: "$7,850.00",
        change: "+10.2%",
        trend: "up",
        icon: DollarSign,
      },
      {
        title: "3-Day Profit",
        value: "$2,756.00",
        change: "+12.8%",
        trend: "up",
        icon: TrendingUp,
      },
      {
        title: "Orders (3 Days)",
        value: "267",
        change: "+18.5%",
        trend: "up",
        icon: ShoppingCart,
      },
    ],
    "7days": [
      {
        title: "7-Day Revenue",
        value: "$18,340.00",
        change: "+14.7%",
        trend: "up",
        icon: DollarSign,
      },
      {
        title: "7-Day Profit",
        value: "$6,419.00",
        change: "+16.2%",
        trend: "up",
        icon: TrendingUp,
      },
      {
        title: "Orders (7 Days)",
        value: "623",
        change: "+21.3%",
        trend: "up",
        icon: ShoppingCart,
      },
    ],
    "30days": [
      {
        title: "30-Day Revenue",
        value: "$73,500.00",
        change: "+8.9%",
        trend: "up",
        icon: DollarSign,
      },
      {
        title: "30-Day Profit",
        value: "$25,725.00",
        change: "+11.4%",
        trend: "up",
        icon: TrendingUp,
      },
      {
        title: "Orders (30 Days)",
        value: "2,670",
        change: "+15.8%",
        trend: "up",
        icon: ShoppingCart,
      },
    ],
  }
  return statsData[period] || statsData.daily
}

const recentOrders = [
  { id: "ORD-001", product: "Wireless Earbuds Pro", customer: "John D.", status: "Shipped", amount: "$79.99" },
  { id: "ORD-002", product: "Smart Watch Series X", customer: "Sarah M.", status: "Processing", amount: "$199.99" },
  { id: "ORD-003", product: "Bluetooth Speaker", customer: "Mike R.", status: "Delivered", amount: "$49.99" },
  { id: "ORD-004", product: "Phone Case Premium", customer: "Lisa K.", status: "Pending", amount: "$24.99" },
  { id: "ORD-005", product: "USB-C Hub 7-in-1", customer: "Tom H.", status: "Shipped", amount: "$59.99" },
]

const topProducts = [
  { name: "Wireless Earbuds Pro", sales: 234, revenue: "$18,720" },
  { name: "Smart Watch Series X", sales: 189, revenue: "$37,611" },
  { name: "Bluetooth Speaker", sales: 156, revenue: "$7,644" },
  { name: "Phone Case Premium", sales: 142, revenue: "$3,550" },
]

const systemHealth = [
  {
    name: "eBay Store",
    status: "healthy",
    description: "All listings active and synchronized",
    lastSync: "2 minutes ago",
    icon: CheckCircle2,
    color: "text-green-500"
  },
  {
    name: "Price Monitor",
    status: "healthy",
    description: "Tracking 1,234 products across suppliers",
    lastSync: "5 minutes ago",
    icon: CheckCircle2,
    color: "text-green-500"
  },
  {
    name: "Order Automation",
    status: "attention",
    description: "3 orders pending manual review",
    lastSync: "10 minutes ago",
    icon: AlertCircle,
    color: "text-yellow-500"
  }
]

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState("daily")
  const stats = getStatsForPeriod(timePeriod)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <h1 className="text-3xl font-bold">Business Overview</h1>
                </div>
                <p className="text-muted-foreground">Monitor your dropshipping business performance and operations</p>
              </div>

              {/* Time Period Selector */}
              <div className="flex gap-2">
                <button
                  onClick={() => setTimePeriod("daily")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timePeriod === "daily"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setTimePeriod("3days")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timePeriod === "3days"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Last 3 Days
                </button>
                <button
                  onClick={() => setTimePeriod("7days")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timePeriod === "7days"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => setTimePeriod("30days")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timePeriod === "30days"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Last 30 Days
                </button>
              </div>
            </div>
          </div>

          {/* System Health Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {systemHealth.map((system) => {
                const Icon = system.icon
                return (
                  <Card key={system.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className={`h-5 w-5 ${system.color}`} />
                          <div>
                            <CardTitle className="text-lg">{system.name}</CardTitle>
                            <CardDescription className="text-xs">
                              Last sync: {system.lastSync}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{system.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className={`flex items-center text-sm ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {stat.change} from last month
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Charts Row */}
          <div className="grid gap-4 md:grid-cols-7 mb-8">
            {/* Revenue Chart Placeholder */}
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Revenue chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                      <div className="font-medium">{product.revenue}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                        <td className="py-3 px-4">{order.product}</td>
                        <td className="py-3 px-4 text-muted-foreground">{order.customer}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                            order.status === "Shipped" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                            order.status === "Processing" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-medium">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
