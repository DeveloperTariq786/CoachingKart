'use client';

import React from 'react';
import Image from 'next/image';


const Promotion: React.FC = () => {
    return (
        <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden group">
            <Image
                src="/promotions/imag.png"
                alt="Promotion Advertisement"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                sizes="100vw"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default Promotion;
