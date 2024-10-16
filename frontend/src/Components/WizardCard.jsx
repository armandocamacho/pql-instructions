import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className='flex flex-col justify-center items-center p-4 transition ease-in-out duration-300 mt-8 text-center'>
            <div className='flex flex-wrap items-center justify-center max-w-[100px]'>
              <img src={`assets/${item.position}.png`} alt={item.position} className='max-w-full max-h-full animate-bounce'/>
            </div>
            <div className='text-2xl md:text-4xl lg:text-5xl font-thin font-harry'>
              {item.name}
            </div>
            <div className='text-sm lg:text-xl font-semibold'>
              {item.position}
            </div>
            <div className='text-xs lg:text-sm italic'>
              {item.age} years old
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>
