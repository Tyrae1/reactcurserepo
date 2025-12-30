export type MockChunkHandler = (chunk: string) => void;

export async function mockChatCompletionStream (
    userText: string,
    onChunk: MockChunkHandler,
    signal?: AbortSignal
): Promise<string> {
    const reply =
        `Ok. I hear: "${userText}".` +
        `Lets break down it into steps and made it together.`;
        let acc = "";
        for (const ch of reply) {
            if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
            acc += ch;
            onChunk(ch);
            await new Promise((r) => setTimeout(r, 15));
        }
        return acc;
}