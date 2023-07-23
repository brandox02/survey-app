'use client';
import Select, { SingleValue } from 'react-select'

type Item = { label: string, value: any }

type Props = {
   label: string;
   options: Array<Item>
   value: Item
   onChange: (x: SingleValue<Item>) => void
   isLoading?: boolean;
   placeholder?: string;
}

export default function SelectField({ label, options, value, onChange, isLoading = false, placeholder = 'Selecciona' }: Props) {
   return (
      <div className="p-2">
         <label className="block mb-2 text-gray-600">{label}</label>
         <Select
            options={options}
            value={value}
            onChange={onChange}
            isLoading={isLoading}
            isClearable
            placeholder={placeholder}
         />
      </div>
   )
}