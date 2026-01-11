"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ShoppingCart, Plus, Minus, Trash2, AlertCircle, Star, Settings } from "lucide-react"
import AdminPanel from "@/components/admin/admin-panel"

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  text: string
  date: string
}

interface Product {
  id: string
  title: string
  price: number
  image: string
  description: string
  category: string
  vendorId: string
  vendorName: string
  rating: number
  reviews: Review[]
  stock: number
}

interface CartItem {
  product: Product
  quantity: number
}

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "vendor" | "admin"
}

interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  paymentMethod: string
  status: "pending" | "confirmed" | "shipped" | "delivered"
}

export default function EcommerceSection() {
  const [view, setView] = useState<"shop" | "admin" | "orders">("shop")
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<User>({
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin", // Set to admin to show admin panel
  })
  const [orders, setOrders] = useState<Order[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(5)

  // Initialize with sample products from multiple vendors
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: "1",
        title: "Wireless Headphones",
        price: 79.99,
        image: "/wireless-headphones.png",
        description: "Premium sound quality with noise cancellation",
        category: "Electronics",
        vendorId: "vendor1",
        vendorName: "TechHub",
        rating: 4.5,
        reviews: [
          { id: "r1", userId: "user2", userName: "Alice", rating: 5, text: "Excellent quality!", date: "2024-01-10" },
          { id: "r2", userId: "user3", userName: "Bob", rating: 4, text: "Good sound", date: "2024-01-08" },
        ],
        stock: 15,
      },
      {
        id: "2",
        title: "Running Shoes",
        price: 119.99,
        image: "/running-shoes.jpg",
        description: "Comfortable athletic shoes for daily wear",
        category: "Fashion",
        vendorId: "vendor2",
        vendorName: "SportZone",
        rating: 4.8,
        reviews: [
          { id: "r3", userId: "user4", userName: "Carol", rating: 5, text: "Very comfortable!", date: "2024-01-09" },
        ],
        stock: 22,
      },
      {
        id: "3",
        title: "Laptop Stand",
        price: 39.99,
        image: "/laptop-stand.png",
        description: "Ergonomic adjustable laptop stand",
        category: "Office",
        vendorId: "vendor1",
        vendorName: "TechHub",
        rating: 4.6,
        reviews: [
          { id: "r4", userId: "user5", userName: "David", rating: 5, text: "Perfect for my setup", date: "2024-01-07" },
        ],
        stock: 8,
      },
      {
        id: "4",
        title: "Yoga Mat",
        price: 29.99,
        image: "/rolled-yoga-mat.png",
        description: "Non-slip eco-friendly yoga mat",
        category: "Sports",
        vendorId: "vendor3",
        vendorName: "FitLife",
        rating: 4.7,
        reviews: [],
        stock: 30,
      },
      {
        id: "5",
        title: "Coffee Maker",
        price: 89.99,
        image: "/modern-coffee-maker.png",
        description: "Programmable coffee maker with timer",
        category: "Home",
        vendorId: "vendor2",
        vendorName: "SportZone",
        rating: 4.4,
        reviews: [{ id: "r5", userId: "user6", userName: "Eve", rating: 4, text: "Great coffee", date: "2024-01-06" }],
        stock: 12,
      },
      {
        id: "6",
        title: "Desk Lamp",
        price: 49.99,
        image: "/modern-desk-lamp.png",
        description: "LED desk lamp with adjustable brightness",
        category: "Office",
        vendorId: "vendor1",
        vendorName: "TechHub",
        rating: 4.9,
        reviews: [
          { id: "r6", userId: "user7", userName: "Frank", rating: 5, text: "Excellent lighting", date: "2024-01-05" },
        ],
        stock: 18,
      },
    ]

    setProducts(sampleProducts)
    setLoading(false)

    // Load cart from localStorage
    const savedCart = localStorage.getItem("ecommerce-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (err) {
        console.error("[v0] Failed to load cart:", err)
      }
    }

    // Load orders from localStorage
    const savedOrders = localStorage.getItem("ecommerce-orders")
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (err) {
        console.error("[v0] Failed to load orders:", err)
      }
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("ecommerce-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id)
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id && item.quantity < product.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      )
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId))
  }

  const addReview = (productId: string) => {
    if (!reviewText.trim()) return

    setProducts(
      products.map((p) => {
        if (p.id === productId) {
          const newReview: Review = {
            id: Date.now().toString(),
            userId: currentUser.id,
            userName: currentUser.name,
            rating: reviewRating,
            text: reviewText,
            date: new Date().toLocaleDateString(),
          }
          const totalRating = (p.rating * p.reviews.length + reviewRating) / (p.reviews.length + 1)
          return {
            ...p,
            reviews: [...p.reviews, newReview],
            rating: Math.round(totalRating * 10) / 10,
          }
        }
        return p
      }),
    )

    setReviewText("")
    setReviewRating(5)
    setSelectedProduct(null)
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tax = cartTotal * 0.08
  const shipping = cartTotal > 50 ? 0 : 5
  const finalTotal = cartTotal + tax + shipping

  const completeOrder = () => {
    if (cart.length === 0) return

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: cart,
      total: finalTotal,
      paymentMethod: paymentMethod,
      status: "pending",
    }

    setOrders([newOrder, ...orders])
    localStorage.setItem("ecommerce-orders", JSON.stringify([newOrder, ...orders]))
    setCart([])
    setShowCheckout(false)
    alert("Order placed successfully! Order ID: " + newOrder.id)
  }

  // Admin Panel View
  if (view === "admin" && currentUser.role === "admin") {
    const mockVendors = [
      {
        id: "vendor1",
        name: "Tech Hub Owner",
        shopName: "TechHub",
        products: 3,
        revenue: 2500.5,
        status: "active" as const,
      },
      {
        id: "vendor2",
        name: "Sport Zone Owner",
        shopName: "SportZone",
        products: 2,
        revenue: 1800.0,
        status: "active" as const,
      },
      {
        id: "vendor3",
        name: "Fit Life Owner",
        shopName: "FitLife",
        products: 1,
        revenue: 900.0,
        status: "active" as const,
      },
    ]

    return (
      <AdminPanel
        products={products}
        orders={orders}
        vendors={mockVendors}
        onUpdateProducts={setProducts}
        onUpdateOrders={setOrders}
      />
    )
  }

  // Shop View
  if (view === "shop") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Multi-Vendor Marketplace</h2>
          <div className="flex gap-2">
            {currentUser.role === "admin" && (
              <Button onClick={() => setView("admin")} variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            )}
            <Button onClick={() => setView("orders")} variant="outline" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders ({orders.length})
            </Button>
          </div>
        </div>

        {error && (
          <Card className="p-4 bg-destructive/10 border-destructive/20 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Grid */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                    <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-xs text-muted-foreground mb-1 uppercase">{product.category}</p>
                      <p className="text-xs text-muted-foreground mb-2">by {product.vendorName}</p>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.title}</h3>
                      <p className="text-xs text-muted-foreground flex-1 mb-3">
                        {product.description.substring(0, 60)}...
                      </p>

                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews.length})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                        <div className="flex gap-1">
                          <Button
                            onClick={() => setSelectedProduct(product)}
                            variant="outline"
                            size="sm"
                            className="gap-1"
                          >
                            <Star className="h-3 w-3" />
                            Review
                          </Button>
                          <Button
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            size="sm"
                            className="gap-1"
                          >
                            <Plus className="h-3 w-3" />
                            Add
                          </Button>
                        </div>
                      </div>
                      {product.stock < 5 && product.stock > 0 && (
                        <p className="text-xs text-destructive mt-2">Only {product.stock} left!</p>
                      )}
                      {product.stock === 0 && <p className="text-xs text-destructive mt-2">Out of Stock</p>}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div>
            <Card className="sticky top-20 p-6 space-y-4">
              <div className="flex items-center gap-2 text-lg font-bold">
                <ShoppingCart className="h-5 w-5" />
                Cart ({cart.length})
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="space-y-1 p-2 bg-secondary/50 rounded text-sm">
                      <p className="font-medium line-clamp-1">{item.product.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-5 w-5 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-xs font-medium w-3 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-5 w-5 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 h-7 text-xs"
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <>
                  <div className="border-t border-border pt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping:</span>
                      <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                      <span>Total:</span>
                      <span className="text-primary">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => setShowCheckout(true)}>
                    Checkout
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>

        {/* Review Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6 space-y-4">
              <h3 className="text-lg font-bold">Review: {selectedProduct.title}</h3>

              <div className="space-y-2">
                <p className="text-sm font-medium">Rating</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setReviewRating(star)} className="p-1">
                      <Star
                        className={`h-6 w-6 ${star <= reviewRating ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Your Review</p>
                <Textarea
                  placeholder="Share your experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="min-h-20 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedProduct(null)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => addReview(selectedProduct.id)} className="flex-1">
                  Submit Review
                </Button>
              </div>

              {selectedProduct.reviews.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border space-y-3 max-h-40 overflow-y-auto">
                  <p className="text-sm font-medium">Customer Reviews</p>
                  {selectedProduct.reviews.map((review) => (
                    <div key={review.id} className="text-sm p-2 bg-secondary/30 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{review.userName}</p>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6 space-y-4">
              <h3 className="text-lg font-bold">Checkout</h3>

              <div className="bg-secondary/50 p-4 rounded space-y-2 text-sm">
                <div className="flex justify-between font-medium">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Payment Method</p>
                  <div className="space-y-2">
                    {["credit-card", "debit-card", "bank-transfer", "wallet"].map((method) => (
                      <label
                        key={method}
                        className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-secondary/50"
                        style={{
                          borderColor: paymentMethod === method ? "var(--color-primary)" : "var(--color-border)",
                        }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm capitalize">{method.replace("-", " ")}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Payment is processed securely. This is a demo platform.
              </p>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowCheckout(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={completeOrder} className="flex-1">
                  Place Order
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // Orders View
  if (view === "orders") {
    return (
      <div className="space-y-6">
        <Button onClick={() => setView("shop")} variant="outline" className="gap-2">
          Back to Shop
        </Button>

        <h2 className="text-2xl font-bold">My Orders</h2>

        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No orders yet. Start shopping!</p>
            <Button onClick={() => setView("shop")} className="mt-4">
              Browse Products
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                    <p
                      className="text-sm"
                      style={{
                        color: order.status === "delivered" ? "green" : order.status === "pending" ? "orange" : "blue",
                      }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm p-2 bg-secondary/30 rounded">
                      <span>{item.product.title}</span>
                      <span>
                        x{item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  Paid via:{" "}
                  {order.paymentMethod.replace("-", " ").charAt(0).toUpperCase() +
                    order.paymentMethod.replace("-", " ").slice(1)}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }
}
