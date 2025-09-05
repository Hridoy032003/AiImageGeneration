
import { getAuthSession } from '@/lib/auth'
import {  SessionProvider } from 'next-auth/react'
import React from 'react'

const SessionProviders = async ({children}:{children:React.ReactNode}) => {
    const session = await getAuthSession()
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default SessionProviders