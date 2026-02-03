import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Link as LinkIcon, Package, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { importProduct } from "@/lib/api"

export default function Import() {
  const [url, setUrl] = useState("")
  const [isImporting, setIsImporting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [recentImports, setRecentImports] = useState<Array<{
    id: number;
    name: string;
    source: string;
    status: string;
    date: string;
  }>>([])

  const handleImport = async () => {
    if (!url) return
    setIsImporting(true)
    setResult(null)

    try {
      const response = await importProduct(url)

      if (response.products && response.products.length > 0) {
        const product = response.products[0]
        let message = `Successfully imported: ${product.name || 'Product'}`

        if (response.out_of_stock_urls.length > 0) {
          message += ' (Out of stock - not listed to eBay)'
        }

        setResult({ success: true, message })
        setRecentImports(prev => [{
          id: Date.now(),
          name: product.name || 'Unknown Product',
          source: url.includes('amazon') ? 'Amazon' : 'AliExpress',
          status: 'success',
          date: 'Just now'
        }, ...prev.slice(0, 4)])
        setUrl("")
      } else if (response.errored_urls && response.errored_urls.length > 0) {
        setResult({ success: false, message: 'Failed to import product. Please check the URL and try again.' })
      } else {
        setResult({ success: false, message: response.message || 'Import failed' })
      }
    } catch (err) {
      setResult({ success: false, message: err instanceof Error ? err.message : 'Import failed. Please try again.' })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Import Products</h1>
            <p className="text-muted-foreground">Import products from Amazon or AliExpress to your store</p>
          </div>

          {/* Import Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import from URL
              </CardTitle>
              <CardDescription>
                Paste a product URL from Amazon or AliExpress to import it to your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-url">Product URL</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="product-url"
                        placeholder="https://www.amazon.com/dp/B09... or https://aliexpress.com/item/..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="pl-10"
                        onKeyDown={(e) => e.key === 'Enter' && handleImport()}
                      />
                    </div>
                    <Button 
                      variant="hero" 
                      onClick={handleImport}
                      disabled={!url || isImporting}
                    >
                      {isImporting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Importing...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Import
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {result && (
                  <div className={`p-4 rounded-lg flex items-center gap-3 ${
                    result.success 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <span>{result.message}</span>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Supported platforms:</h4>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">a</div>
                      <span className="text-sm font-medium">Amazon</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">A</div>
                      <span className="text-sm font-medium">AliExpress</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Import */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Bulk Import</CardTitle>
              <CardDescription>
                Import multiple products at once by uploading a CSV file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">
                  Drag and drop your CSV file here, or click to browse
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Imports */}
          {recentImports.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Imports</CardTitle>
                <CardDescription>Your latest product imports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentImports.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.source} • {item.date}</p>
                      </div>
                      <div>
                        {item.status === "success" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
