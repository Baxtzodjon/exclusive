"use client"

import Image from "next/image";
import { useState } from "react";
import emailjs from '@emailjs/browser';

const page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const serviceId = "service_sha512n";
        const templateId = "template_lpfgy3w";
        const publicKey = "B8Vj1n9a77DivjGuN";

        const templateParams = {
            from_name: name,
            from_email: email,
            from_phone: phone,
            to_name: "Rasulov Baxtzod",
            message: message,
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                alert("Message sent successfully!");
                console.log("Message sent successfully:", response);
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
            })
            .catch((error) => {
                alert("Failed to send message. Please try again later.");
                console.error("Failed to send message:", error);
            })
    };

    return (
        <>

            <div className="w-full max-w-[1170px] mx-auto flex items-center justify-center flex-wrap gap-[20px] sm:gap-[40px] mt-[100px] mb-[140px]">

                <div className="w-[95%] lg:w-[360px] h-[457px] bg-[#FFFFFF] rounded p-10 sm:px-[35px] sm:py-[40px] shadow-lg m-5 sm:m-0">

                    <div className="flex items-center justify-center lg:items-start lg:justify-start flex-col gap-8">

                        <div className="flex flex-col gap-6">

                            <div className="flex items-center gap-4">

                                <div className="w-10 h-10 bg-[#DB4444] rounded-full flex item-center justify-center">

                                    <Image src="/icons/icon_telephone.png" alt="telephone icon" width="20" height="20" className="object-contain" />

                                </div>

                                <h5 className="text-[#000000] text-[16px] font-medium leading-[24px]">Call To Us</h5>

                            </div>

                            <div className="flex flex-col gap-4">

                                <p className="text-[#000000] text-[14px] font-normal leading-[21px]">We are available 24/7, 7 days a week.</p>

                                <small className="text-[#000000] text-[14px] font-normal leading-[21px]">Phone: <a href="tel:+8801611112222">+8801611112222</a></small>

                            </div>

                        </div>

                        <div className="w-[270px] h-[1px] bg-[#000000]"></div>

                        <div className="flex flex-col gap-6">

                            <div className="flex items-center gap-4">

                                <div className="w-10 h-10 bg-[#DB4444] rounded-full flex item-center justify-center">

                                    <Image src="/icons/icon_gmail.png" alt="send icon" width="20" height="20" className="object-contain" />

                                </div>

                                <h5 className="text-[#000000] text-[16px] font-medium leading-[24px]">Write To US</h5>

                            </div>

                            <div className="flex flex-col gap-4">

                                <p className="text-[#000000] text-[14px] font-normal leading-[21px] w-[250px]">Fill out our form and we will contact you within 24 hours.</p>

                                <small className="text-[#000000] text-[14px] font-normal leading-[21px]">Emails: customer@exclusive.com</small>

                                <p className="text-[#000000] text-[14px] font-normal leading-[21px]">Emails: support@exclusive.com</p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="w-full lg:w-fit h-fit lg:h-[457px] bg-[#FFFFFF] rounded shadow-lg flex items-center justify-center p-5 sm:p-0 m-5 lg:m-0">

                    <form className="flex items-center justify-center flex-wrap md:flex-col gap-8 sm:p-4 lg:p:0" onSubmit={handleSubmit}>

                        <div className="flex items-center justify-center flex-wrap gap-4">

                            <input type="text" name="name" value={name} placeholder="Your Name *" className="w-full lg:w-[235px] h-[50px] bg-[#F5F5F5] rounded outline-[#DB4444] p-4 text-[#000000] text-[16px] font-normal leading-[24px]" onChange={(e) => setName(e.target.value)} required />

                            <input type="email" name="email" value={email} placeholder="Your Email *" className="w-full lg:w-[235px] h-[50px] bg-[#F5F5F5] rounded outline-[#DB4444] p-4 text-[#000000] text-[16px] font-normal leading-[24px]" onChange={(e) => setEmail(e.target.value)} required />

                            <input type="tel" name="phone" value={phone} placeholder="Your Phone *" className="w-full lg:w-[235px] h-[50px] bg-[#F5F5F5] rounded outline-[#DB4444] p-4 text-[#000000] text-[16px] font-normal leading-[24px]" onChange={(e) => setPhone(e.target.value)} required />

                        </div>

                        <div className="w-full flex items-center sm:items-center lg:items-end flex-col gap-[32px]">

                            <textarea name="message" value={message} placeholder="Your Message" className="w-full lg:w-[737px] h-[207px] bg-[#F5F5F5] rounded outline-[#DB4444] p-4 resize-none text-[#000000] text-[16px] font-normal leading-[24px]" onChange={(e) => setMessage(e.target.value)}></textarea>

                            <button type="submit" className="w-full lg:w-[215px] h-[56px] bg-[#DB4444] rounded text-[#FFFFFF] text-[16px] font-medium leading-[24px] hover:bg-[#b83a3a]">Send Message</button>

                        </div>

                    </form>

                </div>

            </div>

        </>
    )
}

export default page;