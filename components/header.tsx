'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const activePath = usePathname();

    const isActive = (pathname: string) => activePath === pathname;

    return (
        <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl  max-w-screen-md  lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image src="/logo.svg" alt="Website Logo" width={32} height={32} />
                            <p className="sr-only">Website Title</p>
                        </Link>
                    </div>
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <Link
                            href="/"
                            className={`inline-block rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 ${isActive("/") ? "bg-gray-100 text-gray-900" : ""}`}
                        >
                            <div className="inline-flex align-bottom items-center gap-2"><Image src='/home.svg' alt='Leaderboard Icon' width={24} height={24} />
                                Home</div>
                        </Link>
                        <Link
                            href="/leaderboard"
                            className={`inline-block rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 ${isActive("/leaderboard") ? "bg-gray-100 text-gray-900" : ""}`}
                        >
                            <div className="inline-flex align-bottom items-center gap-2"><Image src='/leaderboard.svg' alt='Leaderboard Icon' width={24} height={24} />
                                Leaderboard</div>

                        </Link>
                    </div>
                    <div className="flex items-center justify-end md:gap-3">
                        <Link
                            href="/leaderboard"
                            className={`sm:hidden inline-flex items-center justify-center border-none px-3 py-2 transition-all duration-150 hover:bg-gray-100 rounded-lg ${isActive("/leaderboard") ? "bg-gray-100" : ""}`}
                        >
                            <Image src='/leaderboard.svg' alt='Leaderboard Icon' width={24} height={24} />
                        </Link>

                        <Link
                            href="/quiz-options"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Start Quiz
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}