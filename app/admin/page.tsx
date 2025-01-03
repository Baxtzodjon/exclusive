"use client"

import { useEffect, useState } from "react"

export default function Admin() {
    const [file, setFile] = useState<File | null>(null);
    const [Image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [stats, setStats] = useState({ activeUsers: 0, totalUsers: 0 });
    const [error, setError] = useState<string | null>(null);

    const dashboard_info = [
        { title: 'Total Users', num: stats.totalUsers.toString(), bgColor: 'bg-[#000000]', textColor: 'text-white' },
        { title: 'Active Users', num: stats.activeUsers.toString(), bgColor: 'bg-white', textColor: 'text-[#000000]' },
    ];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.message || "Image upload failed");
                return;
            }

            const data = await response.json();
            setMessage(data.message);

            const banner = {
                image: data.data,
            };

            const bannerResponse = await fetch('http://localhost:3000/api/banner', {
                method: "POST",
                body: JSON.stringify(banner),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!bannerResponse.ok) {
                const errorData = await bannerResponse.json();
                setMessage(errorData.message || "Failed to save banner data");
                return;
            }

            const banner_data = await bannerResponse.json();
            setMessage(banner_data.message);

        } catch (error) {
            setMessage("Something went wrong: " + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/clerk-stats');
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                const data = await response.json();
                setStats(data);
            } catch (err) {
                setError('Не удалось загрузить статистику');
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="flex justify-center flex-col flex-wrap gap-5 w-full h-full bg-[#DB4444] p-8 m-5 rounded-md">

            <div className="rounded-md">

                <video src="/video/modern_house.mp4" autoPlay loop muted className="w-full h-[250px] object-cover rounded"></video>

            </div>

            <div className="flex items-center justify-between sm:flex-wrap lg:flex-nowrap gap-5">

                {
                    dashboard_info.map((info, i) => {
                        return (
                            <div key={i} className={`w-full h-[100px] ${info.bgColor} p-2 flex flex-col gap-5 rounded`}>

                                <small className={`${info.textColor} text-[14px] font-normal leading-[24px]`}>{info.title}</small>

                                <h4 className={`${info.textColor} text-[28px] font-semibold leading-[24px]`}>{info.num}</h4>

                            </div>
                        );
                    })
                }

            </div>

            <div className="flex justify-center flex-col flex-wrap gap-5">

                <h1 className="text-[#FFFFFF] text-[32px] font-semibold leading-[24px]">Add Banner</h1>

                <form action="" className="flex justify-center flex-col gap-5" onSubmit={handleSubmit}>

                    <div className="w-full p-5 bg-white rounded-lg font-mono flex flex-col gap-2">

                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold">Banner Image</label>

                        <input type="file" name="image" id="image" accept="image/*" className="file:bg-gray-100 file:px-6 file:py-2 file:border file:border-gray-300 file:rounded-lg file:text-gray-700 file:cursor-pointer file:shadow-lg bg-white text-gray-700 rounded-lg cursor-pointer hover:shadow-lg duration-300 ease-in-out" required onChange={handleFileChange} />

                        <div className="flex items-center justify-center mt-3">

                            {Image && <img src={Image} alt="Banner image" width="300" height="344" className="rounded" />}

                        </div>

                    </div>

                    <button type="submit" className="text-sm font-semibold w-full h-[50px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-[#DB4444] hover:shadow-lg hover:border-blue-300 bg-gray-100">{loading ? "Uploading..." : "Add Banner"}</button>

                </form>

                {message && <p className="text-white">{message}</p>}

            </div>

        </div>
    );
};
