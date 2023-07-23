'use client';

import { Button } from '@mantine/core';
import TextInput from "@/components/TextInput";
import manageGraphqlError from '@/utils/manageGraphqlError';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
// import { setAuthToken } from '@/config/ApolloProvider';

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loadingLogin, setLoadingLogin] = useState(false);
   const [loginMutation] = useMutation(gql`
         mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
               accessToken
               user {
                  updatedAt
                  lastname
                  id
                  firstname
                  email
                  createdAt
               }
            }
   }
      `);

   const router = useRouter();

   const onLogin = manageGraphqlError(async () => {
      setLoadingLogin(true)
      if (!password.trim() || !email.trim()) {
         toast.error('Debes completar la contraseña y el correo');
         return;
      }
      const { data } = await loginMutation({ variables: { email, password } });
      Cookie.set('auth', JSON.stringify(data.login));
      router.replace('/backoffice/surveys');
      // setAuthToken(data.accessToken);

   }, { 'Resource not found': 'Usuario o contraseña inválidos' }, {
      errorCallback: () => {
         setLoadingLogin(false);
      }
   });

   return (
      <div className="bg-[#F1F6FF] w-screen h-screen">
         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                     Iniciar Sesión
                  </h1>
                  <div className="flex flex-col gap-2">
                     <TextInput
                        label="Email"
                        className=""
                        style={2}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                     />
                     <TextInput
                        label="Contraseña"
                        className=""
                        style={2}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                     />
                     <Button onClick={onLogin} variant={'filled'} className='mt-5' loading={loadingLogin}>Ingresar</Button>
                  </div>
               </div>
            </div>
         </div>

      </div >
   )
}