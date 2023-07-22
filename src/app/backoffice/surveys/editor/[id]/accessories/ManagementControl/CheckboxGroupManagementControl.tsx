'use client';

import { ManagementControlProps } from ".";
import Choices from "@/components/Choices";
import CheckBox from "@/components/Checkbox";


export default function CheckboxGroupManagementControl({ selectedElement, setCurrentElement }: ManagementControlProps) {

   return (
      <div className="">
         <Choices {...{ selectedElement, setCurrentElement, }} />
         <div className="ml-2 mt-5">
            <CheckBox
               checked={selectedElement.isRequired}
               toggle={(checked) => setCurrentElement({ isRequired: checked })}
               label={'Es requerido'}
            />
         </div>
      </div>
   )
}