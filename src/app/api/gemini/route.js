import { NextResponse } from 'next/server';

export async function POST(req) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  try {
    const { prompt } = await req.json();
    console.log('👉 Received prompt:', prompt);

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

    return NextResponse.json({ response: text });
  } catch (err) {
    console.error('❌ Gemini Error:', err.message);
    return NextResponse.json(
      { error: 'Gemini API failed', details: err.message },
      { status: 500 }
    );
  }
}
