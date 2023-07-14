'use client';

type Props = {
   label: string;

}

export default function TextField({ label }: Props) {

   return (
      <div className="p-2">
         <label className="block mb-2 text-gray-600">{label}</label>
         <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-600 rounded focus:ring-emerald-500 focus:border-emerald-500 w-full p-2" />
      </div>
   )
}