'use client';

import { Loader as MantineLoader } from "@mantine/core";

export default function Loader() {

   return (
      <div className='w-full h-full flex justify-center items-center'>
         <MantineLoader />
      </div>
   )
}