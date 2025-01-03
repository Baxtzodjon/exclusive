"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import ReviewInp from "./ReviewInp";
import StarRating from "./StarRating";
import Counter from "./Counter";
import { Product } from "@/models/product";
import PopuplarProducts from "./PopularProducts";
import Texts from "./Texts";

interface DynamicCardProps {
    item: any
}

const DynamicCard: React.FC<DynamicCardProps> = ({ item }) => {

    const [reviewValue, setReviewValue] = useState<number>(0);
    const [count, setCount] = useState(1);
    const [activeSize, setActiveSize] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [cart, setCart] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const sizes = [
        { dimension: 'XS' },
        { dimension: 'S' },
        { dimension: 'M' },
        { dimension: 'L' },
        { dimension: 'XL' },
    ];

    /* const [images, setImages] = useState({
        img1: item?.images,
        img2: item?.image_second,
        img3: item?.image_third,
    }); */

    const [images, setImages] = useState({
        img1: item?.images ? `/uploads/${item?.images}` : "/default-image.jpg",
        img2: item?.image_second ? `/uploads/${item?.image_second}` : "/default-image.jpg",
        img3: item?.image_third ? `/uploads/${item?.image_third}` : "/default-image.jpg",
    });

    const [activeImg, setActiveImage] = useState(images.img1);

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    const handleWishlistClick = (productId: string) => {
        const updatedWishlist = wishlist.includes(productId)
            ? wishlist.filter((id) => id !== productId)
            : [...wishlist, productId];

        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    // Функция для добавления или удаления товара из корзины
    const handleCartClick = (productId: string) => {
        const updatedCart = cart.includes(productId)
            ? cart.filter((id) => id !== productId)
            : [...cart, productId];

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/api/product');
            const { data } = await res.json();

            setLoading(false);
            setProducts(data);

            const savedWishlist = localStorage.getItem('wishlist');
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }

            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className='loader_center'>

            <div className='loader'></div>

            <span className='text-[#DB4444] text-[16px] font-semibold leading-[20px]'>Loading...</span>

        </div>
    }

    return (
        <div className="flex items-start justify-center flex-wrap gap-[70px] mt-[80px] mb-[140px]">

            <div className="flex items-center justify-center flex-wrap-reverse gap-[30px]">

                <div className="flex justify-center flex-wrap sm:flex-col gap-4">

                    {
                        Object.values(images).map((img, index) => (
                            <div className={`w-[170px] h-[138px] bg-[#F5F5F5] rounded flex items-center justify-center flex-wrap cursor-pointer ${activeImg === img ? "border-2 border-[#DB4444]" : ""}`} onClick={() => setActiveImage(img)} key={index}>

                                <Image src={img} alt="images image" width="121" height="114" />

                            </div>
                        ))
                    }

                </div>

                <div className="w-fit h-fit sm:w-[500px] sm:h-[600px] bg-[#F5F5F5] rounded flex items-center justify-center cursor-pointer p-2 m-5 sm:p-0 sm:m-0">

                    <Image src={activeImg} alt="image" width="446" height="315" />

                </div>

            </div>

            <div className="flex flex-col gap-[24px] p-5 sm:p-5">

                <div className="flex flex-col gap-4">

                    <h3 className="text-[#000000] text-[24px] font-semibold leading-[24px]" style={{ letterSpacing: "3%" }}>{item.titles}</h3>

                    <div className="flex items-center gap-4">

                        <div className="flex items-center gap-2">

                            <div className="flex">

                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={index < item.reviews ? "#FFAD33" : "#00000080"}
                                        className="w-5 h-5"
                                    >
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}

                            </div>

                            <div>

                                <small className="text-[#000000] text-[14px] font-normal leading-[21px] opacity-[50%]">({item.reviews} Reviews)</small>

                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <small className="text-[#000000] opacity-[50%]">|</small>

                            <small className="text-[#00FF66] text-[14px] font-normal leading-[21px] opacity-[60%]">In Stock</small>

                        </div>

                    </div>

                    <div className="flex flex-col gap-6">

                        <span className="text-[#000000] text-[24px] font-normal leading-[24px]" style={{ letterSpacing: "3%" }}>{`$${(item.price) * (count * 1)}`}</span>

                        <p className="w-fit sm:w-[373px]">{item.description}</p>

                        <div className="w-[400px] h-[1px] bg-[#000000]"></div>

                    </div>

                </div>

                <div className="flex flex-col gap-6">

                    {/* <div className="flex flex-col gap-6">

                        <div className="flex items-center gap-6">

                            <small className="text-[#000000] text-[20px] font-normal leading-[20px]" style={{ letterSpacing: "3%" }}>Colours:</small>

                            <div className="flex items-center gap-2">

                                <div
                                    className={`w-[12px] h-[12px] bg-[#A0BCE0] rounded-full cursor-pointer ${activeIndex === 0 ? 'border-2 border-[#000000]' : ''}`}
                                    onClick={() => handleClick(0)}
                                ></div>

                                <div
                                    className={`w-[12px] h-[12px] bg-[#E07575] rounded-full cursor-pointer ${activeIndex === 1 ? 'border-2 border-[#000000]' : ''}`}
                                    onClick={() => handleClick(1)}
                                ></div>

                            </div>

                        </div>

                        <div className="flex items-center gap-6">

                            <small className="text-[#000000] text-[20px] font-normal leading-[20px]" style={{ letterSpacing: "3%" }}>Size:</small>

                            <div className="flex items-center gap-4">

                                {sizes.map((size, i) => {
                                    const isActive = activeSize === size.dimension;
                                    return (
                                        <button
                                            key={i}
                                            className={`w-8 h-8 rounded border-2 text-[14px] font-medium leading-[21px] transition-all
                                    ${isActive ? 'bg-[#DB4444] text-[#FAFAFA] border-none' : 'border-[#00000080] text-[#000000] hover:bg-[#DB4444] hover:text-[#FAFAFA] hover:border-none'}`}
                                            onClick={() => setActiveSize(size.dimension)}
                                        >
                                            {size.dimension}
                                        </button>
                                    );
                                })}

                            </div>

                        </div>

                    </div> */}

                    <div className="flex flex-col gap-10">

                        <div className="flex flex-wrap gap-4">

                            <Counter onCountChange={setCount} />

                            <div className="flex items-center gap-[19px]">

                                <button className="w-[165px] h-[44px] bg-[#DB4444] rounded text-[#FAFAFA] text-[16px] font-medium leading-[24px] hover:border-2 hover:border-[#00000080] hover:bg-transparent hover:text-[#000000] transition-all" onClick={() => handleCartClick(item._id)}>{cart.includes(item._id) ? "Remove from cart" : "Add To Cart"}</button>

                                <div className="relative w-10 h-10 bg-transparent rounded border-2 border-[#00000080] flex items-center justify-center">

                                    <button
                                        className="cursor-pointer"
                                        onClick={() => handleWishlistClick(item._id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            fill={wishlist.includes(item._id) ? "#DB4444" : "currentColor"}
                                        >
                                            <path
                                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                fill={wishlist.includes(item._id) ? "#DB4444" : "none"}
                                                stroke={wishlist.includes(item._id) ? "#DB4444" : "currentColor"}
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </div>

                        </div>

                        <div className="w-[400px] h-[180px] border-2 border-[#00000080] rounded flex justify-center flex-col gap-4">

                            <div className="flex gap-4 m-2">

                                <Image src="/icons/icon_delivery_black.png" alt="delivery icon" width="40" height="40" className="object-contain" />

                                <div className="flex flex-col gap-2">

                                    <h5 className="text-[#000000] text-[16px] font-medium leading-[24px]">Free Delivery</h5>

                                    <p className="text-[#000000] text-[12px] font-medium leading-[18px] underline">Enter your postal code for Delivery Availability</p>

                                </div>

                            </div>

                            <div className="w-full h-[1px] bg-[#000000]"></div>

                            <div className="flex gap-4 m-2">

                                <img src="/icons/icon_return.png" alt="delivery icon" width="40" height="40" className="object-contain" />

                                <div className="flex flex-col gap-2">

                                    <h5 className="text-[#000000] text-[16px] font-medium leading-[24px]">Return Delivery</h5>

                                    <p className="text-[#000000] text-[12px] font-medium leading-[18px] underline">Free 30 Days Delivery Returns. Details</p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div >

            <div className="w-full max-w-[1230px] mx-auto px-4 flex flex-col gap-[60px]">

                <Texts text_small="Related Item" text_big="" />

                <PopuplarProducts />

            </div>

        </div >
    )
}

export default DynamicCard;