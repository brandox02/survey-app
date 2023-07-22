'use client';

import { gql, useMutation } from '@apollo/client';
import { Button, CopyButton, Tooltip } from '@mantine/core';
import { GrEdit } from 'react-icons/gr';
import Cookie from 'js-cookie';
import { QuestionElement } from '../../types';
import manageGraphqlError from '@/utils/manageGraphqlError';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { FaRegCopy } from 'react-icons/fa';
import { VscPreview } from 'react-icons/vsc';
import { AiOutlineSave } from 'react-icons/ai';




type Props = {
   onClickPreview: () => void;
   title: string;
   setTitle: (title: string) => void;
   questions: Array<QuestionElement>;
   isEditing: boolean;
   id: number;
}

export default function TopBar({ onClickPreview, setTitle, title, questions, isEditing, id }: Props) {
   const [createSurveyMutation, { loading: loadingCreate }] = useMutation(gql`
      mutation CreateSurvey($input: CreateSurveyInput!) {
         createSurvey(input: $input) {
            id
         }
      }
   `);
   const [updateSurveyMutation, { loading: loadingUpdate }] = useMutation(gql`
      mutation Mutation($input: UpdateSurveyInput!) {
         updateSurvey(input: $input) {
            id
         }
      }
   `);

   const router = useRouter();

   const onSave = manageGraphqlError(async () => {
      const surveysUrl = '/backoffice/surveys';
      router.prefetch(surveysUrl);
      const userId = JSON.parse(Cookie.get('auth') || '')?.user.id;
      const payload: any = {
         userId,
         title,
         content: questions,
      };
      if (isEditing) payload.id = id;
      const mutation = isEditing ? updateSurveyMutation : createSurveyMutation;
      await mutation({ variables: { input: payload } });
      toast.success(`Encuesta ${isEditing ? 'editada' : 'creada'} exitosamente`);
      router.push(surveysUrl);
   }, {});

   return (
      <div className="border border-gray-300 bg-gray-100 py-3 flex items-center justify-between">
         <div className="flex items-center gap-2 w-9/12 mr-5">
            <IoArrowBackCircleSharp size={50} className='ml-5 cursor-pointer' onClick={() => router.back()} />

            <GrEdit className="ml-5" />
            <input className="bg-gray-100 font-bold text-xl w-full text-emerald-700 outline-none hover:border-emerald-700 hover:border-2 rounded-lg px-1 py-1" value={title} onChange={e => setTitle(e.target.value)} />
         </div>
         <div className="flex justify-end gap-2 items-center w-3/12">
            {isEditing && (
               <CopyButton value={`${window.location.origin}/survey/${id}`} timeout={3000}>
                  {({ copied, copy }) => (
                     <Button color={copied ? 'teal' : 'blue'} onClick={copy} leftIcon={<FaRegCopy />}>
                        {copied ? 'Url Copiada' : 'Copiar Url Encuesta'}
                     </Button>
                  )}
               </CopyButton>
            )}
            <div data-modal-target="defaultModal" data-modal-toggle="defaultModal">
               <Button
                  className=" bg-orange-500 border-orange-600 hover:bg-orange-700 "
                  onClick={onClickPreview}
                  color={'cyan'}
                  leftIcon={<VscPreview />}
               >
                  Vista Previa
               </Button>
            </div>

            <Button className="mr-2" color={'green'} onClick={onSave} loading={loadingCreate || loadingUpdate} leftIcon={<AiOutlineSave />}>
               Guardar
            </Button>
         </div>
      </div>
   )
}