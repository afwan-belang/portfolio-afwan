import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Fungsi standar industri untuk menggabungkan class Tailwind tanpa bentrok
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formula matematika untuk Quartic Out easing: f(t) = 1 - (1 - t)^4
// Kita translasikan menjadi cubic bezier untuk Framer Motion agar animasi terasa organik
export const quarticOut: [number, number, number, number] = [0.25, 1, 0.5, 1];