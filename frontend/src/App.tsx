import React, { useEffect, useState } from 'react';
import './App.css';
import {TeamSelectedContext} from './Contexts/TeamSelectedContext';
import {PlayersArrayContext, playerType} from './Contexts/PlayersArrayContext';
import Wizards from './Components/Wizards';
import {teamType} from './Contexts/TeamSelectedContext'
import FormCreateTeam from './Components/FormCreateTeam';
import closeIcon from './icons/close-white.svg'
import SelectedTeam from './Components/SelectedTeam';
import FormEditTeam from './Components/FormEditTeam';
import IntroModal from './Components/Elements/IntroModal';

export default function App() {
  const [contextTeam, setContextTeam] = useState<teamType | null>(null);
  const [contextPlayers, setContextPlayers] = useState< playerType | null>(null);
  const [updateControl, setUpdateControl] = useState(false)
  const [teams, setTeams] = useState([])
  const [createTeam, setCreateTeam] = useState(false)
  const [isIntroShowed, setIsIntroShowed] = useState(true)

  useEffect(() => {
      fetch("http://localhost:3001/api/teams", {
          method: "GET",
      })
      .then((res) => {
          return res.json();
      })
      .then((data) => {
          setTeams(data)
      })
      .catch((error)=>{
        console.log(error)
      });
  }, [createTeam,updateControl])

  const confirmMessage = (team: never) => {
    if (window.confirm('You are about to erase the Team "'+team['name']+'". Do you want to continue?')){
      eraseTeam(team);
    }
  }

  const eraseTeam = (team:never) => {
    //Search all player and filter according to team id
    let filteredPlayers:any = [];
    fetch("http://localhost:3001/api/players", {
      method: "GET",
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      filteredPlayers = [...data].filter(e => e.team_id === team['id']);
    })
    .then(()=>{
      // update each player to modify the team to null
      filteredPlayers.map((player:any)=>{
        fetch("http://localhost:3001/api/players/"+player["id"], {
          method: "PUT",
          body: JSON.stringify({ 
            id: player['id'],
            name: player['name'],
            age: player['age'],
            position: player['position'],
            team_id: null
          }),
          headers: {
              "Content-Type": "application/json",
          },
        })
        .then(()=>{
          setUpdateControl(!updateControl)
        })
        .catch((error)=>{
          alert("There was an error");
          console.log(error)
        });  
      })
    })
    .then(()=>{
      fetch("http://localhost:3001/api/teams/"+team["id"], {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
      })
      .then(()=>{
        setContextTeam(null)
      })
      .catch((error)=>{
        console.log(error)
        alert("There was an error");
      });
    })
    .catch((error)=>{
      alert("There was an error");
      console.log(error)
    });
  }

  return (
    <div className='relative flex w-full h-screen overflow-auto bg-QBG bg-no-repeat animate-bgAnimation bg-cover lg:bg-[length:110%_110%] '>
      <TeamSelectedContext.Provider value={{contextTeam,setContextTeam}}>
      <PlayersArrayContext.Provider value={{contextPlayers,setContextPlayers}}>

        {
          isIntroShowed
          ? <IntroModal setIsIntroShowed={setIsIntroShowed}/>
          : <>
              <div className='bg-[rgba(0,0,0,.7)] flex flex-col w-[30%] lg:w-[20%] h-full border-r-4 border-gray-400'>

                  {/* Information about current team selected*/}
                  <div className='w-full flex flex-wrap items-start justify-center px-2 border-b-2 border-gray-400 py-2 lg:py-6'>
                    <SelectedTeam/>
                  </div>

                  {/* Section for new team creation*/}
                  <div className={`w-full flex flex-col items-start justify-center px-2 py-2 md:py-6 ${createTeam?'w-full':'w-1/4'}`}>
                      {
                        contextTeam === null
                        ? <>
                            <div className='w-full text-center text-white text-sm lg:text-lg font-bold'>
                              Create a New Team
                            </div>
                            <div className='w-full mt-2 flex-grow flex flex-wrap items-center justify-center'>
                              {
                                createTeam
                                ? <FormCreateTeam teams={teams} setCreateTeam={setCreateTeam}/>
                                : <button type='button' onClick={()=>{setContextTeam(null);setCreateTeam(true)}} 
                                  className='text-white border-2 border-white rounded-lg bg-red-700 py-1 px-2 lg:px-6 font-bold text-[12px]'>
                                    Create New Team
                                  </button>
                              }
                            </div>
                          </>
                        : <FormEditTeam teams={teams} updateControl={updateControl} setUpdateControl={setUpdateControl}/>
                      }
                  </div>

                  {/* Choose team section */}
                  {
                    !createTeam && 
                    <div className='w-full flex flex-grow flex-col items-start justify-start px-2 py-2 md:py-6 border-t-2 border-gray-400 overflow-y-auto'>
                      <div className='w-full text-center text-white text-sm lg:text-lg font-bold'>
                        Choose Your Team
                      </div>
                      <div className='w-full mt-2 flex flex-wrap items-center justify-center gap-8'>
                        {teams.map((team) =>
                          <div key={team['id']} className='flex flex-col'>
                            <button type='button' onClick={()=>setContextTeam(team)} 
                            className='relative w-20 h-20 lg:h-32 lg:w-32 text-white rounded-lg flex flex-wrap items-center justify-center p-2 gap-4 text-2xl lg:text-4xl font-harry'>
                              <img src="assets/howards2.png" alt="howards" className='absolute top-0 left-0 w-full h-full'/>
                              <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] flex flex-wrap items-center justify-center rounded-xl'>
                                {team['name']}
                              </div>
                            </button>
                            <div className='flex items-center justify-center'>
                              <button type='button' onClick={()=>confirmMessage(team)}>
                                <img src={closeIcon} alt="closeIcon" className='w-6'/>
                              </button>
                            </div>
                          </div> 
                        )}
                      </div>
                    </div>
                  }

              </div>

              {/* Main Contain */}
              <div className='flex-grow overflow-y-auto h-full'>
              {
                contextTeam !== null || createTeam
                ? <Wizards/>
                : <div className='text-2xl lg:text-4xl text-white font-bold h-full w-full flex items-center justify-center text-center uppercase bg-[rgba(0,0,0,.5)] font-harry'>
                  THERE IS NOT A SELECTED TEAM,<br /> PLEASE CHOOSE ONE TEAM <br /> OR <br /> CREATE A NEW ONE
                  </div>
              }
              </div>
            </>
        }
      </PlayersArrayContext.Provider>
      </TeamSelectedContext.Provider>
    </div>
  );
}

