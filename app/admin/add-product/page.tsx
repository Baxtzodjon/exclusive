"use client"

import { useState } from "react";

export default function AddProduct() {
    const [images, setImages] = useState<{
        images: File | null;
        image_second: File | null;
        image_third: File | null;
    }>({
        images: null,
        image_second: null,
        image_third: null,
    });
    const [message, setMessage] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof typeof images) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setImages(prevState => ({ ...prevState, [field]: file }));
        }
    };

    async function handleSubmit(e: any) {
        e.preventDefault();

        const fm = new FormData(e.target);

        const product: any = {};

        fm.forEach((val: any, key: any) => {
            if (key !== "image_first") {
                product[key] = val;
            }
        });

        try {
            if (!images.images || !images.image_second || !images.image_third) {
                setMessage("Please select all images.");
                return;
            }

            const formDataFirst = new FormData();
            formDataFirst.append("image", images.images);

            const resFirst = await fetch("/api/upload", {
                method: "POST",
                body: formDataFirst,
            });

            const dataFirst = await resFirst.json();
            product.images = dataFirst.data;

            const formDataSecond = new FormData();
            formDataSecond.append("image", images.image_second);

            const resSecond = await fetch("/api/upload", {
                method: "POST",
                body: formDataSecond,
            });

            const dataSecond = await resSecond.json();
            product.image_second = dataSecond.data;

            const formDataThird = new FormData();
            formDataThird.append("image", images.image_third);

            const resThird = await fetch("/api/upload", {
                method: "POST",
                body: formDataThird,
            });

            const dataThird = await resThird.json();
            product.image_third = dataThird.data;

            const response = await fetch("http://localhost:3000/api/product", {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.message || "Image upload failed");
                return;
            }

            const product_data = await response.json();
            setMessage(product_data.message);
        } catch (error) {
            setMessage("Something went wrong: " + error);
        }
    }

    return (
        <div className="flex justify-center flex-col flex-wrap gap-5 w-full h-full bg-[#DB4444] p-8 m-5 rounded-md">

            <h1 className="text-[#FFFFFF] text-[32px] font-semibold leading-[24px]">Add Product</h1>

            <form action="" className="flex justify-center flex-col gap-5" onSubmit={handleSubmit}> {/* onSubmit */}

                <div className="flex items-center justify-between gap-10">

                    <div className="w-full p-5 bg-white rounded-lg font-mono flex flex-col gap-2">

                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold">Title</label>

                        <input
                            className="text-sm custom-input w-full h-[50px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100"
                            type="text"
                            placeholder="Enter title here"
                            name="titles"
                            id="title"
                            required
                        />

                    </div>

                    <div className="w-full p-5 bg-white rounded-lg font-mono flex flex-col gap-2">

                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold">Image First</label>

                        <input type="file" name="images" id="image" className="file:bg-gray-100 file:px-6 file:py-2 file:border file:border-gray-300 file:rounded-lg file:text-gray-700 file:cursor-pointer file:shadow-lg bg-white text-gray-700 rounded-lg cursor-pointer hover:shadow-lg duration-300 ease-in-out" required onChange={(e) => handleFileChange(e, "images")} />

                    </div>

                </div>

                <div className="flex items-center justify-between gap-10">

                    <div className="w-full p-5 bg-white rounded-lg font-mono flex flex-col gap-2">

                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold">Price</label>

                        <input
                            className="text-sm custom-input w-full h-[50px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100"
                            type="number"
                            placeholder="Enter price here"
                            name="price"
                            id="price"
                            required
                        />

                    </div>

                    <div className="w-full p-5 bg-white rounded-lg font-mono flex flex-col gap-2">

                        <label htmlFor="review" className="block text-gray-700 text-sm font-bold">Review</label>

                        <input
                            className="text-sm custom-input w-full h-[50px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100"
                            type="number"
                            placeholder="Enter review here"
                            name="reviews"
                            id="review"
                            min="1"
                            max="5"
                            step="1"
                            required
                            onInput={(e: any) => {
                                const value = parseInt(e.target.value);
                                if (value < 1) e.target.value = "1";
                                if (value > 5) e.target.value = "5";
                            }}
                        />

                    </div>

                </div>

                <div className="w-full p-5 bg-white rounded-lg font-mono flex flex-col gap-2">

                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold">Description</label>

                    <textarea
                        className="text-sm custom-input w-full h-[100px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100 resize-none"
                        placeholder="Enter description here"
                        name="description"
                        id="description"
                        required
                    />

                </div>

                <div className="w-full p-5 bg-white rounded-lg font-mono flex flex-col gap-2">

                    <label htmlFor="image_sec" className="block text-gray-700 text-sm font-bold">Image Second</label>

                    <input type="file" name="image_second" id="image_sec" className="file:bg-gray-100 file:px-6 file:py-2 file:border file:border-gray-300 file:rounded-lg file:text-gray-700 file:cursor-pointer file:shadow-lg bg-white text-gray-700 rounded-lg cursor-pointer hover:shadow-lg duration-300 ease-in-out" required onChange={(e) => handleFileChange(e, "image_second")} />

                </div>

                <div className="w-full p-5 bg-white rounded-lg font-mono flex flex-col gap-2">

                    <label htmlFor="image_thr" className="block text-gray-700 text-sm font-bold">Image Third</label>

                    <input type="file" name="image_third" id="image_thr" className="file:bg-gray-100 file:px-6 file:py-2 file:border file:border-gray-300 file:rounded-lg file:text-gray-700 file:cursor-pointer file:shadow-lg bg-white text-gray-700 rounded-lg cursor-pointer hover:shadow-lg duration-300 ease-in-out" required onChange={(e) => handleFileChange(e, "image_third")} />

                </div>

                <div className="w-full p-5 bg-white rounded-lg font-mono flex flex-col gap-2">

                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold">Category</label>

                    <select name="catg_prod" id="category" className="text-sm custom-input w-full h-[50px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100" required>

                        <option value="phones">Phones</option>
                        <option value="computers">Computers</option>
                        <option value="smartWatches">SmartWatches</option> 
                        <option value="camera">Camera</option>
                        <option value="headphones">HeadPhones</option>
                        <option value="gaming">Gaming</option>

                    </select>

                </div>

                <button type="submit" className="text-sm font-semibold w-full h-[50px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100">Send</button>

            </form>

            {message && <p className="text-white">{message}</p>}

        </div>
    );
};