"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import EmptyState from './EmptyState';
import Link from 'next/link';
import { db } from '@/config/db';
import { AiGeneratedImage } from '@/config/schema';
import { eq } from 'drizzle-orm';
import RoomDesignCard from './RoomDesignCard';

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);

  useEffect(() => {
    user && GetUserRoomList();
  }, [user])
  const GetUserRoomList = async () => {
    const result = await db.select().from(AiGeneratedImage)
      .where(eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress?.emailAddress));
    setUserRoomList(result);
    console.log(result);
  }
  return (
    <div>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div>
          <h2 className='font-bold text-4xl bg-gradient-to-r from-purple-600 to-indigo-600 inline-block text-transparent bg-clip-text'>
            Hello, {user?.fullName} 👋
          </h2>
          <p className="text-gray-500 mt-2">Here are your AI-powered room transformations.</p>
        </div>

        <Link href={'/dashboard/create-new'}>
          <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-6 shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all transform hover:-translate-y-1">
            + Redesign Room
          </Button>
        </Link>
      </div>

      <div className="mt-12">
        {userRoomList?.length == 0 ?
          <EmptyState />
          :
          <div>
            <h2 className='font-bold text-2xl mb-6 text-gray-800'>My Projects</h2>
            {/*Listing*/}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {userRoomList.map((room, index) => (
                <RoomDesignCard key={index} room={room} onDelete={() => GetUserRoomList()} />
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Listing;