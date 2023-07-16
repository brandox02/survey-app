'use client';
import Button from "@/components/Button";
import { GrEdit } from 'react-icons/gr';




type Props = {
   onClickPreview: () => void;
}

export default function TopBar({ onClickPreview }: Props) {


   return (
      <div className=" border border-gray-300 bg-white py-5 flex justify-between items-center">
         <div className="flex items-center gap-2">
            <GrEdit className="ml-5" />
            <span className="font-bold text-xl text-emerald-700">Covid 19 Survey</span>
         </div>
         <div className="flex">
            <div data-modal-target="defaultModal" data-modal-toggle="defaultModal">
               <Button text="Vista Previa" classname="mr-2 bg-orange-500 border-orange-600 hover:bg-orange-700" onClick={onClickPreview} />
            </div>
            <Button text="Guardar" classname="mr-2" />
         </div>
      </div>
   )
}