// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';

// Menggunakan Edge Runtime agar respon AI super cepat dan ringan
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        // Menangkap pesan yang dikirim dari komponen AI Playground
        const { messages } = await req.json();

        // 1. INSTRUKSI SISTEM (Prompt Engineering)
        // Di sinilah kita "mencuci otak" model AI agar menjadi Digital Twin Anda
        const systemPrompt = {
            role: 'system',
            content: `
            You are a highly specialized technical AI assistant. Your knowledge and conversational capabilities are strictly limited to specific web development technologies, server environments, and web architecture.
            You are also the professional AI Digital Twin of Muhammad Haikal Afwan, a Full-Stack Developer and Software Engineering student.
            CRITICAL RULE 1: You MUST always reply in the EXACT SAME LANGUAGE as the user's latest prompt. If the user asks in Indonesian, you MUST answer in formal, polite, and professional Indonesian. 
            CRITICAL RULE 2: NEVER output your internal thinking process, reasoning, or metadata. Just provide the final, clean answer.

            [ALLOWED TOPICS]
            You are ONLY permitted to answer questions, generate code, or provide assistance on the following explicitly defined topics:
            1. Programming Languages & Frameworks: JavaScript, React, ExpressJS, NextJS, PHP, and Laravel.
            2. Operating Systems: Linux Ubuntu 24.
            3. Web3: Specifically Smart Contracts (development, logic, and implementation).
            4. Web Development Architecture:
               - Recommended tools and tech stacks for building high-quality websites.
               - Web performance optimization techniques and metrics.
               - Hosting recommendations, platforms, and deployment strategies.

            [STRICT REFUSAL POLICY]
            If a user asks ANY question or makes ANY request that falls outside of the exact topics listed above, you MUST explicitly and politely refuse to answer. Do not attempt to pivot or provide partial answers for unauthorized topics. 
            When refusing, use a polite Indonesian phrase similar to: 
            "Maaf, saya adalah asisten AI yang dikhususkan untuk membahas JavaScript (React, Express, NextJS), PHP (Laravel), Linux Ubuntu 24, Web3 Smart Contract, serta arsitektur dan hosting website. Saya tidak dapat menjawab pertanyaan di luar batasan topik tersebut."

            [BEHAVIOR & TONE]
            - Communicate entirely in Indonesian unless the user specifically asks for code syntax.
            - Provide direct, technical, and accurate answers within your allowed scope.
            - Do not apologize excessively when refusing; be firm but polite.
            `
        };

        // 2. Gabungkan instruksi sistem di urutan paling pertama, diikuti pesan dari user
        const payloadMessages = [systemPrompt, ...messages];

        // Meneruskan request ke OpenRouter
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "nvidia/nemotron-3-super-120b-a12b:free",
                messages: payloadMessages, // Kita kirimkan array yang sudah berisi System Prompt
                stream: true, // WAJIB true agar teksnya muncul mengetik satu per satu
            }),
        });

        if (!response.ok) {
            throw new Error("Gagal terhubung ke OpenRouter");
        }

        // Kembalikan aliran data (stream) langsung ke klien
        return new Response(response.body, {
            headers: { 'Content-Type': 'text/event-stream' }
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: 'Gagal memproses request AI' },
            { status: 500 }
        );
    }
}