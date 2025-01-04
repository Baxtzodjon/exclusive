// components/SearchInput.tsx
import Image from "next/image";
import React from "react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery) {
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