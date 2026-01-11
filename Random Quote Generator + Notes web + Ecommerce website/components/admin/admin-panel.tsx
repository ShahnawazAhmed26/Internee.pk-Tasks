"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus, Edit2, BarChart3, Package, Users, ShoppingCart } from "lucide-react"

interface Product {
  id: string
  title: string
  price: number
  image: string
  description: string
  category: string
  vendorId: string
  vendorName: string
  stock: number
}

interface Order {
  id: string
  date: string
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  userId: string
  itemCount: number
}

interface Vendor {
  id: string
  name: string
  shopName: string
  products: number
  revenue: number
  status: "active" | "inactive"
}

interface AdminDashboardProps {
  products: Product[]
  orders: Order[]
  vendors: Vendor[]
  onUpdateProducts: (products: Product[]) => void
  onUpdateOrders: (orders: Order[]) => void
}

export default function AdminPanel({
  products,
  orders,
  vendors,
  onUpdateProducts,
  onUpdateOrders,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "vendors">("overview")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
  })

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const activeProducts = products.length
  const activeVendors = vendors.filter((v) => v.status === "active").length

  const handleAddProduct = () => {
    if (!newProduct.title.trim()) return

    const product: Product = {
      id: Date.now().toString(),
      title: newProduct.title,
      price: newProduct.price,
      description: newProduct.description,
      category: newProduct.category,
      image: "/placeholder.svg",
      vendorId: "admin",
      vendorName: "Admin",
      stock: newProduct.stock,
    }

    onUpdateProducts([product, ...products])
    setNewProduct({
      title: "",
      price: 0,
      description: "",
      category: "",
      stock: 0,
    })
  }

  const handleUpdateProduct = (product: Product) => {
    onUpdateProducts(products.map((p) => (p.id === product.id ? product : p)))
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: string) => {
    onUpdateProducts(products.filter((p) => p.id !== id))
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: "pending" | "confirmed" | "shipped" | "delivered") => {
    onUpdateOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
  }

  // Overview Tab
  if (activeTab === "overview") {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">From all orders</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{pendingOrders}</p>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Products</p>
              <Package className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{activeProducts}</p>
            <p className="text-xs text-muted-foreground">Across marketplace</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{activeVendors}</p>
            <p className="text-xs text-muted-foreground">Selling products</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold">Recent Orders</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="p-3 bg-secondary/50 rounded-lg flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                    <p className="text-xs text-muted-foreground mt-1">{order.itemCount} item(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">${order.total.toFixed(2)}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Products */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold">Top Products</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="p-3 bg-secondary/50 rounded-lg flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.vendorName}</p>
                    <p className="text-xs text-muted-foreground mt-1">Stock: {product.stock}</p>
                  </div>
                  <p className="font-bold text-sm">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setActiveTab("products")} variant="outline">
            Manage Products
          </Button>
          <Button onClick={() => setActiveTab("orders")} variant="outline">
            Manage Orders
          </Button>
          <Button onClick={() => setActiveTab("vendors")} variant="outline">
            Manage Vendors
          </Button>
        </div>
      </div>
    )
  }

  // Products Management Tab
  if (activeTab === "products") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Product Management</h2>
          <Button onClick={() => setActiveTab("overview")} variant="outline">
            Back
          </Button>
        </div>

        {/* Add/Edit Product Form */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Product Title"
              value={editingProduct?.title || newProduct.title}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, title: e.target.value })
                  : setNewProduct({ ...newProduct, title: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              type="number"
              step="0.01"
              value={editingProduct?.price || newProduct.price}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) })
                  : setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })
              }
            />
            <Input
              placeholder="Category"
              value={editingProduct?.category || newProduct.category}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, category: e.target.value })
                  : setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
            <Input
              placeholder="Stock"
              type="number"
              value={editingProduct?.stock || newProduct.stock}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, stock: Number.parseInt(e.target.value) })
                  : setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })
              }
            />
          </div>
          <Textarea
            placeholder="Description"
            value={editingProduct?.description || newProduct.description}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({ ...editingProduct, description: e.target.value })
                : setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="min-h-20 resize-none"
          />
          <div className="flex gap-2">
            {editingProduct ? (
              <>
                <Button onClick={() => handleUpdateProduct(editingProduct)} className="flex-1 gap-2">
                  <Edit2 className="h-4 w-4" />
                  Update Product
                </Button>
                <Button onClick={() => setEditingProduct(null)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleAddProduct} className="flex-1 gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Products List */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold">All Products</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {products.length === 0 ? (
              <p className="text-muted-foreground text-sm">No products yet.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="p-4 bg-secondary/50 rounded-lg flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${product.price.toFixed(2)}</p>
                    <div className="flex gap-2 mt-2">
                      <Button onClick={() => setEditingProduct(product)} size="sm" variant="outline" className="gap-1">
                        <Edit2 className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteProduct(product.id)}
                        size="sm"
                        variant="destructive"
                        className="gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    )
  }

  // Orders Management Tab
  if (activeTab === "orders") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Order Management</h2>
          <Button onClick={() => setActiveTab("overview")} variant="outline">
            Back
          </Button>
        </div>

        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold">All Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-medium">Order ID</th>
                  <th className="text-left p-2 font-medium">Date</th>
                  <th className="text-left p-2 font-medium">Items</th>
                  <th className="text-left p-2 font-medium">Total</th>
                  <th className="text-left p-2 font-medium">Status</th>
                  <th className="text-left p-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                      No orders yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-secondary/50">
                      <td className="p-2 font-medium">{order.id}</td>
                      <td className="p-2 text-muted-foreground">{order.date}</td>
                      <td className="p-2">{order.itemCount}</td>
                      <td className="p-2 font-bold">${order.total.toFixed(2)}</td>
                      <td className="p-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                          className={`px-2 py-1 rounded text-sm font-medium border-0 cursor-pointer ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "confirmed"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "shipped"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    )
  }

  // Vendors Management Tab
  if (activeTab === "vendors") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Vendor Management</h2>
          <Button onClick={() => setActiveTab("overview")} variant="outline">
            Back
          </Button>
        </div>

        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold">All Vendors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendors.length === 0 ? (
              <p className="text-muted-foreground col-span-2">No vendors yet.</p>
            ) : (
              vendors.map((vendor) => (
                <Card key={vendor.id} className="p-4 bg-secondary/30 space-y-3">
                  <div>
                    <h4 className="font-bold">{vendor.shopName}</h4>
                    <p className="text-sm text-muted-foreground">{vendor.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Products</p>
                      <p className="font-bold">{vendor.products}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-bold">${vendor.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant={vendor.status === "active" ? "default" : "outline"} className="flex-1">
                      {vendor.status === "active" ? "Active" : "Inactive"}
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      Suspend
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>
      </div>
    )
  }

  return null
}
