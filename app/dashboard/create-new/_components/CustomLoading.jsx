// 

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        {/* Adding AlertDialogTitle for accessibility */}
        <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle> 

        <div className='bg-white flex flex-col items-center my-10 justify-center'>
          <Image src={'/loading.gif'} alt='Loading animation' width={100} height={100} />
          <h2>Redesigning your Room ... Do not Refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomLoading
