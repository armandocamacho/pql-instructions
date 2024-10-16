import React from 'react'

export default function TeamCard({team}:{team:any}) {
  return (
    <div className='flex flex-wrap p-4 text-center border-2 border-red-600 rounded-xl w-60 h-96 text-white items-center justify-center bg-[rgba(0,0,0,.5)]'>
        <div className='flex flex-col gap-10'>
            <div className='w-full text-xl font-semibold'>
                {team['name']}
            </div>
            <div className='w-full text-[16px] font-light'>
                {team['slogan']}
            </div>
        </div>
    </div>
)
}
