"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'

function RoomType({ selectedRoomType }) {
  const roomOptions = [
    { name: 'Living Room', icon: '🛋️' },
    { name: 'Bedroom', icon: '🛏️' },
    { name: 'Kitchen', icon: '🍳' },
    { name: 'Office', icon: '💼' },
    { name: 'Bathroom', icon: '🚿' },
    { name: 'Gaming Room', icon: '🎮' },
  ]
  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className='mt-5'>
      <label className='text-gray-900 font-bold text-lg mb-3 block'>
        3. Select Room Type
      </label>

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-3'>
        {roomOptions.map((room, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSelectedOption(room.name); selectedRoomType(room.name) }}
            className={`flex flex-col items-center justify-center p-4 h-32 rounded-xl text-center cursor-pointer border shadow-sm transition-all
               ${selectedOption == room.name
                ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-200'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
              }
             `}
          >
            <span className='text-4xl mb-2'>{room.icon}</span>
            <h2 className='font-semibold text-gray-700'>{room.name}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default RoomType;