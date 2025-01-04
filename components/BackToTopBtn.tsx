"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const BackToTopBtn = () => {

    const [backToTopBtn, setBackToTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTopBtn(true)
            } else {
                setBackToTopBtn(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <>

            {backToTopBtn && (
                <button className="fixed bottom-[32px] right-[20px] sm:right-[28px] lg:right-[89px] w-[46px] h-[46px] bg-[#F5F5F5] rounded-full flex items-center justify-center" onClick={scrollUp}>

                    <Image src="/icons/icons_arrow_right.png" alt="arrow top icon" width="24" height="24" className="rotate-[-90deg]" />

                </button>
            )}

        </>
    )
}

export default BackToTopBtn;