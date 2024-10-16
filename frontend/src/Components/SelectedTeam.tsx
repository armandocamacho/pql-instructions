import React, { useContext } from 'react'
import { TeamSelectedContext } from '../Contexts/TeamSelectedContext'

export default function SelectedTeam() {

    const {contextTeam} = useContext(TeamSelectedContext)        

    return (
        <>
            <div className='w-full text-center text-white text-sm lg:text-lg font-bold'>
                Current Team Selected
            </div>
            <div className='w-full mt-2 text-red-700 font-bold text-[10px] lg:text-sm text-center uppercase'>
                {
                contextTeam === null
                ? 'THERE IS NOT A SELECTED TEAM, PLEASE CHOOSE ONE TEAM OR CREATE A NEW ONE'
                : 
                <div className='flex flex-col'>
                    <span className='text-lg lg:text-5xl font-harry font-thin'>{contextTeam.name}</span>
                    <span className='font-medium text-xs lg:text-sm'>{contextTeam.slogan}</span>
                </div>
        }
    </div>

        </>
    )
}
