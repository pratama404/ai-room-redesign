"use client"

import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';

function Header() {
  const { userDetail } = useContext(UserDetailContext) || {}; // Fallback to prevent errors
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 p-5 shadow-md flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      {/* Logo */}
      <div className="flex gap-2 items-center cursor-pointer" onClick={() => router.push('/dashboard')}>
        <Image
          src="/logo.svg"
          alt="Logo AI Room Design"
          width={40}
          height={40}
          priority
          title="AI Room Design Logo"
          className="hover:scale-110 transition-transform"
        />
        <h2 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">AI Room Design</h2>
      </div>

      {/* Right Section */}
      <div className="flex gap-4 md:gap-7 items-center">
        {/* Buy Credits Button */}
        <Button
          variant="ghost"
          className="rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all font-medium hidden md:flex"
          aria-label="Buy more credits"
          onClick={() => router.push('/dashboard/buy-credits')}
        >
          Buy More Credits
        </Button>

        {/* My Designs Button */}
        <Button
          variant="ghost"
          className="rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all font-medium hidden md:flex"
          onClick={() => router.push('/dashboard/my-designs')}
        >
          My Designs
        </Button>

        {/* User Details & Profile */}
        <div className="flex gap-3 items-center bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
          <Image
            src="/star.png"
            alt="Credit icon"
            width={20}
            height={20}
            title="User Credits"
          />
          <h2 className="text-gray-700 font-bold text-sm">
            {userDetail?.credits ?? 0}
          </h2>
        </div>

        <div className="hover:scale-105 transition-transform">
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
