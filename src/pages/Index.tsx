import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/Navbar"
import { ArrowRight, Package, TrendingUp, Zap, Shield, BarChart3, Clock, Check, Star, Users, Workflow } from "lucide-react"

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up space-y-6">
              <div className="inline-block px-4 py-2 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] text-sm font-medium">
                🚀 Automate Your Dropshipping Business
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Scale Your{" "}
                <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                  Dropshipping
                </span>{" "}
                Business on Autopilot
              </h1>
              <p className="text-xl text-muted-foreground">
                Import products from Amazon and AliExpress to eBay automatically. Monitor prices, manage inventory, and fulfill orders with ease.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button variant="hero" size="xl" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="xl">
                    View Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[hsl(var(--success))]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[hsl(var(--success))]" />
                  <span>Setup in 5 minutes</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 gradient-hero blur-3xl opacity-20 rounded-3xl"></div>
              <div className="relative rounded-2xl shadow-2xl border border-border bg-muted/50 h-80 flex items-center justify-center">
                <Package className="w-24 h-24 text-muted-foreground/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful automation tools designed for serious dropshippers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--primary)/0.1)]">
                <Package className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Product Import</h3>
              <p className="text-muted-foreground">
                Import products from Amazon and AliExpress with one click. Automatic price conversion and optimization.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--secondary)/0.1)]">
                <TrendingUp className="h-6 w-6 text-[hsl(var(--secondary))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Price Monitoring</h3>
              <p className="text-muted-foreground">
                Automatically track supplier prices and update your listings to maintain profit margins.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--accent)/0.1)]">
                <Zap className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Order Fulfillment</h3>
              <p className="text-muted-foreground">
                Orders are automatically forwarded to suppliers. Track everything from one dashboard.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--success)/0.1)]">
                <Shield className="h-6 w-6 text-[hsl(var(--success))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Inventory Sync</h3>
              <p className="text-muted-foreground">
                Real-time inventory tracking prevents overselling. Automatic stock level updates.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--primary)/0.1)]">
                <BarChart3 className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Track sales, profits, and performance metrics. Make data-driven decisions.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--secondary)/0.1)]">
                <Clock className="h-6 w-6 text-[hsl(var(--secondary))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Automation</h3>
              <p className="text-muted-foreground">
                Your business runs on autopilot. Focus on growth while we handle the rest.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How DropFlow Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start selling in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary)/0.1)] mx-auto flex items-center justify-center">
                <Workflow className="h-8 w-8 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-2xl font-bold">1. Connect Accounts</h3>
              <p className="text-muted-foreground">
                Link your eBay store and configure your supplier sources in minutes
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--secondary)/0.1)] mx-auto flex items-center justify-center">
                <Package className="h-8 w-8 text-[hsl(var(--secondary))]" />
              </div>
              <h3 className="text-2xl font-bold">2. Import Products</h3>
              <p className="text-muted-foreground">
                Paste Amazon URLs and let DropFlow automatically optimize listings for eBay
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--success)/0.1)] mx-auto flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-[hsl(var(--success))]" />
              </div>
              <h3 className="text-2xl font-bold">3. Automate & Profit</h3>
              <p className="text-muted-foreground">
                Sit back while DropFlow handles prices, inventory, and order fulfillment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your business size
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="p-8 hover:shadow-glow transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[hsl(var(--success))]" />
                  <span>Up to 100 products</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[hsl(var(--success))]" />
                  <span>Price monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[hsl(var(--success))]" />
                  <span>Auto order processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[hsl(var(--success))]" />
                  <span>Email support</span>
                </li>
              </ul>
              <Link to="/auth">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </Card>

            {/* Professional Plan */}
            <Card className="p-8 gradient-hero text-white border-0 shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--success))] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="opacity-90">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Up to 1,000 products</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Bulk import tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Custom profit margins</span>
                </li>
              </ul>
              <Link to="/auth">
                <Button variant="secondary" className="w-full">
                  Get Started
                </Button>
              </Link>
            </Card>

            {/* Enterprise Plan */}
            <Card className="p-8 hover:shadow-glow transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[hsl(var(--success))]" />
                  <span>Unlimited products</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[hsl(var(--success))]" />
                  <span>Multi-store management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[hsl(var(--success))]" />
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[hsl(var(--success))]" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[hsl(var(--success))]" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Link to="/auth">
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Loved by Dropshippers Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "DropFlow has completely transformed my dropshipping business. I went from managing 50 products manually to 500+ on autopilot."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary)/0.2)] flex items-center justify-center">
                  <Users className="h-5 w-5 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">eBay Power Seller</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The price monitoring feature alone has saved me thousands. DropFlow automatically adjusts my prices to stay competitive."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--secondary)/0.2)] flex items-center justify-center">
                  <Users className="h-5 w-5 text-[hsl(var(--secondary))]" />
                </div>
                <div>
                  <div className="font-semibold">Michael Chen</div>
                  <div className="text-sm text-muted-foreground">E-commerce Entrepreneur</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Best investment I've made. Setup was incredibly easy and I was importing products within 10 minutes. Highly recommended!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--success)/0.2)] flex items-center justify-center">
                  <Users className="h-5 w-5 text-[hsl(var(--success))]" />
                </div>
                <div>
                  <div className="font-semibold">Emma Rodriguez</div>
                  <div className="text-sm text-muted-foreground">Online Retailer</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <Card className="gradient-hero p-12 text-center text-white border-0 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Scale Your Dropshipping Business?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of successful dropshippers using DropFlow to automate their business
            </p>
            <Link to="/auth">
              <Button variant="secondary" size="xl" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="mt-4 text-sm opacity-75">No credit card required • Cancel anytime • 14-day money-back guarantee</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-muted/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">DropFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Automate your dropshipping business and scale to new heights
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/auth" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Demo</Link></li>
                <li><Link to="/auth" className="hover:text-foreground transition-colors">Get Started</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 DropFlow. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
