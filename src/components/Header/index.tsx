"use client";

import { User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="w-full bg-slate-100 text-black shadow-md fixed top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 h-20">
                <div className="flex items-center justify-between h-full">
                   
                    <Link href="/">
                        <h1 className="font-bold text-2xl sm:text-3xl text-orange-600">
                            GamesHub
                        </h1>
                    </Link>

                   
                    <nav className="hidden md:flex items-center gap-8">
                        <Link 
                            href="/" 
                            className="text-slate-600 hover:text-orange-600 transition-colors font-medium"
                        >
                            Games
                        </Link>
                        <Link 
                            href="/profile" 
                            className="text-slate-600 hover:text-orange-600 transition-colors font-medium"
                        >
                            Perfil
                        </Link>
                        <Link 
                            href="/profile" 
                            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                        >
                            <User size={28} className="text-slate-600" />
                        </Link>
                    </nav>

                   
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? (
                            <X size={28} className="text-slate-600" />
                        ) : (
                            <Menu size={28} className="text-slate-600" />
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden fixed top-20 left-0 right-0 bg-white border-t border-slate-200 shadow-lg animate-slideDown">
                    <nav className="max-w-screen-xl mx-auto">
                        <Link href="/">
                            <div className="px-4 py-4 hover:bg-slate-100 transition-colors border-b border-slate-100">
                                <p className="text-slate-600 font-medium">Games</p>
                            </div>
                        </Link>
                        <Link href="/profile">
                            <div className="px-4 py-4 hover:bg-slate-100 transition-colors flex items-center gap-2">
                                <User size={24} className="text-slate-600" />
                                <p className="text-slate-600 font-medium">Minha Conta</p>
                            </div>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}