import React, { useContext, useEffect, useState } from 'react'
import { PlayersArrayContext } from '../Contexts/PlayersArrayContext'
import { TeamSelectedContext } from '../Contexts/TeamSelectedContext'

export default function FormEditTeam({teams,updateControl,setUpdateControl}:{setUpdateControl:React.Dispatch<React.SetStateAction<boolean>> , teams:any, updateControl:boolean}) {

    const {contextTeam ,setContextTeam} = useContext(TeamSelectedContext)
    const [form, setForm] = useState({
        name : '',
        description : '',
    })

    useEffect(() => {
        setForm({...form, name:contextTeam?.name || '', description:contextTeam?.slogan || ''})
    }, [contextTeam])
    
    const [teamNameError , setTeamNameError] = useState(false)

    const handleForm = (event:React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form,[event.target.name]:event.target.value})
        setTeamNameError(false)
    }

    const verifyFields = (event:any) => {
        event.preventDefault()
        let isNameDuplicated = false;
        teams.map((team: { name: string , id:number })=>{
            if (team.name.toUpperCase() === form.name.trim().toUpperCase() && team.id !== contextTeam?.id) {
                isNameDuplicated = true
                return;
            }
        })
        if (isNameDuplicated) {
            setTeamNameError(true)
        } else if (form.name.trim() === "") {
            setForm({...form,name:''})
        } else {
            updateTeam();
        }
    }

    const updateTeam = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/teams/"+contextTeam?.id, {
                method: "PUT",
                body: JSON.stringify({ 
                    name: form.name ,
                    slogan: form.description,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setUpdateControl(!updateControl);
            alert("Your data was modified")
        } catch (error) {
            alert('An error occured')
            console.log(error)
        }
    }


    return (
        <form onSubmit={()=>verifyFields} className='flex flex-col m-auto flex-wrap items-center justify-center gap-y-2 lg:gap-y-6'>
            <div className='flex flex-col items-center justify-center w-full'>
                <label htmlFor="name" className='font-bold text-white text-xs text-center lg:text-sm'>Team Name</label>
                <input required type="text" name='name' id='name' value={form.name} className='p-1 lg:p-2 text-xs lg:text-sm text-center rounded-lg w-full' onChange={handleForm}/>
                <span className='text-[10px] lg:text-xs italic text-red-600'>*Este campo es OBLIGATORIO</span>
            </div>
            <div className='flex flex-col items-center'>
                <label htmlFor="description" className='font-bold text-white text-xs text-center lg:text-sm'>Team Description</label>
                <input type="text" name='description' id='description' value={form.description} className='p-1 lg:p-2 text-xs lg:text-sm text-center rounded-lg w-full' onChange={handleForm}/>
                <span className='text-[10px] lg:text-xs italic text-red-600'>Este campo es OPCIONAL</span>
            </div>

            <div className='flex flex-col gap-y-4'>
                <button type='submit' 
                className='text-white border-2 border-white rounded-lg bg-red-700 py-1 px-2 lg:px-6 font-bold text-xs lg:text-sm'>
                    Save Changes
                </button>
                <button type='button' onClick={()=>setContextTeam(null)}
                className='text-white border-2 border-white rounded-lg bg-red-700 py-1 px-2 lg:px-6 font-bold text-xs lg:text-sm'
                >
                    Cancel
                </button>
            </div>

            <div className={`w-full text-[10px] lg:text-lg text-center font-extrabold text-white italic ${teamNameError ? 'block' : 'hidden'}`}>
                ***THE NAME YOU ENTERED ALREADY EXISTS***
            </div>
        </form>
    )
}
