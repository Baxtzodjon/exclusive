import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Exclusive",
    description: "An e-commerce website enables buying and selling products or services online. It includes features like product listings, shopping carts and secure payments.",
    icons: {
        icon: '/icons/favicon.ico',
    },
};

export default function mainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>

            <Header />

            {children}

            <Footer />

        </>
    );
}