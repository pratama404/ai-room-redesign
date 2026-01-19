import React from 'react'
import { Slider } from "@/components/ui/slider"

function StructureRetention({ value, onValueChange }) {
    return (
        <div className='my-5'>
            <div className="flex justify-between items-center mb-4">
                <label className='text-gray-500 font-bold'>Structure Retention (AI Creativity) 🏗️</label>
                <span className="text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-md text-sm">
                    {Math.round(value * 100)}%
                </span>
            </div>

            <Slider
                defaultValue={[value]}
                max={1}
                step={0.1}
                min={0.1}
                onValueChange={(val) => onValueChange(val[0])}
                className="cursor-pointer"
            />

            <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Wildly Creative<br />(Low Structure)</span>
                <span>Strict Renovation<br />(High Structure)</span>
            </div>
        </div>
    )
}

export default StructureRetention
