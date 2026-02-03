"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Copy } from "lucide-react";
import Link from "next/link";

interface ColorValues {
  hex: string;
  rgb: string;
  hsl: string;
}

export default function ColorPage() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("59, 130, 246");
  const [hsl, setHsl] = useState("217, 91%, 60%");

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "";
  };

  const rgbToHex = (rgb: string): string => {
    const values = rgb.split(",").map((v) => parseInt(v.trim()));
    if (values.length !== 3 || values.some((v) => isNaN(v) || v < 0 || v > 255)) return "";
    return "#" + values.map((v) => v.toString(16).padStart(2, "0")).join("");
  };

  const rgbToHsl = (rgb: string): string => {
    const values = rgb.split(",").map((v) => parseInt(v.trim()));
    if (values.length !== 3 || values.some((v) => isNaN(v))) return "";

    let [r, g, b] = values;
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  };

  const hslToRgb = (hsl: string): string => {
    const values = hsl.split(/[,\/%]/).map((v) => parseFloat(v.trim()));
    if (values.length < 3 || values.some((v) => isNaN(v))) return "";

    let [h, s, l] = values;
    h /= 360;
    s /= 100;
    l /= 100;

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return `${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}`;
  };

  const updateFromHex = (value: string) => {
    const cleanHex = value.startsWith("#") ? value : "#" + value;
    if (/^#[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      const rgbValue = hexToRgb(cleanHex);
      const hslValue = rgbToHsl(rgbValue);
      setHex(cleanHex);
      setRgb(rgbValue);
      setHsl(hslValue);
    } else {
      setHex(value);
    }
  };

  const updateFromRgb = (value: string) => {
    setRgb(value);
    const hexValue = rgbToHex(value);
    if (hexValue) {
      setHex(hexValue);
      const hslValue = rgbToHsl(value);
      setHsl(hslValue);
    }
  };

  const updateFromHsl = (value: string) => {
    setHsl(value);
    const rgbValue = hslToRgb(value);
    if (rgbValue) {
      setRgb(rgbValue);
      const hexValue = rgbToHex(rgbValue);
      setHex(hexValue);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const currentHex = hex.startsWith("#") && /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : "#3b82f6";

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
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Color Converter</h1>
              <p className="text-muted-foreground">
                Convert colors between HEX, RGB, and HSL formats
              </p>
            </div>
          </div>
        </div>

        {/* Color Preview */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div
              className="w-full h-32 rounded-lg border-4 border-muted shadow-inner transition-colors duration-200"
              style={{ backgroundColor: currentHex }}
            />
          </CardContent>
        </Card>

        {/* Converters */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* HEX */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">HEX</CardTitle>
              <CardDescription>Hexadecimal color format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                placeholder="#3b82f6"
                className="font-mono"
              />
              <Button
                onClick={() => copyToClipboard(hex)}
                variant="outline"
                className="w-full"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy HEX
              </Button>
            </CardContent>
          </Card>

          {/* RGB */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">RGB</CardTitle>
              <CardDescription>Red, Green, Blue values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={rgb}
                onChange={(e) => updateFromRgb(e.target.value)}
                placeholder="59, 130, 246"
                className="font-mono"
              />
              <Button
                onClick={() => copyToClipboard(`rgb(${rgb})`)}
                variant="outline"
                className="w-full"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy RGB
              </Button>
            </CardContent>
          </Card>

          {/* HSL */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">HSL</CardTitle>
              <CardDescription>Hue, Saturation, Lightness</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={hsl}
                onChange={(e) => updateFromHsl(e.target.value)}
                placeholder="217, 91%, 60%"
                className="font-mono"
              />
              <Button
                onClick={() => copyToClipboard(`hsl(${hsl})`)}
                variant="outline"
                className="w-full"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy HSL
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Usage Tips */}
        <Card className="mt-6 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Color Formats</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• <strong>HEX:</strong> #RRGGBB - 6-digit hexadecimal, commonly used in web design</p>
            <p>• <strong>RGB:</strong> rgb(r, g, b) - Red, Green, Blue values from 0-255</p>
            <p>• <strong>HSL:</strong> hsl(h, s%, l%) - Hue (0-360), Saturation (0-100%), Lightness (0-100%)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
