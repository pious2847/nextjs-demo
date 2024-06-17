/* eslint-disable @next/next/no-img-element */
import React, { Suspense } from 'react'
import UserTabel from './userTabel'

interface Props{
  searchParams: {sortOrder:string}
}
const User = async ({searchParams:{sortOrder}}:Props) => {

  return (
    <div className='p-5'>
       <h4>Users</h4>
       <Suspense fallback={<p>Loading...</p>}>
    <UserTabel sortOrder={sortOrder}/>
       </Suspense>
    </div>
  )
}

export default User