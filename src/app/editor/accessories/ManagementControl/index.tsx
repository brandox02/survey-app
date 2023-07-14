'use client';

import SelectField from "@/components/Select";
import TextField from "@/components/TextField";





export default function ManagementControl() {

   return (
      <div className='border w-5/12 bg-white '>
         <div className='mt-5 font-bold text-lg text-center'>Configuración</div>
         <div className='mt-10 px-10'>
            <TextField label="Titulo" />
            <TextField label="Nombre" />
            <SelectField label='Tipo' options={[{ label: 'texto', 'value': 'texto' }, { label: 'número', value: 'número' }]} />
         </div>
      </div>
   )
}