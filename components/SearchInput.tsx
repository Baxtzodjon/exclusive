// // components/SearchInput.tsx
// import React from 'react';

// interface SearchInputProps {
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
//   return (
//     <input
//       type="search"
//       value={value}
//       onChange={onChange}
//       placeholder="Search products..."
//       className="w-full p-3 mb-6 text-lg border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//     />
//   );
// };

// export default SearchInput;

// components/SearchInput.tsx
import Image from "next/image";
import React from "react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Функция для обработки отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery) {
      // Редирект на страницу /search с параметром query
      location.assign(`/search?query=${searchQuery}`);
    }
  };

  return (
    <form className="relative hidden md:block" onSubmit={handleSubmit}>

      <button type="submit" className="absolute top-[8px] right-[12px]"><Image src="/icons/search_icon.png" alt="search icon" width={20} height={20} /></button>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="What are you looking for?"
        className="text-[#000000] text-[12px] font-normal leading-[18px] w-[200px] md:w-[243px] h-[38px] px-3 bg-[#F5F5F5] rounded focus:outline-[#DB4444]"
      />

    </form>
  );
};

export default SearchInput;