
import Container from "@/components/Container";
import Image from "next/image";
import { GameProps } from '@/utils/types/game';
import Link from "next/link";
import { ArrowRightSquare } from "lucide-react";
import Input from "@/components/Input";
import GameCard from "@/components/GameCard";


async function getGame(): Promise<GameProps> {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { next: { revalidate: 320 } });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch data");
  }
}

async function getGamesData() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, { next: { revalidate: 320 } });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  let gameHub: GameProps | null = null;
  const data: GameProps[] = await getGamesData();

  try {
    gameHub = await getGame();
    console.log(gameHub);
  } catch (err) {
    console.error(err);
  }

  if (!gameHub) {
    return (
      <main className="flex">
        <Container>
          <h1 className="text-center font-bold text-xl mt-8 mb-5">Failed to load game data.</h1>
        </Container>
      </main>
    );
  }

  return (
    <main className="w-full mt-24">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">Separamos um jogo para você!</h1>
        <Link href={`/game/${gameHub.id}`}>
          <section className="w-full bg-black rounded-lg">
            <div className="w-full max-h-96 h-96 relative">
              <div className="absolute z-20 bottom-0 flex justify-center items-center gap-2 p-3">
                <p className="font-bold text-xl text-white">{gameHub.title}</p>
                <ArrowRightSquare size={24} color="#fff"/>
              </div>
              <Image 
                src={gameHub.image_url} 
                alt={gameHub.title} 
                priority={true}
                quality={100}suppressContentEditableWarning
                className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                fill={true}
              />
            </div>
          </section>
        </Link>
        <Input/>

        <h2 className="text-lg font-bold mt-8 mb-5">Jogos para conhecer</h2>

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            <GameCard key={item.id} data={item} />
          ))}
        </section>
      </Container>
    </main>
  );
}
