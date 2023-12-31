'use client';

import { useEffect, useState } from 'react';
import { Pagination, Table, Title } from '@mantine/core';
import { gql, useQuery } from '@apollo/client';
import Loader from '@/components/Loader';
import Link from 'next/link';
import SelectField from "@/components/Select";
import { useSearchParams } from 'next/navigation';


export default function Answers() {
   const searchParams = useSearchParams();
   const [page, setPage] = useState(0);
   const [surveySelected, setSurveySelected] = useState({ label: '', value: '' });
   const surveyId = searchParams.get('surveyId')

   const { data: response, loading } = useQuery(gql`
      query Answers($where: WhereAnswerInput!, $page: Float!) {
         data: answers(where: $where, page: $page) {
            metadata {
               totalPages
               totalItems
               perPage
            }
            items {
               survey{
                  title
                  user {
                     firstname
                     lastname
                  }
               }
               id
               content
               respondentFullname
               respondentEmail
            }
         }
         }
   `, {
      variables: { where: { surveyId: surveySelected?.value || null }, page },
      fetchPolicy: 'cache-and-network',
   });

   const { data: surveyResponse, loading: surveyListLoading } = useQuery(gql`
   query SurveyList{
      surveyList {
         id
         title
      }
   }
   `, { fetchPolicy: 'cache-and-network' });

   const surveyList = surveyResponse?.surveyList || [];


   const answers: Array<any> = response?.data?.items || [];
   const totalPages = response?.data?.metadata.totalPages || 0;
   const rows = answers.map((element) => (
      <tr key={element.id} className=''>
         <td>{element.survey.title}</td>
         <td>{`${element.survey.user.firstname} ${element.survey.user.lastname}`}</td>
         <td>{element.respondentFullname || "sin nombre"}</td>
         <td>{element.respondentEmail || 'Sin email'}</td>
         <td className=''>
            <Link href={`/backoffice/answers/${element.id}`} className='underline text-blue-700 italic text-lg'>
               Ver Detalle
            </Link>
         </td>
      </tr>
   ));

   useEffect(() => {
      if (surveyId && surveyResponse) {
         const surveySelected = surveyList.find((item: any) => item.id === parseInt(surveyId));
         if (surveySelected) {
            setSurveySelected({ label: surveySelected.title, value: surveySelected.id });
         }
      }
      // eslint-disable-next-line
   }, [surveyId, surveyResponse])

   return (
      <div className='p-10'>
         <div className='flex justify-between mb-5'>
            <Title order={2}>Respuestas</Title>

         </div>
         {/* <Title className='pt-10 pb-2' order={5}>Filtrar por Encuesta:</Title> */}
         <SelectField label='Filtrar por Encuesta:' value={surveySelected} onChange={(e: any) => setSurveySelected(e)} options={surveyList.map((item: any) => ({ label: item.title, value: item.id }))} isLoading={surveyListLoading} />
         {loading ? <Loader /> : (
            <div className='flex flex-col items-center'>
               <Table className='mt-10' striped withBorder>
                  <thead>
                     <tr>
                        <th>Nombre Encuesta</th>
                        <th>Creador de Encuesta</th>
                        <th>Nombre Completo Persona</th>
                        <th>Email Persona</th>
                     </tr>
                  </thead>
                  <tbody>{rows}</tbody>
               </Table>
               <Pagination className='mt-5' total={totalPages} value={page + 1} defaultValue={page + 1} onChange={(value) => setPage(value - 1)} />
            </div>
         )}
      </div>
   )
}
