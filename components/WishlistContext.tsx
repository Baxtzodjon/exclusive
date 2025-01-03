"use client"

import React, { createContext, useContext, useState, useEffect } from "react";

interface Product {
    _id: string;
    titles: string;
    description: string;
    price: string;
    reviews: any;
    images: string;
}

const WishlistContext = createContext<{
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
}>({
    wishlist: [],
    addToWishlist: () => { },
    removeFromWishlist: () => { },
});

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
            const productIds = JSON.parse(savedWishlist);
            fetchProductsByIds(productIds);
        }
    }, []);

    const fetchProductsByIds = async (ids: string[]) => {
        const res = await fetch(`http://localhost:3000/api/product`);
        const { data } = await res.json();
        const productsInWishlist = data.filter((product: Product) => ids.includes(product._id));
        setWishlist(productsInWishlist);
    };

    const addToWishlist = (product: Product) => {
        const updatedWishlist = [...wishlist, product];
        setWishlist(updatedWishlist);
        const updatedIds = updatedWishlist.map((product) => product._id);
        localStorage.setItem("wishlist", JSON.stringify(updatedIds));
    };
    
    const removeFromWishlist = (productId: string) => {
        const updatedWishlist = wishlist.filter((product) => product._id !== productId);
        setWishlist(updatedWishlist);
        const updatedIds = updatedWishlist.map((product) => product._id);
        localStorage.setItem("wishlist", JSON.stringify(updatedIds));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);