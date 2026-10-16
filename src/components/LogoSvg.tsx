import React from 'react';
import Image from 'next/image';

export function LogoSvg({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <Image
        src="/logo.svg"
        alt="Biểu trưng Mặt trận Tổ quốc Việt Nam xã An Thới Đông"
        width={100}
        height={100}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}
