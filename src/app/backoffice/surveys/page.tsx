'use client';

import { useState } from 'react';
import { Button, CopyButton, Menu, Switch, Table, Title, Loader as LoaderMantine } from '@mantine/core';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Survey } from '@/type';
import Loader from '@/components/Loader';
import Link from 'next/link';
import { AiOutlineCheck } from 'react-icons/ai';
import { FaRegCopy } from 'react-icons/fa';
import SelectField from '@/components/Select';
// import toast from 'react-hot-toast';


export default function Surveys() {
   const [page, setPage] = useState(0);
   const [loadingGoToAnotherPage, setLoadingGoToAnotherPage] = useState(false);
   const [enabledFilter, setEnabledFilter] = useState<any>(null);

   const { data: response, loading, refetch, } = useQuery(gql`
      query Surveys($where: WhereSurveyInput!, $page: Float!) {
         data: surveys(where: $where, page: $page) {
            metadata {
               totalPages
               totalItems
               perPage
            }
            items {
               enabled
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
      variables: { where: { enabled: enabledFilter?.value }, page },
      fetchPolicy: 'cache-and-network',
   });

   const [updateSurveyMutation, { loading: loadingUpdateSurvey }] = useMutation(gql`
      mutation UpdateSurvey($input: UpdateSurveyInput!) {
         updateSurvey(input: $input) {
            id
         }
      }
   `);

   function onUpdateEnableSurvey(id: number, enabled: boolean) {
      const promise = updateSurveyMutation({ variables: { input: { id, enabled } } });
      promise.then(() => refetch());
      // toast.promise(promise, {
      //    error: 'Ocurrió un error',
      //    loading: 'Cargando...',
      //    success: `Encuesta ${enabled ? 'habilitada' : 'desabilitada'} correctamente`
      // })
   }


   const surveys: Array<Survey> = response?.data?.items || [];
   const rows = surveys.map((element) => (
      <tr key={element.id}>
         <td>{element.title}</td>
         <td>{`${element.user.firstname} ${element.user.lastname}`}</td>
         <td className='flex gap-2 items-center'>
            {loadingUpdateSurvey ? <LoaderMantine /> : (
               <Switch

                  defaultChecked={element.enabled}
                  onChange={() => onUpdateEnableSurvey(element.id, !element.enabled)}
               />
            )}
            <Menu shadow="md" >
               <Menu.Target>
                  <Button>Opciones</Button>
               </Menu.Target>
               <Menu.Dropdown className=''>
                  <Link href={`/backoffice/surveys/editor/${element.id}?readonly=true`}>
                     <Menu.Item className=''>Ver</Menu.Item>
                  </Link>
                  <Link href={`/backoffice/surveys/editor/${element.id}`}>
                     <Menu.Item className=''>Crear Nueva a Partir de esta</Menu.Item>
                  </Link>
                  <Link href={`/backoffice/answers?surveyId=${element.id}`}>
                     <Menu.Item className=''>Ver Respuestas</Menu.Item>
                  </Link>
               </Menu.Dropdown>
            </Menu>

            <CopyButton value={`${window.location.origin}/survey/${element.id}`} timeout={2500}>
               {({ copied, copy }) => (
                  <Button color={copied ? 'green' : 'teal'} onClick={copy} leftIcon={copied ? <AiOutlineCheck /> : <FaRegCopy />}>
                     {copied ? 'Url Copiada' : 'Copiar URL'}
                  </Button>
               )}
            </CopyButton>
         </td>
      </tr>
   ));


   return (
      <div className='p-10'>

         <div className='flex justify-between'>
            <Title order={2}>Encuestas</Title>
            <Link href={'/backoffice/surveys/editor/new'} onClick={() => setLoadingGoToAnotherPage(true)}>
               <Button
                  loading={loadingGoToAnotherPage}
                  variant={'light'}
               >
                  Agregar Nueva Encuesta
               </Button>
            </Link>
         </div>
         <div>
            <SelectField
               label='Filtrar por Habilitado:'
               value={enabledFilter as any}
               onChange={(e: any) => setEnabledFilter(e)}
               options={[{ label: 'Si', value: true }, { label: 'No', value: false }]}
            />
         </div>
         {loading ? <Loader /> : (
            <Table className='mt-10' striped withBorder>
               <thead>
                  <tr>
                     <th>Titulo</th>
                     <th>Usuario Creador</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>{rows}</tbody>
            </Table>
         )}
      </div>
   )
}
