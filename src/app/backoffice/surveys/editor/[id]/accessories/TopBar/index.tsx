'use client';

import { gql, useMutation } from '@apollo/client';
import { Anchor, Breadcrumbs, Button, CopyButton, Tooltip } from '@mantine/core';
import { GrEdit } from 'react-icons/gr';
import Cookie from 'js-cookie';
import { QuestionElement } from '../../types';
import manageGraphqlError from '@/utils/manageGraphqlError';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { FaRegCopy } from 'react-icons/fa';
import { VscPreview } from 'react-icons/vsc';
import { AiOutlineSave, AiOutlineCheck } from 'react-icons/ai';
import Link from 'next/link';




type Props = {
   onClickPreview: () => void;
   title: string;
   setTitle: (title: string) => void;
   questions: Array<QuestionElement>;
   id: number | typeof NaN;
   readonly?: boolean;
}

export default function TopBar({ onClickPreview, setTitle, title, questions, id, readonly }: Props) {
   const [createSurveyMutation, { loading: loadingCreate }] = useMutation(gql`
      mutation CreateSurvey($input: CreateSurveyInput!) {
         createSurvey(input: $input) {
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


      await createSurveyMutation({ variables: { input: payload } });
      toast.success(`Encuesta creada exitosamente`);
      router.push(surveysUrl);
   }, {});

   const items = [
      { title: 'Encuestas', href: '/backoffice/surveys' },
      { title: `Crear Encuesta`, href: '#' },
   ].map((item, index) => (
      <Link href={item.href} key={index}>
         <Anchor>
            {item.title}
         </Anchor>
      </Link>
   ));
   console.log({ id })
   return (
      <div className="border border-gray-300  py-3 flex items-center justify-between">
         <div className="flex items-center gap-2 w-9/12 mr-5">
            <IoArrowBackCircleSharp size={50} className='ml-5 cursor-pointer mr-5' onClick={() => router.back()} />
            <Breadcrumbs>{items}</Breadcrumbs>
            <GrEdit className="ml-5" />
            <input className="mr-5 font-bold text-xl w-full text-emerald-700 outline-none hover:border-emerald-700 hover:border-2 rounded-lg px-1 py-1" value={title} onChange={e => setTitle(e.target.value)} />
         </div>
         <div className="flex justify-end gap-2 items-center w-3/12 mr-2">

            {!isNaN(id) && (
               <CopyButton value={`${window.location.origin}/survey/${id}`} timeout={3000}>
                  {({ copied, copy }) => (
                     <Button color={copied ? 'teal' : 'blue'} onClick={copy} leftIcon={copied ? <AiOutlineCheck /> : <FaRegCopy />}>
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

            {!readonly && <Button className="" color={'green'} onClick={onSave} loading={loadingCreate} leftIcon={<AiOutlineSave />}>
               Guardar
            </Button>}
         </div>
      </div>
   )
}