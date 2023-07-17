import { ChangeEvent } from "react";

export interface TextField {
   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
   value: string;
   trueLabel: string;
   falseLabel: string;
}

export default function Boolean({ onChange, value, falseLabel, trueLabel }: TextField) {
   return (
      <div className={`flex flex-col gap-3 p-8`}>
         <div className="flex justify-between">
            <input
               className="outline-none hover:border font-medium py-1 border-gray-300"
               value={value}
               onChange={onChange}
            />
            <span className="text-emerald-500 font-medium">{'Boolean'}</span>
         </div>
         <div className="bg-[#F9F9F9] border border-gray-200 rounded-3xl flex items-center p-1 cursor-default w-fit">
            <div className="bg-white px-7 rounded-full py-1 shadow text-emerald-700">
               {trueLabel}
            </div>
            <span className="text-gray-400 px-5">{falseLabel}</span>
         </div>
      </div>

   )
}