import React, { useContext, useEffect, useState } from 'react'
import TeamCard from './TeamCard';
import {TeamSelectedContext} from '../Contexts/TeamSelectedContext'
import circlePlusIcon from '../icons/circle-plus.svg'


export default function TeamSelection() {

    const {contextTeam,setContextTeam} = useContext(TeamSelectedContext)

    const [teams, setTeams] = useState([])
    const [form, setForm] = useState({
        name : '',
        description : '',
    })

    const [players, setPlayers] = useState([])
    const [createNewTeamLegend, setCreateNewTeamLegend] = useState(true)
    const [selectOptions, setSelectOptions] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/api/teams", {
            method: "GET",
        })
        .then((res) => {
            return res.json();
          })
        .then((data) => {
            setTeams(data)
        });
    }, [])

    useEffect(() => {
        fetch("http://localhost:3001/api/players/available", {
            method: "GET",
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setPlayers(data);
            var members:any = [];
            data.map((member:any)=>{
                members.push({
                    value:member.id,
                    label:member.name
                })
            })
            setSelectOptions(members)
        })
    }, [])

    const createOptions = () => {
        var temporal:any = [];
        players.forEach((player)=>
            temporal.push({
                hello:"hi"
            })
        )
    }    

    const verifyFields = (event:any) => {
        event.preventDefault()
        if (form.name.trim() === "") {
            setForm({...form,name:''})
        } else {
            createTeam();
        }
    }

    const createTeam = async () => {
        const response = await fetch("http://localhost:3001/api/teams", {
            method: "POST",
            body: JSON.stringify({ 
                name: form.name ,
                slogan: form.description,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const handleForm = (event:React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form,[event.target.name]:event.target.value})
    }

    const cancelForm = () => {  
        clearForm();
        setCreateNewTeamLegend(true);
    }

    const clearForm = () => {
        const initialState = {
            name:"",
            description:"",
        }
        setForm(initialState)
    }

    return (
        <div className='bg-[rgba(0,0,0,.5)] w-full flex flex-col items-center justify-center p-4 gap-y-6'>
            <div className='w-full text-center uppercase text-white font-bold text-2xl'>
                select your team
            </div>

            <div className='flex flex-wrap items-center justify-center gap-2'>
                {/* create new team */}
                <form className='flex flex-col p-4 border-2 border-red-600 rounded-xl w-full h-[550px] relative bg-[rgba(0,0,0,.8)] text-white'
                onSubmit={verifyFields}>
                    <div className='text-center w-full text-xl font-bold'>
                        NEW TEAM
                    </div>
                    <div className='w-full flex flex-col flex-grow text-center gap-2 mt-6 mb-6'>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="name">Name</label>
                            <input type="text" name='name' id='name' required value={form.name}
                            className='text-center px-2 py-1 rounded-md border-2 border-red-800 text-black' onChange={handleForm}/>
                        </div>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="description">Description</label>
                            <input type="text" name='description' id='description' value={form.description}
                            className='text-center px-2 py-1 rounded-md border-2 border-red-800 text-black' onChange={handleForm}/>
                        </div>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="players">Select Your Players</label>
                            <div className='w-full bg-red-500 h-40 rounded-md p-2 flex flex-col overflow-y-auto'>
                                {players.map((player)=>

                                    <><input type="checkbox" name="players" id={player['id']} /><label htmlFor="players">{player['name']}</label></>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='text-center flex flex-col gap-8'>
                        <button type="submit" className='border-2 border-red-600 py-1 px-4 rounded-lg'>
                            Create Team
                        </button>
                        <button type="button" className='border-2 border-red-600 py-1 px-4 rounded-lg'
                        onClick={cancelForm}>
                            Cancel
                        </button>
                    </div>
                    {
                        createNewTeamLegend && 
                        <button type='button' onClick={()=>setCreateNewTeamLegend(false)}
                        className='absolute top-0 left-0 w-full h-full flex flex-wrap items-center justify-center bg-black text-center text-white flex-col gap-4 font-extrabold rounded-xl'>
                            CREATE A NEW TEAM
                            <img width={30} src={circlePlusIcon} alt="circlePlus" />
                        </button>
                    }
                </form>

                {/* show all teams */}
                {teams.map( team =>
                    <button key={team['id']} onClick={ () => setContextTeam(team)}
                    >
                        <TeamCard team={team}/>
                    </button>
                )}

            </div>
        </div>
    )
}
