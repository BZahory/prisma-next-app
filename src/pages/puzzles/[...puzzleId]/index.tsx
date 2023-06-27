import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import { useSession } from "next-auth/react";
import { Status } from "@/lib/types/sql";
import useDatabaseUser from "@/lib/hooks/useSessionUser";
import { createAuthHeader } from "@/lib/utils/auth";
import useForceLogin from "@/lib/hooks/useForceLogin";

export default function Puzzle() {
  useForceLogin();
  const { asPath: currentPath } = useRouter();

  const puzzleId = currentPath.split("/")[2];

  const session = useSession().data;

  const headers = createAuthHeader(session?.user.accessToken);

  const user = useDatabaseUser();

  const puzzle = user?.puzzles.find(({ id }) => id === Number(puzzleId));

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (puzzle?.savedAnswer) setAnswer(puzzle.savedAnswer);
  }, [puzzle?.savedAnswer]);

  const handleSubmit = () => {
    fetch(`http://localhost:3000/api/puzzle/${puzzle?.id}`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        submittedAnswer: answer,
      }),
    });
  };

  const handleSave = () => {
    fetch(`http://localhost:3000/api/puzzle/${puzzle?.id}`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        savedAnswer: answer,
      }),
    });
  };

  return puzzle ? (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="relative flex h-full">
        <div className="flex-1 flex flex-col h-full p-4">
          <h1 className="text-4xl font-bold self-center">{puzzle.title}</h1>
          <h3
            className={`text-xl self-center ${
              puzzle.status === Status.COMPLETED
                ? "text-green-500"
                : "text-slate-800"
            }`}
          >
            {puzzle.status}
          </h3>
          <p className="text-xl h-3/4 whitespace-pre-wrap overflow-y-scroll">
            {puzzle.description}
          </p>
        </div>

        <div className="flex-[2] flex flex-col h-full bg-gray-300 p-4 gap-y-5">
          <h1 className="text-4xl font-bold text-center">Solution</h1>
          <Input
            className="h-12 border-2"
            required
            type="string"
            placeholder="Answer"
            handleChange={setAnswer}
            value={answer}
          />
          <Input
            type="button"
            className="bg-blue-500 hover:bg-opacity-90 text-white rounded-full w-1/2 self-center p-2 cursor-pointer"
            value="Submit"
            onClick={handleSubmit}
          />
          <Input
            type="button"
            className="bg-blue-400 hover:bg-opacity-90 text-white rounded-full w-1/2 self-center p-2 cursor-pointer"
            value="Save"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-4xl h-screen">Puzzle Not Found</h1>
  );
}
