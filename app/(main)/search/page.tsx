// pages/search.tsx
"use client"
import PopuplarProducts from "@/components/PopularProducts";
import Texts from "@/components/Texts";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
    _id: string;
    titles: string;
    images: string;
    price: string;
    reviews: any;
    description: string;
    image_second: string;
    image_third: string;
    catg_prod: string;
}

const SearchPage = () => {
    const { isSignedIn } = useUser();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [cart, setCart] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(8405);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showTitle, setShowTitle] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    const category_btns = [
        { name: 'Phones' },
        { name: 'Computers' },
        { name: 'SmartWatches' },
        { name: 'Camera' },
        { name: 'HeadPhones' },
        { name: 'Gaming' },
    ];

    useEffect(() => {
        if (selectedCategory === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => product.catg_prod.toLowerCase() === selectedCategory.toLowerCase());
            setFilteredProducts(filtered);
            setShowTitle(selectedCategory)
        }
    }, [selectedCategory, products]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setSearchQuery("");
    };

    const filterBySearchQuery = () => {
        if (searchQuery) {
            return filteredProducts.filter((product) =>
                product.titles.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filteredProducts;
    };

    const filteredAndSearchedProducts = filterBySearchQuery();

    const handleAddToSignLogin = () => {
        if (!isSignedIn) {
            alert("Please login or register!");
            window.location.href = 'https://musical-chipmunk-42.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F';
            return;
        }
    };

    const handleWishlistClick = (productId: string) => {
        const updatedWishlist = wishlist.includes(productId)
            ? wishlist.filter((id) => id !== productId)
            : [...wishlist, productId];

        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const handleCartClick = (productId: string) => {
        const updatedCart = cart.includes(productId)
            ? cart.filter((id) => id !== productId)
            : [...cart, productId];

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/api/product');
            const { data } = await res.json();

            setLoading(false);
            setProducts(data);

            const savedWishlist = localStorage.getItem('wishlist');
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }

            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        };

        fetchData();
    }, []);
    
    const filterProducts = () => {
        const filteredBySearch = products.filter((product) =>
            product.titles.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const filtered = filteredBySearch.filter(
            (product) =>
                parseFloat(product.price) >= minPrice && parseFloat(product.price) <= maxPrice
        );

        setFilteredProducts(filtered);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMinPrice(value);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMaxPrice(value);
    };

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMaxPrice(value);

        const slider = e.target as HTMLInputElement;
        const percentage = (value / 8405) * 100;
        slider.style.background = `linear-gradient(to right, #DB4444 ${percentage}%, #ddd ${percentage}%)`;
    };

    useEffect(() => {
        if (searchQuery === "" && minPrice === 0 && maxPrice === 8405) {
            setFilteredProducts([]);
        } else {
            filterProducts();
        }
    }, [searchQuery, minPrice, maxPrice, products]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const query = queryParams.get('query');

        if (query) {
            const filtered = products.filter((product) =>
                product.titles.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [products]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const query = queryParams.get('query');

        if (query) {
            setShowTitle(query);
        }
    }, []);

    if (loading) {
        return <div className='loader_center'>

            <div className='loader'></div>

            <span className='text-[#DB4444] text-[14px] font-semibold leading-[20px]'>Loading...</span>

        </div>
    }

    return (
        <div className="flex flex-col gap-10">

            <div className="w-full max-w-[1230px] mx-auto py-4 px-6 flex gap-[50px] flex-col lg:flex-row">

                <div className={`fixed lg:sticky top-0 left-0 lg:top-10 w-full lg:w-[300px] h-full flex lg:items-start items-center flex-col gap-10 bg-white z-10 ${isVisible ? 'block' : 'hidden'} lg:block`}>

                    <div className="w-full flex justify-between lg:hidden p-6">

                        <p></p>

                        <p className="text-[#000000] text-[18px] font-semibold leading-normal">Filter</p>

                        <p className="text-[#DB4444] text-[18px] font-semibold leading-normal" onClick={handleToggle}>Cancel</p>

                    </div>

                    <div className="flex items-start flex-col gap-5">

                        <h2 className="text-[#000000] text-[17px] font-normal leading-normal">Category</h2>

                        <div className="flex flex-col">

                            {
                                category_btns.map((category_btn) => (
                                    <button className="bg-[#FFFFFF] text-start max-w-full text-[#808080] rounded text-[15px] hover:bg-[#DB4444] hover:text-white px-2 py-1" key={category_btn.name} onClick={() => handleCategoryClick(category_btn.name)}>{category_btn.name}</button>
                                ))
                            }

                        </div>

                    </div>

                    <div className="flex flex-col gap-5">

                        <div className="flex flex-col gap-1 mt-0 lg:mt-[30px]">

                            <h2 className="text-[#000000] text-[17px] font-normal leading-normal">Price</h2>

                            <div className="flex flex-col sm:flex-row gap-2">

                                <div className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded shadow-sm focus:border-[#DB4444] flex items-center justify-center gap-2 hover:border-[#DB4444]">

                                    <p className="text-[#808080]">from</p>

                                    <input
                                        type="number"
                                        name="price-from"
                                        id="min-price"
                                        min="0"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                        className="w-full focus:outline-none"
                                    />

                                </div>

                                <div className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded shadow-sm focus:border-[#DB4444] flex items-center justify-center gap-2 hover:border-[#DB4444]">

                                    <p className="text-[#808080]">to</p>

                                    <input
                                        type="number"
                                        name="price-to"
                                        id="max-price"
                                        min="0"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                        className="w-full focus:outline-none"
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="flex flex-col gap-4">

                            <input
                                type="range"
                                min="0"
                                max="8405"
                                step="10"
                                value={maxPrice}
                                onChange={handleRangeChange}
                                className="w-full"
                                style={{ background: `linear-gradient(to right, #DB4444 ${(maxPrice / 8405) * 100}%, #ddd ${(maxPrice / 8405) * 100}%)` }}
                            />

                            <div className="flex justify-between text-[#000000] text-[14px] font-medium leading-[24px]">

                                <span>0</span>
                                <span>{maxPrice}</span>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="flex gap-2 block lg:hidden" onClick={handleToggle}>

                    <svg data-v-1ffa6fd5="" width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ui-icon ">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 5.75C6 4.7835 6.7835 4 7.75 4C8.69794 4 9.46984 4.75369 9.49914 5.69452C9.49713 5.71274 9.49609 5.73125 9.49609 5.75C9.49609 5.76875 9.49713 5.78726 9.49914 5.80548C9.46984 6.74631 8.69794 7.5 7.75 7.5C6.7835 7.5 6 6.7165 6 5.75ZM7.75 3C9.09803 3 10.2195 3.96994 10.4547 5.25H18.5C18.7761 5.25 19 5.47386 19 5.75C19 6.02614 18.7761 6.25 18.5 6.25H10.4547C10.2195 7.53006 9.09803 8.5 7.75 8.5C6.40197 8.5 5.28047 7.53006 5.04534 6.25H1.49976C1.22361 6.25 0.999756 6.02614 0.999756 5.75C0.999756 5.47386 1.22361 5.25 1.49976 5.25H5.04534C5.28047 3.96994 6.40197 3 7.75 3ZM10.5 14.25C10.5 13.2835 11.2835 12.5 12.25 12.5C13.2119 12.5 13.9925 13.276 13.9999 14.2361C13.9998 14.2407 13.9998 14.2453 13.9998 14.25C13.9998 14.2547 13.9998 14.2593 13.9999 14.2639C13.9925 15.224 13.2119 16 12.25 16C11.2835 16 10.5 15.2165 10.5 14.25ZM14.9547 14.75C14.7195 16.0301 13.598 17 12.25 17C10.902 17 9.78047 16.0301 9.54534 14.75H1.50366C1.22752 14.75 1.00366 14.5261 1.00366 14.25C1.00366 13.9739 1.22752 13.75 1.50366 13.75H9.54534C9.78047 12.4699 10.902 11.5 12.25 11.5C13.598 11.5 14.7195 12.4699 14.9547 13.75H18.5037C18.7798 13.75 19.0037 13.9739 19.0037 14.25C19.0037 14.5261 18.7798 14.75 18.5037 14.75H14.9547Z" fill="black"></path>
                    </svg>

                    <h5 className="text-[#000000] text-[18px] font-normal leading-normal">Filters</h5>

                </div>

                <div className="flex flex-col gap-5 mb-[40px]">

                    <h2 className="text-[#000000] text-[18px] sm:text-[24px] font-bold leading-normal hidden lg:block">
                        {showTitle
                            ? `Searching for: ${showTitle}`
                            : selectedCategory
                                ? `Showing products for category: ${selectedCategory}`
                                : 'Browse Products'}
                    </h2>

                    {loading ? (
                        <p className="text-[#000000] text-[18px] sm:text-[24px] md:text-[36px] leading-[48px] text-center" style={{ letterSpacing: '4%' }}>Loading...</p>
                    ) : (
                        <>

                            {filteredProducts.length === 0 ? (
                                <p className="text-[#000000] text-[18px] sm:text-[24px] md:text-[36px] leading-[48px] text-center" style={{ letterSpacing: '4%' }}>No products found</p>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                                        {filteredProducts.map((product) => (

                                            <div className="flex items-center justify-center flex-col gap-5" key={product._id}>

                                                <div className="flex flex-col gap-4">

                                                    <div className="relative w-full max-w-[200px] h-[220px] bg-[#F5F5F5] rounded flex items-center justify-center p-5 group">

                                                        <Image
                                                            src={`/uploads/${product.images}` || "/default-image.jpg"}
                                                            alt={product.titles}
                                                            width={150}
                                                            height={110}
                                                            className="object-contain"
                                                        />

                                                        <SignedOut>
                                                            <button
                                                                className="absolute top-3 right-3 w-[30px] h-[30px] bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                                                                onClick={() => handleAddToSignLogin()}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    width="20"
                                                                    height="20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </SignedOut>

                                                        <SignedIn>
                                                            <button
                                                                className="absolute top-3 right-3 w-[30px] h-[30px] bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                                                                onClick={() => handleWishlistClick(product._id)}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    width="20"
                                                                    height="20"
                                                                    fill={wishlist.includes(product._id) ? "#DB4444" : "currentColor"}
                                                                >
                                                                    <path
                                                                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                                        fill={wishlist.includes(product._id) ? "#DB4444" : "none"}
                                                                        stroke={wishlist.includes(product._id) ? "#DB4444" : "currentColor"}
                                                                        strokeWidth="2"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </SignedIn>

                                                        <div className="absolute top-[54px] right-3 w-[30px] h-[30px] bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer">

                                                            <SignedOut>
                                                                <button onClick={handleAddToSignLogin}>
                                                                    <Image src="/icons/eye_icon.png" alt="icon eye" width="20" height="14" />
                                                                </button>
                                                            </SignedOut>

                                                            <SignedIn>
                                                                <Link href={`/product/${product._id}`} onClick={handleAddToSignLogin}>
                                                                    <Image src="/icons/eye_icon.png" alt="icon eye" width="20" height="14" />
                                                                </Link>
                                                            </SignedIn>

                                                        </div>

                                                        <SignedOut>
                                                            <button
                                                                className="absolute left-0 bottom-0 w-[270px] h-[41px] bg-[#000000] rounded-bl-[4px] rounded-br-[4px] flex items-center justify-center gap-2 cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
                                                                onClick={() => handleAddToSignLogin()}
                                                            >
                                                                <Image src="/icons/white_cart.png" alt="icon cart" width="24" height="24" />
                                                                <small className="text-[#FFFFFF] text-[12px] font-normal leading-[18px]">
                                                                    {"Please sign in to add to cart"}
                                                                </small>
                                                            </button>
                                                        </SignedOut>

                                                        <SignedIn>
                                                            <button
                                                                className="absolute left-0 bottom-0 w-full h-[41px] bg-[#000000] rounded-bl-[4px] rounded-br-[4px] flex items-center justify-center gap-2 cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
                                                                onClick={() => handleCartClick(product._id)}
                                                            >
                                                                <Image src="/icons/white_cart.png" alt="icon cart" width="24" height="24" />
                                                                <small className="text-[#FFFFFF] text-[12px] font-normal leading-[18px]">
                                                                    {cart.includes(product._id) ? "Remove from cart" : "Add To Cart"}
                                                                </small>
                                                            </button>
                                                        </SignedIn>

                                                    </div>

                                                    <div className="flex items-start justify-start flex-col gap-2">

                                                        <SignedOut>
                                                            <button
                                                                className="cursor-pointer"
                                                                onClick={() => handleAddToSignLogin()}
                                                            >
                                                                <p className="text-[#000000] text-[14px] font-medium leading-[24px]">
                                                                    {product.titles}
                                                                </p>
                                                            </button>
                                                        </SignedOut>

                                                        <SignedIn>
                                                            <Link href={`/product/${product._id}`}>
                                                                <p className="text-[#000000] text-[14px] font-medium leading-[24px]">
                                                                    {product.titles}
                                                                </p>
                                                            </Link>
                                                        </SignedIn>

                                                        <small className="text-[#DB4444] text-[14px] font-medium leading-[24px]">${product.price}</small>

                                                        <div className="flex items-center gap-2">

                                                            <div className="flex">

                                                                {[...Array(5)].map((_, index) => (
                                                                    <svg
                                                                        key={index}
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill={index < product.reviews ? "#FFAD33" : "#00000080"}
                                                                        className="w-4 h-4"
                                                                    >
                                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                    </svg>
                                                                ))}

                                                            </div>

                                                            <small className="text-[#000000] text-[14px] font-semibold leading-[21px] opacity-[50%]">({product.reviews})</small>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        ))}

                                    </div>

                                </>
                            )}

                        </>
                    )}

                </div>

            </div>

            <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[60px] mb-[140px] px-4">

                <Texts text_small="Popular Products" text_big="" />

                <PopuplarProducts />

            </div>

        </div>
    );
};

export default SearchPage;