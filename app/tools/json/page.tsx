"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export default function JsonPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const formatJson = () => {
    setError("");
    setIsValid(null);

    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
    } catch (e) {
      setError((e as Error).message);
      setIsValid(false);
      setOutput("");
    }
  };

  const minifyJson = () => {
    setError("");
    setIsValid(null);

    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
    } catch (e) {
      setError((e as Error).message);
      setIsValid(false);
      setOutput("");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
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
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">JSON Formatter</h1>
              <p className="text-muted-foreground">
                Format, validate, and beautify your JSON data
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Input JSON</CardTitle>
              <CardDescription>Paste your JSON here</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder='{"name": "John", "age": 30}'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
              {isValid === true && (
                <div className="mt-2 flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Valid JSON
                </div>
              )}
              {isValid === false && (
                <div className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                  <XCircle className="h-4 w-4" />
                  Invalid JSON
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Output</CardTitle>
              <CardDescription>Formatted result will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Formatted JSON will appear here..."
                value={output}
                readOnly
                className="min-h-[400px] font-mono text-sm bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-500 bg-red-500/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                <div>
                  <p className="font-semibold">JSON Parse Error</p>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={formatJson} size="lg">
            Format (Pretty Print)
          </Button>
          <Button onClick={minifyJson} variant="secondary" size="lg">
            Minify
          </Button>
          <Button onClick={copyToClipboard} variant="outline" size="lg" disabled={!output}>
            Copy Output
          </Button>
          <Button onClick={clearAll} variant="outline" size="lg">
            Clear All
          </Button>
        </div>

        {/* Usage Tips */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Usage Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Paste your JSON in the input area and click &quot;Format&quot; to beautify it</p>
            <p>• Click &quot;Minify&quot; to remove all whitespace and compress the JSON</p>
            <p>• The tool will automatically validate your JSON and show any errors</p>
            <p>• Use &quot;Copy Output&quot; to copy the formatted result to your clipboard</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
