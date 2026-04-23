'use client';

import { cn } from "@/lib/utils";
import { Marquee } from "../../../components/ui/marquee";

const skills = [
    { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "NodeJS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { name: "ReactJS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "ExpressJS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
    { name: "Tailwindcss", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Linux Ubuntu", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-plain.svg" },
];

// Membagi array menjadi 2 baris (4 skill di atas, 4 skill di bawah)
const firstRow = skills.slice(0, skills.length / 2);
const secondRow = skills.slice(skills.length / 2);

const SkillCard = ({ img, name }: { img: string; name: string }) => {
    return (
        <figure
            className={cn(
                "relative h-32 w-32 cursor-pointer overflow-hidden rounded-2xl p-4 flex flex-col items-center justify-center gap-3",
                // Gaya Glassmorphism khas DevArchitect
                "border border-outline-variant/20 bg-surface-container-low/40 backdrop-blur-md hover:bg-surface-container-highest/80 hover:border-primary/40 transition-all duration-300 shadow-xl"
            )}
        >
            {/* Container Logo Bulat */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 p-2 shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-300">
                <img
                    className={cn(
                        "h-7 w-7 object-contain drop-shadow-md",
                        // ExpressJS defaultnya warna hitam, kita jadikan putih (invert) agar terlihat di Dark Mode
                        name === "ExpressJS" && "invert opacity-90"
                    )}
                    alt={name}
                    src={img}
                />
            </div>

            {/* Nama Skill di bawah logo */}
            <figcaption className="text-[11px] md:text-xs font-bold text-on-surface tracking-wider text-center uppercase mt-1">
                {name}
            </figcaption>
        </figure>
    );
};

export default function SkillsMarquee() {
    return (
        <section className="relative w-full py-24 z-10 overflow-hidden" id="skills">

            {/* --- HEADER SKILLS SECTION --- */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h2 className="text-[1.75rem] font-bold tracking-tight text-on-surface mb-2">Skills</h2>
                        <div className="w-12 h-1 bg-primary rounded-full" />
                    </div>
                </div>
            </div>
            {/* ----------------------------- */}

            {/* --- KOTAK ANIMASI MARQUEE --- */}
            <div className="relative flex w-full flex-col items-center justify-center">
                {/* Baris Pertama (Bergerak ke Kiri) */}
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((skill) => (
                        <SkillCard key={skill.name} {...skill} />
                    ))}
                </Marquee>

                {/* Baris Kedua (Bergerak ke Kanan) */}
                <Marquee reverse pauseOnHover className="[--duration:20s] mt-4">
                    {secondRow.map((skill) => (
                        <SkillCard key={skill.name} {...skill} />
                    ))}
                </Marquee>

                {/* Gradasi Penutup (Masking) agar Marquee menghilang halus di ujung layar */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[15%] md:w-1/4 bg-gradient-to-r from-[#0b1326] to-transparent z-20"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] md:w-1/4 bg-gradient-to-l from-[#0b1326] to-transparent z-20"></div>
            </div>

        </section>
    );
}