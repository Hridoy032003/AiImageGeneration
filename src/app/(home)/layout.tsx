import React from 'react'
import Navbar from '../../components/GlobleComponent/Navbar'
import Footer from '../../components/GlobleComponent/Footer'
import { getAuthSession } from '@/lib/auth'
import { log } from 'console'

const layout =async ({children}:{children:React.ReactNode}) => {
    const session = await getAuthSession()
    log(session)
  return (
    <div >
      <Navbar />
      <div className='min-h-screen'>{children}</div>
      <Footer />
    </div>
  );
}

export default layout