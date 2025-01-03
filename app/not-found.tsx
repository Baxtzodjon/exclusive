"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";

const notFound = () => {

    const [path, setPath] = useState('');

    useEffect(() => {
        const currentPath = window.location.pathname;
        setPath(currentPath);
    }, []);

    return (
        <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col gap-10 sm:gap-20">

            <div className="flex items-center justify-center flex-col gap-5 sm:gap-10">

                <h1 className="text-[#000000] text-[60px] sm:text-[80px] md:text-[110px] font-medium leading-[115px] text-center" style={{ letterSpacing: "3%" }}>404 Not Found</h1>

                <p className="text-[#000000] text-[16px] font-normal leading-[24px] text-center">Your visited page not found. You may go home page.</p>

            </div>

            <Link href="/" className="flex items-center justify-center w-[254px] h-[56px] bg-[#DB4444] rounded text-[#FAFAFA] text-[16px] font-medium leading-[24px]">Back to home page</Link>

        </div>
    )
}

export default notFound;