'use client';
import Select from 'react-select'

type Props = {
   label: string;
   options: Array<{ label: string, value: any }>
}

export default function SelectField({ label, options }: Props) {

   return (
      <div className="p-2">
         <label className="block mb-2 text-gray-600">{label}</label>
         <Select
            options={options}
         />
      </div>
   )
}