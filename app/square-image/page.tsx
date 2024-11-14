'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

export default function Component() {
    const [image, setImage] = useState<HTMLImageElement | null>(null)
    const [bgColor, setBgColor] = useState('#ffffff')
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const img = new Image()
                img.onload = () => setImage(img)
                img.src = e.target?.result as string
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            if (ctx) {
                const size = Math.max(image.width, image.height)
                canvas.width = size
                canvas.height = size

                // Fill background
                ctx.fillStyle = bgColor
                ctx.fillRect(0, 0, size, size)

                // Draw image in the center
                const x = (size - image.width) / 2
                const y = (size - image.height) / 2
                ctx.drawImage(image, x, y)
            }
        }
    }, [image, bgColor])

    const handleDownload = () => {
        if (canvasRef.current) {
            const link = document.createElement('a')
            link.download = 'squared-image.png'
            link.href = canvasRef.current.toDataURL()
            link.click()
        }
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
                                    <h2 className="text-xl font-semibold">Make an image Square</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="space-y-2 flex-1">
                                <Label htmlFor="image-upload">Upload Image</Label>
                                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bg-color">Background Color</Label>
                                <Input
                                    id="bg-color"
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="h-10 w-full bg-white border border-base-100 rounded-md"
                                />
                            </div>
                        </div>
                        <canvas
                            ref={canvasRef}
                            className="border border-base-100 max-w-full"
                        />
                        {image && (
                            <Button onClick={handleDownload} variant="primary">Download Squared Image</Button>
                        )}
                    </div>
                </Card>
            </div>
        </main>
    )
}