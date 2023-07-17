'use client';

import { BsCursorText, BsTextCenter, BsUiRadiosGrid } from 'react-icons/bs';
import { GoCheckbox } from 'react-icons/go';
import ItemSideMenu from './Item';
import { VscSymbolBoolean } from 'react-icons/vsc';



export default function ItemsSideMenu() {

   return (
      <div className='border w-24 bg-white h-full'>
         {/* <div className='mt-5 font-bold text-lg text-center'>Elementos</div> */}
         <div className='mt-10 relative'>
            <ItemSideMenu icon={BsCursorText} label='Texto Single Line' />
            <ItemSideMenu icon={BsTextCenter} label='Texto Multi Line' />
            <ItemSideMenu icon={BsUiRadiosGrid} label='Radio Group Input' />
            <ItemSideMenu icon={GoCheckbox} label='Checkbox Group' />
            <ItemSideMenu icon={VscSymbolBoolean} label='Si/No Booleano' />
         </div>
      </div>
   )
}