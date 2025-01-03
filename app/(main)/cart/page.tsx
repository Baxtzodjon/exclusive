"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
    _id: string;
    titles: string;
    description: string;
    price: string;
    reviews: any;
    images: string;
}

const page = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [total, setTotal] = useState<number>(0);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [shopping, setShopping] = useState<number>(0);
    const [shippingCost, setShippingCost] = useState<number>(0);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        const savedQuantities = localStorage.getItem('quantities');
        if (savedCart) {
            const productIds = JSON.parse(savedCart);
            fetchProductsByIds(productIds);
        }
        if (savedQuantities) {
            setQuantities(JSON.parse(savedQuantities));
        }
    }, []);

    const fetchProductsByIds = async (ids: string[]) => {
        const res = await fetch(`http://localhost:3000/api/product`);
        const { data } = await res.json();
        const productsInCart = data.filter((product: Product) => ids.includes(product._id));
        setCart(productsInCart);
    };

    const handleQuantityChange = (productId: string, type: "increase" | "decrease") => {
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            if (type === "increase") {
                newQuantities[productId] = (newQuantities[productId] || 0) + 1;
            } else if (type === "decrease" && newQuantities[productId] > 1) {
                newQuantities[productId] = newQuantities[productId] - 1;
            }
            
            localStorage.setItem('quantities', JSON.stringify(newQuantities));

            return newQuantities;
        });
    };

    /* const handleManualQuantityChange = (productId: string, value: string) => {
        const quantity = Math.max(1, parseInt(value)); // Ограничиваем минимальное значение на 1
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    }; */

    const handleManualQuantityChange = (productId: string, value: string) => {
        const quantity = Math.max(1, parseInt(value));
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities, [productId]: quantity };
            localStorage.setItem('quantities', JSON.stringify(newQuantities));
            return newQuantities;
        });
    };

    const removeFromCart = (productId: string) => {
        const updatedCArt = cart.filter((product) => product._id !== productId);
        setCart(updatedCArt);

        const updatedIds = updatedCArt.map((product) => product._id);
        localStorage.setItem("cart", JSON.stringify(updatedIds));

        const updatedQuantities = { ...quantities };
        delete updatedQuantities[productId];
        setQuantities(updatedQuantities);
        localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
    };

    const calculateTotal = () => {
        let subtotalAmount = 0;
        cart.forEach((product) => {
            const quantity = quantities[product._id] || 1;
            subtotalAmount += parseFloat(product.price) * quantity;
        });
        setSubtotal(subtotalAmount);
        setTotal(subtotalAmount + shopping);
    };

    /* const calculateTotal = () => {
        let subtotalAmount = 0;
    
        // Перебираем все товары в корзине и рассчитываем subtotal без учета количества
        cart.forEach((product) => {
            // Суммируем только базовые цены товаров без учета их количества
            subtotalAmount += parseFloat(product.price);
        });
    
        // Устанавливаем новый subtotal
        setSubtotal(subtotalAmount);
    
        // Total остается с учетом количества и добавлением стоимости доставки
        let totalAmount = 0;
        cart.forEach((product) => {
            const quantity = quantities[product._id] || 1;
            totalAmount += parseFloat(product.price) * quantity;
        });
    
        // Устанавливаем итоговую сумму с доставкой
        setTotal(totalAmount + shopping); // Добавляем стоимость доставки к total
    }; */

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Пожалуйста, выберите товар для оформления.");
        } else {
            location.assign("/checkout");
        }
    };

    useEffect(() => {
        calculateTotal();
    }, [quantities, cart]);

    const handleUpdateCart = () => {
        window.location.reload();
    };

    return (
        <>

            <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center flex-wrap md:flex-col gap-[80px] mt-[80px] mb-[140px] px-4">

                {cart.length === 0 ? (
                    <p className="text-[#000000] text-[18px] sm:text-[24px] md:text-[36px] leading-[48px] text-center" style={{ letterSpacing: '4%' }}>Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col gap-[40px] w-full">

                        <div className="w-full lg:max-w-[1170px] h-[72px] bg-[#FFFFFF] rounded shadow-lg flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">

                            <h5 className="w-[350px] sm:w-[250px] text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">Product</h5>

                            <h5 className="w-[350px] sm:w-[250px] text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">Price</h5>

                            <h5 className="w-[350px] sm:w-[250px] text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">Quantity</h5>

                            <h5 className="w-[55px] text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">Subtotal</h5>

                        </div>

                        {cart.map((product) => {
                            return (
                                <div key={product._id} className="flex items-center justify-between flex-wrap md:flex-col gap-10 w-full">

                                    <div className="w-full max-w-[1170px] h-fit bg-[#FFFFFF] rounded shadow-lg flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4">

                                        <div className="relative flex items-center flex-wrap gap-2 md:gap-5 w-[350px] sm:w-[250px]">

                                            <button className="absolute top-[-5px] left-[-10px] w-[18px] h-[18px] bg-[#DB4444] rounded-full flex items-center justify-center text-[#FFFFFF]" onClick={() => removeFromCart(product._id)}>&times;</button>

                                            <Image src={`/uploads/${product.images}` || "/default-image.jpg"} alt={product.titles} width={54} height={54} className="object-contain" />

                                            <h5 className="text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">{product.titles}</h5>

                                        </div>

                                        <div className="w-[350px] sm:w-[250px]">

                                            <h5 className="text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">${product.price}</h5>

                                        </div>

                                        <div className="relative w-[350px] sm:w-[250px]">

                                            <button
                                                className="absolute top-0 left-[52px]"
                                                onClick={() => handleQuantityChange(product._id, "increase")}
                                            >
                                                <Image src="/icons/arrow_up.png" alt="arrow up icon" width="16" height="16" />
                                            </button>
                                            <input
                                                type="number"
                                                value={quantities[product._id] || 1}
                                                className="w-[72px] h-[44px] text-center rounded border-2 border-[#00000066] p-[6px] outline-[#DB4444]"
                                                onChange={(e) => handleManualQuantityChange(product._id, e.target.value)}
                                                min="0"
                                            />
                                            <button
                                                className="absolute bottom-0 left-[52px]"
                                                onClick={() => handleQuantityChange(product._id, "decrease")}
                                            >
                                                <Image src="/icons/arrow_down.png" alt="arrow down icon" width="16" height="16" />
                                            </button>

                                        </div>

                                        <div>

                                            <h5 className="w-[55px] text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px] truncate">${parseFloat(product.price) * (quantities[product._id] || 1)}</h5>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                        <div className="w-full lg:max-w-[1170px] flex items-center justify-center sm:justify-between flex-wrap gap-[14px] sm:gap-0">

                            <Link href="/" className="w-full sm:w-[218px] h-[56px] bg-transparent rounded border-2 border-[#00000080] text-[#000000] text-[14px] sm:text-[16px] font-medium leading-[24px] hover:bg-[#DB4444] hover:text-[#FFFFFF] hover:border-none transition-all flex items-center justify-center">Return To Shop</Link>

                            <button className="w-full sm:w-[218px] h-[56px] bg-transparent rounded border-2 border-[#00000080] text-[#000000] text-[14px] sm:text-[16px] font-medium leading-[24px] hover:bg-[#DB4444] hover:text-[#FFFFFF] hover:border-none transition-all" onClick={handleUpdateCart}>Update</button>

                        </div>

                        <div className="w-full lg:max-w-[1170px] flex items-end justify-end mt-[56px]">

                            <div className="w-full lg:max-w-[470px] h-[324px] bg-transparent rounded border-2 border-[#000000] flex flex-col gap-6 px-6 py-8">

                                <h4 className="text-[#000000] text-[16px] sm:text-[20px] font-medium leading-[28px]">Cart Total</h4>

                                <div className="flex flex-col gap-4">

                                    <div className="flex items-center justify-between">

                                        <h5 className="text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">Subtotal:</h5>

                                        <small className="text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">${subtotal}</small>

                                    </div>

                                    <div className="w-full h-[1px] bg-[#000000]"></div>

                                    <div className="flex items-center justify-between">

                                        <h5 className="text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">Shopping:</h5>

                                        <small className="text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">Free</small>

                                    </div>

                                    <div className="w-full h-[1px] bg-[#000000]"></div>

                                    <div className="flex items-center justify-between">

                                        <h5 className="text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">Total:</h5>

                                        <small className="text-[#000000] text-[14px] sm:text-[16px] font-normal leading-[24px]">${total}</small>

                                    </div>

                                    <div className="flex items-center justify-center">

                                        <button className="w-full lg:w-[260px] h-[56px] bg-[#DB4444] rounded text-[#FAFAFA] text-[14px] sm:text-[16px] font-medium leading-[24px] hover:bg-transparent hover:border-2 hover:border-[#00000080] hover:text-[#000000] transition-all" onClick={handleCheckout}>Proceed to checkout</button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </>
    )
}

export default page;