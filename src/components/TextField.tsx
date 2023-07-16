'use client';

import { ChangeEvent } from "react";

type Props = {
   label: string;
   value: string;
   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({ label, onChange, value }: Props) {

   return (
      <div className="p-2">
         <label className="block mb-2 text-gray-600">{label}</label>
         <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-600 rounded focus:ring-emerald-500 focus:border-emerald-500 w-full p-2"
            {...{ onChange, value }}
         />
      </div>
   )
}