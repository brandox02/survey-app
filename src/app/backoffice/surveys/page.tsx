'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Group, LoadingOverlay, Table, Title } from '@mantine/core';
import { gql, useQuery } from '@apollo/client';
import { Pagination, Survey } from '@/type';
import { useDisclosure } from '@mantine/hooks'
import Loader from '@/components/Loader';



export default function Surveys() {
   // const [surveysResponse, setSurveys] = useState<Pagination<Survey>>();
   const [page, setPage] = useState(0);

   // const [visible, { toggle }] = useDisclosure(false);

   const { data: response, loading } = useQuery(gql`
      query Surveys($where: WhereSurveyInput!, $page: Float!) {
         data: surveys(where: $where, page: $page) {
            metadata {
               totalPages
               totalItems
               perPage
            }
            items {
               id
               content
               answers {
               id
               content
               }
               title
               user {
                  id
                  firstname
                  lastname
                  email
               }
            }
         }
         }
   `, {
      variables: { where: {}, page },
      fetchPolicy: 'cache-and-network',
      onCompleted: (data) => setSurveys(data.surveys)
   });


   if (loading) {
      return <Loader />
   }

   const surveys: Array<Survey> = response?.data?.items || [];
   const rows = surveys.map((element) => (
      <tr key={element.id}>
         <td>{element.title}</td>
         <td>{`${element.user.firstname} ${element.user.lastname}`}</td>
         <td><span className='text-blue-600 text-xs italic underline cursor-pointer'>Ver Respuestas</span></td>
      </tr>
   ));


   return (
      <div>

         <Title order={2}>Encuestas</Title>
         <Table className='mt-10' striped withBorder>
            <thead>
               <tr>
                  <th>Titulo</th>
                  <th>Usuario Creador</th>
                  <th>Acciones</th>
               </tr>
            </thead>
            <tbody>{rows}</tbody>
         </Table>
      </div>
   )
}
