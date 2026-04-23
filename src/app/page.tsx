'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { quarticOut } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

// Menggunakan relative path yang benar untuk memanggil komponen
import ProjectCard from './components/molecules/ProjectCard';
import Hero from './components/organisms/Hero';
import AISection from './components/organisms/AISection';
import SkillsMarquee from './components/organisms/SkillsMarquee';

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  image_url?: string;
  github_url?: string;
  live_url?: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) {
        setProjects(data);
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen selection:bg-primary-container selection:text-on-primary-container relative overflow-hidden bg-background">

      {/* Background Ambience (DevArchitect Style) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-secondary-container/10 rounded-full blur-[150px]" />
      </div>

      {/* Hero Section yang sudah dipisah ke komponen tersendiri */}
      <Hero />
      <SkillsMarquee />
      {/* Project Grid Section (DevArchitect Style) */}
      <section className="py-24 bg-surface-container-low/40 relative z-10 border-y border-outline-variant/10" id="projects">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4"
          >
            <div>
              <h2 className="text-[1.75rem] font-bold tracking-tight text-on-surface mb-2">My Project</h2>
              <div className="w-12 h-1 bg-primary rounded-full" />
            </div>
          </motion.div>

          {isLoading ? (
            <div className="text-center text-on-surface-variant animate-pulse font-mono tracking-widest text-sm">
              [ LOADING DATABASE ]
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, idx) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: quarticOut }}
                >
                  <ProjectCard project={proj} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bagian ini akan kita rombak di Fase 3 */}
      <AISection />
    </main>
  );
}