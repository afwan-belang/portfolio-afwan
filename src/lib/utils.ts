import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fungsi utilitas untuk menggabungkan class Tailwind CSS.
 * Ini mencegah konflik class, misalnya jika ada "p-4" dan "p-8" yang dipanggil bersamaan,
 * tailwind-merge akan memenangkan class yang dipanggil terakhir.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Custom Easing untuk Framer Motion.
 * Quartic Out menghasilkan animasi yang masuk dengan cepat lalu melambat dengan sangat halus di akhir.
 * Setara dengan cubic-bezier(0.25, 1, 0.5, 1)
 */
export const quarticOut: [number, number, number, number] = [0.25, 1, 0.5, 1];