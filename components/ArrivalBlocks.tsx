"use client"

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Texts from "./Texts";

const ArrivalBlock = () => {
    const { isSignedIn } = useUser();

    const handleAddToSignLogin = () => {
        if (!isSignedIn) {
            alert("Please login or register!");
            window.location.href = 'https://musical-chipmunk-42.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F';
            return;
        }
    };

    return (
        <div className="flex flex-wrap sm:flex-col gap-[60px] my-[100px]">

            <div className="w-full max-w-[1200px] mx-auto px-4">

                <Texts text_small="Featured" text_big="New Arrival" />

            </div>

            <div className="flex items-center justify-center flex-wrap gap-0 sm:gap-[30px]">

                <div className="relative w-full sm:w-[570px] h-fit sm:h-[600px] bg-[#000000] rounded flex items-center md:items-end justify-center m-5 sm:m-0">

                    <Image src="/images/playstation.png" alt="playstation" width="511" height="511" />

                    <div className="absolute left-4 bottom-4 sm:left-8 sm:bottom-8 flex items-start justify-start flex-col gap-1 sm:gap-4">

                        <h4 className="text-[#FAFAFA] text-[24px] font-semibold leading-[24px]" style={{ letterSpacing: "3%" }}>PlayStation 5</h4>

                        <p className="text-[#FAFAFA] text-[14px] font-normal leading-[21px]">Black and White version of the PS5 <br /> coming out on sale.</p>

                        <SignedOut>

                            <span className="text-[#FFFFFF] text-[16px] font-medium leading-[24px] border-b border-[#FFFFFF] hover:border-none transition-all cursor-pointer" onClick={() => handleAddToSignLogin()}>Shop Now</span>

                        </SignedOut>

                        <SignedIn>

                            <Link href="/categories/gaming" className="text-[#FFFFFF] text-[16px] font-medium leading-[24px] border-b border-[#FFFFFF] hover:border-none transition-all" onClick={() => handleAddToSignLogin()}>Shop Now</Link>

                        </SignedIn>

                    </div>

                </div>

                <div className="flex flex-col gap-[32px] m-5 sm:m-0">

                    <div className="relative w-full sm:w-[570px] h-[284px] bg-[#0D0D0D] rounded flex items-end justify-end">

                        <Image src="/images/macbook_pro_m3_max.png" alt="mackbook" width="332" height="286" />

                        <div className="absolute left-3 bottom-3 sm:left-6 sm:bottom-6 flex items-start justify-start flex-col gap-4">

                            <h4 className="text-[#FAFAFA] text-[24px] font-semibold leading-[24px]" style={{ letterSpacing: "3%" }}>Computers Collections</h4>

                            <p className="text-[#FAFAFA] text-[14px] font-normal leading-[21px]">Discover the perfect blend of performance and <br /> design with our premium selection of computers.</p>

                            <SignedOut>

                                <span className="text-[#FFFFFF] text-[16px] font-medium leading-[24px] border-b border-[#FFFFFF] hover:border-none transition-all cursor-pointer" onClick={() => handleAddToSignLogin()}>Shop Now</span>

                            </SignedOut>

                            <SignedIn>

                                <Link href="/categories/computers" className="text-[#FFFFFF] text-[16px] font-medium leading-[24px] border-b border-[#FFFFFF] hover:border-none transition-all" onClick={() => handleAddToSignLogin()}>Shop Now</Link>

                            </SignedIn>

                        </div>

                    </div>

                    <div className="flex gap-[30px]">

                        <div className="relative w-fit h-[250px] sm:w-[270px] sm:h-[284px] bg-[#000000] rounded flex items-center justify-center p-2 sm:p-0">

                            <Image src="/images/speakers.png" alt="speaker" width="190" height="221" />

                            <div className="absolute left-3 bottom-3 sm:left-6 sm:bottom-6 flex items-start justify-start flex-col gap-2">

                                <h4 className="text-[#FAFAFA] text-[24px] font-semibold leading-[24px]" style={{ letterSpacing: "3%" }}>Speakers</h4>

                                <p className="text-[#FAFAFA] text-[14px] font-normal leading-[21px]">Amazon wireless speakers</p>

                                <SignedOut>

                                    <span className="text-[#FFFFFF] text-[16px] font-medium leading-[24px] border-b border-[#FFFFFF] hover:border-none transition-all cursor-pointer" onClick={() => handleAddToSignLogin()}>Shop Now</span>

                                </SignedOut>

                                <SignedIn>

                                    <Link href="/categories/headphones" className="text-[#FFFFFF] text-[16px] font-medium leading-[24px] border-b border-[#FFFFFF] hover:border-none transition-all" onClick={() => handleAddToSignLogin()}>Shop Now</Link>

                                </SignedIn>

                            </div>

                        </div>

                        <div className="relative w-fit h-[250px] sm:w-[270px] sm:h-[284px] bg-[#000000] rounded flex items-center justify-center p-2 sm:p-0">

                            <Image src="/images/generic_slr_digital_camera.png" alt="generic slr digital camera" width="701" height="303" />

                            <div className="absolute left-3 bottom-3 sm:left-6 sm:bottom-6 flex items-start justify-start flex-col gap-2">

                                <h4 className="text-[#FAFAFA] text-[24px] font-semibold leading-[24px]" style={{ letterSpacing: "3%" }}>Camera</h4>

                                <p className="text-[#FAFAFA] text-[14px] font-normal leading-[21px] uppercase">"Capture, create, elevate."</p>

                                <SignedOut>

                                    <span className="text-[#FFFFFF] text-[16px] font-medium leading-[24px] border-b border-[#FFFFFF] hover:border-none transition-all cursor-pointer" onClick={() => handleAddToSignLogin()}>Shop Now</span>

                                </SignedOut>

                                <SignedIn>

                                    <Link href="/categories/camera" className="text-[#FFFFFF] text-[16px] font-medium leading-[24px] border-b border-[#FFFFFF] hover:border-none transition-all" onClick={() => handleAddToSignLogin()}>Shop Now</Link>

                                </SignedIn>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ArrivalBlock;