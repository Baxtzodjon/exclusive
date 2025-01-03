'use client'

import { Banner } from '@/models/banner'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const AllBanners = () => {

    const [bannerControl, setBannerControl] = useState<Banner[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState<boolean[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentBannerId, setCurrentBannerId] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        console.log("Fetching banners...");
        fetch('http://localhost:3000/api/banner')
            .then((res) => res.json())
            .then((data) => {
                console.log('Data received:', data);
                setBannerControl(data.data)
                setShowDropdown(new Array(data.data.length).fill(false));
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            })
    }, [])

    const handleDropdownToggle = (index: number) => {
        console.log('Toggling dropdown at index:', index);
        setShowDropdown((prevState) => {
            const newState = new Array(bannerControl.length).fill(false);
            newState[index] = !prevState[index];
            return newState;
        });
    };

    const handleChangeClick = (bannerId: string) => {
        console.log('Changing banner with ID:', bannerId);
        setCurrentBannerId(bannerId);
        setShowPopup(true);
        setShowDropdown(new Array(bannerControl.length).fill(false));
    };

    const handleClosePopup = () => {
        console.log('Closing popup');
        setShowPopup(false);
    };

    const handleDeleteClick = (bannerId: string) => {
        console.log('Deleting banner with ID:', bannerId);
        setCurrentBannerId(bannerId);
        setShowConfirm(true);
        setShowDropdown(new Array(bannerControl.length).fill(false));
    };

    const handleCloseConfirm = () => {
        console.log('Closing confirm dialog');
        setShowConfirm(false);
    };

    const handleConfirmDelete = () => {
        if (currentBannerId) {
            setIsLoading(true);
            fetch(`http://localhost:3000/api/banner/${currentBannerId}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then((data) => {
                    if (data.success) {
                        setBannerControl(prevState => prevState.filter(banner => banner._id !== currentBannerId));
                        setMessage("Banner deleted successfully!");
                    } else {
                        setMessage("Failed to delete the banner.");
                    }
                    setIsLoading(false);
                    setShowConfirm(false);
                })
                .catch((error) => {
                    console.error('Error while deleting banner:', error);
                    setMessage("An error occurred while deleting the banner.");
                    setIsLoading(false);
                    setShowConfirm(false);
                });
        }
    };

    const handleUpdateBanner = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (currentBannerId) {
            const formData = new FormData();
            const fileInput = document.getElementById('image') as HTMLInputElement;

            if (fileInput?.files && fileInput.files.length > 0) {
                formData.append('image', fileInput.files[0]);
            } else {
                setMessage("Please select a file to upload.");
                return;
            }
    
            setIsLoading(true);
    
            try {
                const response = await fetch(`http://localhost:3000/api/banner/${currentBannerId}`, {
                    method: 'PATCH',
                    body: formData,
                });

                const result = await response.json();
    
                if (response.ok) {
                    setBannerControl(prevState =>
                        prevState.map(banner =>
                            banner._id === currentBannerId ? { ...banner, image: result.data } : banner
                        )
                    );
                    setMessage(result.message);
                    setShowPopup(false);
                } else {
                    setMessage(`Failed to update banner: ${result.message || "Unknown error"}`);
                }
            } catch (error) {
                console.error('Error while updating banner:', error);
                setMessage("An error occurred while updating the banner.");
            } finally {
                setIsLoading(false);
            }
        }
    };    

    return (
        <div className='flex justify-center flex-col flex-wrap gap-5 w-full h-full bg-[#DB4444] p-8 m-5 rounded-md'>
            
            <h1 className="text-[#FFFFFF] text-[32px] font-semibold leading-[24px]">All Banners</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {bannerControl.map((item, index) => (

                    <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition-all hover:scale-105 hover:shadow-2xl" key={item?._id}>

                        <Image src={`/uploads/${item.image}`} alt="Banner Image" width={1200} height={344} className="w-full h-48 object-cover" />

                        <div className="absolute top-2 right-2">

                            <button onClick={() => handleDropdownToggle(index)} className="text-gray-500 hover:text-black p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
                                    <circle cx="12" cy="4" r="2" />
                                    <circle cx="12" cy="12" r="2" />
                                    <circle cx="12" cy="20" r="2" />
                                </svg>
                            </button>

                            {showDropdown[index] && (
                                <div className="absolute top-10 right-0 bg-white shadow-md rounded-lg p-2 space-y-2">

                                    <button onClick={() => handleChangeClick(item._id)} className="block w-full text-left text-blue-500 hover:bg-gray-100 p-2 rounded-lg">
                                        Change
                                    </button>

                                    <button onClick={() => handleDeleteClick(item._id)} className="block w-full text-left text-red-500 hover:bg-gray-100 p-2 rounded-lg">
                                        Delete
                                    </button>

                                </div>
                            )}

                        </div>
                        
                    </div>
                    
                ))}

            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">

                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/3">

                        <h2 className="text-lg font-semibold mb-4">Change Banner</h2>

                        <span className="absolute top-[15px] right-[15px] text-[32px] text-[#DB4444] hover:text-[#b83a3a] cursor-pointer" onClick={handleClosePopup}>&times;</span>

                        <form onSubmit={handleUpdateBanner} className="flex justify-center flex-col gap-5">

                            <div className="bg_inp w-full p-5 bg-white rounded-lg font-mono flex flex-col gap-2">

                                <label htmlFor="image" className="block text-white text-sm font-bold">Change Banner Image</label>

                                <input type="file" name="image" id="image" accept="image/*" className="file:bg-gray-100 file:px-6 file:py-2 file:border file:border-gray-300 file:rounded-lg file:text-gray-700 file:cursor-pointer file:shadow-lg bg-white text-gray-700 rounded-lg cursor-pointer hover:shadow-lg duration-300 ease-in-out" required />
                                
                            </div>

                            <button type="submit" className="text-sm text-white font-semibold w-full h-[50px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-[#DB4444]" disabled={isLoading}>
                                {isLoading ? <div className="btn_loader"></div> : "Change Banner"}
                            </button>
                            
                        </form>
                        
                    </div>

                </div>
            )}

            {showConfirm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">

                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">

                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this banner?</h2>

                        <div className="flex justify-between">

                            <button onClick={handleConfirmDelete} className="bg-[#DB4444] text-white p-2 rounded-lg w-1/3 hover:bg-[#b83a3a]">
                                {isLoading ? "Deleting..." : "Yes"}
                            </button>

                            <button onClick={handleCloseConfirm} className="bg-[#000000] text-white p-2 rounded-lg w-1/3 hover:bg-gray-600">
                                No
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {message && <div className="text-center mt-4 text-[#FAFAFA]">{message}</div>}

        </div>
    )
}

export default AllBanners;