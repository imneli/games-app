import { ArrowRightSquare } from "lucide-react"
import Link from "next/link"
import { GameProps } from "@/utils/types/game" 
import Image from "next/image"

interface GameCardProps {
    data: GameProps
}

export default function GameCard({ data }: GameCardProps) {
    return (
        <Link href={`/game/${data.id}`}>
            <section className="w-full bg-slate-200 rounded-lg p-4 mb-5">
                <div className="relative w-full h-56"> 
                    <Image 
                        className="rounded-lg object-cover"
                        src={data.image_url}
                        alt={data.title}
                        fill={true}
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                    />
                </div>

                
                <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-black text-ellipsis truncate whitespace-nowrap overflow-hidden">{data.title}</p>
                    <ArrowRightSquare className="text-black" size={24} />
                </div>
            </section>
        </Link>
    )
}