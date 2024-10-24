import { User } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full h-28 bg-slate-100 text-black px-2">
            <div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
                <nav className="flex justify-center items-center gap-4">
                    <Link href="/"><h1 className="font-semibold text-3xl">GamesHub</h1></Link>
                    <Link href="/"><p className="text-xl">Games</p></Link>
                    <Link href="/profile"><p className="text-xl">Perfil</p></Link>
                </nav>
                <div className="hidden sm:flex justify-center items-center">
                    <Link href="/profile"><User size={34} color="#475569" /></Link>
                </div>
            </div>
        </header>
    );
}
