"use client"
import { useState } from 'react';
import StarRating from './StarRating';

const ReviewInp: React.FC = () => {
    const [reviewValue, setReviewValue] = useState<number>(0);
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Math.max(0, parseInt(event.target.value || '0')), 250);
        setReviewValue(value);
    };

    return (
        <>
            <input
                type="number"
                value={reviewValue}
                onChange={handleInputChange}
                min={0}
                max={250}
                placeholder="Введите количество отзывов"
            />
        </>
    );
};

export default ReviewInp;