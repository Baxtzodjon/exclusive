"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DropdownMenu = () => {

    const [open, setOpen] = useState(false);
    const menuRef: any = useRef();
    const imgRef: any = useRef();

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (e.target !== menuRef.current && e.target !== imgRef.current) {
                setOpen(false);
            }
        });
    }, []);

    return (
        <div className="relative">

            <div className="w-[32px] h-[32px] bg-[#DB4444] rounded-full flex items-center justify-center cursor-pointer" onClick={() => setOpen(!open)}>

                <Image src="/icons/icon_user.png" alt="user icon" width="24" height="24" ref={imgRef} />

            </div>

            {open && (
                <div className="profile_drop" ref={menuRef}>

                    <Link href="/" className="text-[#FAFAFA] text-[14px] font-normal leading-[21px] flex items-center gap-4 p-[4px] rounded hover:bg-[#DB4444] transition-all"><Image src="/icons/icon_user.png" alt="user icon" width="24" height="24" />Manage My Account</Link>

                    <Link href="/" className="text-[#FAFAFA] text-[14px] font-normal leading-[21px] flex items-center gap-4 p-[4px] rounded hover:bg-[#DB4444] transition-all"><Image src="/icons/icon_mallbag.png" alt="mallbag icon" width="24" height="24" />My Order</Link>

                    <Link href="/" className="text-[#FAFAFA] text-[14px] font-normal leading-[21px] flex items-center gap-4 p-[4px] rounded hover:bg-[#DB4444] transition-all"><Image src="/icons/icon_reviews.png" alt="" width="24" height="24" />My Reviews</Link>

                    <Link href="/" className="text-[#FAFAFA] text-[14px] font-normal leading-[21px] flex items-center gap-4 p-[4px] rounded hover:bg-[#DB4444] transition-all"><Image src="/icons/icon_logout.png" alt="" width="24" height="24" />Logout</Link>

                </div>
            )}

        </div>
    )
}

export default DropdownMenu;