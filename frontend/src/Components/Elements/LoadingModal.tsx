import React from 'react'

export default function LoadingModal() {
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-black flex flex-wrap items-center justify-center flex-col'>
        <img src="assets/snitch2.png" alt="snitch" className='w-60 animate-bounce' />
        <div className='text-center text-white font-bold'>
            LOADING...
        </div>
    </div>
)
}
