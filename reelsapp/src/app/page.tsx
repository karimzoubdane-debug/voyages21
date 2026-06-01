import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-white mb-4">
          Reels<span className="text-violet-500">App</span>
        </h1>
        <p className="text-gray-400 text-xl mb-8">
          Transformez n'importe quelle vidéo en Shorts, Reels et TikToks viraux — en quelques minutes.
        </p>
        {userId ? (
          <Link
            href="/dashboard"
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-full text-lg transition inline-block"
          >
            Aller au dashboard →
          </Link>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-full text-lg transition">
              Commencer gratuitement
            </button>
          </SignInButton>
        )}
      </div>
    </main>
  );
}
