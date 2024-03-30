import { HfInference } from '@huggingface/inference';
import { HuggingFaceStream, StreamingTextResponse } from 'ai';
import { experimental_buildLlama2Prompt } from 'ai/prompts';


// Create a new HuggingFace Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  const response = Hf.textGenerationStream({
    model: 'mistralai/Mistral-7B-Instruct-v0.2',
    inputs: experimental_buildLlama2Prompt(messages),
    parameters: {
      max_new_tokens: 2000,
    },
  });

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
