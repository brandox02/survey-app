'use client';

import CheckBox from "@/components/Checkbox";
import { ManagementControlProps } from ".";


export default function CommentManagementControl({ selectedElement, setCurrentElement }: ManagementControlProps) {

   return (
      <>
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