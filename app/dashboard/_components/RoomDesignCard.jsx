import React, { useState } from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './AiOutputDialog';
import { Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios';

function RoomDesignCard({ room, onDelete }) { // Accept onDelete prop

    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const deleteRoom = async () => {
        const result = await axios.post('/api/delete-room', { id: room.id });
        if (onDelete) {
            onDelete();
        }
    }

    const onClickHandler = () => {
        setOpenDialog(true)
    }

    return (
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg border border-purple-50 hover:shadow-2xl hover:border-purple-200 transition-all duration-300 cursor-pointer'>
            <div className="relative" onClick={() => onClickHandler()}>
                <ReactBeforeSliderComponent
                    firstImage={{
                        imageUrl: room?.aiImage,
                    }}
                    secondImage={{
                        imageUrl: room?.orgImage,
                    }}
                    className="w-full h-[250px] object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-600 shadow-sm">
                    AI Generated
                </div>
            </div>

            <div className='p-5'>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-lg text-gray-800">{room.roomType}</h2>
                    {/* Delete Button */}
                    <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                        <AlertDialogTrigger asChild>
                            <button
                                className="p-2 bg-red-50 rounded-full hover:bg-red-100 text-red-500 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent card click
                                    setOpenDeleteDialog(true);
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your design from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-red-500 hover:bg-red-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteRoom();
                                    }}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <div className="flex gap-2 text-sm text-gray-500">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-xs font-semibold">
                        {room.designType}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                        Before & After
                    </span>
                </div>
            </div>

            <AiOutputDialog aiImage={room.aiImage} orgImage={room.orgImage}
                closeDialog={() => setOpenDialog(false)}
                openDialog={openDialog} // Fixed prop: passing boolean directly
            />
        </div>
    )
}

export default RoomDesignCard;