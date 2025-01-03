"use client"

import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

import { FreeMode, Pagination } from "swiper/modules";

import Image from "next/image";

const Team = () => {

    const ServiceData = [
        {
            id: Math.random(),
            name: "Tom Cruise",
            title: "Founder & Chairman",
            image: "/images/founder.png",
        },
        {
            id: Math.random(),
            name: "Emma Watson",
            title: "Managing Director",
            image: "/images/managing_director.png",
        },
        {
            id: Math.random(),
            name: "Will Smith",
            title: "Product Designer",
            image: "/images/product_designer.png",
        },
        {
            id: Math.random(),
            name: "Kamilla Smith",
            title: "Deputy Director",
            image: "/images/managing_director.png",
        },
        {
            id: Math.random(),
            name: "Jack Johnson",
            title: "Manager Company",
            image: "/images/product_designer.png",
        },
        {
            id: Math.random(),
            name: "Harry Williams",
            title: "Case manager",
            image: "/images/founder.png",
        },
    ]

    return (
        <Swiper
            modules={[FreeMode, Pagination]}
            direction="horizontal"
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
            }}
            freeMode={true}
            pagination={{
                clickable: true
            }}
            className="max-w-[90%] lg:max-w-[78%]"
        >
            {ServiceData.map((item: any) => {
                return (
                    <SwiperSlide key={item.id}>

                        <div className="flex items-center justify-center gap-[30px] mb-[50px]">

                            <div className="flex flex-col gap-8">

                                <div className="w-[370px] h-[430px] bg-[#F5F5F5] rounded flex items-end justify-center">

                                    <Image src={item.image} alt={item.title} width="236" height="391" />

                                </div>

                                <div className="flex flex-col gap-4">

                                    <div className="flex flex-col gap-2">

                                        <h4 className="text-[#000000] text-[32px] font-medium leading-[30px]" style={{ letterSpacing: "4%" }}>{item.name}</h4>

                                        <p className="text-[#000000] text-[16px] font-normal leading-[24px]">{item.title}</p>

                                    </div>

                                    <div className="flex gap-4">

                                        <a href="#">

                                            <Image src="/icons/icon_twitter_black.png" alt="twitter icon" width="24" height="24" />

                                        </a>

                                        <a href="#">

                                            <Image src="/icons/icon_instagram_black.png" alt="instagram icon" width="24" height="24" />

                                        </a>

                                        <a href="#">

                                            <Image src="/icons/icon_linkedin_black.png" alt="linkedin icon" width="24" height="24" />

                                        </a>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </SwiperSlide>
                );
            })}
        </Swiper>
    )
}

export default Team;