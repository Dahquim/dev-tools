"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileJson, Copy, Download, Upload, RotateCcw, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Format, Mode, convertFormat, validateAndFormat, validateFormat } from "@/lib/converter";
import { ModeToggle } from "./mode-toggle";

export function FormatConverter() {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [mode, setMode] = useState<Mode>("validate");
    const [inputFormat, setInputFormat] = useState<Format>("json");
    const [outputFormat, setOutputFormat] = useState<Format>("yaml");
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleProcess = () => {
        try {
            if (!content.trim()) {
                throw new Error(`Please enter ${inputFormat.toUpperCase()} to ${mode === 'validate' ? 'validate' : 'convert'}`);
            }

            if (mode === 'validate') {
                const formatted = validateAndFormat(content, inputFormat);
                setContent(formatted);
                toast.success(`${inputFormat.toUpperCase()} is valid and has been formatted!`);
            } else {
                const result = convertFormat(content, inputFormat, outputFormat);
                setContent(result);
                toast.success(`Converted to ${outputFormat.toUpperCase()} successfully!`);
            }

            setError("");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                toast.error(err.message);
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard!");
    };

    const downloadFile = () => {
        const format = mode === 'validate' ? inputFormat : outputFormat;
        const blob = new Blob([content], {
            type: format === 'json' ? 'application/json' : 'text/yaml'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `formatted.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success(`${format.toUpperCase()} file downloaded!`);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setContent(content);
                setError("");

                // Auto-detect format
                const isJSON = validateFormat(content, 'json');
                const isYAML = validateFormat(content, 'yaml');

                if (isJSON) {
                    setInputFormat('json');
                    setOutputFormat('yaml');
                } else if (isYAML) {
                    setInputFormat('yaml');
                    setOutputFormat('json');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <main className={cn("min-h-screen bg-base-300", isFullScreen ? "p-0" : "p-4 sm:p-8")}>
            <div className={cn("mx-auto space-y-8",isFullScreen ? "max-w-none" : "max-w-3xl")}>
                {!isFullScreen && (
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-3">
                            <FileJson className="h-12 w-12" />
                            <h1 className="text-4xl font-bold">Format Tools</h1>
                        </div>
                        <p>Validate, format, and convert between JSON and YAML</p>
                    </div>
                )}
                <Card className={cn("space-y-4",isFullScreen ? "rounded-none min-h-screen" : "p-4")}>
                    <div className="flex flex-col gap-0 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {isFullScreen && (
                                    <div className="flex items-center gap-3">
                                        <FileJson className="h-6 w-6" />
                                        <h2 className="text-xl font-semibold">Format Tools</h2>
                                    </div>
                                )}
                                <ModeToggle mode={mode} onChange={setMode} />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsFullScreen(!isFullScreen)}
                                    title={isFullScreen ? "Exit full screen" : "Enter full screen"}
                                >
                                    {isFullScreen ? (
                                        <Minimize2 className="h-4 w-4" />
                                    ) : (
                                        <Maximize2 className="h-4 w-4" />
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setContent("");
                                        setError("");
                                    }}
                                    title="Clear"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="relative"
                                    title="Upload file"
                                >
                                    <input
                                        type="file"
                                        accept=".json,.yaml,.yml"
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <Upload className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={copyToClipboard}
                                    disabled={!content}
                                    title="Copy to clipboard"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={downloadFile}
                                    disabled={!content}
                                    title="Download file"
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        {mode === 'convert' && (
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="mb-2">From:</span>
                                    <Tabs value={inputFormat} onValueChange={(v) => setInputFormat(v as Format)} className="w-[200px]">
                                        <TabsList>
                                            <TabsTrigger value="json">JSON</TabsTrigger>
                                            <TabsTrigger value="yaml">YAML</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>
                                <div className="flex flex-col">
                                    <span className="mb-2">To:</span>
                                    <Tabs value={outputFormat} onValueChange={(v) => setOutputFormat(v as Format)} className="w-[200px]">
                                        <TabsList>
                                            <TabsTrigger value="json">JSON</TabsTrigger>
                                            <TabsTrigger value="yaml">YAML</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>
                            </div>
                        )}
                        {mode === 'validate' && (
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="mb-2">Format:</span>
                                    <Tabs value={inputFormat} onValueChange={(v) => setInputFormat(v as Format)} className="w-[200px]">
                                        <TabsList>
                                            <TabsTrigger value="json">JSON</TabsTrigger>
                                            <TabsTrigger value="yaml">YAML</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>
                            </div>
                        )}
                    </div>
                    {error && (
                        <div className="px-4">
                            <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                                {error}
                            </div>
                        </div>
                    )}
                    <div className={cn("relative",isFullScreen ? "h-[calc(100vh-16rem)]" : "min-h-[500px]")}>
                        <Textarea
                            placeholder={`Paste your ${inputFormat.toUpperCase()} here...`}
                            className={cn("absolute inset-0 font-mono mx-4 resize-none", error ? "border-red-500" : "")}
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setError("");
                            }}
                        />
                    </div>
                    <div className="px-4 pb-4">
                        <Button
                            className="w-full"
                            variant="primary"
                            onClick={handleProcess}
                            disabled={mode === 'convert' && inputFormat === outputFormat}
                        >
                            {mode === 'validate'
                                ? `Validate & Format ${inputFormat.toUpperCase()}`
                                : `Convert to ${outputFormat.toUpperCase()}`
                            }
                        </Button>
                    </div>
                </Card>
            </div>
        </main>
    );
}