"use client"

import Image from "next/image";

interface PrevNextProps {
    nextSlide: () => void;
    prevSlide: () => void;
}

const PrevNext: React.FC<PrevNextProps> = ({ nextSlide, prevSlide }) => {
    return (
        <div className="flex gap-2">

            <button className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[46px] h-[46px] bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#DB4444] transition-all" onClick={prevSlide}>

                <Image src="/icons/icons_arrow_right.png" alt="arrow top icon" width="24" height="24" className="rotate-[180deg]" />

            </button>

            <button className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[46px] h-[46px] bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#DB4444] transition-all" onClick={nextSlide}>

                <Image src="/icons/icons_arrow_right.png" alt="arrow top icon" width="24" height="24" />

            </button>

        </div>
    )
}

export default PrevNext;