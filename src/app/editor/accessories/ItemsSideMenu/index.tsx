'use client';

import { BsCursorText, BsTextCenter, BsUiRadiosGrid } from 'react-icons/bs';
import { GoCheckbox } from 'react-icons/go';
import ItemSideMenu from './Item';



export default function ItemsSideMenu() {

   return (
      <div className='border w-24 bg-white h-full'>
         {/* <div className='mt-5 font-bold text-lg text-center'>Elementos</div> */}
         <div className='mt-10 relative'>
            <ItemSideMenu icon={BsCursorText} label='Input Text' />
            <ItemSideMenu icon={BsTextCenter} label='Long Input Text' />
            <ItemSideMenu icon={BsUiRadiosGrid} label='Radio Group Input' />
            <ItemSideMenu icon={GoCheckbox} label='Checkbox Group' />
         </div>
      </div>
   )
}