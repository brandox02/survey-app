'use client';

import { useState } from 'react';
import { Button, Menu, Table, Title } from '@mantine/core';
import { gql, useQuery } from '@apollo/client';
import Loader from '@/components/Loader';
import Link from 'next/link';

export default function Answers() {
   const [page, setPage] = useState(0);
   const [loadingGoToAnotherPage, setLoadingGoToAnotherPage] = useState(false);

   const { data: response, loading } = useQuery(gql`
      query Answers($where: WhereAnswerInput!, $page: Float!) {
         data: answers(where: $where, page: $page) {
            metadata {
               totalPages
               totalItems
               perPage
            }
            items {
               surveyId
               id
               content
               respondentFullname
               respondentEmail
            }
         }
         }
   `, {
      variables: { where: {}, page },
      fetchPolicy: 'cache-and-network',
   });

   if (loading) {
      return <Loader />
   }

   const surveys: Array<any> = response?.data?.items || [];
   const rows = surveys.map((element) => (
      <tr key={element.id}>
         <td>{element.respondentFullname || "sin nombre"}</td>
         <td>{element.respondentEmail || 'Sin email'}</td>
         <td className=''>
            <Menu shadow="md" >
               <Menu.Target>
                  <Button>Opciones</Button>
               </Menu.Target>
               <Menu.Dropdown className=''>
                  <Link href={`/backoffice/surveys/editor/${element.id}`}>
                     <Menu.Item className=''>Detalle</Menu.Item>
                  </Link>
               </Menu.Dropdown>
            </Menu>
         </td>
      </tr>
   ));


   return (
      <div className='p-10'>

         <div className='flex justify-between'>
            <Title order={2}>Respuestas</Title>

         </div>

         <Table className='mt-10' striped withBorder>
            <thead>
               <tr>
                  <th>Nombre Completo Persona</th>
                  <th>Email Persona</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>{rows}</tbody>
         </Table>
      </div>
   )
}
