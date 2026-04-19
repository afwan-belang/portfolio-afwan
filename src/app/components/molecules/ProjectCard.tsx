'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { Code2, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech_stack: string[];
  image_url?: string;
  github_url?: string;
  live_url?: string;
}

export default function ProjectCard({ project, className }: { project: Project; className?: string }) {
  // Logika 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Placeholder abstrak jika image_url di database masih kosong
  const fallbackImage = `https://ui-avatars.com/api/?name=${project.title.charAt(0)}&background=1a4f47&color=57f1db&size=512&font-size=0.4`;

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group glass-card rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(87,241,219,0.15)] h-full flex flex-col",
        className
      )}
    >
      {/* Konten yang melayang 30px ke depan untuk efek 3D */}
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full rounded-xl overflow-hidden">

        {/* Image Section dengan Hover Zoom */}
        <div className="h-56 overflow-hidden relative rounded-t-xl border-b border-outline-variant/20">
          <img
            src={project.image_url || fallbackImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradien Overlay agar teks di bawahnya menyatu dengan gambar */}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4 flex-1 flex flex-col bg-background/40">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-on-surface line-clamp-1">{project.title}</h3>

            {/* 2. Bungkus ikon dengan tag <a> yang mengarah ke URL */}
            <div className="flex gap-3 text-on-surface-variant">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  title="View Source Code"
                >
                  <Code2 className="w-[18px] h-[18px]" />
                </a>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  title="Visit Live Site"
                >
                  <ExternalLink className="w-[18px] h-[18px]" />
                </a>
              )}
            </div>
          </div>

          <p className="text-on-surface-variant text-sm line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tech Stack Badges (DevArchitect Style) */}
          <div className="flex flex-wrap gap-2 pt-2 mt-auto">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold tracking-widest border border-outline-variant/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}