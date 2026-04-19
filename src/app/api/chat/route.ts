// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';

// Menggunakan Edge Runtime agar respon AI super cepat dan ringan
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        // Menangkap pesan yang dikirim dari komponen AI Playground kita nanti
        const { messages } = await req.json();

        // Meneruskan request ke OpenRouter
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // Kamu bisa ganti ke "mistralai/mistral-7b-instruct" kalau mau coba model lain
                model: "nvidia/nemotron-3-super-120b-a12b:free",
                messages,
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