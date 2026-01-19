import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function AdditionalReq({ additionalRequirementInput }) {
  return (
    <div className='mt-8'>
      <label className='text-gray-900 font-bold text-lg mb-3 block'>4. Additional Requirements <span className='text-sm font-normal text-gray-500'>(Optional)</span></label>
      <Textarea
        className='mt-2 min-h-[120px] text-base p-4 border-gray-300 focus:ring-purple-500 rounded-xl resize-none shadow-sm'
        onChange={(e) => additionalRequirementInput(e.target.value)}
        placeholder="E.g., I want a blue sofa, light wood flooring, and plenty of plants..."
      />
    </div>
  )
}

export default AdditionalReq