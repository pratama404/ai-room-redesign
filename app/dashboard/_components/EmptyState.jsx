import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Image
        src="/placeholder.png"
        width={200}
        height={200}
        alt="Empty state illustration for AI interior design"
      />
      <div className="text-center mt-4">
        <h2 className="font-medium text-lg text-gray-600">
          Create a New AI Interior Design for Your Room 🏢
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Start designing now and visualize your dream space!
        </p>
      </div>
      <Link href="/dashboard/create-new">
        <Button className="mt-5 transition-all hover:scale-105">
          + Redesign Room 🏫
        </Button>
      </Link>
    </div>
  )
}

export default EmptyState;
