'use client';

import { QuestionElement } from "../../page";
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';


type Props = {
   isOpen: boolean,
   close: () => void,
   questions: Array<QuestionElement>
}
export default function PreviewModal({ close, isOpen, questions }: Props) {
   console.log({ questions })
   if (isOpen) {
      const surveyModel = new Model({ elements: questions });

      surveyModel.onComplete.add((data) => {
         console.log({ data: data.data })
      })
      return (
         (
            <div className="">
               <div
                  className="justify-center items-center flex border overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen"
               >
                  <div className="relative w-auto my-6 ">
                     {/*content*/}
                     <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                           <h3 className="text-3xl font-semibold">
                              Vista Previa
                           </h3>
                           <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => close}
                           >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                 ×
                              </span>
                           </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                           <Survey model={surveyModel} />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                           <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={close}
                           >
                              Close
                           </button>
                           <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={close}
                           >
                              Save Changes
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
         )
      )
   }
   return <></>

}