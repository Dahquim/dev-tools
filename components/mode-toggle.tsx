"use client";

import { Button } from "@/components/ui/button";
import { Mode } from "@/lib/converter";
import { Code2, ArrowLeftRight } from "lucide-react";

interface ModeToggleProps {
    mode: Mode;
    onChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
    return (
        <div className="join">
            <Button
                variant={mode === 'validate' ? 'accent' : 'outline'}
                onClick={() => onChange('validate')}
                className="join-item"
            >
                <Code2 className="h-4 w-4" />
                Validate & Format
            </Button>
            <Button
                variant={mode === 'convert' ? 'accent' : 'outline'}
                onClick={() => onChange('convert')}
                className="join-item"
            >
                <ArrowLeftRight className="h-4 w-4" />
                Convert
            </Button>
        </div>
    );
}