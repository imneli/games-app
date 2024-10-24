import Container from "@/components/Container";
import Image from "next/image";


async function getGame() {
  try {

    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`)
    return res.json();

  } catch(err){
    throw new Error("failed to fetch data")
  }
}

export default async function Home() {
  const gameHub = getGame()
  console.log(gameHub)

  return (
    <main className="flex">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">Separamos um jogo para você!</h1>
        <Image src="/path/to/image.jpg" alt="Description" width={500} height={300} />
      </Container>
    </main>
  );
}
