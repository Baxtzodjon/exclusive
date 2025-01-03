// app/categories/[category]/page.tsx
"use client";

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DynamicCard from '@/components/DynamicCard';
import CardItemMain from '@/components/CardItemMain';
import CardItem from '@/components/CardItem';

interface Product {
    _id: string;
    titles: string;
    description: string;
    price: string;
    reviews: string;
    images: string;
    image_second: string;
    image_third: string;
    catg_prod: string;
}

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/product');
                const data = await response.json();

                if (data.success) {
                    const filteredProducts = data.data.filter(
                        (product: Product) => product.catg_prod === category
                    );

                    setProducts(filteredProducts);

                    if (filteredProducts.length === 0) {
                        notFound();
                    }
                } else {
                    setError('Ошибка при загрузке данных');
                }
            } catch (error) {
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) {
        return <div className='loader_center'>

            <div className='loader'></div>

            <span className='text-[#DB4444] text-[16px] font-semibold leading-[20px]'>Loading...</span>

        </div>
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!category) {
        notFound();
    }

    return (
        <div className='w-full max-w-[1230px] mx-auto flex flex-col gap-[60px] mt-[60px] mb-[70px]'>

            <h1 className='text-[#000000] text-[36px] font-semibold leading-[48px] capitalize sm:text-[28px] sm:leading-[36px] 
            md:text-[32px] md:leading-[40px] px-4' style={{ letterSpacing: '4%' }}>Category: {category}</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[30px] gap-y-[60px] px-4'>

                {products.map((product) => (
                    <div key={product._id}>
                        <CardItem
                            _id={product._id}
                            titles={product.titles}
                            description={product.description}
                            price={product.price}
                            reviews={product.reviews}
                            images={product.images}
                            imageSecond={product.image_second}
                            imageThird={product.image_third}
                        />
                    </div>
                ))}

            </div>
            
        </div>
    );
};

export default CategoryPage;