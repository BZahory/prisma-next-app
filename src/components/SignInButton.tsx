import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignInButton() {
  const { pathname: currentPath } = useRouter();

  const session = useSession();

  const isSignedIn = Boolean(session.data?.user);

  return (
    <Link
      className="w-3/4 self-center rounded-md p-4"
      onClick={() => (isSignedIn ? signOut() : {})}
      href={!isSignedIn ? "/login" : currentPath}
    >
      {isSignedIn ? "Sign Out" : "Sign In"}
    </Link>
  );
}
