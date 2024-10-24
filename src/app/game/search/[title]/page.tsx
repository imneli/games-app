import Container from "@/components/Container";
import Input from "@/components/Input";
import { GameProps } from "@/utils/types/game";
import GameCard from "@/components/GameCard";

async function gameData(title: string) {
    console.log("param: " + title)
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${title}`)
        return res.json();
    } catch(err) {
        return null
    }
}

export default async function Search( { params: { title } }: { params: { title: string } } ) {
    const games: GameProps[] = await gameData(title)

    return(
        <main className="w-full text-black">
            <Container>
                <Input/>
                <h1 className="font-bold text-xl mt-8 mb-5">Veja o que encontramos em nossa data:</h1>

                {!games && (
                    <h1>Esse jogo não foi encontrado...</h1>
                )}

                <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {games && games.map((item) => (
                        <GameCard key={item.id} data={item} />
                    ))}
                </section>
            </Container>
        </main>
    )
}