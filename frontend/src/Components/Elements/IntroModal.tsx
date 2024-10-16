import React from 'react'

export default function IntroModal({setIsIntroShowed}:{setIsIntroShowed:any}) {
  return (
    <div className='absolute w-full h-full bg-harry-bg bg-center bg-cover flex flex-wrap items-center justify-center'>
        <div className='absolute flex flex-wrap items-end justify-center h-full w-full'>
            <img src="assets/HarryAndDraco.png" alt="harry"
            className='animate-fadeInAnimation max-h-full max-w-full'
            />
        </div>
        <div className='font-harry z-10 text-white text-4xl border-2 border-white rounded-lg p-2 delay-300 opacity-0 animate-startButton'>
            <button type='button' className='cursor-harry' onClick={()=>setIsIntroShowed(false)}>START</button>
        </div>
    </div>
  )
}
