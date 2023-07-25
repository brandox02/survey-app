'use client';

import manageGraphqlError from "@/utils/manageGraphqlError";
import { gql, useLazyQuery } from "@apollo/client";
import { ReactNode, useEffect } from "react";
import Cookie from 'js-cookie';
import { LocalStorageAuthData } from "@/type";
// import { setAuthToken } from "@/config/ApolloProvider";
import { usePathname, useRouter } from "next/navigation";

export default function VerifyToken({ children }: { children: ReactNode }) {
   const router = useRouter();
   const [fetchUserInfo] = useLazyQuery(gql`
      query GetUserInfo {
         userInfo: getUserInfo {
            password
            lastname
            id
            firstname
            email
         }
         }
   `, {});
   const pathname = usePathname();

   useEffect(() => {
      const init = manageGraphqlError(async () => {
         const isBackoffice = pathname.includes('/backoffice');
         if (isBackoffice) {
            const authRaw: string | undefined = Cookie.get('auth');
            if (!authRaw) {
               router.replace('/login');
               throw new Error('Ocurrió un error a la hora de leer el token de acceso');
            }
            const auth: LocalStorageAuthData = JSON.parse(authRaw);
            const { accessToken } = auth;
            if (accessToken) {
               // setAuthToken(accessToken);
               await fetchUserInfo();
            }
         }
      }, { 'Unauthorized': 'Ocurrió un error a la hora de leer el token de acceso' });

      init();
      // eslint-disable-next-line
   }, []);

   return <>{children}</>;
}
