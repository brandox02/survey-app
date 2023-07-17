'use client';


import 'survey-core/defaultV2.min.css';
import ItemsSideMenu from './accessories/ItemsSideMenu';
import ManagementControl from './accessories/ManagementControl';
import TopBar from './accessories/TopBar';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import TextField from './accessories/Elements/TextField'
import { useState } from 'react';
import PreviewModal from './accessories/PreviewModal';
import RadioGroup from './accessories/Elements/RadioGroup';
import CheckboxGroup from './accessories/Elements/CheckboxGroup';
import Boolean from './accessories/Elements/Boolean';
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';

export type QuestionType = 'text' | 'comment' | 'radiogroup' | 'checkbox' | 'boolean'

interface BaseQuestion {
   name: string;
   title: string;
   type: QuestionType,
   isRequired: boolean;
}

export interface TextFieldQuestion extends BaseQuestion {

   inputType: 'text' | 'number';
}

export interface RadioGroupQuestion extends BaseQuestion {
   choices: Array<{ text: string, value: string }>
}

export interface CheckboxGroupQuestion extends BaseQuestion {

   choices: Array<{ text: string, value: string }>
}
export interface BooleanQuestion extends BaseQuestion {
   labelTrue: string;
   labelFalse: string;
}

export type QuestionElement = TextFieldQuestion | RadioGroupQuestion | CheckboxGroupQuestion | BooleanQuestion;

export type NotRequiredQuestionElement = {
   name?: string;
   title?: string;
   type?: string;
   inputType?: 'text' | 'number'
   choices?: Array<{ text: string, value: string }>;
   isRequired?: boolean;
   labelTrue?: string;
   labelFalse?: string;
}

type ItemWrapper = {
   onClick: () => void;
   children: JSX.Element;
   isSelected: boolean;
}

const ItemWrapper = ({ onClick, children, isSelected, ...restProps }: ItemWrapper) => (
   <div
      onClick={onClick}
      className={`bg-white border-2 my-2 ${isSelected ? "border-emerald-400" : 'hover:border-orange-200 border-gray-200'}`}
      {...restProps}
   >
      {children}
   </div>
)

const initialQuestions: Array<QuestionElement> = [];

export default function Editor() {
   const [questions, setQuestions] = useState(initialQuestions);
   const [selectedElementIndex, setSelectedElementIndex] = useState(-1);
   const selectedElement: QuestionElement = (questions as any)[selectedElementIndex];
   const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
   const [title, setTitle] = useState(`Nueva Encuesta ${uuid()}`);

   function setCurrentElement(newElement: NotRequiredQuestionElement) {
      if (selectedElement) {
         setQuestions(questions => questions.map((question, index) => {
            const mixed = { ...selectedElement, ...newElement } as QuestionElement;
            return index === selectedElementIndex ? mixed : question
         }))
      }
   }

   function renderItem(question: QuestionElement, index: number) {
      const obj = {
         text: <TextField
            value={questions[index]?.title || ''}
            singleLine={true}
            onChange={e => setCurrentElement({ title: e.target.value })}
         />,
         comment: <TextField
            value={questions[index]?.title || ''}
            singleLine={false}
            onChange={e => setCurrentElement({ title: e.target.value })}
         />,
         radiogroup: <RadioGroup
            value={questions[index]?.title || ''}
            onChange={e => setCurrentElement({ title: e.target.value })}
            choices={(questions[index] as RadioGroupQuestion).choices}
         />,
         checkbox: <CheckboxGroup
            value={questions[index]?.title || ''}
            onChange={e => setCurrentElement({ title: e.target.value })}
            choices={(questions[index] as RadioGroupQuestion).choices}
         />,
         boolean: <Boolean
            value={questions[index]?.title || ''}
            onChange={e => setCurrentElement({ title: e.target.value })}
            falseLabel={(questions[index] as BooleanQuestion).labelFalse}
            trueLabel={(questions[index] as BooleanQuestion).labelTrue}
         />
      }

      return (obj as any)[question.type]
   }

   function onSelectItem(index: number) {
      setSelectedElementIndex(index);
   }

   const handleDragEnd = (result: any) => {
      console.log('klk', result)
      if (!result.destination) return;
      const updatedQuestions = Array.from(questions);
      const [reorderedQuestion] = updatedQuestions.splice(result.source.index, 1);
      updatedQuestions.splice(result.destination.index, 0, reorderedQuestion);
      setQuestions(updatedQuestions);

   };

   function addNewElement(type: QuestionType) {
      const id = uuid();
      const obj = {
         'text': {
            name: id,
            title: `Single Line Text Field`,
            type: "text",
            inputType: 'text',
            isRequired: true

         },
         'comment': {
            name: id,
            title: `Multi Line text Field`,
            type: "comment",
            inputType: 'text',
            isRequired: true
         },
         'radiogroup': {
            name: id,
            title: `Radio Group Field`,
            type: "radiogroup",
            choices: [],
            isRequired: true
         },
         'checkbox': {
            name: id,
            title: `Checkbox Field`,
            type: "checkbox",
            choices: [],
            isRequired: true
         },
         'boolean': {
            name: id,
            title: `Boolean Field`,
            type: "boolean",
            labelTrue: 'Sí',
            labelFalse: 'No',
            isRequired: true
         },
      }

      let newItem = (obj as any)[type];

      if (!newItem) {
         toast.error('No se pudo agregar el elemento');
      }
      setQuestions(questions => ([...questions, newItem]));
   }

   function onDeleteCurrentElement() {
      if (selectedElementIndex === -1) {
         toast.error('Debes seleccionar un elemento');
      }
      setQuestions(questions => questions.filter((_, index) => index !== selectedElementIndex));
      setSelectedElementIndex(-1);
   }

   // const [items, setItems] = useState([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }, { id: 4, name: 'd' }]);
   return (
      <div className="h-full w-full relative overflow-hidden">
         <TopBar onClickPreview={() => setIsOpenPreviewModal(true)} title={title} setTitle={setTitle} />
         <PreviewModal close={() => setIsOpenPreviewModal(false)} isOpen={isOpenPreviewModal} questions={questions} />

         <div className='flex justify-between border relative bg-gray-100 h-full w-full overflow-auto pb-20'>
            <ItemsSideMenu onAddNewItem={addNewElement} />
            <div className='w-7/12 p-20 flex flex-col gap-3 overflow-auto'>
               <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId={`mezclando`}>
                     {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                           {questions.map((item, index) => (
                              <Draggable key={item.name} draggableId={item.name} index={index}>
                                 {(provided) => (
                                    <div
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                    >
                                       <ItemWrapper
                                          key={item.name}
                                          onClick={() => onSelectItem(index)}
                                          isSelected={index === selectedElementIndex}
                                       >
                                          {renderItem(item, index)}
                                       </ItemWrapper>
                                    </div>

                                 )}
                              </Draggable>
                           ))}
                           {provided.placeholder}
                        </div>
                     )}
                  </Droppable>
               </DragDropContext>
            </div>
            <ManagementControl {...{ selectedElement, setCurrentElement }} onDeleteCurrentElement={onDeleteCurrentElement} />
         </div>
      </div>
   )
}