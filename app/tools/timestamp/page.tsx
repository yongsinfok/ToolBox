"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Copy } from "lucide-react";
import Link from "next/link";

export default function TimestampPage() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [timestamp, setTimestamp] = useState("");
  const [dateOutput, setDateOutput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timestampOutput, setTimestampOutput] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const convertToDate = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) {
      setDateOutput("Invalid timestamp");
      return;
    }
    const date = new Date(ts);
    setDateOutput(date.toString() + "\n\nISO: " + date.toISOString() + "\nUTC: " + date.toUTCString());
  };

  const convertToTimestamp = () => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      setTimestampOutput("Invalid date");
      return;
    }
    setTimestampOutput(date.getTime().toString());
  };

  const useCurrentTimestamp = () => {
    setTimestamp(Date.now().toString());
    convertToDate();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Timestamp Converter</h1>
              <p className="text-muted-foreground">
                Convert Unix timestamps to readable dates and vice versa
              </p>
            </div>
          </div>
        </div>

        {/* Current Time Display */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Time</p>
                <p className="text-2xl font-mono font-bold">{new Date(currentTime).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Current Timestamp (ms)</p>
                <p className="text-2xl font-mono font-bold">{currentTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timestamp to Date */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Timestamp to Date</CardTitle>
            <CardDescription>Convert Unix timestamp (milliseconds) to human-readable date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter timestamp (e.g., 1234567890000)"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="font-mono"
              />
              <Button onClick={convertToDate}>Convert</Button>
              <Button onClick={useCurrentTimestamp} variant="secondary">Use Current</Button>
            </div>
            {dateOutput && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Result</label>
                  <Button onClick={() => copyToClipboard(dateOutput)} variant="ghost" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <pre className="bg-muted/50 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono">{dateOutput}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date to Timestamp */}
        <Card>
          <CardHeader>
            <CardTitle>Date to Timestamp</CardTitle>
            <CardDescription>Convert a date string to Unix timestamp (milliseconds)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter date (e.g., 2024-01-15 or Jan 15, 2024)"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
              <Button onClick={convertToTimestamp}>Convert</Button>
            </div>
            {timestampOutput && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Result</label>
                  <Button onClick={() => copyToClipboard(timestampOutput)} variant="ghost" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-sm font-mono">{timestampOutput} ms</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
