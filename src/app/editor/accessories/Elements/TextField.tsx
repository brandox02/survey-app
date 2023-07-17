import { ChangeEvent } from "react";

export interface TextField {
   singleLine: boolean;
   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
   value: string;
}

export default function TextField({ singleLine, onChange, value }: TextField) {
   return (
      <div className={`flex flex-col gap-3 p-8`}>
         <div className="flex justify-between">
            <input
               className="outline-none hover:border font-medium py-1 border-gray-300"
               value={value}
               onChange={onChange}
            />
            <span className="text-emerald-500 font-medium">{singleLine ? 'Texto Single Line' : 'Texto Multi Line'}</span>
         </div>
         <input

            className={`bg-[#F9F9F9] border border-gray-300 p-2 outline-none ${singleLine ? "" : 'h-32'}`}
            disabled
            multiple={!singleLine}
         />
      </div>

   )
}