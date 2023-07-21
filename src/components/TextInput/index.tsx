import { ChangeEventHandler } from "react";

export interface TextInputProp {
   placeholder?: string;
   label?: string;
   disabled?: boolean;
   style?: 1 | 2
   removeDoublePoints?: boolean
   className?: string;
   value?: string;
   onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
   type?: string;
}
export default function TextInput({
   placeholder = '', label = '', disabled, style = 1,
   removeDoublePoints = false, className = '',
   value = '', onChange, type = 'text'
}: TextInputProp) {

   switch (style) {
      case 1:
         return (
            <label className={`relative flex gap-2 items-center my-2 text-blue-950 ${className}`}>
               {label && <span className="font-semibold">{`${label}${removeDoublePoints ? '' : ':'} `}</span>}
               <input
                  disabled={!!disabled}
                  className="disabled:bg-sky-100 disabled:text-blue-900 placeholder:italic font-semibold placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-xs"
                  placeholder={placeholder}
                  type={type}
                  name="search"
                  value={value}
                  onChange={onChange}
               />
            </label>
         )
      case 2:
         return (
            <div className={`inline-flex flex-col gap-y-2 text-blue-950 ${className}`}>
               {label && <span className="font-semibold">{`${label}${removeDoublePoints ? '' : ':'} `}</span>}
               <input
                  disabled={!!disabled}
                  className="disabled:bg-sky-100 disabled:text-blue-900 placeholder:italic font-semibold placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-xs"
                  placeholder={placeholder}
                  type={type}
                  name="search"
                  value={value}
                  onChange={onChange}
               />
            </div>
         )
      default:
         return (
            <div>Default input</div>
         )
   }

}