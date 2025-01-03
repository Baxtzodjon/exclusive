"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import SearchInput from "./SearchInput";

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [wishlistCount, setWishlistCount] = useState<number>(0);
    const [cartCount, setCartCount] = useState<number>(0);
    const pathname = usePathname();

    const menus = [
        { name: 'Home', link: '/' },
        { name: 'Contact', link: '/contact' },
        { name: 'About', link: '/about' },
    ];

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        const savedCart = localStorage.getItem('cart');
        if (savedWishlist) {
            const productIds = JSON.parse(savedWishlist);
            setWishlistCount(productIds.length);
        }
        if (savedCart) {
            const cartIds = JSON.parse(savedCart);
            setCartCount(cartIds.length);
        }
    }, []);

    const { isSignedIn } = useUser();

    const handleAddToSignLogin = () => {
        if (!isSignedIn) {
            window.location.href = '/sign-in';
            return;
        }
    };

    return (
        <>

            <div className="w-full h-fit sm:h-12 bg-[#000000] flex items-center justify-center flex-wrap gap-2 p-2 sm:p-0">

                <p className="text-[#FFFFFF] text-[10px] sm:text-[12px] md:text-[14px] font-normal leading-[21px] text-center sm:text-start">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>

                <Link href="/" className="border-b border-[#FAFAFA] text-[#FFFFFF] text-[10px] sm:text-[12px] md:text-[14px] font-semibold leading-[24px]">ShopNow</Link>

                <select className="hidden sm:block absolute sm:right-[10px] lg:right-[165px] border-none bg-transparent text-[#FAFAFA] sm:text-[12px] md:text-[14px] font-normal leading-[21px]">

                    <option value="english">English</option>

                </select>

            </div>

            <header className="w-full max-w-[1230px] mx-auto flex items-center justify-between py-4 px-6 bg-white">

                <Link href="/">

                    <Image src="/images/logo.png" alt="logo" width={118} height={24} />

                </Link>

                <nav className="hidden xl:flex items-center gap-12">

                    {
                        menus.map((menu, i) => {
                            return (
                                <Link href={menu.link} key={i} className={`text-[#000000] text-[16px] font-normal leading-6 text-center hover:border-b border-[#000000] transition-all ${pathname === menu.link ? 'border-b border-[#000000]' : ''}`}>{menu.name}</Link>
                            )
                        })
                    }

                    <SignedOut>
                        <SignInButton>
                            <button className="text-[#000000] text-[16px] font-normal leading-6 text-center hover:border-b border-[#000000] transition-all">Sign In</button>
                        </SignInButton>
                    </SignedOut>

                    {/* <SignedOut>
                        <button
                            className="text-[#000000] text-[16px] font-normal leading-6 text-center hover:border-b border-[#000000] transition-all"
                            onClick={() => handleAddToSignLogin()}
                        >
                            Sign-in
                        </button>
                    </SignedOut> */}

                </nav>

                <div className="flex items-center gap-4">

                    <SearchInput />

                    <div className="flex items-center gap-4">

                        <Link href="/wishlist" className="relative">

                            <Image src="/icons/heart_icon.png" alt="heart icon" width={20} height={20} className="cursor-pointer" />

                            {wishlistCount > 0 && (
                                <span className="absolute top-[-5px] right-[-5px] bg-[#DB4444] text-[#FAFAFA] text-[12px] font-normal leading-[18px] text-center rounded-full w-4 h-4 flex items-center justify-center">{wishlistCount}</span>
                            )}

                        </Link>

                        <Link href="/cart" className="relative">

                            <Image src="/icons/cart_icon.png" alt="cart icon" width={24} height={24} className="cursor-pointer" />

                            {cartCount > 0 && (
                                <span className="absolute top-[-5px] right-[-5px] bg-[#DB4444] text-[#FAFAFA] text-[12px] font-normal leading-[18px] text-center rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
                            )}

                        </Link>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                    </div>

                    <Image
                        src="/icons/hamburger_menu.png"
                        alt="hamburger menu"
                        width={20}
                        height={20}
                        className="cursor-pointer xl:hidden block"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />

                </div>

                {isMenuOpen && (

                    <div className="absolute top-16 sm:top-24 left-0 w-full bg-white flex flex-col items-center gap-4 py-4 xl:hidden z-10">

                        <div className="relative w-full px-6">

                            <Image src="/icons/search_icon.png" alt="search icon" width={20} height={20} className="absolute top-[8px] right-[32px]" />

                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="text-[#000000] text-[12px] font-normal leading-[18px] w-full h-[38px] px-3 bg-[#F5F5F5] rounded focus:outline-[#DB4444]"
                            />

                        </div>

                        <Link href="/" className="text-[#000000] text-[16px] font-normal leading-6 text-center">
                            Home
                        </Link>

                        <Link href="/contact" className="text-[#000000] text-[16px] font-normal leading-6 text-center">
                            Contact
                        </Link>

                        <Link href="/about" className="text-[#000000] text-[16px] font-normal leading-6 text-center">
                            About
                        </Link>

                        <SignedOut>
                            <SignInButton>
                                <button className="text-[#000000] text-[16px] font-normal leading-6 text-center hover:border-b border-[#000000] transition-all">Sign In</button>
                            </SignInButton>
                        </SignedOut>

                        {/* <SignedOut>
                            <button
                                className="text-[#000000] text-[16px] font-normal leading-6 text-center hover:border-b border-[#000000] transition-all"
                                onClick={() => handleAddToSignLogin()}
                            >
                                Sign-in
                            </button>
                        </SignedOut> */}

                        <div className="text-[#000000] text-[16px] font-normal leading-6 text-center sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            Close
                        </div>

                    </div>

                )}

            </header>

            <div className="relative top-0 left-0 w-full h-[1px] bg-[#000000] opacity-30"></div>

        </>
    )
}

export default Header;