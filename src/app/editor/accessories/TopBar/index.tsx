import Button from "@/components/Button";
import { useState } from "react";
import { GrEdit } from 'react-icons/gr';




type Props = {

}

export default function TopBar({ }: Props) {


   return (
      <div className=" border border-gray-300 bg-white py-5 flex justify-between items-center">
         <div className="flex items-center gap-2">
            <GrEdit className="ml-5" />
            <span className="font-bold text-xl text-emerald-700">Covid 19 Survey</span>
         </div>
         <Button text="Guardar" />
      </div>
   )
}