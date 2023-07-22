'use client';
import { Survey as SurveyRender } from 'survey-react-ui';
import { Model } from 'survey-core';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import Loader from '@/components/Loader';
import 'survey-core/defaultV2.min.css';
import { Input, Title } from '@mantine/core';
import toast from 'react-hot-toast';
import manageGraphqlError from '@/utils/manageGraphqlError';


export default function Survey() {
   const { id } = useParams();
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

   function onSubmit(data: any) {
      try {
         const payload = {
            input: {
               surveyId: parseInt(id),
               respondentFullname: '',
               respondentEmail: '',
               content: data.data
            }
         }
         createAnswerMutation({ variables: payload });
         toast.success("Encuesta enviada correctamente");
      } catch (error) {
         console.error(error);
         toast.error('Ocurrió un error a la hora de guardar el formulario, porfavor intentalo de nuevo mas tarde');
      }
   }

   surveyModel.onComplete.add((data) => {
      onSubmit(data);
   });

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
         <Title className=''>{title}</Title>

         {/* <div className='flex gap-2 mt-10 '>
            <Title order={3} className='mr-10'>{'Información: '}</Title>
            <Input placeholder='Nombre' />
            <Input placeholder='Email' />

         </div> */}
         <SurveyRender model={surveyModel} />
      </div>
   )
}