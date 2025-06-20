import Image from 'next/image'
import React, { useState } from 'react'

function DesignType({ selectedDesignType }) {
    const Designs = [
        { name: 'Modern', image: '/modern.png', alt: 'Modern design preview' },
        { name: 'Industrial', image: '/industrial.png', alt: 'Industrial design preview' },
        { name: 'Bohemian', image: '/bohemian.png', alt: 'Bohemian design preview' },
        { name: 'Traditional', image: '/traditional.png', alt: 'Traditional design preview' },
        { name: 'Rustic', image: '/rustic.png', alt: 'Rustic design preview' },
    ];
    
    const [selectedOption, setSelectedOption] = useState();

    return (
        <div className='mt-5'>
            <label className='text-gray-500'>Select Interior Design Type</label>
            <div className='grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {Designs.map((design, index) => (
                    <div key={index} onClick={() => { setSelectedOption(design.name); selectedDesignType(design.name); }}>
                        <Image 
                            src={design.image} 
                            alt={design.alt}  // ✅ Tambahkan alt agar tidak error 
                            width={100} 
                            height={100} 
                            style={{ width: "auto", height: "auto" }} // ✅ Pastikan width dan height otomatis
                            className={`rounded-md hover:scale-105 transition-all cursor-pointer ${design.name === selectedOption && 'border-2 border-primary rounded-md p-1'}`} 
                        />
                        <h2>{design.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DesignType;
