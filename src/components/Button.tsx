'use client';

type Props = {
   text: string;
   classname?: string;
   onClick?: () => void;
   color?: 'blue' | 'red'
}

export default function Button({ text, classname = '', onClick = () => { }, color = 'blue' }: Props) {

   return (
      <button

         onClick={onClick}
         className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-6 border border-${color}-700 rounded ${classname}`}
      >
         {text}
      </button>
   )
}