'use client';

import CheckBox from "@/components/Checkbox";
import TextField from "@/components/TextField";
import { ManagementControlProps } from ".";
import { BooleanQuestion } from "../../page";



export default function BooleanManagementControl({ selectedElement, setCurrentElement }: ManagementControlProps) {
   const tSelectedElement = selectedElement as BooleanQuestion;


   return (
      <>
         <TextField
            label="True label"
            value={tSelectedElement?.labelTrue}
            onChange={(e) => setCurrentElement({ labelTrue: e.target.value })}
         />
         <TextField
            label="False label"
            value={tSelectedElement?.labelFalse}
            onChange={(e) => setCurrentElement({ labelFalse: e.target.value })}
         />
         <div className="mt-3 ml-2">

            <CheckBox
               checked={selectedElement.isRequired}
               toggle={(checked) => setCurrentElement({ isRequired: checked })}
               label={'Es requerido'}
            />
         </div>

      </>
   )
}