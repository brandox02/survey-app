'use client';
import { Survey as SurveyRender } from 'survey-react-ui';
import { Model } from 'survey-core';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import Loader from '@/components/Loader';
import 'survey-core/defaultV2.min.css';
import { Button, Input, Title } from '@mantine/core';
import toast from 'react-hot-toast';
import TextField from '@/components/TextField';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';


export default function Survey() {
   const { id } = useParams();
   const [fullname, setFullname] = useState('');
   const [email, setEmail] = useState('');
   const [unlockForm, setUnlockForm] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const { data, loading, error } = useQuery(gql`
      query Survey($where: WhereSurveyInput!) {
         survey(where: $where) {
            title
            id
            content
         }
      }
   `, {
      variables: { where: { id: parseInt(id) } },
      fetchPolicy: 'cache-and-network'
   });

   const [createAnswerMutation] = useMutation(gql`
      mutation CreateAnswer($input: CreateAnswerInput!) {
         createAnswer(input: $input) {
            id
         }
      }
   `)

   const questions = data?.survey?.content || [];
   const title = data?.survey?.title || '';

   const surveyModel = new Model({
      elements: questions, completeText: 'Enviar', completedHtml: '<h3>Gracias por completar el formulario</h3>'
   });

   async function onSubmit(data: any) {
      try {

         const payload = {
            input: {
               surveyId: parseInt(id),
               respondentFullname: fullname,
               respondentEmail: email,
               content: data.data
            }
         }

         const promise = createAnswerMutation({ variables: payload });

         promise.then(() => setSubmitted(true));
         toast.promise(promise, {
            error: 'Ocurrió un error a la hora de guardar tu respuesta',
            loading: 'Enviando...',
            success: 'Tu respuesta fue enviada exitosamente!'
         });

      } catch (error) {
         console.error(error);
         toast.error('Ocurrió un error a la hora de guardar el formulario, porfavor intentalo de nuevo mas tarde');
      }
   }
   function onUnlockForm() {

      if (!fullname.trim()) {
         toast.error("Debes llenar el nombre completo");
         return;
      }
      else if (!email.trim()) {
         toast.error("Debes llenar el email");
         return;
      }

      else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
         toast.error("Email inválido");
         return;
      }
      setUnlockForm(true);

   }

   surveyModel.onComplete.add((data) => {
      onSubmit(data);
   });

   // surveyModel.mode = unlockForm ? 'edit' : 'display';

   if (error) {
      let message = 'Ocurrió un error'
      if (error.message === 'Survey not found') {
         message = 'Esta encuesta no es válida';
      }
      toast.error(message);
      return <>Encuesta inválida</>;
   }
   if (loading) {
      return <div className="w-full h-full flex items-center justify-center"><Loader /></div>
   }

   return (
      <div className='bg-gray-100 h-screen w-screen flex flex-col items-center p-5'>
         <Title className='pt-10'>{title}</Title>
         {submitted ? <Title order={2} className='p-10 text-gray-500'>Haz llenado la encuesta exitosamente!</Title> : (
            <>
               <div className='bg-gray-50 p-10 shadow-md w-2/5 flex gap-5 justify-between mt-10 items-end'>
                  <div className='flex'>
                     <TextField label='Nombre Completo' value={fullname} onChange={e => setFullname(e.target.value)} />
                     <TextField label='Email' value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <Button variant={'light'} color={unlockForm ? 'green' : 'blue'} leftIcon={unlockForm ? <AiOutlineCheck /> : ''} onClick={onUnlockForm}>{unlockForm ? 'Completado' : 'Seguir'}</Button>
               </div>

               {unlockForm && <SurveyRender model={surveyModel} />}
            </>
         )}
      </div>
   )
}