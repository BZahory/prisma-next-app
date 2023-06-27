import useForceLogin from "@/lib/hooks/useForceLogin";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useForceLogin();
  return <div>TODO: make home page</div>;
}
