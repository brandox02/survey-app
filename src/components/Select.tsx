'use client';
import Select, { SingleValue } from 'react-select'

type Item = { label: string, value: any }

type Props = {
   label: string;
   options: Array<Item>
   value: Item
   onChange: (x: SingleValue<Item>) => void
}

export default function SelectField({ label, options, value, onChange }: Props) {
   return (
      <div className="p-2">
         <label className="block mb-2 text-gray-600">{label}</label>
         <Select
            options={options}
            value={value}
            onChange={onChange}
         />
      </div>
   )
}