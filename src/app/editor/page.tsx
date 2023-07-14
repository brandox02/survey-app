'use client';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { DragDropContext } from 'react-beautiful-dnd';
import 'survey-core/defaultV2.min.css';
import ItemsSideMenu from './accessories/ItemsSideMenu';
import ManagementControl from './accessories/ManagementControl';
import TopBar from './accessories/TopBar';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
// import './s.css'

const surveyJson = {
   elements: [
      {
         name: "FirstName",
         title: "Enter your first name:",
         type: "text"
      }, {
         name: "LastName",
         title: "Enter your last name:",
         type: "text"
      }
   ]
};



export default function Editor() {
   const survey = new Model(surveyJson);
   survey.onComplete.add((data) => {
      console.log(data.data);
   });

   // survey.onUpdateQuestionCssClasses.add(function (_, options) {
   //    const classes = options.cssClasses;
   //    console.log({ classes, _, options });
   //    // classes.mainRoot += " border-2 border-t-orange-400";
   //    classes.mainRoot += " mt-20";
   //    options.question.name
   //    // classes.flowRoot += " border border-yellow-500";
   //    // if (options.question.getType() === "text") {
   //    //    classes.mainRoot += " bg-yellow-500";
   //    // }
   // });
   const [items, setItems] = useState([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }, { id: 4, name: 'd' }]);


   return (
      <div className=" h-full w-full">
         <TopBar />
         <div className='flex justify-between border relative bg-gray-100 h-full w-full'>
            <ItemsSideMenu />
            {/* <Survey model={survey} /> */}
            <DragDropContext
               onDragEnd={(result: any) => {
                  const items2 = Array.from(items);
                  const [reorderedItem] = items2.splice(result.source.index, 1);
                  items2.splice(result.destination.index, 0, reorderedItem);
                  setItems(items2);
               }}
            >
               <Droppable droppableId="characters">
                  {(provided) => (
                     <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map(({ id, name }, index) => (
                           <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
                              {(provided) => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='border px-10 py-1 my-2 bg-green-300 rounded cursor-pointer'>{name}</div>}
                           </Draggable>
                        ))}
                        {provided.placeholder}
                     </ul>
                  )}
               </Droppable>
            </DragDropContext>
            <ManagementControl />
         </div>
      </div>
   )
}