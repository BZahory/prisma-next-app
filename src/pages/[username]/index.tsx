import Header from "@/components/Header";
import { Status, User } from "@/lib/types/sql";
import { createAuthHeader } from "@/lib/utils/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// handles both login and sign-up
export default function Profile() {
  const { data: session } = useSession();

  const { asPath } = useRouter();

  const headers = createAuthHeader(session?.user.accessToken);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/user/${asPath?.split("@")[1]}`, {
      method: "GET",
      headers,
    }).then(async (res) => {
      setUser(await res.json());
    });
  }, [asPath, headers]);

  return user ? (
    <main className="flex flex-col h-screen">
      <Header />

      <div className="flex h-full w-full items-center justify-center">
        <div
          className={`flex flex-col w-3/4 sm:w-1/2 bg-white rounded-xl overflow-hidden divide-y border [&>*]:p-4`}
        >
          <Link
            href={`/@${user.username}`}
            className="text-2xl text-center text-blue-500"
          >
            @{user.username}
          </Link>
          <div className="flex flex-col items-center bg-gray-100">
            <h1 className="font-bold text-4xl items-center">Puzzles</h1>
            {user?.puzzles?.map(({ title, description, status, id }) => (
              <Link
                key={id}
                href={`/puzzles/${id}`}
                className="flex-1 flex flex-col w-3/4 bg-gray-500 cursor-pointer hover:bg-gray-400 mt-2 rounded-xl p-2"
              >
                <h1 className="text-3xl font-bold self-center">{title}</h1>
                <h3
                  className={`text-xl self-center ${
                    status === Status.COMPLETED
                      ? "text-green-500"
                      : "text-slate-800"
                  }`}
                >
                  {status}
                </h3>
                <p className="whitespace-pre-wrap line-clamp-2">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  ) : (
    <h1 className="text-4xl h-screen">User Not Found</h1>
  );
}
