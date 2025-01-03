"use client"

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link"
import { useState } from "react";

const page = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are necesarry.");
            return;
        }

        try {
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    };
    return (
        <div className="container mx-auto flex items-center justify-center flex-wrap sm:gap-[20px] lg:gap-[129px] mt-[60px] mb-[140px]">

            <Image src="/images/side_image.png" alt="side image" width="760" height="781" className="sm:p-4 lg:p-0" />

            <div className="w-[371px] h-[530px] flex justify-center flex-col gap-12">

                <div className="flex flex-col gap-6">

                    <h1 className="text-[#000000] text-[36px] leading-[36px]" style={{ letterSpacing: "4%" }}>Create an account</h1>

                    <p className="text-[#000000] text-[16px] font-normal leading-[24px]">Enter your details below</p>

                </div>

                <form action="" className="flex flex-col gap-10" onSubmit={handleSubmit}>

                    <input type="text" placeholder="Name" className="border-b border-[#000000] outline-none text-[#000000] text-[16px] font-normal leading-[24px]" onChange={e => setName(e.target.value)} />

                    <input type="text" placeholder="Email" className="border-b border-[#000000] outline-none text-[#000000] text-[16px] font-normal leading-[24px]" onChange={e => setEmail(e.target.value)} />

                    <input type="text" placeholder="Password" className="border-b border-[#000000] outline-none text-[#000000] text-[16px] font-normal leading-[24px]" onChange={e => setPassword(e.target.value)} />

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded">{error}</div>
                    )}

                    <div className="flex items-center justify-center flex-col gap-[34px]">

                        <Link href="/" className="w-[371px] h-[56px] bg-[#DB4444] rounded flex items-center justify-center text-[#FAFAFA] text-[16px] font-medium leading-[24px]">Create Account</Link>

                        <div className="flex items-center justify-center gap-4">

                            <small className="text-[#000000] text-[16px] font-normal leading-[24px] opacity-[70%]">Already have account?</small>

                            <Link href="/" className="text-[#000000] text-[16px] font-medium leading-[24px] opacity-[70%] border-b border-[#000000]">Log in</Link>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default page;