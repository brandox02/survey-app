import { ChangeEvent } from "react";

interface Choice {
   text: string;
   value: string
}

export interface RadioGroupProps {
   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
   value: string;
   choices: Array<Choice>
}

export default function RadioGroup({ onChange, value, choices }: RadioGroupProps) {
   return (
      <div className={`flex flex-col gap-3 p-8`}>
         <div className="flex justify-between">
            <input
               className="outline-none hover:border font-medium py-1 border-gray-300  w-9/12"
               value={value}
               onChange={onChange}
            />
            <span className="text-emerald-500 font-medium">{'Radio Group'}</span>
         </div>

         {(choices || []).map(item => (
            <div key={item.value} className='flex gap-2'>
               <input type={'radio'} disabled />
               <span>{item.text}</span>
            </div>
         ))}
      </div>

   )
}