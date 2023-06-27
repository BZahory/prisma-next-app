import useForceLogin from "@/lib/hooks/useForceLogin";
import useDatabaseUser from "@/lib/hooks/useSessionUser";
import { Status } from "@/lib/types/sql";
import Link from "next/link";
import Header from "../../components/Header";

export default function Puzzles() {
  useForceLogin();

  const user = useDatabaseUser();

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <h1 className="text-5xl mt-5 font-bold self-center">Puzzles</h1>
      <div className="flex w-full">
        {user?.puzzles?.map(({ title, description, status, id }) => (
          <Link
            key={id}
            href={`/puzzles/${id}`}
            className="flex-1 flex flex-col w-1/2 p-2 rounded-xl bg-gray-500 items-center m-10 cursor-pointer hover:bg-gray-400"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <h3
              className={`text-xl ${
                status === Status.COMPLETED
                  ? "text-green-500"
                  : "text-slate-800"
              }`}
            >
              {status}
            </h3>
            <p className="whitespace-pre-wrap line-clamp-2">{description}</p>
          </Link>
        ))}
        <div></div>
      </div>
    </main>
  );
}
