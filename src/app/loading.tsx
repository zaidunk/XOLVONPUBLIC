export default function Loading() {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400">
          <span className="inline-block h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
          <span className="inline-block h-3 w-3 rounded-full bg-purple-400 animate-pulse [animation-delay:120ms]" />
          <span className="inline-block h-3 w-3 rounded-full bg-purple-300 animate-pulse [animation-delay:240ms]" />
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }
  