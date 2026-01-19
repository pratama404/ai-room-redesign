"use client";
import Image from "next/image";
import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

function ImageSelection({ selectedImage }) {
  const [file, setFile] = useState();

  const onFileSelected = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    selectedImage(event.target.files[0]);
  };

  return (
    <div>
      <label className="text-gray-900 font-bold text-lg mb-3 block">
        1. Select Image of your room
      </label>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <motion.div
            whileHover={{ scale: 1.01, borderColor: "#9333ea" }}
            whileTap={{ scale: 0.99 }}
            className={`
                relative flex flex-col justify-center items-center 
                w-full h-[350px] border-2 border-dashed rounded-2xl 
                cursor-pointer transition-all duration-300
                ${file
                ? "border-purple-500 bg-white shadow-lg"
                : "border-gray-300 bg-slate-50 hover:bg-slate-100"
              }
            `}
          >
            {!file ? (
              <div className="flex flex-col items-center p-6 text-center">
                <div className="p-4 bg-purple-100 rounded-full mb-4">
                  <UploadCloud className="w-10 h-10 text-purple-600" />
                </div>
                <p className="text-lg font-semibold text-gray-700">
                  Click to Upload or Drag & Drop
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  JPG, PNG or WEBP (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Selected Room Image"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Click to Change</p>
                </div>
              </div>
            )}
          </motion.div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default ImageSelection;
