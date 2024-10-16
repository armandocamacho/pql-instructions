import React, { useContext, useState } from 'react'
import { PlayersArrayContext } from '../Contexts/PlayersArrayContext'

export default function FormCreateTeam({setCreateTeam,teams}:{setCreateTeam:React.Dispatch<React.SetStateAction<boolean>> , teams:any}) {

    const {contextPlayers} = useContext(PlayersArrayContext)
    const [form, setForm] = useState({
        name : '',
        description : '',
    })
    const [playersSelectedError, setPlayersSelectedError] = useState(false)
    const [teamNameError , setTeamNameError] = useState(false)

    const handleForm = (event:React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form,[event.target.name]:event.target.value})
        setTeamNameError(false)
    }

    const verifyFields = (event:any) => {
        event.preventDefault()
        setPlayersSelectedError(false)
        let isNameDuplicated = false;
        teams.map((team: { name: string })=>{
            if (team.name.toUpperCase() === form.name.trim().toUpperCase()) {
                isNameDuplicated = true
                return;
            }
        })
        if (isNameDuplicated) {
            setTeamNameError(true)
        } else if (form.name.trim() === "") {
            setForm({...form,name:''})
        } else if (contextPlayers === null || contextPlayers.current === undefined || contextPlayers.current.length === 0) {
            setPlayersSelectedError(true)
        } else {
            createTeam();
        }
    }

    const createTeam = async () => {
        let players:Array<number> = [];
        contextPlayers?.current.map((element)=>{
            players.push(element.id)
        })

        try {
            const response = await fetch("http://localhost:3001/api/teams", {
                method: "POST",
                body: JSON.stringify({ 
                    name: form.name ,
                    slogan: form.description,
                    players: players
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setCreateTeam(false);
        } catch (error) {
            console.log("error aca")
            console.log(error)
        }

    }


  return (
    <form onSubmit={verifyFields} className='flex flex-col flex-wrap items-center justify-center gap-y-2 lg:gap-y-6'>
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
            <button type='button' 
            className='text-white border-2 border-white rounded-lg bg-red-700 py-1 px-2 lg:px-6 font-bold text-xs lg:text-sm'
            onClick={()=>setCreateTeam(false)}>
                Cancel
            </button>
        </div>
        <div className={`w-full text-[10px] lg:text-lg text-center font-extrabold text-white italic ${teamNameError ? 'block' : 'hidden'}`}>
            ***THE NAME YOU ENTERED ALREADY EXISTS***
        </div>
        <div className={`w-full text-[10px] lg:text-lg text-center font-extrabold text-white italic ${playersSelectedError ? 'block' : 'hidden'}`}>
            ***YOU MUST SELECT ONE PLAYER AT LEAST***
        </div>
    </form>
  )
}
