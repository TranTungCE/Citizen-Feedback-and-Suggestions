import React from 'react';

export function LogoSvg({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Biểu trưng Mặt trận Tổ quốc An Thới Đông"
    >
      <defs>
        {/* Gradient vòng tròn ngoài */}
        <linearGradient id="atdCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C41E3A" />
          <stop offset="100%" stopColor="#8B0000" />
        </linearGradient>
        {/* Gradient cánh hoa sen và ngôi sao vàng */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#E6A100" />
        </linearGradient>
        <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Vòng nền tròn đỏ đô */}
      <circle cx="50" cy="50" r="47" fill="url(#atdCircleGrad)" stroke="#FFD700" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="3 2" />

      {/* Hoa sen cách điệu 7 cánh vươn lên tượng trưng cho sự đoàn kết */}
      {/* Cánh hoa sen trái ngoài */}
      <path 
        d="M 50 68 C 36 65 24 55 27 41 C 33 46 41 55 50 68 Z" 
        fill="url(#goldGrad)" 
        opacity="0.85" 
      />
      {/* Cánh hoa sen phải ngoài */}
      <path 
        d="M 50 68 C 64 65 76 55 73 41 C 67 46 59 55 50 68 Z" 
        fill="url(#goldGrad)" 
        opacity="0.85" 
      />
      {/* Cánh hoa sen trái trong */}
      <path 
        d="M 50 70 C 39 63 35 48 39 33 C 44 42 47 56 50 70 Z" 
        fill="url(#goldGrad)" 
        opacity="0.95" 
      />
      {/* Cánh hoa sen phải trong */}
      <path 
        d="M 50 70 C 61 63 65 48 61 33 C 56 42 53 56 50 70 Z" 
        fill="url(#goldGrad)" 
        opacity="0.95" 
      />
      {/* Búp sen chính giữa */}
      <path 
        d="M 50 25 C 44 38 43 55 50 71 C 57 55 56 38 50 25 Z" 
        fill="url(#goldGrad)" 
        filter="url(#subtleShadow)"
      />

      {/* Ngôi sao vàng 5 cánh ở đỉnh hoa sen */}
      <polygon 
        points="50,14 52.5,21.5 60,21.5 54,26 56.5,33.5 50,29 43.5,33.5 46,26 40,21.5 47.5,21.5" 
        fill="#FFFFFF" 
        stroke="#FFD700" 
        strokeWidth="0.8" 
      />

      {/* Dải băng đế cong chữ MTTQ - ATĐ */}
      <path 
        d="M 26 73 Q 50 82 74 73 Q 76 79 73 82 Q 50 90 27 82 Q 24 79 26 73 Z" 
        fill="#FFFFFF" 
        stroke="#FFD700" 
        strokeWidth="1" 
      />
      <text 
        x="50" 
        y="80" 
        textAnchor="middle" 
        fontSize="7" 
        fontWeight="bold" 
        fill="#8B0000" 
        letterSpacing="0.8"
        fontFamily="sans-serif"
      >
        MTTQ • ATĐ
      </text>
    </svg>
  );
}
