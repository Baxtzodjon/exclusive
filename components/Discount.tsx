"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import PrevNext from "./PrevNext";

interface DiscountProps {
  discount: any;
}

const Discount: React.FC<DiscountProps> = ({ discount }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setminutes] = useState(0);
  const [seconds, setseconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date().getTime();
      const distance = (discount - now) / 1000;
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
  }, [discount])

  return (
    <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between px-4">

      <div className="flex flex-col gap-6">

        <div className="flex items-center gap-4">

          <div className="w-[20px] h-[40px] bg-[#DB4444] rounded"></div>

          <small className="text-[#DB4444] text-[16px] font-semibold leading-[20px]">Today's</small>

        </div>

        <div className="flex items-center gap-[87px]">

          <h3 className="text-[#000000] text-[36px] font-semibold leading-[48px]" style={{ letterSpacing: "4%" }}>Flash Sales</h3>

          <div className="flex gap-[17px]">

            <div className="flex flex-col gap-1">

              <small className="text-[#000000] text-[12px] font-medium leading-[18px]">Days</small>

              <small className="text-[#000000] text-[32px] font-bold leading-[30px]" style={{ letterSpacing: '4%' }}>{days}</small>

            </div>

            <div className="text-[#E07575] text-[32px]">:</div>

            <div className="flex flex-col gap-1">

              <small className="text-[#000000] text-[12px] font-medium leading-[18px]">Hours</small>

              <small className="text-[#000000] text-[32px] font-bold leading-[30px]" style={{ letterSpacing: '4%' }}>{hours}</small>

            </div>

            <div className="text-[#E07575] text-[32px]">:</div>

            <div className="flex flex-col gap-1">

              <small className="text-[#000000] text-[12px] font-medium leading-[18px]">Minutes</small>

              <small className="text-[#000000] text-[32px] font-bold leading-[30px]" style={{ letterSpacing: '4%' }}>{minutes}</small>

            </div>

            <div className="text-[#E07575] text-[32px]">:</div>

            <div className="flex flex-col gap-1">

              <small className="text-[#000000] text-[12px] font-medium leading-[18px]">Seconds</small>

              <small className="text-[#000000] text-[32px] font-bold leading-[30px]" style={{ letterSpacing: '4%' }}>{seconds}</small>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Discount;