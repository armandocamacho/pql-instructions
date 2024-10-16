import React, { createContext } from 'react';

export type teamType = {
    id:number,
    name:string,
    slogan:string
}

type TeamSelectedContextType = {
    contextTeam: teamType | null,
    setContextTeam: React.Dispatch<React.SetStateAction<teamType | null>>
  }
  
  const iTeamSelectedContextState = {
    contextTeam: null,
    setContextTeam: () => {}
  }
  
  
  export const TeamSelectedContext = createContext<TeamSelectedContextType>(iTeamSelectedContextState);
  