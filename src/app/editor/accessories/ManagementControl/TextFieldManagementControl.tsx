'use client';

import CheckBox from "@/components/Checkbox";
import SelectField from "@/components/Select";
import { ManagementControlProps } from ".";
import { TextFieldQuestion } from "../../page";



export default function TextFieldManagementControl({ selectedElement, setCurrentElement }: ManagementControlProps) {
   const tSelectedElement = selectedElement as TextFieldQuestion;
   function getTypeValue() {
      if (selectedElement) {
         const obj = {
            text: { label: 'texto', 'value': 'text' },
            number: { label: 'número', value: 'number' }
         }
         return obj[tSelectedElement.inputType] || { label: '', value: '' }
      }
      return { label: '', value: '' }
   }

   return (
      <>
         <SelectField
            label='Tipo'
            options={[{ label: 'texto', 'value': 'text' }, { label: 'número', value: 'number' }]}
            value={getTypeValue()}
            onChange={e => setCurrentElement({ inputType: e?.value })}
         />
         <div className="ml-2 mt-3">
            <CheckBox
               checked={selectedElement.type === 'comment'}
               toggle={(checked) => setCurrentElement({ type: checked ? 'comment' : 'text' })}
               label={'Multi-Linea'}
            />
            <CheckBox
               checked={selectedElement.isRequired}
               toggle={(checked) => setCurrentElement({ isRequired: checked })}
               label={'Es requerido'}
            />
         </div>
      </>
   )
}