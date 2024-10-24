import Container from "@/components/Container"
import { GameProps } from "@/utils/types/game"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Label } from "./components/label"
import GameCard from "@/components/GameCard"
import { CalendarDays, Gamepad2, Tags } from "lucide-react" 
import { Metadata } from "next"

interface PropsParams {
    params: {
        id: string;
    }
}

export async function generateMetadata( { params }: PropsParams ): Promise<Metadata> {
    try {
        const res: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`)
        .then((res) => res.json())
        .catch(() => {
            return {
                title: "GamesHub - Descubra novos jogos"
            }


        })

        return {
            title: res.title,
            description: `${res.description.slice(0, 100)}...`,
            openGraph: {
                title: res.title,
                images: [res.image_url]
            }
        }
    } catch(err) {
        return {
            title: "GamesHub - Descubra novos jogos"
        }
    }
}

async function getData(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { cache: "no-store" })
        return res.json()
    } catch(err) {
        throw new Error("Failed to fetch")
    }
}

async function getGameSort() {
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: "no-store" })
        return res.json()
    } catch(err) {
        throw new Error("Failed")
    }
}

export default async function Game({ params: { id } }: { params: { id: string } }) {
    const data: GameProps = await getData(id)
    const sortedGame: GameProps = await getGameSort()

    if (!data) {
        redirect("/")
    }

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
                <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
                <Image
                    className="object-cover"
                    alt={`Imagem do jogo ${data.title}`}
                    src={data.image_url}
                    priority={true}
                    fill={true}
                    quality={100}
                    sizes="1000vw"
                />
               
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <Container>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            {data.title}
                        </h1>
                    </Container>
                </div>
            </div>

            <Container>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 mt-10">
                    <h2 className="text-2xl font-bold mb-4">Sobre o Jogo</h2>
                    <p className="text-gray-700 leading-relaxed">{data.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Gamepad2 className="text-orange-600" />
                            <h2 className="text-xl font-bold">Plataformas</h2>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {data.platforms.map((item) => (
                                <Label name={item} key={item} />
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Tags className="text-orange-600" />
                            <h2 className="text-xl font-bold">Categorias</h2>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {data.categories.map((item) => (
                                <Label name={item} key={item} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="text-orange-600" />
                        <p className="font-medium">
                            <strong>Data de lançamento:</strong> {data.release}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">Jogo Recomendado</h2>
                    <GameCard data={sortedGame} />
                </div>
            </Container>
        </main>
    )
}