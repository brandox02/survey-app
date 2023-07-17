import { useMemo } from "react";


type Props = {
   checked: boolean;
   toggle: (checked: boolean) => void;
   label: string;
}
export default function CheckBox({ checked, toggle, label }: Props) {
   const id = useMemo(() => (Math.random() * 100000).toString(), []);
   return (
      <div className="flex items-center mb-4 " >
         <input
            checked={checked}
            id={id}
            type="checkbox"
            value=""
            onChange={() => toggle(!checked)}
            className="w-4 cursor-pointer h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
         />
         <label
            htmlFor={id}
            className="ml-2 text-sm font-medium cursor-pointer">{label}</label>
      </div >
   )
}