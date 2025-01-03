"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
    _id: string;
    titles: string;
    price: string;
    images: string;
}

const page = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [total, setTotal] = useState<number>(0);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [shopping, setShopping] = useState<number>(0);
    const [isChecked, setIsChecked] = useState(false);

    const [formData, setFormData] = useState({
        fName: '',
        cName: '',
        sAddress: '',
        aparFloor: '',
        townCity: '',
        phone: '',
        email: '',
        paymentMethod: '',
    });

    const [errors, setErrors] = useState<any>({});
    const [isSaved, setIsSaved] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        const savedQuantities = localStorage.getItem('quantities');
        const savedFormData = localStorage.getItem('formData');
        const savedIsSaved = localStorage.getItem('isSaved');
        if (savedCart) {
            const productIds = JSON.parse(savedCart);
            fetchProductsByIds(productIds);
        }
        if (savedQuantities) {
            setQuantities(JSON.parse(savedQuantities));
        }
        if (savedFormData && savedIsSaved === 'true') {
            setFormData(JSON.parse(savedFormData));
            setIsSaved(true);
        }

        if (isChecked) {
            const savedFormData = localStorage.getItem('formData');
            if (savedFormData) {
                setFormData(JSON.parse(savedFormData));
            }
        }
    }, [isChecked]);

    const fetchProductsByIds = async (ids: string[]) => {
        const res = await fetch(`http://localhost:3000/api/product`);
        const { data } = await res.json();
        const productsInCart = data.filter((product: Product) => ids.includes(product._id));
        setCart(productsInCart);
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

    useEffect(() => {
        calculateTotal();
    }, [quantities, cart]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setIsSaved(checked);
        if (checked) {
            localStorage.setItem('formData', JSON.stringify(formData));
            localStorage.setItem('isSaved', 'true');
        } else {
            localStorage.removeItem('formData');
            localStorage.removeItem('isSaved');
        }
    };

    const phoneRegex = /^\+998\s\d{2}(\s\d{3}|\-\d{3})\-(\d{2}|\d{4})\-(\d{2}|\d{4})$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateForm = () => {

        const newErrors: any = {};

        if (!formData.fName) newErrors.fName = 'First name is required';

        if (!formData.sAddress) newErrors.sAddress = 'Street address is required';

        if (!formData.townCity) newErrors.townCity = 'Town/City is required';

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number (Use +998 XX XXX-XX-XX format';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!paymentMethod) {
            newErrors.paymentMethod = 'Please select a payment method';
        }

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm();

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('Form Data:', formData);

            setShowPopup(true);

            setFormData({
                fName: '',
                cName: '',
                sAddress: '',
                aparFloor: '',
                townCity: '',
                phone: '',
                email: '',
                paymentMethod: '',
            });
            setIsSaved(false);
            localStorage.removeItem('formData');
            localStorage.removeItem('isSaved');
        }
    };

    return (
        <div className="w-full max-w-[1230px] mx-auto px-6">

            <div className="flex items-center justify-between flex-col lg:flex-row mt-[80px] mb-[140px]">

                <div className="flex flex-col gap-[24px] sm:gap-[28px] md:gap-[48px] w-full lg:w-[60%]">

                    <h1 className="text-[#000000] text-[24px] sm:text-[28px] md:text-[36px] font-medium leading-[30px]" style={{ letterSpacing: '4%' }}>Billing Details</h1>

                    <form onSubmit={handleSubmit} className="space-y-4 w-full">

                        <div className="space-y-1">
                            <label htmlFor="fName" className="lbl_sty">First Name*</label>
                            <input
                                type="text"
                                id="fName"
                                name="fName"
                                value={formData.fName}
                                onChange={handleChange}
                                className="inp_sty"
                            />
                            {errors.fName && <p className="text-sm text-red-500">{errors.fName}</p>}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="cName" className="lbl_sty">Company Name</label>
                            <input
                                type="text"
                                id="cName"
                                name="cName"
                                value={formData.cName}
                                onChange={handleChange}
                                className="inp_sty"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="sAddress" className="lbl_sty">Street Address*</label>
                            <input
                                type="text"
                                id="sAddress"
                                name="sAddress"
                                value={formData.sAddress}
                                onChange={handleChange}
                                className="inp_sty"
                            />
                            {errors.sAddress && <p className="text-sm text-red-500">{errors.sAddress}</p>}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="aparFloor" className="lbl_sty">Apartment, floor, etc. (optional)</label>
                            <input
                                type="text"
                                id="aparFloor"
                                name="aparFloor"
                                value={formData.aparFloor}
                                onChange={handleChange}
                                className="inp_sty"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="townCity" className="lbl_sty">Town/City*</label>
                            <input
                                type="text"
                                id="townCity"
                                name="townCity"
                                value={formData.townCity}
                                onChange={handleChange}
                                className="inp_sty"
                            />
                            {errors.townCity && <p className="text-sm text-red-500">{errors.townCity}</p>}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="phone" className="lbl_sty">Phone Number*</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="inp_sty"
                            />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="lbl_sty">Email Address*</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="inp_sty"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="w-full lg:max-w-[470px]">

                            <div className="flex items-center justify-between flex-wrap">

                                <div className="flex items-center justify-center gap-4">

                                    <input type="radio" name="paymentMethod" value="Bank" checked={paymentMethod === 'Bank'} className="w-6 h-6 accent-[#000000]" onChange={() => setPaymentMethod('Bank')} />

                                    <span className="text-[#000000] text-[16px] text-normal leading-[24px]">Bank</span>

                                </div>

                                <div className="flex items-center justify-center gap-2">

                                    <Image src="/icons/bkash_card.png" alt="bKash card" width="42" height="28" className="object-cover" />

                                    <Image src="/icons/visa_card.png" alt="visa card" width="42" height="28" className="object-cover" />

                                    <Image src="/icons/mastercard.png" alt="mastercard card" width="42" height="28" className="object-cover" />

                                    <Image src="/icons/nagad_card.png" alt="nagad card" width="42" height="28" className="object-cover" />

                                </div>

                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <input type="radio" name="paymentMethod" value="Cash" checked={paymentMethod === 'Cash'} className="w-6 h-6 accent-[#000000]" onChange={() => setPaymentMethod('Cash')} />

                            <span className="text-[#000000] text-[16px] text-normal leading-[24px]">Cash on delivery</span>

                        </div>

                        {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod}</p>}

                        <div className="flex gap-4">

                            <input type="checkbox" checked={isSaved} className="w-6 h-6 accent-[#DB4444] rounded" onChange={handleCheckboxChange} />

                            <p className="text-[#000000] text-[16px] font-normal leading-[24px]">Save this information for faster check-out next time</p>

                        </div>

                        <button type="submit" className="w-full lg:w-[190px] h-[56px] rounded bg-[#DB4444] text-[#FAFAFA] font-medium text-[16px] leading-[24px] hover:bg-[#b83a3a]">
                            Place Order
                        </button>

                    </form>

                </div>

                {cart.length === 0 ? (
                    <div className='loader_center'>

                        <div className='loader'></div>

                        <span className='text-[#DB4444] text-[16px] font-semibold leading-[20px]'>Loading...</span>

                    </div>
                ) : (
                    <div className="w-full lg:max-w-[425px] flex flex-col gap-[32px] mt-[30px] lg:mt-[0]">

                        {cart.map((product) => {
                            return (
                                <div key={product._id} className="flex flex-col gap-[32px]">

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-6">

                                            <Image src={`/uploads/${product.images}` || "/default-image.jpg"} alt={product.titles} width="54" height="54" />

                                            <small className="text-[#000000] text-[16px] font-normal leading-[24px] truncate">{product.titles}</small>

                                        </div>

                                        <span className="text-[#000000] text-[16px] font-normal leading-[24px]">${product.price}</span>

                                    </div>

                                </div>
                            );
                        })}

                        <div className="flex flex-col gap-4">

                            <div className="flex items-center justify-between">

                                <h5 className="text-[#000000] text-[16px] font-normal leading-[24px]">Subtotal:</h5>

                                <small className="text-[#000000] text-[16px] font-normal leading-[24px]">${subtotal}</small>

                            </div>

                            <div className="w-full h-[1px] bg-[#000000]"></div>

                            <div className="flex items-center justify-between">

                                <h5 className="text-[#000000] text-[16px] font-normal leading-[24px]">Shopping:</h5>

                                <small className="text-[#000000] text-[16px] font-normal leading-[24px]">Free</small>

                            </div>

                            <div className="w-full h-[1px] bg-[#000000]"></div>

                            <div className="flex items-center justify-between">

                                <h5 className="text-[#000000] text-[16px] font-normal leading-[24px]">Total:</h5>

                                <small className="text-[#000000] text-[16px] font-normal leading-[24px]">${total}</small>

                            </div>

                        </div>

                    </div>
                )}

            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">

                    <div className="popup-content bg-white rounded-lg shadow-xl p-6 w-[90%] sm:w-[400px] animate__animated animate__fadeIn animate__delay-1s">

                        <h3 className="text-2xl font-semibold text-center text-gray-900 mb-4">
                            Your order has been placed successfully!
                        </h3>

                        <div className="flex justify-center mb-4">

                            <div className="rounded-full border-2 border-[#DB4444]">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" className="w-[100px] h-[100px] text-[#DB4444]">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>

                            </div>

                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-[#DB4444] hover:bg-[#b83a3a] text-white px-6 py-3 rounded-lg font-medium transition duration-300"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    )

}

export default page;