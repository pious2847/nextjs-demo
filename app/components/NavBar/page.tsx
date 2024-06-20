/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Session } from 'inspector'

const NavBar = () => {

   const {status,data:session} = useSession()

  return (
    <div className='flex gap-4 p-4  text-white'>
        <Link href='/'>home</Link>
        <Link href='/api/users'>Users</Link>
        <Link href='/api/products'>Products</Link>
        {status ==='loading' && <div>Loading...</div>}
        {status === 'authenticated' && <div className='flex gap-2 justify-center'>
            {/* <img className='h-[30px] rounded-2xl' src={session.user!.image} alt={session.user!.name} /> */}
             {session.user!.name}</div>}
        {status === 'unauthenticated' && <Link href='/api/auth/signin'>signin</Link>}
         
         
    </div>
  )
}

export default NavBar