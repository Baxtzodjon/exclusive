import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
    title: "Exclusive",
    description: "An e-commerce website enables buying and selling products or services online. It includes features like product listings, shopping carts and secure payments.",
    icons: {
        icon: '/icons/favicon.ico',
    },
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex">

            <Sidebar />

            {children}

        </div>
    );
}