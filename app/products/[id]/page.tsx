import React from 'react'

interface Props{
    params: {id: number}
}
const Product = ({params: {id}}:Props) => {
  return (
    <div>Products/{id}</div>
  )
}

export default Product