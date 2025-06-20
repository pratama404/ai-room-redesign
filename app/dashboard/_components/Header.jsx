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
    <div className="p-5 shadow-sm flex justify-between items-center bg-white">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <Image
          src="/logo.svg"
          alt="Logo AI Room Design"
          width={40}
          height={40}
          priority
          title="AI Room Design Logo"
        />
        <h2 className="font-bold text-lg text-gray-700">AI Room Design</h2>
      </div>

      {/* Buy Credits Button */}
      <Button
        variant="ghost"
        className="rounded-full text-primary hover:bg-gray-100 transition-all"
        aria-label="Buy more credits"
        onClick={() => router.push('/buy-credit')}
      >
        Buy More Credits
      </Button>

      {/* User Details & Profile */}
      <div className="flex gap-7 items-center">
        <div className="flex gap-2 p-1 items-center bg-slate-200 px-3 rounded-full">
          <Image
            src="/star.png"
            alt="Credit icon"
            width={20}
            height={20}
            title="User Credits"
          />
          <h2 className="text-gray-700 font-medium">
            {userDetail?.credits ?? 0}
          </h2>
        </div>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
