import { Navbar } from "@/components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight, Users, Brain, Code, Shield } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$12,450.00",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Products Listed",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Orders Today",
    value: "89",
    change: "+23.1%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Profit Margin",
    value: "24.5%",
    change: "-2.3%",
    trend: "down",
    icon: TrendingUp,
  },
]

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

const agents = [
  {
    name: "Pyrite",
    role: "Squad Leader",
    session: "agent:main:main",
    icon: Shield,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    description: "The coordinator. Direct line to Siam. Delegates, tracks progress, handles anything that doesn't fit elsewhere.",
    personality: "Strategic thinker. Keeps the big picture in view. Delegates effectively. Makes final decisions.",
    expertise: ["Coordination", "Decision Making", "Task Delegation", "Progress Tracking"]
  },
  {
    name: "Sage",
    role: "Dropshipping Expert",
    session: "agent:dropshipping:main",
    icon: Brain,
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    description: "Owns dropshipping operations. AutoDS, warmups, orders, inventory. The eyes on the operation.",
    personality: "Vigilant. Methodical. Calm under pressure. Numbers-focused. Nothing slips past.",
    expertise: ["AutoDS Monitoring", "Amazon Warmups", "Order Fulfillment", "Inventory Health", "eBay Account Management"]
  },
  {
    name: "Eli",
    role: "SaaS Builder",
    session: "agent:saas:main",
    icon: Code,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    description: "Owns DropFlow development. Features, UI/UX, deployment. Code is poetry.",
    personality: "Clean coder. Systematic thinker. Tests everything. Documents thoroughly.",
    expertise: ["React/Flask Development", "API Design", "Database Architecture", "Deployment", "UI/UX"]
  }
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Mission Control</h1>
            </div>
            <p className="text-muted-foreground">Your AI agent squad. Three specialized agents working together like a real team.</p>
          </div>

          {/* Agent Squad Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">The Squad</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {agents.map((agent) => {
                const Icon = agent.icon
                return (
                  <Card key={agent.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${agent.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <CardDescription>{agent.role}</CardDescription>
                          </div>
                        </div>
                        <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {agent.session}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">{agent.description}</p>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="font-medium">Personality:</span>
                          <span className="text-muted-foreground">{agent.personality}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Expertise</div>
                        <div className="flex flex-wrap gap-1">
                          {agent.expertise.map((skill) => (
                            <span 
                              key={skill} 
                              className="text-xs px-2 py-1 bg-muted rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Status</span>
                          <span className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="font-medium">Active</span>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
