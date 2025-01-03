"use client"

import Image from "next/image";

const Story = () => {
    return (
        <div className="container mx-auto flex items-center justify-center flex-wrap gap-[75px] p-2 sm:p-0 mt-[100px]">

            <div className="flex flex-col gap-5 sm:gap-10">

                <h1 className="text-[#000000] text-[42px] sm:text-[54px] font-semibold leading-[64px]" style={{ letterSpacing: "6%" }}>Our Story</h1>

                <div className="flex flex-col gap-6">

                    <p className="w-fit sm:w-[525px] text-[#000000] text-[16px] font-normal leading-[26px]">Launced in 2015, Exclusive is South Asia's premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.</p>

                    <p className="w-fit sm:w-[505px]">Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>

                </div>

            </div>

            <Image src="/images/humans.png" alt="humans image" width="705" height="609" />

        </div>
    )
}

export default Story;