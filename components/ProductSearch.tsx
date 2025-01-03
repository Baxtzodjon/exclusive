import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";

interface Product {
    _id: string;
    titles: string;
    images: string;
    price: string;
    reviews: string;
    description: string;
    image_second: string;
    image_third: string;
    catg_prod: string;
}

const ProductSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000); // Задаём максимальную цену
    const [filteredByPrice, setFilteredByPrice] = useState<Product[]>([]);

    useEffect(() => {
        // Функция для загрузки всех продуктов
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/product");
                const data = await res.json();
                if (data.success && data.data) {
                    setProducts(data.data);  // Сохраняем все продукты
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Фильтрация продуктов по названию и цене
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

    // Обработчик изменения значения в поисковом поле
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Обработчик изменения минимальной цены
    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMinPrice(value);
    };

    // Обработчик изменения максимальной цены
    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMaxPrice(value);
    };

    // Обработчик изменения диапазона цен с помощью ползунка
    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMaxPrice(value);
    };

    // Применяем фильтрацию после изменения любого из фильтров
    useEffect(() => {
        if (searchQuery === "" && minPrice === 0 && maxPrice === 1000) {
            setFilteredProducts([]);  // Показывать пусто, если нет поиска и нет фильтрации по цене
        } else {
            filterProducts();
        }
    }, [searchQuery, minPrice, maxPrice, products]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Поле поиска */}
            {/* <input
                type="search"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full p-3 mb-6 text-lg border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            /> */}

            <SearchInput /> {/* value={searchQuery} onChange={handleSearch} */}

            {/* Фильтрация по цене */}
            <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Filter by price</label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={maxPrice}
                    onChange={handleRangeChange}
                    className="w-full mb-4"
                />
                <div className="flex justify-between text-sm">
                    <span>0</span>
                    <span>{maxPrice}</span>
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label htmlFor="min-price" className="text-lg font-semibold">
                            Min Price:
                        </label>
                        <input
                            type="number"
                            id="min-price"
                            min="0"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="w-1/2">
                        <label htmlFor="max-price" className="text-lg font-semibold">
                            Max Price:
                        </label>
                        <input
                            type="number"
                            id="max-price"
                            min="0"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Индикатор загрузки */}
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div>
                    {/* Если нет результатов, показываем пусто */}
                    {searchQuery === "" && minPrice === 0 && maxPrice === 1000 && filteredProducts.length === 0 ? (
                        <p className="text-center text-gray-500">No products found</p>
                    ) : (
                        <div>
                            {/* Отображение продуктов, если есть результаты поиска */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="bg-white border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <img
                                            src={`/uploads/${product.images}`}
                                            alt={product.titles}
                                            className="w-full h-48 object-cover rounded-t-lg"
                                        />
                                        <div className="mt-4">
                                            <h3 className="text-xl font-semibold text-gray-800">{product.titles}</h3>
                                            <p className="text-gray-600 mt-2">{product.description}</p>
                                            <p className="text-gray-800 font-bold mt-2">${product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductSearch;
