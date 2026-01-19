"use client"

import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import { db } from '@/config/db';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { Users } from '@/config/schema';
import { motion } from 'framer-motion';

function BuyCredits() {
    const creditOption = [
        {
            credits: 5,
            amount: 0.99,
            label: 'Starter'
        },
        {
            credits: 10,
            amount: 1.99,
            label: 'Basic'
        },
        {
            credits: 25,
            amount: 3.99,
            label: 'Popular',
            popular: true
        },
        {
            credits: 50,
            amount: 6.99,
            label: 'Pro'
        },
        {
            credits: 100,
            amount: 9.99,
            label: 'Ultimate'
        },
    ]

    const [selectedOption, setSelectedOption] = useState([]);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router = useRouter();
    const onPaymentSucess = async () => {
        console.log("Payment Sucess...")
        //update user credit in db
        const result = await db.update(Users)
            .set({
                credits: userDetail?.credits + selectedOption?.credits
            }).returning({ id: Users.id });

        if (result) {
            setUserDetail(prev => ({
                ...prev,
                credits: userDetail?.credits + selectedOption?.credits
            }))
            router.push('/dashboard');
        }
    }
    return (
        <div>
            <div className="text-center mb-10">
                <h2 className='font-bold text-4xl bg-gradient-to-r from-purple-600 to-indigo-600 inline-block text-transparent bg-clip-text mb-2'>Buy More Credits</h2>
                <p className="text-gray-500 text-lg">Unlock endless possibilities and transform your room in seconds.</p>
                <div className="mt-4 bg-purple-50 inline-block px-4 py-2 rounded-full text-purple-700 font-semibold shadow-sm">
                    💎 Credits Remaining: {userDetail?.credits || 0}
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {creditOption.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={index}
                        className={`relative flex flex-col gap-4 justify-between p-6 bg-white border rounded-2xl shadow-lg transition-all duration-300 cursor-pointer hover:scale-105
                        ${selectedOption?.credits == item.credits ? 'border-purple-600 ring-4 ring-purple-100' : 'border-gray-100 hover:border-purple-300'}
                        `}
                        onClick={() => setSelectedOption(item)}
                    >
                        {item.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                BEST VALUE
                            </div>
                        )}

                        <div className="text-center mt-2">
                            <h3 className="text-gray-500 font-medium">{item.label}</h3>
                            <h2 className='font-bold text-4xl text-gray-800 my-2'>{item.credits}</h2>
                            <p className='font-medium text-gray-400'>Credits</p>
                        </div>

                        <div className="text-center">
                            <h2 className='font-bold text-2xl text-purple-600 mb-4'>${item.amount}</h2>
                            <Button className={`w-full py-6 rounded-xl font-bold text-lg shadow-md transition-all ${selectedOption?.credits == item.credits ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                                {selectedOption?.credits == item.credits ? 'Selected' : 'Select'}
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className='mt-16 flex justify-center'>
                {selectedOption?.amount &&
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border border-purple-100"
                    >
                        <h3 className="text-center font-bold text-xl text-gray-800 mb-6">Complete your purchase</h3>
                        <PayPalButtons style={{ layout: "vertical", shape: "pill" }}
                            onApprove={() => onPaymentSucess()}
                            onCancel={() => console.log("Payment Cancel")}
                            createOrder={(data, actions) => {
                                return actions?.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: selectedOption?.amount?.toFixed(2),
                                                currency_code: 'USD'
                                            }
                                        }
                                    ]
                                })
                            }}
                        />
                    </motion.div>
                }
            </div>
        </div>
    )
}

export default BuyCredits