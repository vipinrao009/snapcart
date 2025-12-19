import React from 'react'

const Unauthorized = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 h-screen'>
        <h1 className='text-3xl font-bold text-red-600'>Access denied 🚫</h1>
        <p className='mt-2 text-gray-700'>You can not access this page.</p>
    </div>
  )
}

export default Unauthorized
