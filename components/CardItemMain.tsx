"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PrevNext from "./PrevNext";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

interface Product {
  _id: string;
  titles: string;
  description: string;
  price: string;
  reviews: any;
  images: string;
}

const CardItemMain = () => {
  const { isSignedIn } = useUser();

  const handleAddToSignLogin = () => {
    if (!isSignedIn) {
      alert("Please login or register!");
      // window.location.href = '/sign-in';
      window.location.href = 'https://musical-chipmunk-42.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F';
      return;
    }
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const getCardsToShow = () => {
    if (window.innerWidth >= 1024) {
      return 4;
    } else if (window.innerWidth >= 768) {
      return 3;
    } else if (window.innerWidth >= 480) {
      return 2;
    } else {
      return 1;
    }
  };

  const cardsToShow = getCardsToShow(); // 4

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const handleWishlistClick = (productId: string) => {
    const updatedWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

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
    <>

      <div className="slider-container relative w-full max-w-[1170px] mx-auto">

        <div className="slider-wrapper scroll_blc">

          <div className="slider-content flex transition-transform duration-500" style={{ transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`, }}>

            <div className="flex items-center justify-center gap-10">

              {products.map((product: Product) => (

                <div key={product._id} className="flex items-center justify-center flex-col gap-5">

                  <div className="flex flex-col gap-4">

                    <div className="relative w-[260px] h-[250px] bg-[#F5F5F5] rounded flex items-center justify-center group">

                      <Image
                        src={`/uploads/${product.images}` || "/default-image.jpg"}
                        alt={product.titles}
                        width={190}
                        height={180}
                        className="object-contain"
                      />

                      <SignedOut>
                        <button
                          className="absolute top-3 right-3 w-[34px] h-[34px] bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                          onClick={() => handleAddToSignLogin()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="currentColor"
                          >
                            <path
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </button>
                      </SignedOut>

                      <SignedIn>
                        <button
                          className="absolute top-3 right-3 w-[34px] h-[34px] bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                          onClick={() => handleWishlistClick(product._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill={wishlist.includes(product._id) ? "#DB4444" : "currentColor"}
                          >
                            <path
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                              fill={wishlist.includes(product._id) ? "#DB4444" : "none"}
                              stroke={wishlist.includes(product._id) ? "#DB4444" : "currentColor"}
                              strokeWidth="2"
                            />
                          </svg>
                        </button>
                      </SignedIn>

                      <div className="absolute top-[54px] right-3 w-[34px] h-[34px] bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer">

                        <SignedOut>
                          <button onClick={handleAddToSignLogin}>
                            <Image src="/icons/eye_icon.png" alt="icon eye" width="20" height="14" />
                          </button>
                        </SignedOut>

                        <SignedIn>
                          <Link href={`/product/${product._id}`} onClick={handleAddToSignLogin}>
                            <Image src="/icons/eye_icon.png" alt="icon eye" width="20" height="14" />
                          </Link>
                        </SignedIn>

                      </div>

                      <SignedOut>
                        <button
                          className="absolute left-0 bottom-0 w-full h-[41px] bg-[#000000] rounded-bl-[4px] rounded-br-[4px] flex items-center justify-center gap-2 cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
                          onClick={() => handleAddToSignLogin()}
                        >
                          <Image src="/icons/white_cart.png" alt="icon cart" width="24" height="24" />
                          <small className="text-[#FFFFFF] text-[12px] font-normal leading-[18px]">
                            {"Please sign in to add to cart"}
                          </small>
                        </button>
                      </SignedOut>

                      <SignedIn>
                        <button
                          className="absolute left-0 bottom-0 w-full h-[41px] bg-[#000000] rounded-bl-[4px] rounded-br-[4px] flex items-center justify-center gap-2 cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
                          onClick={() => handleCartClick(product._id)}
                        >
                          <Image src="/icons/white_cart.png" alt="icon cart" width="24" height="24" />
                          <small className="text-[#FFFFFF] text-[12px] font-normal leading-[18px]">
                            {cart.includes(product._id) ? "Remove from cart" : "Add To Cart"}
                          </small>
                        </button>
                      </SignedIn>

                    </div>

                    <div className="flex items-start justify-start flex-col gap-2">

                      <SignedOut>
                        <button
                          className="cursor-pointer"
                          onClick={() => handleAddToSignLogin()}
                        >
                          <p className="text-[#000000] text-[16px] font-medium leading-[24px]">
                            {product.titles}
                          </p>
                        </button>
                      </SignedOut>

                      <SignedIn>
                        <Link href={`/product/${product._id}`}>
                          <p className="text-[#000000] text-[16px] font-medium leading-[24px]">
                            {product.titles}
                          </p>
                        </Link>
                      </SignedIn>

                      <small className="text-[#DB4444] text-[16px] font-medium leading-[24px]">${product.price}</small>

                      <div className="flex gap-2">

                        <div className="flex">

                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={index < product.reviews ? "#FFAD33" : "#00000080"}
                              className="w-5 h-5"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}

                        </div>

                        <small className="text-[#000000] text-[14px] font-semibold leading-[21px] opacity-[50%]">({product.reviews})</small>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        <PrevNext prevSlide={prevSlide} nextSlide={nextSlide} />

      </div>

    </>
  );
};

export default CardItemMain;