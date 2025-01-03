"use client"

import Image from "next/image";
import Link from "next/link";

const page = () => {
    return (
        <div className="container mx-auto flex items-center justify-center flex-wrap sm:gap-[20px] lg:gap-[129px] mt-[60px] mb-[140px]">

            <Image src="/images/side_image.png" alt="side image" width="760" height="781" className="sm:p-4 lg:p-0" />

            <div className="w-[371px] h-[530px] flex justify-center flex-col gap-12">

                <div className="flex flex-col gap-6">

                    <h1 className="text-[#000000] text-[36px] leading-[36px]" style={{ letterSpacing: "4%" }}>Log in to Exclusive</h1>

                    <p className="text-[#000000] text-[16px] font-normal leading-[24px]">Enter your details below</p>

                </div>

                <form action="" className="flex flex-col gap-10">

                    <input type="text" placeholder="Email" className="border-b border-[#000000] outline-none text-[#000000] text-[16px] font-normal leading-[24px]" />

                    <input type="text" placeholder="Password" className="border-b border-[#000000] outline-none text-[#000000] text-[16px] font-normal leading-[24px]" />

                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded">Error message</div>

                    <div className="flex items-center justify-center flex-col gap-[34px]">

                        <Link href="/register" className="w-[371px] h-[56px] bg-[#DB4444] rounded flex items-center justify-center text-[#FAFAFA] text-[16px] font-medium leading-[24px]">Log In</Link>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default page;