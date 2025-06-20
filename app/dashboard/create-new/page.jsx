"use client"
//import React, { use, useState } from 'react'
import ImageSelection from './_components/ImageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebaseConfig'; 
import { useUser } from '@clerk/nextjs';
import CustomLoading from './_components/CustomLoading'
import AiOutputDialog from '../_components/AiOutputDialog'
import { db } from '@/config/db'
import { Users } from '@/config/schema'
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import React, { useState, useContext } from 'react';

function CreateNew() {

  const {user}=useUser();
  const [formData, setFormData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [aiOutputImage,setAiOutputImage]=useState();
  const [openOutputDialog,setOpenOutputDialog]=useState(false);
  const [orgImage,setOrgImage]=useState();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  // const [outputResult,setOutputResult]=useState();
  const onHandleInputChange=(value,fieldName)=>{
    setFormData(prev=>({
      ...prev,
    [fieldName]:value
    }))
    console.log(formData);
  }

  const GenerateAiImage = async () => {
    setLoading(true);
    try {
        const rawImageUrl = await SaveRawImageToFirebase();
        console.log('Image URL:', rawImageUrl);

        // Make sure to pass the correct form data directly in the request
        const result = await axios.post('/api/redesign-room', {
          imageUrl: rawImageUrl,  // Use 'imageUrl' to match your API route
          roomType: formData.roomType,
          designType: formData.designType,
          additionalReq: formData.additionalReq,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        });
        
        console.log(result.data);
        
        await updateUserCredits(); // make sure this function is uncommented and working
        setAiOutputImage(result.data.result); // output image url
        setOpenOutputDialog(true);

    } catch (error) {
        console.error('Error generating AI image:', error);
    } finally {
        setLoading(false);
    }
}

const SaveRawImageToFirebase = async () => {
  try {
      const fileName = Date.now() + "_raw.png";
      const imageRef = ref(storage, 'room-redesign/' + fileName);

      await uploadBytes(imageRef, formData.image); // assuming formData.image holds the file
      console.log('File Uploaded...');

      const downloadUrl = await getDownloadURL(imageRef);
      console.log(downloadUrl);
      setOrgImage(downloadUrl);
      return downloadUrl;

  } catch (error) {
      console.error('Error uploading file to Firebase:', error);
  }
}


  const updateUserCredits=async()=>{
    const result=await db.update(Users).set({
      credits:userDetail?.credits-1
    }).returning({id:Users.id});
    
    if(result){
      setUserDetail(prev=>({
        ...prev,
        credits:userDetail?.credits-1
      }))
      return result[0].id
    }
  }


  return (
    <div>
        <h2 className='font-bold text-4xl text-primary text-center'>Experience the Magic og AI Remodeling</h2>
        <p className='text-center text-gray-500'>Tired of dull, uninspiring rooms? Let AI breathe life into your space</p>

        <div className='grid grid-cols-1 md:grid-cols-2 
         mt-10 gap-10'>
            {/*Image Selection*/}
            <ImageSelection selectedImage={(value)=>onHandleInputChange(value,'image')}/>
            {/*Form Input Section*/}
            <div>
              {/*Room type */}
              <RoomType selectedRoomType={(value)=>onHandleInputChange(value,'roomType')}/>
              {/*Design Type */}
              <DesignType selectedDesignType={(value)=>onHandleInputChange(value,'designType')}/>
              {/*Additional Requireemnt Textarea */}
              <AdditionalReq additionalRequirementInput={(value)=>onHandleInputChange(value,'additionalReq')}/>
              {/*Button generate image */}
              <Button className="w-full mt-5" onClick={GenerateAiImage}>Generate</Button>
              <p className='text-sm text-gray-400 mb-52 '>NOTE:1 Credit will use to redesign your room </p>
            </div>
        </div>
        <CustomLoading loading={loading}/>
        <AiOutputDialog openDialog={openOutputDialog} 
        closeDialog={()=>setOpenOutputDialog(false)}
        orgImage={orgImage} 
        aiImage={aiOutputImage} 
          />
    </div>
  )
}

export default CreateNew