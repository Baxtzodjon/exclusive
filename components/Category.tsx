"use client"

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Texts from "./Texts";

const Category = () => {

    const { isSignedIn } = useUser();

    const category = [
        { name: 'Phones', link: '/categories/phones', icon: '/icons/category_phone.png' },
        { name: 'Computers', link: '/categories/computers', icon: '/icons/computer_icon.png' },
        { name: 'SmartWatch', link: '/categories/smartWatches', icon: '/icons/smartwatch_icon.png' },
        { name: 'Camera', link: '/categories/camera', icon: '/icons/category_camera.png' },
        { name: 'HeadPhones', link: '/categories/headphones', icon: '/icons/headphone_icon.png' },
        { name: 'Gaming', link: '/categories/gaming', icon: '/icons/gamepad_icon.png' },
    ];

    const handleCategoryClick = (link: string) => {
        if (!isSignedIn) {
            alert("Please login or register!");
            window.location.href = 'https://musical-chipmunk-42.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F';
            return;
        }
    };

    return (
        <div className="flex flex-wrap sm:flex-col gap-[60px] pt-[80px]">

            <div>

                <div className="mx-auto bg-[#000000] max-w-[1170px] h-[1px] opacity-[30%]"></div>

            </div>

            <div className="w-full max-w-[1200px] mx-auto px-4">

                <Texts text_small="Categories" text_big="Browse By Category" />

            </div>

            <div className="flex items-center justify-center flex-wrap gap-[30px]">

                {
                    category.map((item, i) => {

                        return (
                            <div className="w-[170px] h-[145px] border-2 border-[#0000004D] flex items-center justify-center flex-col gap-4 bg-transparent hover:bg-[#DB4444] hover:border-none rounded text-[#000000] hover:text-[#FFFFFF] transition-all" key={i}>

                                <Image src={item.icon} alt={`${item.name}` + "icon"} width="45" height="45" />

                                {/* <Link href={item.link} className="text-[16px] font-normal leading-[24px]">{item.name}</Link> */}

                                <SignedOut>

                                    <span className="cursor-pointer" onClick={() => handleCategoryClick(item.link)}>{item.name}</span>
                                    
                                </SignedOut>

                                <SignedIn>

                                    <Link href={item.link} className="text-[16px] font-normal leading-[24px]" onClick={() => handleCategoryClick(item.link)}>{item.name}</Link> {/* Для авторизованных пользователей */}

                                </SignedIn>

                            </div>
                        )
                    })
                }

            </div>

            <div>

                <div className="mx-auto bg-[#000000] max-w-[1170px] h-[1px] opacity-[30%]"></div>

            </div>

        </div>
    )
}

export default Category;