'use client';

import SelectField from "@/components/Select";
import TextField from "@/components/TextField";
import { NotRequiredQuestionElement, QuestionElement } from "../../page";



interface Props {
   selectedElement: QuestionElement
   setCurrentElement: (newElement: NotRequiredQuestionElement) => void
}

export default function ManagementControl({ selectedElement, setCurrentElement }: Props) {
   function getTypeValue() {
      const obj = {
         text: { label: 'texto', 'value': 'text' },
         number: { label: 'número', value: 'number' }
      }
      return obj[selectedElement.inputType] || { label: '', value: '' }
   }
   return (
      <div className='border w-4/12 bg-white '>
         <div className='mt-5 font-bold text-lg text-center'>Configuración</div>
         <div className='mt-10 px-10'>
            <TextField label="Titulo" value={selectedElement?.title} onChange={(event) => setCurrentElement({ title: event.target.value })} />
            <TextField label="Nombre" value={selectedElement?.name} onChange={(event) => setCurrentElement({ name: event.target.value })} />
            <SelectField
               label='Tipo'
               options={[{ label: 'texto', 'value': 'text' }, { label: 'número', value: 'number' }]}
               value={getTypeValue()}
               onChange={e => setCurrentElement({ inputType: e?.value })}
            />
         </div>
      </div>
   )
}