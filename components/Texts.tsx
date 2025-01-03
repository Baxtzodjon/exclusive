"use client"

import React from "react"

interface TextsProps {
    text_small: string
    text_big: string
}

const Texts: React.FC<TextsProps> = ({ text_small, text_big }) => {
    return (
        <div className="flex flex-col gap-5"> {/* flex-wrap lg:flex-col px-4 lg:px-[175px] */}

            <div className="flex items-center gap-4">

                <div className="w-[20px] h-[40px] rounded bg-[#DB4444]"></div>

                <small className="text-[#DB4444] text-sm lg:text-[16px] font-semibold leading-[20px]">{text_small}</small>

            </div>

            <h1 className="text-[#000000] text-3xl lg:text-[36px] font-semibold leading-tight lg:leading-[48px]" style={{ letterSpacing: '1px' }}>{text_big}</h1>

        </div>
    )
}

export default Texts;