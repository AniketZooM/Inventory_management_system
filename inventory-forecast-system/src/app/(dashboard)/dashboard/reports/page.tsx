"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileDown, Download, FileText, Calendar, BarChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ReportType = "inventory" | "forecast" | "reorder";
type ReportFormat = "pdf" | "excel" | "csv";
type ReportStatus = "idle" | "generating" | "success" | "error";

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>("inventory");
  const [reportFormat, setReportFormat] = useState<ReportFormat>("pdf");
  const [dateRange, setDateRange] = useState("last-30");
  const [reportStatus, setReportStatus] = useState<ReportStatus>("idle");

  // In a real application, these would be fetched from an API
  const generatedReports = [
    { id: "1", name: "Inventory Summary - Apr 2025", date: "2025-04-12", type: "inventory", size: "1.2 MB" },
    { id: "2", name: "Q1 Forecast Report", date: "2025-03-31", type: "forecast", size: "3.5 MB" },
    { id: "3", name: "Reorder Recommendations - March", date: "2025-03-15", type: "reorder", size: "0.8 MB" },
    { id: "4", name: "Category Performance - Q1", date: "2025-03-31", type: "inventory", size: "2.1 MB" },
    { id: "5", name: "Regional Demand Analysis", date: "2025-02-28", type: "forecast", size: "4.3 MB" },
  ];

  const handleGenerateReport = async () => {
    setReportStatus("generating");

    try {
      // In a real application, you would call your backend API to generate the report
      // For demo purposes, we'll just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      setReportStatus("success");
    } catch (error) {
      console.error("Report generation failed:", error);
      setReportStatus("error");
    }
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case "inventory":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "forecast":
        return <BarChart className="h-4 w-4 text-green-500" />;
      case "reorder":
        return <FileDown className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      </div>

      {/* Report Generation Card */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>
            Create custom reports based on your inventory data and forecasts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select
                value={reportType}
                onValueChange={(value: ReportType) => setReportType(value)}
              >
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inventory">Inventory Summary</SelectItem>
                  <SelectItem value="forecast">Demand Forecast</SelectItem>
                  <SelectItem value="reorder">Reorder Recommendations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select
                value={dateRange}
                onValueChange={setDateRange}
              >
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7">Last 7 Days</SelectItem>
                  <SelectItem value="last-30">Last 30 Days</SelectItem>
                  <SelectItem value="last-90">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-format">Format</Label>
              <Select
                value={reportFormat}
                onValueChange={(value: ReportFormat) => setReportFormat(value)}
              >
                <SelectTrigger id="report-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                className="w-full"
                onClick={handleGenerateReport}
                disabled={reportStatus === "generating"}
              >
                {reportStatus === "generating" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Generate Report
                  </span>
                )}
              </Button>
            </div>
          </div>

          {reportStatus === "success" && (
            <div className="mt-6 rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Report Generated Successfully
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Your report is ready. Click the button below to download.
                    </p>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="h-3 w-3" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {reportStatus === "error" && (
            <div className="mt-6 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Report Generation Failed
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      There was an error generating your report. Please try again later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Previously generated reports available for download
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">Report Name</th>
                  <th className="py-3 px-4 text-left font-medium">Type</th>
                  <th className="py-3 px-4 text-left font-medium">Generated On</th>
                  <th className="py-3 px-4 text-left font-medium">Size</th>
                  <th className="py-3 px-4 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {generatedReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center gap-2">
                      {getReportIcon(report.type)}
                      <span>{report.name}</span>
                    </td>
                    <td className="py-3 px-4 capitalize">{report.type}</td>
                    <td className="py-3 px-4">{report.date}</td>
                    <td className="py-3 px-4">{report.size}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>
            Standard report templates for quick generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Monthly Inventory Summary</CardTitle>
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-xs text-muted-foreground">
                  A comprehensive overview of current inventory levels, including stock value,
                  turnover rates, and distribution by category.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Generate
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Quarterly Forecast Report</CardTitle>
                  <BarChart className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-xs text-muted-foreground">
                  LSTM-based 3-month prediction of inventory demand across all regions
                  and categories, with confidence intervals.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Generate
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Reorder Alert Report</CardTitle>
                  <FileDown className="h-4 w-4 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-xs text-muted-foreground">
                  Identifies parts that need restocking, with suggested order quantities
                  based on predicted demand and lead times.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Generate
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
