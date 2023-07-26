'use client';

import { ManagementControlProps } from '@/app/backoffice/surveys/[id]/editor/[id]/accessories/ManagementControl';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { GrAddCircle } from 'react-icons/gr'
import { FaImage } from 'react-icons/fa'

import { CheckboxGroupQuestion, ImageSelectQuestion, RadioGroupQuestion } from '@/app/backoffice/surveys/[id]/editor/[id]/types';
import { ImagePicker } from '../image-picker';
import { Item } from './Item';
import Modal from '../Modal';
import { RxDragHandleDots2 } from 'react-icons/rx';


interface Props extends ManagementControlProps {
   label?: string;
   onAddNewItem?: (text: string) => any;
}

export default function Choices({
   selectedElement, setCurrentElement,
   label = 'Opciones',
   onAddNewItem = (text: string) => ({ text, value: `${text}${Math.random() * 10000}` })
}: Props) {
   const [imageOpen, setImageOpen] = useState<any>(false);
   const [indexItemSelectedToAssignImage, setIndexItemSelectedToAssignImage] = useState<null | number>();
   const [input, setInput] = useState('')
   const tSelectedElement = selectedElement as RadioGroupQuestion | CheckboxGroupQuestion | ImageSelectQuestion;

   const handleDragEnd = (result: any) => {
      if (!result.destination) return;
      const updatedQuestions = Array.from(tSelectedElement.choices);
      const [reorderedQuestion] = updatedQuestions.splice(result.source.index, 1);
      updatedQuestions.splice(result.destination.index, 0, reorderedQuestion);
      setCurrentElement({ choices: updatedQuestions })

   };

   const onDeleteItem = (index: number) => {
      setCurrentElement({ choices: tSelectedElement.choices.filter((_: any, itemIndex: number) => itemIndex !== index) });
   }

   function onAddItem(text: string) {
      if (text.trim()) {
         setCurrentElement({
            choices: [onAddNewItem(text), ...tSelectedElement.choices,]
         });
         setInput('');
      }
   }

   const listIsNotEmpty = !!tSelectedElement.choices.length;

   const choiceSelected = (tSelectedElement.choices[indexItemSelectedToAssignImage as any] as any);
   return (
      <div className="my-2">
         <Modal
            title={`Selección de imagen ${tSelectedElement.choices[indexItemSelectedToAssignImage as any]?.text}`}
            isOpen={imageOpen}
            onClose={() => setImageOpen(false)}
         >
            <ImagePicker
               image={choiceSelected?.base64Image || choiceSelected?.imageLink}
               setImage={(image) => setCurrentElement({
                  choices:
                     tSelectedElement
                        .choices
                        .map((item: any, index: number) =>
                           index === indexItemSelectedToAssignImage
                              ? ({ ...item, base64Image: image })
                              : item)
               })}
               onLoad={() => { }}
            />
         </Modal>
         <span className="ml-2 font-medium">{label}</span>
         <div className='mt-1 ml-2 flex items-center gap-2 justify-between'>
            <input
               placeholder='Agregar nueva opción (Presionar enter)'
               className='outline-none hover:border py-1 rounded-md w-full '
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={e => {
                  if (e.key === 'Enter') onAddItem(e.currentTarget.value)
               }}
            />
            <GrAddCircle className='cursor-pointer' onClick={() => onAddItem(input)} />

         </div>
         <div className={`ml-2 mt-3 h-44 overflow-auto ${listIsNotEmpty ? '' : 'flex items-center justify-center'}`}>
            {listIsNotEmpty ? (
               <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId={`${selectedElement.name}`}>
                     {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                           {tSelectedElement.choices.map(({ text, value }: any, index: number) => (
                              <Draggable key={value} draggableId={value} index={index}>
                                 {(provided) => (
                                    <div
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                    >
                                       <div key={value} className='border border-gray-200 px-3 py-1 flex justify-between items-center'>
                                          <div className='flex items-center gap-2 w-full'>
                                             <RxDragHandleDots2 className="cursor-grab" />
                                             {choiceSelected?.type === 'imagepicker' && (
                                                <FaImage
                                                   className='cursor-pointer'
                                                   onClick={() => {
                                                      setIndexItemSelectedToAssignImage(index);
                                                      setImageOpen(true);
                                                   }}
                                                />
                                             )}
                                             <input
                                                className="outline-none hover:border py-1 border-gray-300"
                                                value={text}
                                                onChange={(e) => setCurrentElement({
                                                   choices: tSelectedElement.choices
                                                      .map((rItem: any) => rItem.value === value ?
                                                         ({
                                                            ...rItem,
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
            ) : 'No hay opciones'}
         </div>

      </div>
   )
}

