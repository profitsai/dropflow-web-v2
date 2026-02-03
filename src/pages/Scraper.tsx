import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Zap, Package, TrendingUp, Loader2, AlertCircle, Info, ShoppingCart, CheckCircle2, Box } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || 'https://dropflow-production.up.railway.app';

export default function Scraper() {
  const [ebayUrl, setEbayUrl] = useState("")
  const [amazonUrl, setAmazonUrl] = useState("")
  const [aliexpressUrl, setAliexpressUrl] = useState("")
  const [isScrapingEbay, setIsScrapingEbay] = useState(false)
  const [isScrapingAmazon, setIsScrapingAmazon] = useState(false)
  const [isScrapingAliexpress, setIsScrapingAliexpress] = useState(false)
  const [result, setResult] = useState<{ platform: string; count: number; titles: string[] } | null>(null)

  // Supplier selection dialog state
  const [showSupplierDialog, setShowSupplierDialog] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<'amazon' | 'aliexpress' | null>(null)

  // AliExpress filters dialog state
  const [showAliexpressFilters, setShowAliexpressFilters] = useState(false)
  const [aliexpressFilters, setAliexpressFilters] = useState({
    minOrderAmount: '',
    minStarRating: '4',
    keywords: ''
  })

  // Credit purchase state with fixed bundles
  const creditBundles = [
    { credits: 250, price: 25, pricePerCredit: 0.10, popular: false },
    { credits: 1000, price: 90, pricePerCredit: 0.09, popular: false },
    { credits: 2500, price: 200, pricePerCredit: 0.08, popular: true },
    { credits: 5000, price: 369, pricePerCredit: 0.0738, popular: false },
    { credits: 10000, price: 500, pricePerCredit: 0.05, popular: false },
  ]

  const [selectedBundle, setSelectedBundle] = useState(creditBundles[1]) // Default to 1000 credits

  function getSavingsPercent(bundle: typeof creditBundles[0]): number {
    const basePricePerCredit = 0.10
    const savings = ((basePricePerCredit - bundle.pricePerCredit) / basePricePerCredit) * 100
    return Math.round(savings)
  }

  function handleEbayUrlChange(url: string) {
    setEbayUrl(url)
    // Show supplier dialog when URL is pasted and looks like an eBay store URL
    if (url.includes('ebay.com') && url.length > 20 && !selectedSupplier) {
      setShowSupplierDialog(true)
    }
  }

  function handleSupplierSelect(supplier: 'amazon' | 'aliexpress') {
    setSelectedSupplier(supplier)
    setShowSupplierDialog(false)
  }

  async function handleScrapeEbay() {
    if (!ebayUrl) return

    // Show supplier dialog if not selected
    if (!selectedSupplier) {
      setShowSupplierDialog(true)
      return
    }

    setIsScrapingEbay(true)
    setResult(null)

    try {
      const response = await fetch(`${API_URL}/api/scraper/ebay-store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          store_url: ebayUrl,
          max_pages: 50,
          supplier: selectedSupplier
        })
      })
      const data = await response.json()
      if (data.titles) {
        setResult({
          platform: `eBay (${selectedSupplier === 'amazon' ? 'Amazon' : 'AliExpress'} supplier)`,
          count: data.titles.length,
          titles: data.titles
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsScrapingEbay(false)
    }
  }

  async function handleScrapeAmazon() {
    if (!amazonUrl) return
    setIsScrapingAmazon(true)
    setResult(null)
    
    try {
      // Amazon seller scraping - uses import endpoint for now
      const response = await fetch(`${API_URL}/api/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: amazonUrl })
      })
      const data = await response.json()
      setResult({ platform: 'Amazon', count: 1, titles: [data.product?.name || 'Product scraped'] })
    } catch (err) {
      console.error(err)
    } finally {
      setIsScrapingAmazon(false)
    }
  }

  function handleAliexpressUrlChange(url: string) {
    setAliexpressUrl(url)
    // Show filters dialog when URL is pasted and looks like an AliExpress store URL
    if (url.includes('aliexpress.com') && url.length > 20) {
      setShowAliexpressFilters(true)
    }
  }

  async function handleScrapeAliexpress() {
    if (!aliexpressUrl) return

    // Show filters dialog if not configured
    if (!aliexpressFilters.keywords && !aliexpressFilters.minOrderAmount) {
      setShowAliexpressFilters(true)
      return
    }

    setIsScrapingAliexpress(true)
    setResult(null)

    try {
      const response = await fetch(`${API_URL}/api/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: aliexpressUrl,
          filters: aliexpressFilters
        })
      })
      const data = await response.json()
      setResult({ platform: 'AliExpress', count: 1, titles: [data.product?.name || 'Product scraped'] })
    } catch (err) {
      console.error(err)
    } finally {
      setIsScrapingAliexpress(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Scale with Speed
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Product Scraper</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Scale your dropshipping business to{" "}
              <span className="text-primary font-semibold">thousands of products</span>{" "}
              in minutes, not months
            </p>
          </div>

          {/* Supplier Selection Dialog */}
          <Dialog open={showSupplierDialog} onOpenChange={setShowSupplierDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Competitor's Supplier
                </DialogTitle>
                <DialogDescription>
                  Which platform does this eBay dropshipper use as their product supplier?
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-4">
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex flex-col items-start gap-2 hover:border-primary hover:bg-primary/5"
                  onClick={() => handleSupplierSelect('amazon')}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Package className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">Amazon</div>
                      <div className="text-xs text-muted-foreground">They source products from Amazon</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex flex-col items-start gap-2 hover:border-primary hover:bg-primary/5"
                  onClick={() => handleSupplierSelect('aliexpress')}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <Package className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">AliExpress</div>
                      <div className="text-xs text-muted-foreground">They source products from AliExpress</div>
                    </div>
                  </div>
                </Button>
              </div>

              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  DropFlow will use the appropriate scraper to find source products based on your selection.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {/* AliExpress Filters Dialog */}
          <Dialog open={showAliexpressFilters} onOpenChange={setShowAliexpressFilters}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Search Filters
                </DialogTitle>
                <DialogDescription>
                  Set your criteria to find the best products from this AliExpress store
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="minOrders">Minimum Order Amount</Label>
                  <Input
                    id="minOrders"
                    type="number"
                    placeholder="e.g., 100"
                    value={aliexpressFilters.minOrderAmount}
                    onChange={(e) => setAliexpressFilters({ ...aliexpressFilters, minOrderAmount: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Filter products by minimum number of orders (indicates popularity)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minRating">Minimum Star Rating</Label>
                  <select
                    id="minRating"
                    value={aliexpressFilters.minStarRating}
                    onChange={(e) => setAliexpressFilters({ ...aliexpressFilters, minStarRating: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="5">5 Stars Only</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    Only show products with high customer ratings
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (Optional)</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., wireless, waterproof"
                    value={aliexpressFilters.keywords}
                    onChange={(e) => setAliexpressFilters({ ...aliexpressFilters, keywords: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Filter products containing specific keywords in title or description
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setAliexpressFilters({ minOrderAmount: '', minStarRating: '4', keywords: '' })
                    setShowAliexpressFilters(false)
                  }}
                >
                  Clear Filters
                </Button>
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={() => setShowAliexpressFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>

              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  These filters help you find winning products with proven sales and quality.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {/* Scraper Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* eBay Card */}
            <Card className="hover:shadow-lg transition-shadow border-primary/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">eBay Competitor</h3>
                    <p className="text-sm text-muted-foreground">Scrape competitor's catalog</p>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="mb-4 flex items-start gap-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-200 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Before you start:</div>
                    <p>Identify an eBay dropshipper first, then paste their store URL below. You'll be asked which supplier platform they use.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>eBay Store URL</Label>
                    <Input
                      placeholder="https://www.ebay.com/str/storename"
                      value={ebayUrl}
                      onChange={(e) => handleEbayUrlChange(e.target.value)}
                    />
                    {selectedSupplier && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          selectedSupplier === 'amazon'
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {selectedSupplier === 'amazon' ? 'Amazon' : 'AliExpress'} supplier
                        </span>
                        <button
                          onClick={() => {
                            setSelectedSupplier(null)
                            setShowSupplierDialog(true)
                          }}
                          className="text-primary hover:underline"
                        >
                          Change
                        </button>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={handleScrapeEbay}
                    disabled={!ebayUrl || isScrapingEbay}
                  >
                    {isScrapingEbay ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Scraping...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Start Scraping
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Amazon Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Package className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Amazon</h3>
                    <p className="text-sm text-muted-foreground">Scrape Amazon seller products</p>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="mb-4 flex items-start gap-2 text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-900 dark:text-orange-200 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">URL Requirements:</div>
                    <p>Use an Amazon store URL or SRS (Seller Rating System) link to scrape all products from a specific seller.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Store or SRS URL</Label>
                    <Input
                      placeholder="https://www.amazon.com/s?seller=..."
                      value={amazonUrl}
                      onChange={(e) => setAmazonUrl(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={handleScrapeAmazon}
                    disabled={!amazonUrl || isScrapingAmazon}
                  >
                    {isScrapingAmazon ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Scraping...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Start Scraping
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AliExpress Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Package className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">AliExpress</h3>
                    <p className="text-sm text-muted-foreground">Scrape AliExpress store products</p>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="mb-4 flex items-start gap-2 text-xs bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200 p-3 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Search Criteria Required:</div>
                    <p>Enter a store URL and set your filters (minimum orders, ratings, keywords) to find the best products.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Store URL</Label>
                    <Input
                      placeholder="https://www.aliexpress.com/store/..."
                      value={aliexpressUrl}
                      onChange={(e) => handleAliexpressUrlChange(e.target.value)}
                    />
                    {(aliexpressFilters.keywords || aliexpressFilters.minOrderAmount) && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          Filters applied
                        </span>
                        <button
                          onClick={() => setShowAliexpressFilters(true)}
                          className="text-primary hover:underline"
                        >
                          Edit filters
                        </button>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={handleScrapeAliexpress}
                    disabled={!aliexpressUrl || isScrapingAliexpress}
                  >
                    {isScrapingAliexpress ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Scraping...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Start Scraping
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          {result && (
            <Card className="mb-12">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">
                  ✅ Scraped {result.count} products from {result.platform}
                </h3>
                <div className="max-h-60 overflow-y-auto bg-muted/30 rounded-lg p-4">
                  {result.titles.slice(0, 20).map((title, idx) => (
                    <p key={idx} className="text-sm py-1 border-b border-border/50 last:border-0">
                      {title}
                    </p>
                  ))}
                  {result.titles.length > 20 && (
                    <p className="text-sm text-muted-foreground pt-2">
                      ...and {result.titles.length - 20} more
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* What It Does & Why It's Useful */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Box className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl">What It Does</h3>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Simply paste any eBay or Amazon store URL, and our intelligent bot will automatically
                    scrape every single product from that store.
                  </p>
                  <p>
                    You'll receive a comprehensive list of product links that can be directly uploaded to
                    our Import section for quick filtering and cataloging.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl">Why It's Useful</h3>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Save countless hours</span> - No more
                    manually copying product links one by one
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Scale rapidly</span> - Build a catalog
                    of thousands of products in minutes instead of weeks
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Stay competitive</span> - Quickly
                    replicate successful stores and get to market faster
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="mb-8 border-2 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">How It Works</CardTitle>
                  <CardDescription className="text-base">Three simple steps to scale your product catalog</CardDescription>
                </div>
              </div>
            </div>
            <CardContent className="pt-8 pb-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative p-6 bg-card rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                      <span className="text-3xl font-bold text-white">1</span>
                    </div>
                    <h4 className="font-bold text-xl mb-3">Enter Store URL</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Paste the eBay or Amazon store URL you want to scrape
                    </p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative p-6 bg-card rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                      <span className="text-3xl font-bold text-white">2</span>
                    </div>
                    <h4 className="font-bold text-xl mb-3">Bot Scrapes Products</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Our bot automatically extracts all product links from the store
                    </p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-green-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative p-6 bg-card rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                      <span className="text-3xl font-bold text-white">3</span>
                    </div>
                    <h4 className="font-bold text-xl mb-3">Import & Filter</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Upload the list to Import section and apply your filter requirements
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Buy Credits */}
          <Card className="border-2 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500/10 via-primary/10 to-blue-500/10 p-6 border-b-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Buy More Credits</CardTitle>
                  <CardDescription className="text-base">1 credit = 1 product scraped</CardDescription>
                </div>
              </div>
            </div>
            <CardContent className="pt-8 pb-8 space-y-6">
              {/* Current Price Display */}
              <div className="text-center pb-6 border-b">
                <div className="text-6xl font-bold bg-gradient-to-r from-green-500 via-primary to-blue-600 bg-clip-text text-transparent mb-2">
                  ${selectedBundle.price}
                </div>
                <p className="text-muted-foreground">
                  {selectedBundle.credits.toLocaleString()} Credits • ${selectedBundle.pricePerCredit.toFixed(selectedBundle.pricePerCredit >= 0.1 ? 2 : 4)}/credit
                </p>
              </div>

              {/* Bundle Selection */}
              <div className="space-y-3">
                {creditBundles.map((bundle) => {
                  const isSelected = selectedBundle.credits === bundle.credits
                  const savings = getSavingsPercent(bundle)

                  return (
                    <button
                      key={bundle.credits}
                      onClick={() => setSelectedBundle(bundle)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20'
                          : 'border-border hover:border-primary/50 bg-card'
                      }`}
                    >
                      {/* Radio Button */}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected ? 'border-primary' : 'border-muted-foreground'
                      }`}>
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>

                      {/* Bundle Info */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">
                            {bundle.credits.toLocaleString()} Credits
                          </span>
                          {bundle.popular && (
                            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                              Most Popular
                            </span>
                          )}
                          {savings > 0 && !bundle.popular && (
                            <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                              Save {savings}%
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-bold text-xl">${bundle.price}</div>
                        <div className="text-xs text-muted-foreground">
                          ${bundle.pricePerCredit.toFixed(bundle.pricePerCredit >= 0.1 ? 2 : 4)}/credit
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Coupon Link */}
              <div className="text-center">
                <button className="text-primary hover:underline font-medium text-sm">
                  I have a coupon!
                </button>
              </div>

              {/* Purchase Button */}
              <Button
                variant="hero"
                size="lg"
                className="w-full text-lg h-16 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-green-500 via-primary to-blue-600 hover:from-green-600 hover:via-primary/90 hover:to-blue-700"
              >
                Buy Now - ${selectedBundle.price}
              </Button>

              {/* Terms */}
              <div className="text-center text-xs text-muted-foreground space-x-2">
                <a href="/terms" className="text-primary hover:underline font-medium">
                  Terms & Conditions
                </a>
                <span>and</span>
                <a href="/privacy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-r from-blue-500/5 via-primary/5 to-green-500/5 border-2 border-primary/20 p-5 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold mb-2 text-foreground">What happens next?</p>
                    <p className="text-muted-foreground mb-2">
                      Once scraping is complete, you'll receive a downloadable file with all product links.
                    </p>
                    <p className="text-muted-foreground">
                      Take this file to the{" "}
                      <a href="/import" className="text-primary hover:underline font-semibold">
                        Import section
                      </a>{" "}
                      to filter and add products to your catalog based on your requirements.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
// Build: 1769951762
// Force rebuild 1769951921
