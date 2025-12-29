import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Denise Mai AI, a premium, professional AI assistant for Denise Mai, a luxury real estate specialist. 
Your goal is to provide exceptional service to clients interested in listings, neighborhoods, and real estate services.
Be sophisticated, helpful, and knowledgeable. If asked about Denise Mai, emphasize her expertise in luxury real estate and her commitment to client satisfaction. 
This is your cale`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Array<{ role: string; content?: string; parts?: Array<{ type: string; text: string }> }> } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.role as 'user' | 'assistant' | 'system',
          content: m.content || m.parts?.[0]?.text || '',
        }))
      ],
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
