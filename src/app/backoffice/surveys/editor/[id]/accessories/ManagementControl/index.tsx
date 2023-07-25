'use client';

import TextField from "@/components/TextField";
import { Button } from "@mantine/core";
import { NotRequiredQuestionElement, QuestionElement } from "../../types";
import BooleanManagementControl from "./BooleanManagementControl";
import CheckboxGroupManagementControl from "./CheckboxGroupManagementControl";
import CommentManagementControl from "./CommentManagementControl";
import ImageSelectManagementControl from "./ImageSelectManagementControl";
import RadioGroupManagementControl from "./RadioGroupManagementControl";
import TextFieldManagementControl from "./TextFieldManagementControl";

export interface ManagementControlProps {
   selectedElement: QuestionElement
   setCurrentElement: (newElement: NotRequiredQuestionElement) => void
   onDeleteCurrentElement?: () => void
}

export default function ManagementControl({ selectedElement, setCurrentElement, onDeleteCurrentElement }: ManagementControlProps) {
   function getManagementControl() {
      if (selectedElement) {
         const props = { selectedElement, setCurrentElement, onDeleteCurrentElement }
         const obj = {
            text: <TextFieldManagementControl {...props} />,
            comment: <CommentManagementControl {...props} />,
            radiogroup: <RadioGroupManagementControl {...props} />,
            checkbox: <CheckboxGroupManagementControl {...props} />,
            boolean: <BooleanManagementControl {...props} />,
            imagepicker: <ImageSelectManagementControl {...props} />,
         }
         return (obj as any)[selectedElement.type]
      }
   }
   return (
      <div className='border w-4/12 bg-white '>
         <div className='mt-3 font-bold text-lg text-center'>Configuración</div>
         <div className=' px-10'>
            <TextField
               label="Elemento"
               value={selectedElement?.type || ''} disabled onChange={() => { }}
            />

            {/* <TextField label="Nombre" value={selectedElement?.name || ''} onChange={(event) => setCurrentElement({ name: event.target.value })} disabled /> */}
            <TextField
               label="Titulo"
               value={selectedElement?.title || ''}
               onChange={(event) => setCurrentElement({ title: event.target.value })}
            />
            {getManagementControl()}
            <Button
               className="mt-20" onClick={onDeleteCurrentElement} color='red' fullWidth>
               Eliminar este elemento
            </Button>
         </div>
      </div>
   )
}