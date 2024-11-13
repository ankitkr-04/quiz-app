"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { BiLoaderCircle } from 'react-icons/bi';
import { Button } from 'antd';

interface AnimatedButtonProps {
    text: string;
    href: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ text, href }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        // Delay added for demonstration; replace with your loading logic if needed.
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <Link href={href}  onClick={handleClick}>
            <button disabled={isLoading} className="relative inline-flex items-center justify-start w-64 py-4 px-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded-full hover:w-96 hover:px-24 bg-gray-50 group cursor-pointer">
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full rounded-full"></span>
                
                {isLoading ? (
                    <><BiLoaderCircle height={4} width={4} className='mr-3 text-2xl animate-spin'/></>
                ) : (
                    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                        <Image src="/forwardarrow.svg" alt="arrow" width={24} height={24} />
                    </span>
                )}

                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                    <Image src="/forwardarrow.svg" alt="arrow" width={24} height={24} />
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                    {isLoading ? 'Loading...' : text}
                </span>
            </button>
        </Link>
    );
};

export default AnimatedButton;
