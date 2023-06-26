import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function () {
  const session = useSession();

  const isSignedIn = Boolean(session.data?.user);

  return (
    <Link
      className="w-3/4 self-center rounded-md p-4"
      onClick={() => (isSignedIn ? signOut() : {})}
      href="/login"
    >
      {isSignedIn ? "Sign Out" : "Sign In"}
    </Link>
  );
}
