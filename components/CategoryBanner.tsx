"use client"

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from "swiper/modules";

const CategoryBanner = () => {

    const categories = [
        { name: 'Phones', link: '/categories/phones' },
        { name: 'Computers', link: '/categories/computers' },
        { name: 'SmartWatch', link: '/categories/smartWatches' },
        { name: 'Camera', link: '/categories/cameras' },
        { name: 'HeadPhones', link: '/categories/headphones' },
        { name: 'Gaming', link: '/categories/gaming' },
    ];

    return (
        <div className="container mx-auto flex items-center justify-center flex-wrap gap-[5px] sm:[10px] md:gap-[15px] lg:gap-[70px]">

            <div className="flex gap-10">

                <ul className="flex items-center lg:items-start justify-center flex-wrap lg:flex-col gap-4 my-10">

                    {
                        categories.map((category, i) => {
                            return (
                                <li className="text-[#000000] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all" key={i}><Link href={category.link}>{category.name}</Link></li>
                            );
                        })
                    }

                </ul>

                <div className="w-[1px] h-[384px] bg-[#0000004c] hidden lg:block"></div>

            </div>

            <div className="flex items-center justify-center flex-col gap-2">

                <Swiper
                    pagination={{
                        el: '.custom-pagination',
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} custom-bullet"></span>`;
                        },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="bg-[#000000] w-[410px] sm:w-[640px] md:max-w-[768px] lg:w-[930px] h-fit md:h-[344px]"
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={400}
                >
                    <SwiperSlide className="bg-[#000000]">

                        <div className="w-full max-w-[930px] h-fit md:h-[344px] flex items-center justify-center p-0 sm:p-10">

                            <div className="flex items-center justify-center flex-col sm:flex-row gap-[38px]">

                                <div className="flex flex-col gap-5">

                                    <div className="flex items-center gap-4">

                                        <Image src="/icons/apple_logo.png" alt="Apple Logo" width={40} height={49} />

                                        <small className="text-[#FAFAFA] text-[14px] sm:text-[16px] font-normal leading-[24px]">iPhone 14 Series</small>

                                    </div>

                                    <div className="flex flex-col gap-[12px]">

                                        <p className="w-full sm:w-[300px] md:w-full text-[#FAFAFA] text-[32px] sm:text-[48px] font-semibold leading-[40px] sm:leading-[60px]">
                                            Up to 10% off Voucher
                                        </p>

                                    </div>

                                </div>

                                <div className="flex justify-center">

                                    <Image src="/images/iphone.png" alt="iPhone Image" width={300} height={344} className="max-w-full h-auto" />

                                </div>

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide className="bg-[#000000]">

                        <div className="relative h-[382px] text-white py-20">

                            <div className="absolute inset-0">

                                <Image src="/images/bg_banner.jpg" alt="joystick image" width="1920" height="600" className="w-full h-full object-cover opacity-50" />

                            </div>

                            <div className="relative container mx-auto text-center flex items-center justify-center flex-wrap">

                                <h1 className="text-4xl md:text-6xl font-bold mb-8">Super Sale!</h1>

                                <p className="text-lg md:text-xl mb-8">Don't miss your chance to purchase the best products with discounts of up to 50%!</p>

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide>

                        <div className="relative h-[382px] text-white">

                            <div className="absolute inset-0">

                                <Image src="/images/joystick_white.avif" alt="Banner Image" width="1920" height="600" className="w-full h-full object-cover opacity-50" />

                            </div>

                            <div className="relative container mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-10">

                                <div className="flex items-start justify-start flex-col gap-[20px]">

                                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">Winter Sale!</h1>

                                    <p className="text-lg md:text-xl w-[400px]">Discounts up to 70% on the best products. Hurry up to buy your favorite things!</p>

                                </div>

                                <div className="hidden md:flex">

                                    <div className="flex justify-center">

                                        <Image src="/images/joystick.png" alt="Product Image" width="200" height="200" className="rounded-full shadow-lg p-2" />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </SwiperSlide>

                </Swiper>

                <div className="flex items-center justify-center">

                    <div className="custom-pagination"></div>

                </div>

            </div>

        </div>
    )
}

export default CategoryBanner;