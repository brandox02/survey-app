import { Survey as SurveyRender } from 'survey-react-ui';
import { QuestionElement } from "../backoffice/editor/types";
import { Model } from 'survey-core';

export default function Survey() {
   const answers = {
      "002c32c1-dc9e-4f76-813a-e266b2105ab4": "respuesta",
      "5539c004-5705-4a72-8da8-6f33cf4a79d0": "respuesta",
      "52d6df5d-f874-41f7-865e-da5b2ce6ff4c": [
         "top 18368.09295793512",
         "top31742.8718227501138"
      ],
      "bb214af4-0c4f-48b4-bed3-1bcde7f5ee26": true
   }

   const questions: Array<QuestionElement> = [
      {
         "name": "002c32c1-dc9e-4f76-813a-e266b2105ab4",
         "title": "Single Line Text Field",
         "type": "text",
         "inputType": "text",
         "isRequired": true
      },
      {
         "name": "5539c004-5705-4a72-8da8-6f33cf4a79d0",
         "title": "Multi Line text Field",
         "type": "comment",
         "inputType": "text",
         "isRequired": true
      },
      {
         "name": "52d6df5d-f874-41f7-865e-da5b2ce6ff4c",
         "title": "Checkbox Field",
         "type": "checkbox",
         "choices": [
            {
               "text": "top 1",
               "value": "top 18368.09295793512"
            },
            {
               "text": "top3",
               "value": "top31742.8718227501138"
            }
         ],
         "isRequired": true
      },
      {
         "name": "bb214af4-0c4f-48b4-bed3-1bcde7f5ee26",
         "title": "Boolean Field ",
         "type": "boolean",
         "labelTrue": "Noo",
         "labelFalse": "Talvez",
         "isRequired": true
      }
   ]

   const surveyModel = new Model({ elements: questions });

   return (
      <div>

         <SurveyRender model={surveyModel} />
      </div>
   )
}