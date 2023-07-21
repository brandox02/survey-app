'use client';

import { Toaster } from 'react-hot-toast';
import MantineProvider from './MantineProvider';
import { ApolloProvider } from '../config/ApolloProvider';
import VerifyToken from './VerifyToken';

type Props = {
   children: React.ReactNode
}


export default function Providers({ children }: Props) {

   return <ApolloProvider>
      <VerifyToken>
         <MantineProvider>
            {children}
            <Toaster />
         </MantineProvider>
      </VerifyToken>
   </ApolloProvider>;
}