'use client';

type Props = {
   text: string;
   classname?: string;
   onClick?: () => void;
}

export default function Button({ text, classname = '', onClick = () => { } }: Props) {

   return (
      <button

         onClick={onClick}
         className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 border border-blue-700 rounded ${classname}`}
      >
         {text}
      </button>
   )
}