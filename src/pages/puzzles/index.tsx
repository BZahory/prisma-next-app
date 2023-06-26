import puzzles, { Status } from "@/test/puzzles";
import Link from "next/link";
import Header from "../../components/Header";

interface Props {}

export default function Puzzles({}: Props) {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <h1 className="text-5xl mt-5 font-bold self-center">Puzzles</h1>
      <div className="flex w-full">
        {puzzles.map(({ name, description, status, id }) => (
          <Link
            href={`/puzzles/${id}`}
            className="flex-1 flex flex-col w-1/2 bg-gray-500 items-center m-10 cursor-pointer hover:bg-gray-400"
          >
            <h1 className="text-3xl font-bold">{name}</h1>
            <h3
              className={`text-xl ${
                status === Status.COMPLETED
                  ? "text-green-500"
                  : "text-slate-800"
              }`}
            >
              {status}
            </h3>
            <p className="whitespace-pre-wrap">{description}</p>
          </Link>
        ))}
        <div></div>
      </div>
    </main>
  );
}
