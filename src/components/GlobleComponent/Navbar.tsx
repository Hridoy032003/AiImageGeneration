import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';
const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center  bg-white '>
      <Link href="/" className='flex items-center '>
       <Image src="/logo.jpeg" alt="logo" width={100} height={100} className='object-cover'/>
     </Link>
      <Link href="/Sign-in" className=''>
        {" "}
        <Button variant="outline">Sign In</Button>
      </Link>
    </div>
  );
}

export default Navbar