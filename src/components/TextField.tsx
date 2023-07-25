'use client';

import { ChangeEvent } from "react";

type Props = {
   label: string;
   value: any;
   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
   disabled?: boolean;
   className?: string;
   type?: string;
}

export default function TextField({ label, onChange, value, disabled = false, className = '', type = 'text' }: Props) {

   return (
      <div className={`p-2 ${className}`}>
         <label className="block mb-2 text-gray-600 font-medium">{label}</label>
         <input
            disabled={disabled}
            type={type}
            className={`bg-gray-50 border border-gray-300 text-gray-600 rounded focus:ring-emerald-500 focus:border-emerald-500 w-full p-2 ${disabled ? 'cursor-not-allowed' : ''}`}
            {...{ onChange, value }}
         />
      </div>
   )
}