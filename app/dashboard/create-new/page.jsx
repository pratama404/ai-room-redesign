"use client"

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
import StructureRetention from './_components/StructureRetention';

function CreateNew() {

  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiOutputImage, setAiOutputImage] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState();
  const [structureRetention, setStructureRetention] = useState(0.5);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = (value, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))

  }

  const GenerateAiImage = async () => {
    setLoading(true);
    // Validation
    if (!formData?.image) {
      alert("Please Select an Image");
      setLoading(false);
      return;
    }
    if (!formData?.roomType) {
      alert("Please Select Room Type");
      setLoading(false);
      return;
    }
    if (!formData?.designType) {
      alert("Please Select Design Type");
      setLoading(false);
      return;
    }

    try {
      const rawImageUrl = await SaveRawImageToFirebase();

      if (!rawImageUrl) {
        throw new Error("Failed to upload image. Please try again.");
      }

      // Make sure to pass the correct form data directly in the request
      const result = await axios.post('/api/redesign-room', {
        imageUrl: rawImageUrl,  // Use 'imageUrl' to match your API route
        roomType: formData.roomType,
        designType: formData.designType,
        additionalReq: formData.additionalReq,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        condition_scale: structureRetention
      });

      await updateUserCredits(); // make sure this function is uncommented and working
      setAiOutputImage(result.data.result); // output image url
      setOpenOutputDialog(true);

    } catch (error) {
      console.error('Error generating AI image:', error);
      alert(error.message || "An error occurred while generating the design.");
    } finally {
      setLoading(false);
    }
  }

  const SaveRawImageToFirebase = async () => {
    try {
      const fileName = Date.now() + "_raw.png";
      const imageRef = ref(storage, 'room-redesign/' + fileName);

      await uploadBytes(imageRef, formData.image); // assuming formData.image holds the file
      const downloadUrl = await getDownloadURL(imageRef);
      setOrgImage(downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading file to Firebase:', error);
      return null;
    }
  }


  const updateUserCredits = async () => {
    const result = await db.update(Users).set({
      credits: userDetail?.credits - 1
    }).returning({ id: Users.id });

    if (result) {
      setUserDetail(prev => ({
        ...prev,
        credits: userDetail?.credits - 1
      }))
      return result[0].id
    }
  }


  return (
    <div>
      <h2 className='font-bold text-4xl text-primary text-center'>Experience the Magic of AI Remodeling</h2>
      <p className='text-center text-gray-500'>Tired of dull, uninspiring rooms? Let AI breathe life into your space</p>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-20'>
        {/*Image Selection*/}
        <ImageSelection selectedImage={(value) => onHandleInputChange(value, 'image')} />
        {/*Form Input Section*/}
        <div className="bg-white p-0 md:p-5 rounded-xl">
          {/*Room type */}
          <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')} />
          {/*Design Type */}
          <DesignType selectedDesignType={(value) => onHandleInputChange(value, 'designType')} />
          {/*Additional Requireemnt Textarea */}
          <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, 'additionalReq')} />
          {/* Structure Retention Slider */}
          <StructureRetention value={structureRetention} onValueChange={(v) => setStructureRetention(v)} />
          {/*Button generate image */}
          <Button className="w-full mt-8 py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl rounded-xl transition-all hover:scale-[1.02]" onClick={GenerateAiImage}>
            ✨ Generate AI Remodel
          </Button>
          <p className='text-sm text-gray-400 mt-4 text-center'>NOTE: 1 Credit will use to redesign your room </p>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutputImage}
      />
    </div>
  )
}

export default CreateNew