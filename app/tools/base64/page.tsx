"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightLeft, Copy } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Base64Page() {
  const [encodeInput, setEncodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");
  const [decodeError, setDecodeError] = useState("");

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(encodeInput)));
      setEncodeOutput(encoded);
    } catch (e) {
      setEncodeOutput("Error: Unable to encode input");
    }
  };

  const decode = () => {
    setDecodeError("");
    try {
      const decoded = decodeURIComponent(escape(atob(decodeInput)));
      setDecodeOutput(decoded);
    } catch (e) {
      setDecodeError("Invalid Base64 string");
      setDecodeOutput("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearEncode = () => {
    setEncodeInput("");
    setEncodeOutput("");
  };

  const clearDecode = () => {
    setDecodeInput("");
    setDecodeOutput("");
    setDecodeError("");
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
              <ArrowRightLeft className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Base64 Encoder/Decoder</h1>
              <p className="text-muted-foreground">
                Convert text to and from Base64 format
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="encode" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>

          {/* Encode Tab */}
          <TabsContent value="encode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Encode Text to Base64</CardTitle>
                <CardDescription>Enter plain text to convert to Base64</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Input (Plain Text)</label>
                  <Textarea
                    placeholder="Enter text to encode..."
                    value={encodeInput}
                    onChange={(e) => setEncodeInput(e.target.value)}
                    className="min-h-[150px] font-mono text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={encode}>Encode</Button>
                  <Button onClick={clearEncode} variant="outline">Clear</Button>
                  {encodeOutput && (
                    <Button onClick={() => copyToClipboard(encodeOutput)} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Output (Base64)</label>
                  <Textarea
                    readOnly
                    value={encodeOutput}
                    placeholder="Base64 output will appear here..."
                    className="min-h-[150px] font-mono text-sm bg-muted/50"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Decode Tab */}
          <TabsContent value="decode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Decode Base64 to Text</CardTitle>
                <CardDescription>Enter Base64 string to convert to plain text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Input (Base64)</label>
                  <Textarea
                    placeholder="Enter Base64 string to decode..."
                    value={decodeInput}
                    onChange={(e) => setDecodeInput(e.target.value)}
                    className="min-h-[150px] font-mono text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={decode}>Decode</Button>
                  <Button onClick={clearDecode} variant="outline">Clear</Button>
                  {decodeOutput && (
                    <Button onClick={() => copyToClipboard(decodeOutput)} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
                {decodeError && (
                  <div className="text-red-600 dark:text-red-400 text-sm">{decodeError}</div>
                )}
                <div>
                  <label className="text-sm font-medium mb-2 block">Output (Plain Text)</label>
                  <Textarea
                    readOnly
                    value={decodeOutput}
                    placeholder="Decoded text will appear here..."
                    className="min-h-[150px] font-mono text-sm bg-muted/50"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
