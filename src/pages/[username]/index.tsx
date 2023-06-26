import Header from "@/components/Header";
import { Status } from "@/test/puzzles";
import currentUser from "@/test/user";
import Link from "next/link";
import React, { useState } from "react";
import Input from "../../components/Input";

interface Props {}

// handles both login and sign-up
export default function Profile({}: Props) {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const { username, puzzles } = currentUser; //TODO: link to API

  return (
    <main className="flex flex-col h-screen">
      <Header />

      <div className="flex h-full w-full items-center justify-center">
        <div
          className={`flex flex-col w-3/4 sm:w-1/2 bg-white rounded-xl overflow-hidden divide-y border [&>*]:p-4`}
        >
          <Link
            href={`/@${username}`}
            className="text-2xl text-center text-blue-500"
          >
            @{username}
          </Link>
          <div className="flex flex-col items-center bg-gray-100">
            <h1 className="font-bold text-4xl items-center">Puzzles</h1>
            {puzzles.map(({ name, description, status, id }) => (
              <Link
                href={`/puzzles/${id}`}
                className="flex-1 flex flex-col w-3/4 bg-gray-500 items-center cursor-pointer hover:bg-gray-400 mt-2 rounded-xl"
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
          </div>
        </div>
      </div>
    </main>
  );
}
