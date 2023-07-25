'use client';

import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { QuestionElement } from '../../types';
import 'survey-core/defaultV2.min.css';
import Modal from '@/components/Modal';


type Props = {
   isOpen: boolean,
   close: () => void,
   questions: Array<QuestionElement>
}
export default function PreviewModal({ close, isOpen, questions }: Props) {

   const surveyModel = new Model({
      elements: questions.map((item: any) => ({
         ...item,
         choices: item.choices
            .map((x: any) => ({ ...x, imageLink: x.imageLink || x.base64Image }))
      }))
   });

   surveyModel.onComplete.add((data) => {
      console.log({ answers: data.data, questions })
   });

   return (
      <Modal isOpen={isOpen} onClose={close} title='Vista Previa' >
         <Survey model={surveyModel} />
      </Modal>
   )

}