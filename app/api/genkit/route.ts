import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log("Prompt received:", prompt);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini API response:", data);

    // Agar API response me expected field nahi hai to debug karna easy ho
    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return NextResponse.json({ output });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "AI request failed", details: error?.message || error },
      { status: 500 }
    );
  }
}
