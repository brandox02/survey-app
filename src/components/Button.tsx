'use client';

type Props = {
   text: string;

}

export default function Button({ text }: Props) {

   return (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 border border-blue-700 rounded">
         {text}
      </button>
   )
}