import Container from "@/components/Container"
import { GameProps } from "@/utils/types/game"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Label } from "./components/label"
import GameCard from "@/components/GameCard"


async function getData( id: string ) { 
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { cache: "no-store" })
        return res.json()
    } catch(err) {
        throw new Error("Failed do fetch")
    }
}

async function getGameSort(){
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

    return(
        <main className="w-full">
            <div className="bg-black w-full h-80 relative sm:h-96">
                <Image
                    className="object-cover w-full h-80 sm:h-96 opacity-80"
                    alt="imagem jogo"
                    src={data.image_url}
                    priority={true}
                    fill={true}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                />
            </div>
            <Container>
                <h1 className="font-bold text-xl my-4">{data.title}</h1>
                <p>{data.description}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
                <div className="flex gap-2 flex-wrap">
                    {data.platforms.map((item) => (
                        <Label name={item} key={item} />
                    ))}
                </div>

                <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
                <div className="flex gap-2 flex-wrap">
                    {data.categories.map((item) => (
                        <Label name={item} key={item} />
                    ))}
                </div>

                <p className="mt-5"><strong>Data de lançamento:</strong> {data.release}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Jogo Recomendado: </h2>
                <div className="flex">
                    <div className="flex-grow">
                        <GameCard data={sortedGame} />
                    </div>
                </div>
            </Container>
        </main>
    )
}