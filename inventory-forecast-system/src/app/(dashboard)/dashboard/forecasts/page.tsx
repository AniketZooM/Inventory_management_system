"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileDown, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ForecastsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [forecastPeriod, setForecastPeriod] = useState("30");
  const [region, setRegion] = useState("all");
  const [partType, setPartType] = useState("all");

  // In a real application, this data would come from your LSTM model
  const mockForecastData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
    historicalData: [42, 45, 51, 48, 49, 53, 57, 62],
    forecastData: [65, 72, 78, 82, 85, 80, 76, 73],
    confidence: {
      upper: [68, 75, 82, 86, 90, 85, 81, 78],
      lower: [62, 69, 74, 78, 80, 75, 71, 68],
    }
  };

  const runForecast = async () => {
    setIsLoading(true);

    try {
      // In a real application, you would call your backend API to run the LSTM prediction
      // For demo purposes, we'll just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Then update the chart with new data
      // This would be done by updating state with the API response
    } catch (error) {
      console.error("Forecast failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Demand Forecasts</h1>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>

      {/* Filters and control panel */}
      <Card>
        <CardHeader>
          <CardTitle>Forecast Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="forecast-period">Forecast Period</Label>
              <Select
                value={forecastPeriod}
                onValueChange={setForecastPeriod}
              >
                <SelectTrigger id="forecast-period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">1 Month</SelectItem>
                  <SelectItem value="90">3 Months</SelectItem>
                  <SelectItem value="180">6 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select
                value={region}
                onValueChange={setRegion}
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="part-type">Spare Part Type</Label>
              <Select
                value={partType}
                onValueChange={setPartType}
              >
                <SelectTrigger id="part-type">
                  <SelectValue placeholder="Select part type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="engine">Engine Parts</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="body">Body Parts</SelectItem>
                  <SelectItem value="suspension">Suspension</SelectItem>
                  <SelectItem value="filters">Filters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                className="w-full"
                onClick={runForecast}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Run Forecast
                  </span>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast visualization */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Demand Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for chart - in a real app, we'd use a library like Recharts */}
            <div className="relative h-[400px] w-full bg-blue-50 rounded-md p-4">
              {/* Mock chart visualization - this would be a real chart in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium text-blue-800">LSTM Prediction Visualization</p>
                  <p className="text-sm text-blue-600 mt-2">
                    In a production environment, this would be a line chart showing historical data,
                    forecasted values, and confidence intervals
                  </p>
                </div>
              </div>
              {/* Fake chart elements to illustrate what it would look like */}
              <div className="absolute bottom-8 left-8 right-8 h-[300px]">
                {/* X axis */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-300"></div>

                {/* Historical data line (blue) */}
                <div className="absolute bottom-20 left-0 w-1/3 h-1/2 border-b-4 border-blue-500 rounded"></div>

                {/* Prediction line (red, dashed) */}
                <div className="absolute bottom-[120px] left-1/3 right-0 border-b-4 border-red-500 border-dashed rounded"></div>

                {/* Confidence interval (light red area) */}
                <div className="absolute bottom-[100px] left-1/3 right-0 h-[40px] bg-red-100 opacity-50 rounded"></div>

                {/* Legend */}
                <div className="absolute top-0 right-0 flex flex-col gap-2 bg-white p-2 rounded shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-blue-500"></div>
                    <span className="text-xs">Historical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-red-500 border-b border-dashed"></div>
                    <span className="text-xs">Forecast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 bg-red-100"></div>
                    <span className="text-xs">Confidence</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium text-lg">Demand Trend</h3>
              <p className="text-sm text-gray-600 mt-1">
                The LSTM model predicts an <span className="text-green-600 font-medium">increasing trend</span> in
                demand over the next {forecastPeriod} days.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg">Key Insights</h3>
              <ul className="list-disc pl-5 text-sm mt-1 space-y-1 text-gray-600">
                <li>Predicted demand is <span className="font-medium">27.4% higher</span> than the same period last year</li>
                <li>Highest demand expected in <span className="font-medium">Week 5</span></li>
                <li>Confidence level of prediction: <span className="font-medium">87%</span></li>
                <li><span className="font-medium">North region</span> shows the strongest growth</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg">Restock Recommendations</h3>
              <ul className="list-disc pl-5 text-sm mt-1 space-y-1 text-gray-600">
                <li>Increase <span className="font-medium">Filter parts</span> inventory by 30%</li>
                <li>Maintain current levels for <span className="font-medium">Body parts</span></li>
                <li>Consider <span className="font-medium">promotional offers</span> for Electrical components</li>
              </ul>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500">
                <span className="font-medium">Forecast accuracy:</span> Model is based on 24 months of historical data.
                Mean Absolute Error (MAE): 4.3 units. Prediction confidence decreases beyond 3 months.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forecast details table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Forecast Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">Time Period</th>
                  <th className="py-3 px-4 text-left font-medium">Historical Demand</th>
                  <th className="py-3 px-4 text-left font-medium">Forecasted Demand</th>
                  <th className="py-3 px-4 text-left font-medium">Lower Bound</th>
                  <th className="py-3 px-4 text-left font-medium">Upper Bound</th>
                  <th className="py-3 px-4 text-left font-medium">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {mockForecastData.labels.map((label, index) => (
                  <tr key={label} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="py-3 px-4">{label}</td>
                    <td className="py-3 px-4">
                      {index < mockForecastData.historicalData.length ? mockForecastData.historicalData[index] : "-"}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {mockForecastData.forecastData[index]}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {mockForecastData.confidence.lower[index]}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {mockForecastData.confidence.upper[index]}
                    </td>
                    <td className="py-3 px-4">
                      {index < 3 ? "High (90%)" : index < 6 ? "Medium (80%)" : "Low (65%)"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
