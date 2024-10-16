import React, { createContext } from 'react';

export type playerType = {
  current : Array<{
    id:number,
    name:string,
    age:number,
    postion:string,
    team_id:null|Array<number>
  }>,
  available: Array<{
    id:number,
    name:string,
    age:number,
    postion:string,
    team_id:null|Array<number>
  }>
}

type PlayersArrayContext = {
    contextPlayers: playerType | null,
    setContextPlayers: React.Dispatch<React.SetStateAction< playerType | null>>
  }
  
  const iPlayersArrayContextState = {
    contextPlayers: null,
    setContextPlayers: () => {}
  }
  
  
  export const PlayersArrayContext = createContext<PlayersArrayContext>(iPlayersArrayContextState);
  