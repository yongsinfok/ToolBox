"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Diff } from "lucide-react";
import Link from "next/link";
import { diffLines } from "diff";

export default function DiffPage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<string>("");

  const computeDiff = () => {
    const differences = diffLines(text1, text2);
    let result = "";

    differences.forEach((part) => {
      const color = part.added ? "bg-green-500/20 text-green-700 dark:text-green-400" :
                    part.removed ? "bg-red-500/20 text-red-700 dark:text-red-400" :
                    "text-foreground";
      const prefix = part.added ? "+ " : part.removed ? "- " : "  ";

      part.value.split("\n").forEach((line, i) => {
        if (line || part.value.trim() === "") {
          result += `<div class="${color} px-2 py-0.5 font-mono text-sm whitespace-pre-wrap">${prefix}${line}</div>`;
        }
      });
    });

    setDiff(result);
  };

  const clearAll = () => {
    setText1("");
    setText2("");
    setDiff("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
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
              <Diff className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Diff Checker</h1>
              <p className="text-muted-foreground">
                Compare two texts and see the differences highlighted
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Text 1 Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Original Text</CardTitle>
              <CardDescription>Paste the first text here</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your original text here..."
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Text 2 Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Modified Text</CardTitle>
              <CardDescription>Paste the second text here</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your modified text here..."
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button onClick={computeDiff} size="lg" className="min-w-[120px]">
            Compare
          </Button>
          <Button onClick={clearAll} variant="outline" size="lg">
            Clear All
          </Button>
        </div>

        {/* Diff Result */}
        {diff && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Differences</CardTitle>
              <CardDescription>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-500/20 border border-red-500 rounded"></span>
                  <span className="text-red-700 dark:text-red-400">Red = Removed</span>
                </span>
                <span className="mx-3">•</span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-500/20 border border-green-500 rounded"></span>
                  <span className="text-green-700 dark:text-green-400">Green = Added</span>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="rounded-lg border bg-muted/30 p-4 font-mono text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: diff }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
