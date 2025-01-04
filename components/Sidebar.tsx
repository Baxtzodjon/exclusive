"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {

    const menus = [
        { name: 'Dashboard', link: '/admin', icon: '/icons/admin_home_icon.svg' },
        { name: 'Add-Product', link: '/admin/add-product', icon: '/icons/admin_plus_square_icon.svg' },
        { name: 'All-Products', link: '/admin/all-products', icon: '/icons/admin_boxes_icon.svg' },
        { name: 'All-Banners', link: '/admin/all-banners', icon: '/icons/admin_add_image_photo_icon.svg' },
    ];

    const [open, setOpen] = useState(true);
    const pathname = usePathname();

    return (
        <div className={`bg-[#000000] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>

            <div className="py-3 flex justify-end">

                <Image src="/icons/admin_align_right_icon.svg" alt="admin_align_right_icon" width="26" height="26" className="cursor-pointer" onClick={() => setOpen(!open)} />

            </div>

            <div className="mt-4 flex flex-col gap-4 relative">

                {
                    menus.map((menu, i) => {
                        return (
                            <Link href={menu.link} className={pathname === menu.link ? 'group flex items-center gap-3.5 text-sm font-medium p-2 bg-[#DB4444] rounded-md' : 'group flex items-center gap-3.5 text-sm hover:bg-[#DB4444] font-medium p-2 rounded-md'} key={i}>

                                <Image src={menu.icon} alt={menu.name} width="20" height="20" />

                                <h2 className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`} style={{ transitionDelay: `${i + 3}00ms` }}>{menu.name}</h2>

                                <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>{menu.name}</h2>

                            </Link>
                        );
                    })
                }

            </div>

        </div>
    )
}

export default Sidebar;