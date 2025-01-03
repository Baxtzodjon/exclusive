"use client"

import Image from "next/image";

const Services = () => {
    return (
        <div className="flex items-center justify-center gap-[32px] sm:[36px] lg:gap-[88px] flex-wrap py-[140px]">

            <div className="flex items-center justify-center flex-col gap-6">

                <div className="w-20 h-20 bg-[#2F2E304c] rounded-full flex items-center justify-center">

                    <div className="w-[58px] h-[58px] bg-[#000000] rounded-full flex items-center justify-center">

                        <Image src="/icons/icon_delivery.png" alt="delivery icon" width="40" height="40" />

                    </div>

                </div>

                <div className="flex items-center justify-center flex-col gap-2">

                    <h4 className="text-[#000000] text-[16px] sm:text-[20px] font-semibold leading-[28px] text-center lg:text-start">FREE AND FAST DELIVERY</h4>

                    <p className="text-[#000000] text-[14px] font-normal leading-[21px] text-center sm:text-start">Free delivery for all orders over $140</p>

                </div>

            </div>

            <div className="flex items-center justify-center flex-col gap-6">

                <div className="w-20 h-20 bg-[#2F2E304c] rounded-full flex items-center justify-center">

                    <div className="w-[58px] h-[58px] bg-[#000000] rounded-full flex items-center justify-center">

                        <Image src="/icons/icon_customer.png" alt="customer service icon" width="40" height="40" />

                    </div>

                </div>

                <div className="flex items-center justify-center flex-col gap-2">

                    <h4 className="text-[#000000] text-[16px] sm:text-[20px] font-semibold leading-[28px] text-center lg:text-start">24/7 CUSTOMER SERVICE</h4>

                    <p className="text-[#000000] text-[14px] font-normal leading-[21px] text-center sm:text-start">Friendly 24/7 customer support</p>

                </div>

            </div>

            <div className="flex items-center justify-center flex-col gap-6">

                <div className="w-20 h-20 bg-[#2F2E304c] rounded-full flex items-center justify-center">

                    <div className="w-[58px] h-[58px] bg-[#000000] rounded-full flex items-center justify-center">

                        <Image src="/icons/icon_secure.png" alt="delivery icon" width="40" height="40" />

                    </div>

                </div>

                <div className="flex items-center justify-center flex-col gap-2">

                    <h4 className="text-[#000000] text-[16px] sm:text-[20px] font-semibold leading-[28px] text-center lg:text-start">MONEY BACK GUARANTEE</h4>

                    <p className="text-[#000000] text-[14px] font-normal leading-[21px] text-center sm:text-start">We reurn money within 30 days</p>

                </div>

            </div>

        </div>
    )
}

export default Services;