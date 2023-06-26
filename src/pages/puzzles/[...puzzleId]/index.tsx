import Header from "@/components/Header";
import puzzles, { Status } from "@/test/puzzles";
import { useRouter } from "next/router";
import { useState } from "react";
import Input from "@/components/Input";

export default function Puzzle() {
  const { asPath: currentPath } = useRouter();

  const puzzleId = currentPath.split("/")[2];

  const puzzle = puzzles.find(({ id }) => id === Number(puzzleId));

  const [answer, setAnswer] = useState(puzzle?.savedAnswer || "");

  const handleSubmit = () => {
    //TODO: Link to API
  };

  const handleSave = () => {
    //TODO: Link to API
  };

  return puzzle ? (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="relative flex h-full">
        <div className="flex-1 flex flex-col h-full p-4">
          <h1 className="text-4xl font-bold self-center">{puzzle.name}</h1>
          <h3
            className={`text-xl self-center ${
              puzzle.status === Status.COMPLETED
                ? "text-green-500"
                : "text-slate-800"
            }`}
          >
            {puzzle.status}
          </h3>
          <p className="text-xl whitespace-pre-wrap">{puzzle.description}</p>
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
