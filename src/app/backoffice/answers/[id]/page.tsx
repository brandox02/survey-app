'use client';

import { Survey as SurveyRender } from 'survey-react-ui';
import { Anchor, Breadcrumbs, Input, Title } from '@mantine/core';
import { gql, useQuery } from '@apollo/client';
import Loader from '@/components/Loader';
import { Model } from 'survey-core';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import 'survey-core/defaultV2.min.css';
import dayjs from 'dayjs';
import TextField from '@/components/TextField';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import Link from 'next/link';

export default function Answers() {
   const { id } = useParams();
   const { data: response, loading } = useQuery(gql`
      query Answer($where: WhereAnswerInput!) {
         answer(where: $where) {
            survey {
               title
               user {
                  firstname
                  lastname
               }
               content
            }
            id
            respondentFullname
            respondentEmail
            createdAt
            updatedAt
            content
         }
         }
   `, {
      variables: { where: { id: parseInt(id) } },
      fetchPolicy: 'cache-and-network',
   });

   const router = useRouter();


   if (loading) {
      return <Loader />
   }
   if (!loading && !response) {
      toast.error('Ocurrió un error');
      return;
   }
   const { answer: { survey,
      respondentFullname,
      respondentEmail,
      createdAt,
      content
   }
   } = response;

   const surveyModel = new Model({
      elements: survey.content, completeText: 'Enviar', completedHtml: '<h3>Gracias por completar el formulario</h3>'
   });

   surveyModel.data = content;
   surveyModel.mode = "display";

   const items = [
      { title: 'Respuestas', href: '/backoffice/answers' },
      { title: `${respondentFullname}`, href: `/backoffice/answers/${id}` },
   ].map((item, index) => (
      <Link href={item.href} key={index}>
         <Anchor>
            {item.title}
         </Anchor>
      </Link>
   ));

   return (
      <div className=' h-full w-screen bg-gray-100 flex flex-col items-center p-5 gap-4 relative'>
         <div className='absolute left-10 flex gap-5'>
            <IoArrowBackCircleSharp size={50} className='ml-5 cursor-pointer' onClick={() => router.back()} />
            <Breadcrumbs>{items}</Breadcrumbs>
         </div>
         <Title className=''>{survey.title}</Title>

         <div className='bg-gray-50 p-10 shadow w-3/5 flex gap-5 justify-between'>
            <TextField label='Nombre Respondedor' disabled value={respondentFullname} onChange={() => { }} />
            <TextField label='Email Respondedor' disabled value={respondentEmail} onChange={() => { }} />
            <TextField label='Fecha de esta Respuesta' disabled value={dayjs(createdAt).format('DD/MM/YYYY')} onChange={() => { }} />
            <TextField label='Usuario Creador de la Encuesta' disabled value={`${survey.user.firstname} ${survey.user.lastname}`} onChange={() => { }} />
         </div>
         <div className='  w-3/5'>

            <SurveyRender model={surveyModel} />
         </div>

      </div>
   )
}
