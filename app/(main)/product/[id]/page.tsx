// app/product/[id]/page.tsx

import DynamicCard from '@/components/DynamicCard'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface Product {
  _id: string
  titles: string
  price: string
  description: string
  images: string
  reviews: string
  catg_prod: string
}

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = params

  const res = await fetch(`http://localhost:3000/api/product/${id}`)

  if (!res.ok) {
    notFound()
  }

  const { data }: { data: Product } = await res.json()

  console.log(data);

  return (
    <>

      <DynamicCard item={data} />
      
    </>
  )
}

export default ProductPage;