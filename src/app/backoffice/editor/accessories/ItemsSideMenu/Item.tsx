import { useState } from "react";


type Props = {
   label: string;
   icon: any;
   onClick: () => void
}

export default function ItemSideMenu({ icon: Icon, label, onClick }: Props) {
   const [hover, setHover] = useState(false);

   return (
      <div className="relative my-14 p-1">
         <div
            onClick={onClick}
            className='fixed z-10 flex items-center gap-2 cursor-pointer hover:bg-gray-200 hover:border-emerald-700 hover:border hover:rounded-xl px-7 py-2 '
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         >
            <Icon size={30} />
            {hover && <span className='text-gray-600 border-gray-200 border rounded'>{label}</span>}
         </div>
      </div>
   )
}