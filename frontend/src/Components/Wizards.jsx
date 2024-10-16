import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import WizardCard from './WizardCard';
import { TeamSelectedContext } from '../Contexts/TeamSelectedContext';
import { PlayersArrayContext } from '../Contexts/PlayersArrayContext';

export default function Wizards(){
    const {contextTeam} = useContext(TeamSelectedContext)
    const {setContextPlayers} = useContext(PlayersArrayContext)

    // const [infoLoaded, setInfoLoaded] = useState(false)

    const [columns, setColumns] = useState({
      "current": {
        title: 'Wizards on this Team',
        items: [],
      },
      "available": {
        title: 'Available Wizards',
        items: [],
      },    
    });

    useEffect(() => {
        fetch("http://localhost:3001/api/players", {
          method: "GET",
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
          const available = [...data].filter(e => e.team_id === null);
          let current = [];
          if (contextTeam!==null) {
            current = [...data].filter(e => e.team_id === contextTeam.id);
          }
          setColumns({...columns,
            current : {...columns.current , items : current} , 
            available : {...columns.available , items : available} })
        })      
    }, [contextTeam])

    // useEffect(() => {
    //     setInfoLoaded(false)
    //     fetch("http://localhost:3001/api/players/available", {
    //         method: "GET",
    //     })
    //     .then((res) => {
    //         return res.json();
    //     })
    //     .then((data) => {
    //         setColumns({...columns,  available : {...columns.available , items : data} });
    //     })
    //     .finally(()=>{
    //       setInfoLoaded(true);
    //     })
    // }, [contextTeam])
    
    // useEffect(() => {
    //   if (contextTeam!==null) {
    //     fetch("http://localhost:3001/api/players", {
    //       method: "GET",
    //     })
    //     .then((res) => {
    //         return res.json();
    //       })
    //     .then((data) => {
    //       const filteredData = [...data].filter(e => e.team_id === contextTeam.id);
    //       setColumns({...columns,  current : {...columns.current , items : filteredData} })
    //     })      
    //   } else {
    //     setColumns({...columns,  current : {...columns.current , items : []} })
    //   }
    // }, [infoLoaded])

  const onDragEnd = async (result, columns, setColumns) => {
    console.log("drag end")
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      const array = {
        [source.droppableId]:sourceItems,
        [destination.droppableId]:destItems
      }
      if (contextTeam !== null) {
        let player_data = null;
        let team_id = null;
        if (destination.droppableId === 'available') {
          array.available.map((element)=>{
            if (element.team_id !== null) {
              player_data = element;
              return true;
            }
            return false;
          })
        } else {
          team_id = contextTeam.id;
          array.current.map((element)=>{
            if (element.team_id === null) {
              player_data = element;
              return true;
            }
            return false
          })
        }
        fetch("http://localhost:3001/api/players/"+player_data["id"], {
          method: "PUT",
          body: JSON.stringify({ 
            id: player_data['id'],
            name: player_data['name'],
            age: player_data['age'],
            position: player_data['position'],
            team_id: team_id
          }),
          headers: {
              "Content-Type": "application/json",
          },
        })
        .catch((error)=>{
          alert("There was an error");
          console.log(error)
        });
      }
      setContextPlayers(array);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <DragDropContext
      onDragStart={()=>console.log("drag started")}
      onDragUpdate={()=>console.log("drag update")}
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className='flex'>
        <div className='flex w-full justify-around'>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div className='flex flex-col bg-[rgba(255,255,255,.6)] p-4 w-[48%] lg:w-[40%] xl:w-[30%] h-screen overflow-y-auto'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {/* Title */}
                    <div className='text-red-900 border-2 border-red-900 bg-red-500 text-center py-1 px-2 lg:px-6 self-center rounded-md text-sm lg:text-xl font-bold'>
                      {column.title}
                    </div>
                    <div>
                      {column.items.map((item, index) =>
                        <WizardCard key={item.id} item={item} index={index} />
                      )}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  )
}
