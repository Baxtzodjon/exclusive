"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
    _id: string;
    titles: string;
    description: string;
    price: string;
    reviews: string;
    images: string;
    image_second: string;
    image_third: string;
    catg_prod: string;
}

export default function AddProduct() {
    const [productControl, setProductControl] = useState<Product[]>([]);
    const [message, setMessage] = useState('');
    const [selectedData, setSelectedData] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Product>({
        _id: "",
        titles: "",
        description: "",
        price: "",
        reviews: "",
        images: "",
        image_second: "",
        image_third: "",
        catg_prod: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const [images, setImages] = useState<{
        images: File | null;
        image_second: File | null;
        image_third: File | null;
    }>({
        images: null,
        image_second: null,
        image_third: null,
    });

    const categories = [
        "phones",
        "computers",
        "smartWatches",
        "cameras",
        "headphones",
        "gaming",
    ];

    const handleMarkerClick = (item: Product) => {
        setSelectedData(item)
        setFormData(item);
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`/api/product/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setMessage(data.message);
                setProductControl((prevState) => prevState.filter((product: any) => product._id !== id));
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Error deleting product.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Отправка обновлений продукта", formData);

        if (!formData._id) {
            setMessage('Отсутствует ID продукта!');
            setIsLoading(false);
            return;
        }

        const { _id, ...updatedProductData } = formData;

        try {
            const response = await fetch(`/api/product/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData),
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Ответ сервера:", data);

            if (data.success) {
                setMessage('Продукт успешно обновлен!');
                setProductControl((prevState) =>
                    prevState.map((product) =>
                        product._id === formData._id ? formData : product
                    )
                );
                setIsModalOpen(false);
            } else {
                setMessage(data.message || 'Не удалось обновить продукт.');
            }
        } catch (error) {
            console.error('Ошибка при обновлении продукта:', error);
            setMessage('Ошибка при обновлении продукта. Попробуйте снова.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            const fileName = files[0].name;

            setFormData((prevState) => ({
                ...prevState,
                [name]: fileName,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        fetch('http://localhost:3000/api/product')
            .then((res) => res.json())
            .then((data) => {
                setProductControl(data.data)
                console.log(data.data);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            })
    }, [])

    return (
        <div className="flex justify-center flex-col flex-wrap gap-5 w-full h-full bg-[#DB4444] p-8 m-5 rounded-md">

            <h1 className="text-[#FFFFFF] text-[32px] font-semibold leading-[24px]">All Products</h1>

            <table className="content-table">

                <thead>

                    <tr>

                        <th>Num</th>
                        <th>Image First</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Review</th>
                        <th>Image Second</th>
                        <th>Image Third</th>
                        <th>Category</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {productControl.map((item, index) => (

                        <tr key={item?._id}>

                            <td>{index + 1}</td>
                            <td><Image src={`/uploads/${item.images}` || "/default-image.jpg"} alt={item.titles} width="64" height="64" /></td>
                            <td>{item.titles}</td>
                            <td>{item.description}</td>
                            <td>${item.price}</td>
                            <td>&#9733; {item.reviews}</td>
                            <td><Image src={`/uploads/${item.image_second}` || "/default-image.jpg"} alt={item.titles} width="64" height="64" /></td>
                            <td><Image src={`/uploads/${item.image_third}` || "/default-image.jpg"} alt={item.titles} width="64" height="64" /></td>
                            <td className="capitalize">{item.catg_prod}</td>
                            <td>

                                <button><Image src="/icons/trash_icon.svg" alt="trash icon" width="24" height="24" onClick={() => handleDelete(item?._id)} /></button>
                                <button><Image src="/icons/edit_icon.svg" alt="edit icon" width="24" height="24" onDoubleClick={() => handleMarkerClick(item)} /></button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">

                    <div className="relative bg-white p-8 rounded-md w-full max-w-[650px]">

                        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

                        <form onSubmit={handleSubmit}>

                            <div>

                                <div className="flex items-center justify-between flex-wrap">

                                    <div className="mb-4">

                                        <label htmlFor="images" className="block text-sm font-medium">Image First</label>

                                        <input type="file" name="images" id="images" className="file:bg-gray-100 file:px-2 file:py-1 file:border file:border-gray-300 file:rounded-lg file:text-gray-700 file:cursor-pointer file:shadow-lg bg-white text-gray-700 rounded-lg cursor-pointer hover:shadow-lg duration-300 ease-in-out" onChange={handleInputChange} />

                                    </div>

                                    <div className="mb-4 w-full">

                                        <label htmlFor="titles" className="block text-sm font-medium">Title</label>

                                        <input
                                            type="text"
                                            name="titles"
                                            value={formData.titles}
                                            onChange={handleInputChange}
                                            className="custom-input w-full p-2 border border-gray-300 rounded-md shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                            id="titles"
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="mb-4">

                                    <label htmlFor="description" className="block text-sm font-medium">Description</label>

                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="custom-input w-full h-[100px] p-2 border border-gray-300 rounded-md shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100 resize-none"
                                        id="description"
                                        required
                                    />

                                </div>

                                <div className="flex items-center gap-2">

                                    <div className="mb-4 w-full">

                                        <label htmlFor="price" className="block text-sm font-medium">Price</label>

                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className="custom-input w-full p-2 border border-gray-300 rounded-md shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                            id="price"
                                            required
                                        />

                                    </div>

                                    <div className="mb-4 w-full">

                                        <label htmlFor="reviews" className="block text-sm font-medium">Reviews</label>

                                        <input
                                            type="text"
                                            name="reviews"
                                            value={formData.reviews}
                                            onChange={handleInputChange}
                                            className="custom-input w-full p-2 border border-gray-300 rounded-md shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                            id="reviews"
                                            required
                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="flex items-center justify-between">

                                <div className="mb-4">

                                    <label htmlFor="image_second" className="block text-sm font-medium">Images Second</label>

                                    <input type="file" name="image_second" id="image_second" className="file:bg-gray-100 file:px-2 file:py-1 file:border file:border-gray-300 file:rounded-lg file:text-gray-700 file:cursor-pointer file:shadow-lg bg-white text-gray-700 rounded-lg cursor-pointer hover:shadow-lg duration-300 ease-in-out" onChange={handleInputChange} />

                                </div>

                                <div className="mb-4">

                                    <label htmlFor="image_third" className="block text-sm font-medium">Images Third</label>

                                    <input type="file" name="image_third" id="image_third" className="file:bg-gray-100 file:px-2 file:py-1 file:border file:border-gray-300 file:rounded-lg file:text-gray-700 file:cursor-pointer file:shadow-lg bg-white text-gray-700 rounded-lg cursor-pointer hover:shadow-lg duration-300 ease-in-out" onChange={handleInputChange} />

                                </div>

                            </div>

                            <div className="mb-4">

                                <label htmlFor="catg_prod" className="block text-sm font-medium">Category</label>

                                <select
                                    name="catg_prod"
                                    value={formData.catg_prod}
                                    onChange={handleInputChange}
                                    className="custom-input w-full p-2 border border-gray-300 rounded-md shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                    id="catg_prod"
                                    required
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category} className="capitalize">
                                            {category}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-4">

                                <button type="submit" className="w-full bg-[#DB4444] hover:bg-[#b83a3a] text-white p-2 rounded-md flex items-center justify-center transition-all" disabled={isLoading}>

                                    {isLoading ? (
                                        <div className="btn_loader"></div>
                                    ) : (
                                        "Save Changes"
                                    )}

                                </button>

                            </div>

                        </form>

                        <button onClick={() => setIsModalOpen(false)} className="absolute top-[15px] right-[15px] text-[32px] text-[#DB4444] hover:text-[#b83a3a]">&times;</button>

                    </div>

                </div>
            )}

        </div>
    );
};