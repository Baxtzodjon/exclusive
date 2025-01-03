import { useState } from 'react';

const StarRating = () => {

  const [rating, setRating] = useState<number | string>('');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;

    if (/^[1-5]$/.test(value) || value === '') {
      setRating(value);
    }
  };
  
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      const isActive = Number(rating) >= i;
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isActive ? 'yellow' : 'gray'}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="number"
        value={rating}
        onChange={handleInputChange}
        placeholder="Введите рейтинг (1-5)"
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      <div className="flex">
        {renderStars()}
      </div>
    </div>
  );
};

export default StarRating;