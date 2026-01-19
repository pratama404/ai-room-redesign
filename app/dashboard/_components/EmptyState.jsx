import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 p-10 bg-white/50 rounded-2xl border-2 border-dashed border-purple-200">
      <div className="relative w-[250px] h-[250px] mb-6">
        <div className="absolute inset-0 bg-purple-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div>
        <Image
          src="/placeholder.png"
          width={200}
          height={200}
          alt="Empty state illustration for AI interior design"
          className="relative z-10 w-full h-full object-contain"
        />
      </div>
      <div className="text-center max-w-md">
        <h2 className="font-bold text-2xl text-gray-800">
          No Designs Yet
        </h2>
        <p className="text-gray-500 mt-3 leading-relaxed">
          Your creative journey starts here! Create a new AI interior design to visualize your dream space.
        </p>
      </div>
      <Link href="/dashboard/create-new">
        <Button className="mt-8 py-6 px-8 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl rounded-full transition-all hover:scale-105">
          ✨ Create New Design
        </Button>
      </Link>
    </div>
  )
}

export default EmptyState;
