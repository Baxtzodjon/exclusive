"use client"

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    const { isSignedIn } = useUser();

    const handleAddToSignLogin = () => {
        if (!isSignedIn) {
            alert("Please login or register!");
            window.location.href = 'https://musical-chipmunk-42.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F';
            return;
        }
    };

    return (
        <footer className="w-full bg-[#000000] text-[#FFFFFF] flex justify-center flex-wrap gap-[87px] px-[5px] pt-20 pb-[124px] relative">

            <div className="flex flex-col gap-4 flex-wrap">

                <div className="flex flex-col flex-wrap gap-6">

                    <a href="#">

                        <Image src="/images/logo_white.png" alt="logo" width="118" height="24" />

                    </a>

                    <h4 className="text-[#FAFAFA] text-[20px] font-medium leading-[28px]">Subscribe</h4>

                    <p className="text-[#FAFAFA] text-[16px] font-normal leading-[24px]">Get 10% off your first order</p>

                </div>

                <div className="relative">

                    <Image src="/icons/icon_send.png" alt="send icon" width="24" height="24" className="absolute top-3 right-4" />

                    <input type="text" placeholder="Enter your email" className="w-[217px] h-[48px] bg-transparent rounded border-2 border-[#FAFAFA] outline-none text-[#FAFAFA] text-[16px] font-normal leading-[24px] px-4 focus:border-[#DB4444]" />

                </div>

            </div>

            <div className="flex flex-col flex-wrap gap-6">

                <h4 className="text-[#FAFAFA] text-[20px] font-medium leading-[28px]">Support</h4>

                <div className="flex justify-center flex-col flex-wrap gap-4">

                    <address className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] not-italic">111 Bijoy sarani, Dhaka, <br />  DH 1515, Bangladesh.</address>

                    <a href="mailto:rasulovbaxtzod@gmail.com" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all">exclusive@gmail.com</a>

                    <a href="tel:+88015888889999" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all">+88015-88888-9999</a>

                </div>

            </div>

            <div className="flex flex-col flex-wrap gap-6">

                <h4 className="text-[#FAFAFA] text-[20px] font-medium leading-[28px]">Account</h4>

                <div className="flex justify-center flex-col flex-wrap gap-4">

                    <Link href="/" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all">My Account</Link>

                    <Link href="/" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all">Login / Register</Link>

                    <SignedOut>

                        <span className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all cursor-pointer" onClick={() => handleAddToSignLogin()}>Cart</span>

                    </SignedOut>

                    <SignedIn>

                        <Link href="/cart" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all" onClick={() => handleAddToSignLogin()}>Cart</Link>

                    </SignedIn>

                    <SignedOut>

                        <span className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all cursor-pointer" onClick={() => handleAddToSignLogin()}>Wishlist</span>

                    </SignedOut>

                    <SignedIn>

                        <Link href="/wishlist" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all" onClick={() => handleAddToSignLogin()}>Wishlist</Link>

                    </SignedIn>

                    <Link href="/" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all">Shop</Link>

                </div>

            </div>

            <div className="flex flex-col flex-wrap gap-6">

                <h4 className="text-[#FAFAFA] text-[20px] font-medium leading-[28px]">Quick Link</h4>

                <div className="flex justify-center flex-col flex-wrap gap-4">

                    <Link href="/" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all">Privacy Policy</Link>

                    <Link href="/" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all">Terms Of Use</Link>

                    <Link href="/" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all">FAQ</Link>

                    <SignedOut>

                        <span className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all cursor-pointer" onClick={() => handleAddToSignLogin()}>Contact</span>

                    </SignedOut>

                    <SignedIn>

                        <Link href="/contact" className="text-[#FAFAFA] text-[16px] font-normal leading-[24px] hover:text-[#DB4444] transition-all" onClick={() => handleAddToSignLogin()}>Contact</Link>

                    </SignedIn>

                </div>

            </div>

            <div className="flex flex-col flex-wrap gap-6">

                <h4 className="text-[#FAFAFA] text-[20px] font-medium leading-[28px]">Download App</h4>

                <div className="flex flex-col flex-wrap gap-2">

                    <p>Save $3 with App New User Only</p>

                    <div className="flex gap-2">

                        <Image src="/images/qr_code.png" alt="qr code" width="80" height="80" />

                        <div className="flex justify-center flex-col gap-2">

                            <a href="https://play.google.com">

                                <Image src="/images/google_play.png" alt="google play" width="104" height="30" />

                            </a>

                            <a href="https://apps.apple.com">

                                <Image src="/images/app_store.png" alt="app store" width="104" height="34" />

                            </a>

                        </div>

                    </div>

                </div>

                <div className="flex gap-6">

                    <a href="https://facebook.com">

                        <Image src="/icons/icon_facebook.png" alt="facebook icon" width="24" height="24" />

                    </a>

                    <a href="https://twitter.com">

                        <Image src="/icons/icon_twitter.png" alt="twitter icon" width="24" height="24" />

                    </a>

                    <a href="https://instagram.com">

                        <Image src="/icons/icon_instagram.png" alt="instagram icon" width="24" height="24" />

                    </a>

                    <a href="https://linkedin.com">

                        <Image src="/icons/icon_linkedin.png" alt="linkedin icon" width="24" height="24" />

                    </a>

                </div>

            </div>

            <div className="absolute bottom-16 bg-[#FFFFFF] opacity-[40%] w-full h-[1px]"></div>

            <p className="absolute bottom-6 opacity-[60%] text-[#FFFFFF] text-[16px] font-normal leading-[24px]">&copy; Copyright Rimel 2022. All right reserved</p>

        </footer>
    )
}

export default Footer;