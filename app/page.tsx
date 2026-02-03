"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDiff, Code, ArrowRightLeft, Clock, Link, Palette } from "lucide-react";

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const tools: Tool[] = [
  {
    title: "Diff Checker",
    description: "Compare two texts or files and see the differences highlighted",
    href: "/tools/diff",
    icon: <FileDiff className="h-6 w-6" />,
  },
  {
    title: "JSON Formatter",
    description: "Format, validate, and beautify your JSON data",
    href: "/tools/json",
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode text to and from Base64 format",
    href: "/tools/base64",
    icon: <ArrowRightLeft className="h-6 w-6" />,
  },
  {
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to readable dates and vice versa",
    href: "/tools/timestamp",
    icon: <Clock className="h-6 w-6" />,
  },
  {
    title: "URL Encoder/Decoder",
    description: "Encode and decode URLs for safe transmission",
    href: "/tools/url",
    icon: <Link className="h-6 w-6" />,
  },
  {
    title: "Color Converter",
    description: "Convert colors between HEX, RGB, and HSL formats",
    href: "/tools/color",
    icon: <Palette className="h-6 w-6" />,
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredTools = tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            ToolBox
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of useful developer utilities to make your work easier
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <Input
            type="search"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 text-lg"
          />
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group"
            >
              <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="mb-2 text-primary group-hover:text-primary/70 transition-colors">
                    {tool.icon}
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No tools found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
