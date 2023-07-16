'use client';


import 'survey-core/defaultV2.min.css';
import ItemsSideMenu from './accessories/ItemsSideMenu';
import ManagementControl from './accessories/ManagementControl';
import TopBar from './accessories/TopBar';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import TextField from './accessories/Elements/TextField'
import { useState } from 'react';
import PreviewModal from './accessories/PreviewModal';



export type TextFieldQuestion = {
   name: string;
   title: string;
   type: string;
   inputType: 'text' | 'number'
}

export type QuestionElement = TextFieldQuestion;

export type NotRequiredQuestionElement = {
   name?: string;
   title?: string;
   type?: string;
   inputType?: 'text' | 'number'
}

type ItemWrapper = {
   onClick: () => void;
   children: JSX.Element;
   isSelected: boolean;
}

const ItemWrapper = ({ onClick, children, isSelected }: ItemWrapper) => (
   <div onClick={onClick} className={`bg-white border-2  ${isSelected ? "border-emerald-400" : 'hover:border-orange-200 border-gray-200'}`}>
      {children}
   </div>
)

const initialQuestions: Array<QuestionElement> = [
   {
      name: "FirstName",
      title: "Enter your first name:",
      type: "text",
      inputType: 'text'
   }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text",
      inputType: 'text'
   },
   {
      name: "LastName",
      title: "Enter your last name:",
      type: "text",
      inputType: 'text'
   }
]

export default function Editor() {
   const [questions, setQuestions] = useState(initialQuestions);
   const [selectedElementIndex, setSelectedElementIndex] = useState(-1);
   const selectedElement: QuestionElement = (questions as any).at(selectedElementIndex);

   const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);

   function setCurrentElement(newElement: NotRequiredQuestionElement) {
      setQuestions(questions => questions.map((question, index) => index === selectedElementIndex ? { ...selectedElement, ...newElement } : question))
   }

   function renderItem(question: QuestionElement, index: number) {
      const obj = {
         text: <TextField
            value={questions.at(index)?.title || ''}
            singleLine={true}
            onChange={e => setCurrentElement({ title: e.target.value })}
         />,
         comment: <TextField
            value={questions.at(index)?.title || ''}
            singleLine={false}
            onChange={e => setCurrentElement({ title: e.target.value })}
         />,
      }

      return (obj as any)[question.type]
   }

   function onSelectItem(index: number) {
      setSelectedElementIndex(index);
   }


   // const handleDragEnd = (result: any) => {
   //    if (!result.destination) return;

   //    const updatedQuestions = Array.from(questions.elements);
   //    const [reorderedQuestion] = updatedQuestions.splice(result.source.index, 1);
   //    updatedQuestions.splice(result.destination.index, 0, reorderedQuestion);

   //    setQuestions(surveyElement => ({ ...surveyElement, elements: updatedQuestions }));
   // };
   // const [items, setItems] = useState([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }, { id: 4, name: 'd' }]);

   return (
      <div className=" h-full w-full">
         <TopBar onClickPreview={() => setIsOpenPreviewModal(true)} />
         <PreviewModal close={() => setIsOpenPreviewModal(false)} isOpen={isOpenPreviewModal} questions={questions} />

         <div className='flex justify-between border relative bg-gray-100 h-full w-full'>
            <ItemsSideMenu />
            <div className='w-6/12 p-10 flex flex-col gap-3'>
               {questions.map((question, index) => (
                  <ItemWrapper
                     key={question.name}
                     onClick={() => onSelectItem(index)}
                     isSelected={index === selectedElementIndex}
                  >{renderItem(question, index)}
                  </ItemWrapper>
               ))}
               {/* <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="survey-questions">
                     {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                           {questions.elements.map((question, index) => (
                              <Draggable key={question.name} draggableId={question.name} index={index}>
                                 {(provided) => (
                                    <div
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                    >
                                       {renderItem(question)}
                                    </div>
                                 )}
                              </Draggable>
                           ))}
                           {provided.placeholder}
                        </div>
                     )}
                  </Droppable>
               </DragDropContext> */}
            </div>
            <ManagementControl {...{ selectedElement, setCurrentElement }} />
         </div>
      </div>
   )
}