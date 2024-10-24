"use client";

import { FormEvent, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation'; 

export default function Input() {
    const [input, setInput] = useState("");
    const router = useRouter();

    function handleSearch(event: FormEvent) {
        event.preventDefault();
        if (input.trim() === "") return;

        router.push(`/game/search/${encodeURIComponent(input)}`);
        setInput("");
    }

    return (
        <form 
            className='w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2' 
            onSubmit={handleSearch}
        >
            <input 
                type="text" 
                placeholder="Procurando algum jogo?" 
                className='bg-slate-200 outline-none w-11/12'
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
            />
            <button type='submit'>
                <Search size={24} color='#ea580c' />
            </button>
        </form>
    );
}