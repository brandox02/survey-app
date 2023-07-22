'use client';

import { ManagementControlProps } from '@/app/backoffice/surveys/editor/[id]/accessories/ManagementControl';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { GrAddCircle } from 'react-icons/gr'
import { CheckboxGroupQuestion, RadioGroupQuestion } from '@/app/backoffice/surveys/editor/[id]/types';


interface Props extends ManagementControlProps {
   label?: string;
}

export default function Choices({ selectedElement, setCurrentElement, label = 'Opciones' }: Props) {
   const [input, setInput] = useState('')
   const tSelectedElement = selectedElement as RadioGroupQuestion | CheckboxGroupQuestion;

   const handleDragEnd = (result: any) => {
      if (!result.destination) return;
      const updatedQuestions = Array.from(tSelectedElement.choices);
      const [reorderedQuestion] = updatedQuestions.splice(result.source.index, 1);
      updatedQuestions.splice(result.destination.index, 0, reorderedQuestion);
      setCurrentElement({ choices: updatedQuestions })

   };
   const onDeleteItem = (index: number) => {
      setCurrentElement({ choices: tSelectedElement.choices.filter((_, itemIndex) => itemIndex !== index) });
   }

   function onAddItem(text: string) {
      if (text.trim()) {
         setCurrentElement({ choices: [...tSelectedElement.choices, { text, value: `${text}${Math.random() * 10000}` }] });
         setInput('');
      }
   }

   return (
      <div className="my-2">

         <span className="ml-2 font-medium">{label}</span>
         <div className="ml-2 mt-3">
            <DragDropContext onDragEnd={handleDragEnd}>
               <Droppable droppableId={`${selectedElement.name}`}>
                  {(provided) => (
                     <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tSelectedElement.choices.map((item, index) => (
                           <Draggable key={item.value} draggableId={item.value} index={index}>
                              {(provided) => (
                                 <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                 >
                                    <div key={item.value} className='border border-gray-200 px-3 py-1 flex justify-between items-center'>
                                       <div className='flex items-center gap-2 w-full'>
                                          <RxDragHandleDots2 className="cursor-grab" />
                                          <input
                                             className="outline-none hover:border py-1 border-gray-300"
                                             value={item.text}
                                             onChange={(e) => setCurrentElement({
                                                choices: tSelectedElement.choices
                                                   .map(rItem => rItem.value === item.value ?
                                                      ({
                                                         text: e.target.value,
                                                         value: rItem.value
                                                      })
                                                      : rItem
                                                   )
                                             })}
                                          />
                                       </div>
                                       <div className="cursor-pointer py-1 px-2" onClick={() => onDeleteItem(index)}>X</div>
                                    </div>
                                 </div>
                              )}
                           </Draggable>
                        ))}
                        {provided.placeholder}
                     </div>
                  )}
               </Droppable>
            </DragDropContext>
            <div className='mt-1 flex items-center gap-2 justify-between'>
               <input
                  placeholder='Agregar nueva opción (Presionar enter)'
                  className='outline-none hover:border py-1 rounded-md w-full'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={e => {
                     if (e.key === 'Enter') onAddItem(e.currentTarget.value)
                  }}
               />
               <GrAddCircle className='cursor-pointer' onClick={() => onAddItem(input)} />

            </div>
         </div>
      </div>
   )
}

