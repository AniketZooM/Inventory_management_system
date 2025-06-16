"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, PlusCircle, Edit, Trash2, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types for our inventory data
type InventoryItem = {
  id: string;
  partId: string;
  name: string;
  category: string;
  inStock: number;
  minStock: number;
  price: number;
  supplier: string;
  location: string;
  lastUpdated: string;
};

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  // Mock inventory data - in a real app this would come from an API
  const inventoryData: InventoryItem[] = [
    {
      id: "1",
      partId: "SP001",
      name: "Engine Oil Filter",
      category: "Filters",
      inStock: 42,
      minStock: 15,
      price: 125.00,
      supplier: "Honda",
      location: "Rack A1",
      lastUpdated: "2025-04-12",
    },
    {
      id: "2",
      partId: "SP002",
      name: "Front Brake Pad Kit",
      category: "Brakes",
      inStock: 18,
      minStock: 10,
      price: 450.00,
      supplier: "Honda",
      location: "Rack B2",
      lastUpdated: "2025-04-09",
    },
    {
      id: "3",
      partId: "SP003",
      name: "Air Filter Element",
      category: "Filters",
      inStock: 35,
      minStock: 20,
      price: 180.00,
      supplier: "Generic",
      location: "Rack A2",
      lastUpdated: "2025-04-05",
    },
    {
      id: "4",
      partId: "SP004",
      name: "Spark Plug Set",
      category: "Engine",
      inStock: 8,
      minStock: 12,
      price: 320.00,
      supplier: "Honda",
      location: "Rack C1",
      lastUpdated: "2025-04-08",
    },
    {
      id: "5",
      partId: "SP005",
      name: "Drive Chain Kit",
      category: "Transmission",
      inStock: 5,
      minStock: 3,
      price: 780.00,
      supplier: "OEM",
      location: "Rack D3",
      lastUpdated: "2025-03-28",
    },
  ];

  // Generate unique categories and suppliers for filters
  const categories = [...new Set(inventoryData.map(item => item.category))];
  const suppliers = [...new Set(inventoryData.map(item => item.supplier))];

  // Filter the inventory data based on user search and filters
  const filteredInventory = inventoryData.filter(item => {
    // Filter by search query
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.partId.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

    // Filter by supplier
    const matchesSupplier = supplierFilter === "all" || item.supplier === supplierFilter;

    // Filter by stock level
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && item.inStock <= item.minStock) ||
      (stockFilter === "normal" && item.inStock > item.minStock);

    return matchesSearch && matchesCategory && matchesSupplier && matchesStock;
  });

  // Check if an item's stock is low
  const isLowStock = (item: InventoryItem) => item.inStock <= item.minStock;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Item
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search parts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={supplierFilter}
                onValueChange={setSupplierFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  {suppliers.map(supplier => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={stockFilter}
                onValueChange={setStockFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock Levels</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="normal">Normal Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
          <CardDescription>
            {filteredInventory.length} items found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">Part ID</th>
                  <th className="py-3 px-4 text-left font-medium">Name</th>
                  <th className="py-3 px-4 text-left font-medium">Category</th>
                  <th className="py-3 px-4 text-left font-medium">In Stock</th>
                  <th className="py-3 px-4 text-left font-medium">Min Stock</th>
                  <th className="py-3 px-4 text-left font-medium">Price</th>
                  <th className="py-3 px-4 text-left font-medium">Supplier</th>
                  <th className="py-3 px-4 text-left font-medium">Location</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.partId}</td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {isLowStock(item) && (
                          <AlertTriangle className="mr-1.5 h-4 w-4 text-orange-500" />
                        )}
                        <span className={isLowStock(item) ? "text-orange-500 font-medium" : ""}>
                          {item.inStock}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{item.minStock}</td>
                    <td className="py-3 px-4">₹{item.price.toFixed(2)}</td>
                    <td className="py-3 px-4">{item.supplier}</td>
                    <td className="py-3 px-4">{item.location}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInventory.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No inventory items found. Try adjusting your filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inventory Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Parts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.length}</div>
            <p className="text-xs text-muted-foreground">
              across {categories.length} categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {inventoryData.filter(item => isLowStock(item)).length}
            </div>
            <p className="text-xs text-muted-foreground">
              items below minimum threshold
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{inventoryData.reduce((sum, item) => sum + (item.price * item.inStock), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              current inventory worth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(inventoryData.reduce((sum, item) => sum + item.inStock, 0) / inventoryData.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              parts per inventory item
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
