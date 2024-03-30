'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: '',
        content: `You are GAlliBOT, a helpful chatbot mady by GAllium who expains complex concepts in a 5year old level, use emojis`,
        role: 'system'
      },
    ]
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.length > 0
            ? messages
              .filter((m) => m.role !== 'system')
              .map((m) => (
                <div key={m.id} className="whitespace-pre-wrap p-5">
                  {m.role === 'user' ? 'You: ' : 'teAIch: '}
                  {m.content}
                  <hr/>
                </div>
              ))
        : null}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
