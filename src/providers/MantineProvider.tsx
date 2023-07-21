'use client'

import { CacheProvider } from '@emotion/react'
import { createEmotionCache, MantineProvider as CoreMantineProvider } from '@mantine/core'
import { useServerInsertedHTML } from 'next/navigation'
import { ReactNode } from 'react'

// must be created outside of the component to persist across renders
const cache = createEmotionCache({ key: 'my' })
cache.compat = true

export default function MantineProvider({ children }: { children: ReactNode }) {
   useServerInsertedHTML(() => (
      <style
         data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
         dangerouslySetInnerHTML={{
            __html: Object.values(cache.inserted).join(' '),
         }}
      />
   ))

   return (
      <CacheProvider value={cache}>
         <CoreMantineProvider
            withGlobalStyles
            withNormalizeCSS
            emotionCache={cache}
         >
            {children}
         </CoreMantineProvider>
      </CacheProvider>
   )
}