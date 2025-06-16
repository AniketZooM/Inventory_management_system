"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileType, CheckCircle, AlertCircle } from "lucide-react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadStatus("idle");
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("error");
      setErrorMessage("Please select a file to upload");
      return;
    }

    // Validate file type
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !["csv", "xlsx", "xls"].includes(fileExtension)) {
      setUploadStatus("error");
      setErrorMessage("Please upload a CSV or Excel file");
      return;
    }

    setUploadStatus("uploading");

    try {
      // In a real application, you would upload the file to your backend API
      // For demo purposes, we'll just simulate the upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful upload
      setUploadStatus("success");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
      setErrorMessage("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Upload Data</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upload Inventory Data</CardTitle>
            <CardDescription>
              Upload your inventory data in CSV or Excel format to generate forecasts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="file">File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  disabled={uploadStatus === "uploading"}
                />
                <p className="text-sm text-muted-foreground">
                  Accepted formats: CSV, XLSX, XLS
                </p>
              </div>

              {selectedFile && (
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FileType className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-blue-800">
                        Selected File: {selectedFile.name}
                      </p>
                      <p className="mt-1 text-sm text-blue-700">
                        Size: {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Upload Error
                      </h3>
                      <p className="mt-1 text-sm text-red-700">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Upload Successful
                      </h3>
                      <p className="mt-1 text-sm text-green-700">
                        Your file has been uploaded and is being processed. You can view the forecasts once processing is complete.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploadStatus === "uploading"}
            >
              {uploadStatus === "uploading" ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>File Format Guidelines</CardTitle>
            <CardDescription>
              Ensure your data is formatted correctly for accurate predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Required Columns:</h3>
              <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                <li><span className="font-medium">Part ID/SKU</span>: Unique identifier for each spare part</li>
                <li><span className="font-medium">Date</span>: Date of transaction in YYYY-MM-DD format</li>
                <li><span className="font-medium">Quantity</span>: Number of units sold/used</li>
                <li><span className="font-medium">Region</span>: Geographic region identifier</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Optional but Recommended:</h3>
              <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                <li><span className="font-medium">Category</span>: Type of spare part</li>
                <li><span className="font-medium">Price</span>: Cost per unit</li>
                <li><span className="font-medium">Supplier</span>: Source of the part</li>
                <li><span className="font-medium">Lead Time</span>: Days required for delivery</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Example Format:</h3>
              <div className="mt-2 p-3 bg-gray-50 rounded-md text-xs font-mono overflow-x-auto">
                <pre>
{`Part_ID,Date,Quantity,Region,Category,Price
SP001,2023-01-15,5,North,Filters,125.00
SP002,2023-01-15,2,South,Engine,450.00
SP001,2023-01-16,3,East,Filters,125.00
...`}
                </pre>
              </div>
            </div>

            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Need Help?
                  </h3>
                  <p className="mt-1 text-sm text-blue-700">
                    Download our <a href="#" className="font-medium underline">sample template</a> to ensure your data is in the correct format.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
