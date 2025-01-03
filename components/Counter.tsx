"use client"
import React, { useEffect, useState } from "react";

interface CounterProps {
    onCountChange: any
};

const Counter: React.FC<CounterProps> = ({ onCountChange }) => {

    const [count, setCount] = useState(1);

    const Decrement = () => {
        setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1))
        onCountChange((prevCount: any) => (prevCount > 1 ? prevCount - 1 : 1))
    }

    const Increment = () => {
        setCount(prevCount => prevCount + 1);
    }

    useEffect(() => {
        onCountChange(count);
    }, [count, onCountChange]);

    return (
        <div className="w-[159px] h-[46px] border-2 border-[#00000080] flex items-center rounded justify-center">

            <button className="w-10 h-11 flex items-center justify-start text-[20px] border-r-2 border-[#00000080] text-medium leading-[28px] p-4 hover:bg-[#DB4444] hover:border-none hover:text-[#FFFFFF] hover:rounded transition-all" onClick={Decrement}>-</button>

            <span className="w-20 h-11 flex items-center justify-center text-[#000000] text-[20px] text-medium leading-[28px]">{count}</span>

            <button className="w-10 h-11 flex items-center justify-end text-[20px] border-l-2 border-[#00000080] text-medium leading-[28px] p-4 hover:bg-[#DB4444] hover:border-none hover:text-[#FFFFFF] hover:rounded transition-all" onClick={Increment}>+</button>

        </div>
    )
}

export default Counter;