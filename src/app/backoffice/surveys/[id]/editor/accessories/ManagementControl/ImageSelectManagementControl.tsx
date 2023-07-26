'use client';

import { ManagementControlProps } from ".";
import Choices from "@/components/Choices";
import CheckBox from "@/components/Checkbox";
import TextField from "@/components/TextField";
import { ImageSelectQuestion } from "../../types";


export default function ImageSelectManagementControl({ selectedElement, setCurrentElement }: ManagementControlProps) {
   const tSelectedElement = selectedElement as ImageSelectQuestion
   return (
      <div className="">
         <TextField
            type="number"
            label="Ancho de la Imagen (px)"
            value={tSelectedElement.imageWidth || 0}
            onChange={(event) => setCurrentElement({ imageWidth: parseInt(event.target.value || '') })}
         />
         {/* <TextField
            type="number"
            label="Altura de la Imagen"
            value={tSelectedElement.imageHeight || 0}
            onChange={(event) => setCurrentElement({ imageHeight: parseInt(event.target.value || '') })}
         /> */}
         <Choices
            {...{ selectedElement, setCurrentElement }}
            onAddNewItem={(text) => ({
               text,
               value: `${text}${Math.random() * 10000}`,
               imageLink: null
            })
            }
         />
         <div className="ml-2 mt-5">
            <CheckBox
               checked={selectedElement.isRequired}
               toggle={(checked) => setCurrentElement({ isRequired: checked })}
               label={'Es requerido'}
            />
            <CheckBox
               checked={tSelectedElement.multiSelect}
               toggle={(checked) => setCurrentElement({ multiSelect: checked })}
               label={'Multi Selección'}
            />
         </div>
      </div>
   )
}