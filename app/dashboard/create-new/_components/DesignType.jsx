"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

function DesignType({ selectedDesignType }) {
    const Designs = [
        { name: "Modern", image: "/modern.png", alt: "Modern design preview" },
        { name: "Industrial", image: "/industrial.png", alt: "Industrial design preview" },
        { name: "Bohemian", image: "/bohemian.png", alt: "Bohemian design preview" },
        { name: "Traditional", image: "/traditional.png", alt: "Traditional design preview" },
        { name: "Rustic", image: "/rustic.png", alt: "Rustic design preview" },
    ];

    const [selectedOption, setSelectedOption] = useState();

    return (
        <div className="mt-8">
            <label className="text-gray-900 font-bold text-lg mb-3 block">
                2. Select Interior Design Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Designs.map((design, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                            setSelectedOption(design.name);
                            selectedDesignType(design.name);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${design.name === selectedOption
                            ? "ring-4 ring-purple-500 ring-offset-2"
                            : "hover:ring-2 hover:ring-purple-200"
                            }`}
                    >
                        <div className="relative aspect-square">
                            {/* Fallback pattern if image fails or for placeholders */}
                            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                            <Image
                                src={design.image}
                                alt={design.alt}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        </div>

                        <div className="absolute bottom-3 left-3 text-white font-semibold text-lg shadow-black drop-shadow-md">
                            {design.name}
                        </div>

                        {design.name === selectedOption && (
                            <div className="absolute top-2 right-2 bg-purple-600 text-white p-1 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default DesignType;
