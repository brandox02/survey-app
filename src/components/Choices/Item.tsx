import { CheckboxGroupQuestion, RadioGroupQuestion } from "@/app/backoffice/surveys/[id]/editor/types";
import { RxDragHandleDots2 } from "react-icons/rx";

type ItemProps = {
   text: string;
   value: string;
   selectedItem: RadioGroupQuestion | CheckboxGroupQuestion;
   setCurrentElement: Function,
   onDeleteItem: Function;
   index: number;
}
export function Item({ text, value, selectedItem, setCurrentElement, onDeleteItem, index }: ItemProps) {


   return (
      <>

         <div key={value} className='border border-gray-200 px-3 py-1 flex justify-between items-center'>
            <div className='flex items-center gap-2 w-full'>
               <RxDragHandleDots2 className="cursor-grab" />
               <input
                  className="outline-none hover:border py-1 border-gray-300"
                  value={text}
                  onChange={(e) => setCurrentElement({
                     choices: selectedItem.choices
                        .map(rItem => rItem.value === value ?
                           ({
                              text: e.target.value,
                              value: rItem.value
                           })
                           : rItem
                        )
                  })}
               />
            </div>
            <div className="cursor-pointer py-1 px-2" onClick={() => onDeleteItem(index)}>X</div>
         </div>
      </>
   )
}