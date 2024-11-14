'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {Image as ImageIcon} from "lucide-react";

export default function Component() {
    const [svgFile, setSvgFile] = useState<File | null>(null)
    const [scale, setScale] = useState('2')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSvgFile(event.target.files[0])
            setPreviewUrl(URL.createObjectURL(event.target.files[0]))
        }
    }

    const convertToPng = () => {
        if (!svgFile || !canvasRef.current) return

        const img = new Image()
        img.onload = () => {
            const canvas = canvasRef.current!
            const ctx = canvas.getContext('2d')!
            const scaleFactor = parseInt(scale)

            canvas.width = img.width * scaleFactor
            canvas.height = img.height * scaleFactor

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            const pngUrl = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.download = `converted-${scaleFactor}x.png`
            link.href = pngUrl
            link.click()
        }
        img.src = URL.createObjectURL(svgFile)
    }

    return (
        <main className="min-h-screen bg-base-100 p-0">
            <div className="mx-auto space-y-8 max-w-none">
                <Card className="space-y-4 bg-base-300 rounded-none min-h-screen">
                    <div className="flex flex-col gap-4 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <ImageIcon className="h-6 w-6"/>
                                    <h2 className="text-xl font-semibold">Convert SVG to PNG</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="svg-file">Upload SVG File</Label>
                                <Input id="svg-file" type="file" accept=".svg" onChange={handleFileChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="scale-selector">Select Scale Factor</Label>
                                <div className="flex gap-2">
                                    {[2, 3, 4, 8, 16, 32].map((factor) => (
                                        <Button
                                            key={factor}
                                            variant={scale === factor.toString() ? "secondary" : "outline"}
                                            onClick={() => setScale(factor.toString())}
                                        >
                                            {factor}x
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            {previewUrl && (
                                <div className="space-y-2">
                                    <Label>Preview</Label>
                                    <div className="border rounded p-2">
                                        <img src={previewUrl} alt="SVG Preview" className="max-w-full h-auto" />
                                    </div>
                                </div>
                            )}
                            <Button onClick={convertToPng} variant="primary" disabled={!svgFile}>Convert to PNG</Button>
                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                        </CardContent>
                    </div>
                </Card>
            </div>
        </main>
    )
}