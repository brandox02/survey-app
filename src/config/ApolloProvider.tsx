'use client';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider as ApolloProviderSource, ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import React from 'react';
// import { ApolloProvider as ApolloProviderSource, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import Cookie from 'js-cookie';
// import { LocalStorageAuthData } from '@/type';
// uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',


// const httpLink = createHttpLink({
// });

// const authLink = setContext((_, { headers }) => {
//   const authRaw: string | undefined = Cookie.get('auth');
//   const auth: LocalStorageAuthData = JSON.parse(authRaw || '');
//   const { accessToken } = auth || {};

//   return {
//     headers: {
//       ...headers,
//       authorization: accessToken ? `Bearer ${accessToken}` : "",
//     }
//   }
// });

// const apolloClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache({ addTypename: false })
// });


// export const setAuthToken = (token: string) => {
//   apolloClient.setLink(createHttpLink({
//     uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
//     headers: {
//       'Authorization': `Bearer ${token}`
//     },
//   }));
// }

//


// const httpLink = createHttpLink({
//   uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yMFQyMzowMjoxMy42MTNaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yMFQyMzowMjoxMy42MTNaIiwiZmlyc3RuYW1lIjoiQnJhbmRvbiIsImxhc3RuYW1lIjoiRmVybsOhbmRleiIsImVtYWlsIjoiYnJhbmRveDAyLmRldkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRpbHUuZ1pLVloyTkN1Sm1ZdEtjbS91aEg0Zk1neWFqWHo4eXF1ZTNpQndIV0VIeVFQbXNFVyJ9.mzclX5Ax4FRa6fA6I4qGq-QzD-O1cRI2ndgikgt_xvg'
//   // return the headers to the context so httpLink can read them
//   // const copy = structuredClone(headers)
//   // copy['authorization'] = token;

//   return {
//     headers: { ...headers, authorization: token ? `Bearer ${token}` : "", }
//   }
// });

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL + '/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yMFQyMzowMjoxMy42MTNaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yMFQyMzowMjoxMy42MTNaIiwiZmlyc3RuYW1lIjoiQnJhbmRvbiIsImxhc3RuYW1lIjoiRmVybsOhbmRleiIsImVtYWlsIjoiYnJhbmRveDAyLmRldkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRpbHUuZ1pLVloyTkN1Sm1ZdEtjbS91aEg0Zk1neWFqWHo4eXF1ZTNpQndIV0VIeVFQbXNFVyJ9.mzclX5Ax4FRa6fA6I4qGq-QzD-O1cRI2ndgikgt_xvg';

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false }),
});


export function ApolloProvider({ children }: { children: React.ReactNode }) {

  return (
    <ApolloProviderSource client={client}>
      {children}
    </ApolloProviderSource>
  )
}