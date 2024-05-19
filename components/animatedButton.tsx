import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface AnimatedButtonProps {
    text: string;
    href: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ text, href }) => {
    return (
        <Link href={href}>
            <div className="relative inline-flex items-center justify-start w-64 py-4 px-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded-full hover:w-96 hover:px-24 bg-gray-50 group cursor-pointer">
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full rounded-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <Image src="/forwardarrow.svg" alt="arrow" width={24} height={24} />
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                    <Image src="/forwardarrow.svg" alt="arrow" width={24} height={24} />
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">{text}</span>
            </div>
        </Link>
    );
};

export default AnimatedButton;