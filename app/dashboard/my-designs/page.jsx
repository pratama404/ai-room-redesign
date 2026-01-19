"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { db } from '@/config/db';
import { AiGeneratedImage } from '@/config/schema';
import { eq, desc } from 'drizzle-orm';
import RoomDesignCard from '../_components/RoomDesignCard';
import EmptyState from '../_components/EmptyState';

function MyDesigns() {
    const { user } = useUser();
    const [userRoomList, setUserRoomList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        user && GetUserRoomList();
    }, [user])

    const GetUserRoomList = async () => {
        setLoading(true);
        try {
            // Fetch user images, ordered by most recent (descending ID)
            const result = await db.select().from(AiGeneratedImage)
                .where(eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(AiGeneratedImage.id));

            setUserRoomList(result);
        } catch (error) {
            console.error("Error fetching designs:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2 className='font-bold text-3xl mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 inline-block text-transparent bg-clip-text'>
                My Library 📚
            </h2>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="h-[300px] bg-gray-200 rounded-xl"></div>
                    ))}
                </div>
            ) : userRoomList?.length == 0 ? (
                <EmptyState />
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10'>
                    {userRoomList.map((room, index) => (
                        <RoomDesignCard key={index} room={room} onDelete={() => GetUserRoomList()} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyDesigns;
