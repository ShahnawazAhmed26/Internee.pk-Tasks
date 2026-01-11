"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Download, RefreshCw, AlertCircle } from "lucide-react"

interface Quote {
  text: string
  author: string
}

interface UnsplashImage {
  id: string
  urls: {
    small: string
    regular: string
  }
  alt_description: string
  user: {
    name: string
  }
}

const UNSPLASH_API_KEY = "oF-_e1RiqmTp8gPo_EP0QgcrEPSfDVOJmrHTy9uZUXU"

export default function QuoteGallerySection() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [images, setImages] = useState<UnsplashImage[]>([])
  const [searchQuery, setSearchQuery] = useState("nature")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuote = async () => {
    try {
      setError(null)
      const res = await fetch("https://api.quotable.io/random")
      if (!res.ok) throw new Error("Failed to fetch quote")
      const data = await res.json()
      setQuote({ text: data.content, author: data.author })
    } catch (err) {
      setError("Could not fetch quote. Please try again.")
      console.error("[v0] Error fetching quote:", err)
    }
  }

  const fetchImages = async (query: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=9&client_id=${UNSPLASH_API_KEY}`,
      )
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setImages(data.results || [])
      if (!data.results || data.results.length === 0) {
        setError("No images found for that search.")
      }
    } catch (err) {
      setError("Could not fetch images. Please check your connection and try again.")
      console.error("[v0] Error fetching images:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
    fetchImages(searchQuery)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      fetchImages(searchQuery)
    }
  }

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      })
      if (!response.ok) throw new Error("Failed to fetch image")

      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error("[v0] Download error:", err)
      alert("Download failed. Please try using the browser's right-click save option.")
    }
  }

  return (
    <div className="space-y-8">
      {/* Quote Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 p-8">
        <div className="text-center space-y-4">
          {quote ? (
            <>
              <blockquote className="text-xl md:text-2xl font-semibold italic text-balance">"{quote.text}"</blockquote>
              <p className="text-muted-foreground">— {quote.author}</p>
            </>
          ) : (
            <p className="text-muted-foreground">Loading quote...</p>
          )}
          <Button onClick={fetchQuote} variant="outline" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            New Quote
          </Button>
        </div>
      </Card>

      {/* Gallery Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>

        {error && (
          <Card className="p-4 bg-destructive/10 border-destructive/20 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : images.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No images found. Try a different search term.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <Card key={image.id} className="overflow-hidden group">
                <div className="relative h-64 bg-muted">
                  <img
                    src={image.urls.small || "/placeholder.svg"}
                    alt={image.alt_description || "Gallery image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Photo by {image.user.name}</p>
                  <Button
                    onClick={() => downloadImage(image.urls.regular, `image-${image.id}.jpg`)}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
