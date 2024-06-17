import React from 'react'

interface Props{
    params: {slug : string []}

}

const ProductDetail = ({params: {slug}}:Props) => {
  return (
    <div>ProductDetail {slug}</div>
  )
}

export default ProductDetail