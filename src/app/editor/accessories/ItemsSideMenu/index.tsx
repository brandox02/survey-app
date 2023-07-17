'use client';

import { BsCursorText, BsTextCenter, BsUiRadiosGrid } from 'react-icons/bs';
import { GoCheckbox } from 'react-icons/go';
import ItemSideMenu from './Item';
import { VscSymbolBoolean } from 'react-icons/vsc';
import { QuestionType } from '../../page';

interface Props {
   onAddNewItem: (type: QuestionType) => void
}

export default function ItemsSideMenu({ onAddNewItem }: Props) {

   return (
      <div className='border w-24 bg-white h-full'>
         {/* <div className='mt-5 font-bold text-lg text-center'>Elementos</div> */}
         <div className='mt-10 relative'>
            <ItemSideMenu onClick={() => onAddNewItem('text')} icon={BsCursorText} label='Texto Single Line' />
            <ItemSideMenu onClick={() => onAddNewItem('comment')} icon={BsTextCenter} label='Texto Multi Line' />
            <ItemSideMenu onClick={() => onAddNewItem('radiogroup')} icon={BsUiRadiosGrid} label='Radio Group Input' />
            <ItemSideMenu onClick={() => onAddNewItem('checkbox')} icon={GoCheckbox} label='Checkbox Group' />
            <ItemSideMenu onClick={() => onAddNewItem('boolean')} icon={VscSymbolBoolean} label='Si/No Booleano' />
         </div>
      </div>
   )
}