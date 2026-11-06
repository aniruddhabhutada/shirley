import React from 'react';

export default function ShirleyFlowerIcon({
  className = 'w-6 h-6',
  color = '#F8A5C2',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* 4 elegant teardrop petals matching the Shirley logo emblem */}
      <path d="M50 42 C40 15, 60 15, 50 42 Z" />
      <path d="M58 50 C85 40, 85 60, 58 50 Z" />
      <path d="M50 58 C60 85, 40 85, 50 58 Z" />
      <path d="M42 50 C15 60, 15 40, 42 50 Z" />
      <circle cx="50" cy="50" r="4" fill={color} />
    </svg>
  );
}

