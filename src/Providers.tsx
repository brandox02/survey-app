'use client';
import { Toaster } from 'react-hot-toast';


type Props = {
   children: JSX.Element
}

export default function Providers({ children }: Props) {

   return <>
      {children}
      <Toaster />
   </>;
}