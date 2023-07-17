'use client';

import TextField from "@/components/TextField";
import { NotRequiredQuestionElement, QuestionElement } from "../../page";
import CheckboxGroupManagementControl from "./CheckboxGroupManagementControl";
import CommentManagementControl from "./CommentManagementControl";
import RadioGroupManagementControl from "./RadioGroupManagementControl";
import TextFieldManagementControl from "./TextFieldManagementControl";

export interface ManagementControlProps {
   selectedElement: QuestionElement
   setCurrentElement: (newElement: NotRequiredQuestionElement) => void
}

export default function ManagementControl({ selectedElement, setCurrentElement }: ManagementControlProps) {
   function getManagementControl() {
      if (selectedElement) {
         const props = { selectedElement, setCurrentElement }
         const obj = {
            text: <TextFieldManagementControl {...props} />,
            comment: <CommentManagementControl {...props} />,
            radiogroup: <RadioGroupManagementControl {...props} />,
            checkbox: <CheckboxGroupManagementControl {...props} />,
         }
         return (obj as any)[selectedElement.type]
      }
   }
   return (
      <div className='border w-4/12 bg-white '>
         <div className='mt-5 font-bold text-lg text-center'>Configuración</div>
         <div className='mt-10 px-10'>
            <TextField
               label="Elemento"
               value={selectedElement?.type} disabled onChange={() => { }}
            />
            <TextField
               label="Titulo"
               value={selectedElement?.title}
               onChange={(event) => setCurrentElement({ title: event.target.value })}
            />
            {/* <TextField label="Nombre" value={selectedElement?.name} onChange={(event) => setCurrentElement({ name: event.target.value })} disabled={true} /> */}
            {getManagementControl()}
         </div>
      </div>
   )
}