
import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import { Download, X, Share2 } from 'lucide-react';


function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(aiImage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = aiImage;
    link.download = `AI_Redesign_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={closeDialog}>
      <AlertDialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl border-none shadow-2xl bg-white">
        <AlertDialogHeader className="p-4 flex flex-row items-center justify-between border-b border-gray-100 bg-gray-50/50">
          <div>
            <AlertDialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 inline-block text-transparent bg-clip-text">
              ✨ AI Transformation Result
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500 mt-1">
              Compare your original room with the AI-generated design.
            </AlertDialogDescription>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200" onClick={() => closeDialog(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </AlertDialogHeader>

        <div className="relative w-full h-[500px] bg-gray-100">
          <ReactBeforeSliderComponent
            firstImage={{
              imageUrl: aiImage
            }}
            secondImage={{
              imageUrl: orgImage
            }}
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm pointer-events-none">
            Drag slider to compare
          </div>
        </div>

        <div className='p-6 flex justify-between items-center bg-gray-50/50 border-t border-gray-100'>
          <div>
            <p className="text-sm text-gray-500">Love the design? Save it now!</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-full text-gray-600 border-gray-300 hover:bg-gray-100" onClick={() => closeDialog(false)}>Close</Button>
            <Button variant="outline" className="rounded-full text-purple-600 border-purple-200 hover:bg-purple-50" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" /> {copied ? 'Link Copied!' : 'Share Design'}
            </Button>
            <Button className="rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Download Image
            </Button>
          </div>
        </div>

      </AlertDialogContent>
    </AlertDialog>

  )
}

export default AiOutputDialog;