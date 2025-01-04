"use client"

import PopuplarProducts from "@/components/PopularProducts";
import Texts from "@/components/Texts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
    _id: string;
    titles: string;
    description: string;
    price: string;
    reviews: any;
    images: string;
}

const page = () => {

    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [cart, setCart] = useState<string[]>([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            const productIds = JSON.parse(savedWishlist);
            fetchProductsByIds(productIds);
        }
    }, []);

    const handleCartClick = (productId: string) => {
        const updatedCart = cart.includes(productId)
            ? cart.filter((id) => id !== productId)
            : [...cart, productId];

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const fetchProductsByIds = async (ids: string[]) => {
        const res = await fetch(`http://localhost:3000/api/product`);
        const { data } = await res.json();
        const productsInWishlist = data.filter((product: Product) => ids.includes(product._id));
        setWishlist(productsInWishlist);
    };

    const removeFromWishlist = (productId: string) => {
        const updatedWishlist = wishlist.filter((product) => product._id !== productId);
        setWishlist(updatedWishlist);

        const updatedIds = updatedWishlist.map((product) => product._id);
        localStorage.setItem("wishlist", JSON.stringify(updatedIds));
    };

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto mt-[80px] mb-[80px] px-4 flex flex-col gap-[60px]">

            <div className="flex items-center justify-center sm:justify-between flex-wrap gap-[20px] sm:gap-0">

                <h5 className="text-[#000000] text-[20px] font-normal leading-[26px] text-center">Wishlist ({wishlist.length})</h5>

                <button className="w-[223px] h-[56px] bg-transparent rounded border-2 border-[#00000080] text-[#000000] font-[16px] font-medium leading-[24px] hover:bg-[#DB4444] hover:text-[#FFFFFF] hover:border-none transition-all" onClick={toggleShowAll}>{showAll ? "Hide All" : "Move All To Bag"}</button>

            </div>

            {wishlist.length === 0 ? (
                <p className="text-[#000000] text-[18px] sm:text-[24px] md:text-[36px] leading-[48px] text-center" style={{ letterSpacing: '4%' }}>Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[30px] gap-y-[60px]">
                    {wishlist.map((product, index) => {
                        if (index < 4 || showAll) {
                            return (
                                <div key={product._id} className="flex items-center justify-center flex-col gap-5">

                                    <div className="flex flex-col gap-4">

                                        <div className="relative w-full max-w-[270px] h-[250px] p-10 bg-[#F5F5F5] rounded flex items-center justify-center group">

                                            <Image src={`/uploads/${product.images}` || "/default-image.jpg"} alt={product.titles} width={190} height={180} className="object-contain" />

                                            <div className="absolute top-3 right-3 w-[34px] h-[34px] bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer">

                                                <Image src="/icons/icon_delete.png" alt="icon delete" width="24" height="24" onClick={() => removeFromWishlist(product._id)} />

                                            </div>

                                            <button
                                                className="absolute left-0 bottom-0 w-full h-[41px] bg-[#000000] rounded-bl-[4px] rounded-br-[4px] flex items-center justify-center gap-2 cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
                                                onClick={() => handleCartClick(product._id)}
                                            >
                                                <Image src="/icons/white_cart.png" alt="icon cart" width="24" height="24" />
                                                <small className="text-[#FFFFFF] text-[12px] font-normal leading-[18px]">
                                                    {cart.includes(product._id) ? "Remove from cart" : "Add To Cart"}
                                                </small>
                                            </button>

                                        </div>

                                        <div className="flex flex-col gap-2">

                                            <Link href={`/product/${product._id}`}>

                                                <p className="text-[#000000] text-[16px] font-medium leading-[24px]">{product.titles}</p>

                                            </Link>

                                            <small className="text-[#DB4444] text-[16px] font-medium leading-[24px]">${product.price}</small>

                                        </div>

                                    </div>

                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            )}

            <Texts text_small="Just For You" text_big="" />

            <PopuplarProducts />

        </div>
    )
}

export default page;