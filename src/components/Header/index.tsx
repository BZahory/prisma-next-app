import Link from "next/link";
import { useRouter } from "next/router";

const ITEM_CLASSES = (isSelected: boolean) =>
  `block border-0 hover:text-blue-700 ${isSelected ? "text-blue-500" : ""}`;

interface Props {}

interface NavItem {
  name: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Puzzles",
    path: "/puzzles",
  },
];

export default function Header({}: Props) {
  const { pathname: currentPath } = useRouter();

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="logo" className="w-8 mr-3" />

          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Tad-Thrust
          </span>
        </Link>
        <div className="block w-auto" id="navbar-default">
          <ul className="font-medium flex border-gray-100 rounded-lg flex-row space-x-8 mt-0 border-0">
            {NAV_ITEMS.map(({ path: routePath, name }) => (
              <li>
                <Link
                  href={routePath}
                  className={ITEM_CLASSES(currentPath === routePath)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
