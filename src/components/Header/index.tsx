import Link from "next/link";
import { useRouter } from "next/router";
import SignInButton from "./SignInButton";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ITEM_CLASSES = (isSelected: boolean) =>
  `block border-0 hover:text-blue-700 ${isSelected ? "text-blue-500" : ""}`;

interface NavItem {
  name: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "Puzzles",
    path: "/puzzles",
  },
];

export default function Header() {
  const { pathname: currentPath } = useRouter();

  const userFromSession = useSession().data?.user;

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <Image
            width={32}
            height={32}
            src="/logo.png"
            alt="logo"
            className="mr-3"
          />

          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Tad-Thrust
          </span>
        </Link>
        <div className="block w-auto" id="navbar-default">
          <ul className="font-medium flex border-gray-100 rounded-lg flex-row space-x-8 mt-0 border-0">
            {NAV_ITEMS.map(({ path: routePath, name }) => (
              <li key={routePath}>
                <Link
                  href={routePath}
                  className={ITEM_CLASSES(currentPath === routePath)}
                >
                  {name}
                </Link>
              </li>
            ))}
            {userFromSession && (
              <li key="Profile">
                <Link
                  href={`/@${userFromSession.username}`}
                  className={ITEM_CLASSES(currentPath === "/[username]")}
                >
                  Profile
                </Link>
              </li>
            )}
            <SignInButton className={ITEM_CLASSES(currentPath === "/login")} />
          </ul>
        </div>
      </div>
    </nav>
  );
}
