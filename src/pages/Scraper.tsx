import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Package, TrendingUp, Loader2 } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || 'https://dropflow-production.up.railway.app';

export default function Scraper() {
  const [ebayUrl, setEbayUrl] = useState("")
  const [amazonUrl, setAmazonUrl] = useState("")
  const [aliexpressUrl, setAliexpressUrl] = useState("")
  const [isScrapingEbay, setIsScrapingEbay] = useState(false)
  const [isScrapingAmazon, setIsScrapingAmazon] = useState(false)
  const [isScrapingAliexpress, setIsScrapingAliexpress] = useState(false)
  const [result, setResult] = useState<{ platform: string; count: number; titles: string[] } | null>(null)

  async function handleScrapeEbay() {
    if (!ebayUrl) return
    setIsScrapingEbay(true)
    setResult(null)
    
    try {
      const response = await fetch(`${API_URL}/api/scraper/ebay-store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store_url: ebayUrl, max_pages: 50 })
      })
      const data = await response.json()
      if (data.titles) {
        setResult({ platform: 'eBay', count: data.titles.length, titles: data.titles })
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

  async function handleScrapeAliexpress() {
    if (!aliexpressUrl) return
    setIsScrapingAliexpress(true)
    setResult(null)
    
    try {
      const response = await fetch(`${API_URL}/api/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: aliexpressUrl })
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

          {/* Scraper Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* eBay Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">eBay</h3>
                    <p className="text-sm text-muted-foreground">Scrape eBay store products</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Store URL</Label>
                    <Input
                      placeholder="https://www.ebay.com/str/storename"
                      value={ebayUrl}
                      onChange={(e) => setEbayUrl(e.target.value)}
                    />
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
            <Card className="hover:shadow-lg transition-shadow border-primary/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Package className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Amazon</h3>
                    <p className="text-sm text-muted-foreground">Scrape Amazon seller products</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Seller URL</Label>
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
                  <div>
                    <h3 className="font-bold">AliExpress</h3>
                    <p className="text-sm text-muted-foreground">Scrape AliExpress store products</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Store URL</Label>
                    <Input
                      placeholder="https://www.aliexpress.com/store/..."
                      value={aliexpressUrl}
                      onChange={(e) => setAliexpressUrl(e.target.value)}
                    />
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

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">What It Does</h3>
                </div>
                <p className="text-muted-foreground">
                  Simply paste any eBay or Amazon store URL, and our intelligent bot will 
                  automatically scrape every single product from that store. Get product titles, 
                  prices, and links in seconds.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Why It's Useful</h3>
                </div>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Save countless hours</span> — 
                  No more manually copying product links one by one. Find winning products from 
                  successful competitors and import them to your store instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
// Build: 1769951762
// Force rebuild 1769951921
