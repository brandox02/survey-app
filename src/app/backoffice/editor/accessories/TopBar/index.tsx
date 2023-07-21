'use client';

import { gql, useMutation } from '@apollo/client';
import { Button } from '@mantine/core';
import { GrEdit } from 'react-icons/gr';
import Cookie from 'js-cookie';
import { QuestionElement } from '../../types';
import manageGraphqlError from '@/utils/manageGraphqlError';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';



type Props = {
   onClickPreview: () => void;
   title: string;
   setTitle: (title: string) => void;
   questions: Array<QuestionElement>
}

export default function TopBar({ onClickPreview, setTitle, title, questions }: Props) {
   const [createSurveyMutation, { loading }] = useMutation(gql`
      mutation CreateSurvey($input: CreateSurveyInput!) {
      createSurvey(input: $input) {
         id
      }
}
   `);

   const router = useRouter();

   const onSave = manageGraphqlError(async () => {
      const surveysUrl = '/backoffice/surveys'
      router.prefetch(surveysUrl);
      const userId = JSON.parse(Cookie.get('auth') || '')?.user.id;
      const payload = {
         userId,
         title,
         content: questions
      }
      await createSurveyMutation({ variables: { input: payload } });
      toast.success('Encuesta creada exitosamente');
      router.push(surveysUrl);
   }, {});

   return (
      <div className="border border-gray-300 bg-gray-100 py-3 flex items-center justify-between">
         <div className="flex items-center gap-2 w-9/12 mr-5">
            <GrEdit className="ml-5" />
            <input className="bg-gray-100 font-bold text-xl w-full text-emerald-700 outline-none hover:border-emerald-700 hover:border-2 rounded-lg px-1 py-1" value={title} onChange={e => setTitle(e.target.value)} />
         </div>
         <div className="flex justify-evenly items-center w-3/12">
            <div data-modal-target="defaultModal" data-modal-toggle="defaultModal">
               <Button
                  className="mr-2 bg-orange-500 border-orange-600 hover:bg-orange-700 "
                  onClick={onClickPreview}
                  color={'cyan'}
               >
                  Vista Previa
               </Button>
            </div>
            <Button className="mr-2" color={'blue'} onClick={onSave} loading={loading}>
               Guardar
            </Button>
         </div>
      </div>
   )
}