import useDatabaseUser from "@/lib/hooks/useSessionUser";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useDatabaseUser();
  return <div>TODO: make home page</div>;
}
