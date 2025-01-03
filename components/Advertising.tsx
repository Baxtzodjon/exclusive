"use client"

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { setServers } from "dns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface CountdownProps {
    newDays: any
};

const Advertising: React.FC<CountdownProps> = ({ newDays }) => {

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setminutes] = useState(0);
    const [seconds, setseconds] = useState(0);
    const { isSignedIn } = useUser();

    useEffect(() => {
        const timerId = setInterval(() => {
            const now = new Date().getTime();
            const distance = (newDays - now) / 1000;
            if (distance > 0) {
                const days = Math.floor(distance / 60 / 60 / 24);
                const hours = Math.floor(distance / 60 / 60 % 24);
                const minutes = Math.floor((distance / 60) % 60);
                const seconds = Math.floor(distance % 60);
                setDays(days);
                setHours(hours);
                setminutes(minutes);
                setseconds(seconds);
            } else {
                clearInterval(timerId)
            }
        }, 1000)
        return () => clearInterval(timerId)
    }, [newDays])

    const handleAddToSignLogin = () => {
        if (!isSignedIn) {
            alert("Please login or register!");
            window.location.href = 'https://musical-chipmunk-42.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F';
            return;
        }
    };

    return (
        <div className="relative mx-auto max-w-[1170px] h-fit lg:h-[500px] bg-[#000000] flex items-center justify-center flex-wrap lg:flex-nowrap gap-[27px] mt-[140px] mb-[71px] p-10">

            <div className="flex items-center justify-center lg:items-start lg:justify-start flex-col gap-10">

                <div className="flex items-center justify-center lg:items-start lg:justify-start flex-wrap lg:flex-col gap-8">

                    <h5 className="text-[#00FF66] text-[16px] font-semibold leading-[20px]">Categories</h5>

                    <h1 className="text-[#FAFAFA] text-[48px] font-semibold leading-[60px] text-center lg:text-start" style={{ letterSpacing: "4px" }}>Enhance Your Music Experience</h1>

                    <div className="flex items-center gap-6">

                        <div className="w-[62px] h-[62px] bg-[#FFFFFF] rounded-full flex items-center justify-center flex-col">

                            <small className="text-[#000000] text-[16px] font-semibold leading-[20px]">{days}</small>

                            <small className="text-[#000000] text-[11px] font-normal leading-[18px]">Days</small>

                        </div>

                        <div className="w-[62px] h-[62px] bg-[#FFFFFF] rounded-full flex items-center justify-center flex-col">

                            <small className="text-[#000000] text-[16px] font-semibold leading-[20px]">{hours}</small>

                            <small className="text-[#000000] text-[11px] font-normal leading-[18px]">Hours</small>

                        </div>

                        <div className="w-[62px] h-[62px] bg-[#FFFFFF] rounded-full flex items-center justify-center flex-col">

                            <small className="text-[#000000] text-[16px] font-semibold leading-[20px]">{minutes}</small>

                            <small className="text-[#000000] text-[11px] font-normal leading-[18px]">Minutes</small>

                        </div>

                        <div className="w-[62px] h-[62px] bg-[#FFFFFF] rounded-full flex items-center justify-center flex-col">

                            <small className="text-[#000000] text-[16px] font-semibold leading-[20px]">{seconds}</small>

                            <small className="text-[#000000] text-[11px] font-normal leading-[18px]">Seconds</small>

                        </div>

                    </div>

                </div>

                <SignedOut>

                    <button className="w-[171px] h-[56px] bg-[#00FF66] rounded text-[#FAFAFA] text-[16px] font-medium leading-[24px] flex items-center justify-center" onClick={() => handleAddToSignLogin()}>Buy Now!</button>

                </SignedOut>

                <SignedIn>

                    <Link href={"/categories/headphones"} className="w-[171px] h-[56px] bg-[#00FF66] rounded text-[#FAFAFA] text-[16px] font-medium leading-[24px] flex items-center justify-center" onClick={() => handleAddToSignLogin()}>Buy Now!</Link>

                </SignedIn>

            </div>

            <div className="absolute top-0 right-[60px] w-[504px] h-[500px] rounded-full bg-[#D9D9D9] opacity-[30%] hidden lg:flex"></div>

            <Image src="/images/speaker.png" alt="speaker icon" width="568" height="330" className="lg:relative" />

        </div>
    )
}

export default Advertising;