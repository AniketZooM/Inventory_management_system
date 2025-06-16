import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Package, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  // In a real application, this data would come from an API
  const dashboardData = {
    totalInventory: 1248,
    reorderNeeded: 42,
    stockValue: "₹12.8M",
    predictedDemand: "328 next 30 days",
    lastLogin: "April 9, 2025, 6:55 a.m.",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Welcome, Admin! Last login: {dashboardData.lastLogin}
        </div>
      </div>

      {/* Key metrics row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalInventory}</div>
            <p className="text-xs text-muted-foreground">items in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reorder Needed</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.reorderNeeded}</div>
            <p className="text-xs text-muted-foreground">items below threshold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stockValue}</div>
            <p className="text-xs text-muted-foreground">total inventory value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predicted Demand</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.predictedDemand}</div>
            <p className="text-xs text-muted-foreground">based on LSTM forecast</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for charts - in a real app, we'd use a charting library like recharts */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Inventory Demand Forecast</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Forecast chart will appear here. Using LSTM predictions.
              </p>
              <Button className="mt-4" variant="outline" asChild>
                <Link href="/dashboard/forecasts">
                  View detailed forecasts
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Category distribution chart will appear here.
              </p>
              <Button className="mt-4" variant="outline" asChild>
                <Link href="/dashboard/inventory">
                  View inventory details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/dashboard/upload">Upload New Data</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/reports">Generate Report</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/forecasts">Run Forecast</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
