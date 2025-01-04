"use client";

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const CategoryBannerMain = () => {
    const categories = [
        { name: "Phones", link: "/categories/phones" },
        { name: "Computers", link: "/categories/computers" },
        { name: "SmartWatch", link: "/categories/smartWatches" },
        { name: "Camera", link: "/categories/camera" },
        { name: "HeadPhones", link: "/categories/headphones" },
        { name: "Gaming", link: "/categories/gaming" },
    ];

    const [banners, setBanners] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/banner');
                const data = await response.json();

                if (response.ok) {
                    setBanners(data.data);
                } else {
                    console.error("Error fetching banners:", data.message);
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    useEffect(() => {
        if (banners.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [banners]);

    const { isSignedIn } = useUser();

    const handleCategoryClick = (link: string) => {
        if (!isSignedIn) {
            alert("Please login or register!");
            window.location.href = 'https://musical-chipmunk-42.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F';
            return;
        }
    };

    if (loading) {
        return <div className='loader_center'>

            <div className='loader'></div>

            <span className='text-[#DB4444] text-[16px] font-semibold leading-[20px]'>Loading...</span>

        </div>
    }

    return (
        <div className="w-full max-w-[1230px] mx-auto px-6 flex items-center justify-center gap-[45px] lg:flex-row flex-col lg:mt-0 mt-5 mb-[80px]">

            <div className="flex items-center justify-center">

                <div className="flex gap-10 w-full justify-center lg:justify-start">

                    <ul className="flex items-center lg:items-start justify-center lg:flex-col gap-4 flex-wrap">

                        {categories.map((category, i) => (
                            <div key={i}>
                                <SignedOut>

                                    <li className="text-[#000000] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all" onClick={() => handleCategoryClick(category.link)}>

                                        <span className="cursor-pointer">{category.name}</span>

                                    </li>
                                </SignedOut>

                                <SignedIn>
                                    <li
                                        className="text-[#000000] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all"
                                        onClick={() => handleCategoryClick(category.link)}
                                    >
                                        <Link href={category.link}>{category.name}</Link>
                                    </li>
                                </SignedIn>
                            </div>
                        ))}

                    </ul>

                    <div className="w-[1px] h-[384px] bg-[#0000004c] hidden lg:block"></div>

                </div>

            </div>

            <div className="relative w-full h-[344px]">

                <div className="relative overflow-hidden">
                    <div
                        className="flex transition-all duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {banners.map((banner) => (
                            <div key={banner._id} className="w-full flex-shrink-0">
                                <Image
                                    src={`/uploads/${banner.image}`}
                                    alt="Banner Image"
                                    width={1200}
                                    height={344}
                                    className="w-full h-[344px] object-cover"
                                />
                            </div>
                        ))}
                    </div>

                </div>

                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 w-[46px] h-[46px] bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#DB4444] transition-all"
                    onClick={prevSlide}
                >
                    <Image src="/icons/icons_arrow_right.png" alt="arrow top icon" width="24" height="24" className="rotate-[180deg]" />
                </button>
                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 w-[46px] h-[46px] bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#DB4444] transition-all"
                    onClick={nextSlide}
                >
                    <Image src="/icons/icons_arrow_right.png" alt="arrow top icon" width="24" height="24" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">

                    {banners.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full bg-[#FFFFFF4C] cursor-pointer ${currentIndex === index ? 'bg_inp border-2 border-[#FFFFFF]' : 'bg-[#FFFFFF4C]'
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
};

export default CategoryBannerMain;