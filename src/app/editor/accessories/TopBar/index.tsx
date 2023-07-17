'use client';
import Button from "@/components/Button";
import { GrEdit } from 'react-icons/gr';




type Props = {
   onClickPreview: () => void;
   title: string;
   setTitle: (title: string) => void;
}

export default function TopBar({ onClickPreview, setTitle, title }: Props) {


   return (
      <div className="border border-gray-300 bg-white py-3 flex items-center justify-between">
         <div className="flex items-center gap-2 w-9/12 mr-5">
            <GrEdit className="ml-5" />
            <input className="font-bold text-xl w-full text-emerald-700 outline-none hover:border-gray-400 hover:border rounded-lg px-1 py-1" value={title} onChange={e => setTitle(e.target.value)} />
         </div>
         <div className="flex justify-evenly items-center w-3/12">
            <div data-modal-target="defaultModal" data-modal-toggle="defaultModal">
               <Button text="Vista Previa" classname="mr-2 bg-orange-500 border-orange-600 hover:bg-orange-700 " onClick={onClickPreview} />
            </div>
            <Button text="Guardar" classname="mr-2" />
         </div>
      </div>
   )
}