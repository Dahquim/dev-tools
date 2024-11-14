'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {Hash} from 'lucide-react'

export default function Component() {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [error, setError] = useState('')

    const handleEncode = () => {
        try {
            const encoded = btoa(input)
            setOutput(encoded)
            setError('')
        } catch (e) {
            setError('Error encoding: Invalid input')
        }
    }

    const handleDecode = () => {
        try {
            const decoded = atob(input)
            setOutput(decoded)
            setError('')
        } catch (e) {
            setError('Error decoding: Invalid base64 input')
        }
    }

    return (
        <main className="min-h-screen bg-base-100 p-0">
            <div className="mx-auto space-y-8 max-w-none">
                <Card className="space-y-4 bg-base-300 rounded-none min-h-screen">
                    <div className="flex flex-col gap-0 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <Hash className="h-6 w-6"/>
                                    <h2 className="text-xl font-semibold">Base64 Encoder/Decoder</h2>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleEncode} variant="outline">Encode</Button>
                                <Button onClick={handleDecode} variant="outline">Decode</Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 px-4">
                        <p>Enter text to encode or base64 to decode</p>
                        <Textarea
                            placeholder="Enter text here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            rows={12}
                        />
                        <Textarea
                            placeholder="Output will appear here..."
                            value={output}
                            readOnly
                            rows={12}
                        />
                    </div>
                </Card>
            </div>
        </main>
    )
}