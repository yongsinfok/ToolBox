"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Link as LinkIcon, Copy } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UrlPage() {
  const [encodeInput, setEncodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");

  const encode = () => {
    const encoded = encodeURIComponent(encodeInput);
    setEncodeOutput(encoded);
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(decodeInput);
      setDecodeOutput(decoded);
    } catch (e) {
      setDecodeOutput("Error: Invalid URL encoded string");
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
              <LinkIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">URL Encoder/Decoder</h1>
              <p className="text-muted-foreground">
                Encode and decode URLs for safe transmission
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
                <CardTitle>Encode URL</CardTitle>
                <CardDescription>Convert special characters to URL-safe format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Input URL</label>
                  <Textarea
                    placeholder="https://example.com/search?q=hello world"
                    value={encodeInput}
                    onChange={(e) => setEncodeInput(e.target.value)}
                    className="min-h-[100px] font-mono text-sm"
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
                  <label className="text-sm font-medium mb-2 block">Encoded URL</label>
                  <Textarea
                    readOnly
                    value={encodeOutput}
                    placeholder="Encoded URL will appear here..."
                    className="min-h-[100px] font-mono text-sm bg-muted/50"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Decode Tab */}
          <TabsContent value="decode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Decode URL</CardTitle>
                <CardDescription>Convert URL-encoded text back to original</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Encoded URL</label>
                  <Textarea
                    placeholder="https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"
                    value={decodeInput}
                    onChange={(e) => setDecodeInput(e.target.value)}
                    className="min-h-[100px] font-mono text-sm"
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
                <div>
                  <label className="text-sm font-medium mb-2 block">Decoded URL</label>
                  <Textarea
                    readOnly
                    value={decodeOutput}
                    placeholder="Decoded URL will appear here..."
                    className="min-h-[100px] font-mono text-sm bg-muted/50"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Usage Tips */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">About URL Encoding</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• URL encoding converts special characters into a format that can be transmitted over the internet</p>
            <p>• For example: spaces become %20, and @ becomes %40</p>
            <p>• Use this tool when working with query parameters or any URL that contains special characters</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
